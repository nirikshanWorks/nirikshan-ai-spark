import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { CalendarDays, Download, CheckCircle, XCircle, Clock, RefreshCw, FileText, CalendarIcon } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceHistoryProps {
  employeeId: string;
  employeeName?: string;
  employeeCode?: string;
  department?: string;
  designation?: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
}

export const AttendanceHistory = ({ 
  employeeId, 
  employeeName = "Employee",
  employeeCode = "",
  department = "",
  designation = ""
}: AttendanceHistoryProps) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  // PDF Export state
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfStartDate, setPdfStartDate] = useState<Date | undefined>(undefined);
  const [pdfEndDate, setPdfEndDate] = useState<Date | undefined>(undefined);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, [employeeId, selectedMonth]);

  const fetchAttendance = async () => {
    setLoading(true);
    
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("employee_id", employeeId)
      .gte("date", startDate.toISOString().split('T')[0])
      .lte("date", endDate.toISOString().split('T')[0])
      .order("date", { ascending: false });

    if (!error && data) {
      setAttendance(data);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: React.ReactNode }> = {
      present: { className: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3" /> },
      absent: { className: "bg-red-100 text-red-800", icon: <XCircle className="h-3 w-3" /> },
      "half-day": { className: "bg-orange-100 text-orange-800", icon: <Clock className="h-3 w-3" /> },
      late: { className: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-3 w-3" /> },
    };
    const { className, icon } = config[status] || config.present;
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatTime = (time: string | null) => {
    if (!time) return "--:--";
    return new Date(time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMonthOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
    return options;
  };

  // Calculate stats
  const [year, month] = selectedMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  let workingDays = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, month - 1, d).getDay();
    if (day !== 0 && day !== 6) workingDays++;
  }

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    halfDay: attendance.filter(a => a.status === 'half-day').length,
    late: attendance.filter(a => a.status === 'late').length,
    workingDays,
    get absent() { return Math.max(0, this.workingDays - this.present - this.halfDay - this.late); },
    get rate() { return this.workingDays > 0 ? Math.round(((this.present + this.halfDay * 0.5 + this.late) / this.workingDays) * 100) : 0; }
  };

  const exportToExcel = () => {
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    const data = attendance.map(a => ({
      'Date': a.date,
      'Day': new Date(a.date).toLocaleString('en-US', { weekday: 'long' }),
      'Status': a.status,
      'Check In': a.check_in_time ? new Date(a.check_in_time).toLocaleTimeString() : '-',
      'Check Out': a.check_out_time ? new Date(a.check_out_time).toLocaleTimeString() : '-',
      'Notes': a.notes || '',
    }));

    // Add summary row
    data.push({
      'Date': '',
      'Day': 'SUMMARY',
      'Status': '',
      'Check In': '',
      'Check Out': '',
      'Notes': '',
    });
    data.push({
      'Date': 'Present',
      'Day': String(stats.present),
      'Status': 'Half-Day',
      'Check In': String(stats.halfDay),
      'Check Out': 'Absent',
      'Notes': String(stats.absent),
    });
    data.push({
      'Date': 'Attendance Rate',
      'Day': `${stats.rate}%`,
      'Status': '',
      'Check In': '',
      'Check Out': '',
      'Notes': '',
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `My_Attendance_${monthName.replace(' ', '_')}.xlsx`);
    toast.success(`Exported attendance for ${monthName}`);
  };

  const exportToPDF = async () => {
    if (!pdfStartDate || !pdfEndDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (pdfStartDate > pdfEndDate) {
      toast.error("Start date must be before end date");
      return;
    }

    setPdfLoading(true);

    try {
      // Fetch attendance for selected date range
      const { data: pdfAttendance, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("employee_id", employeeId)
        .gte("date", pdfStartDate.toISOString().split('T')[0])
        .lte("date", pdfEndDate.toISOString().split('T')[0])
        .order("date", { ascending: true });

      if (error) throw error;

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Load logo
      const logoUrl = '/Nirikshan_AI_Logo_new-removebg-preview.png';
      
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = logoUrl;
        });
        doc.addImage(img, 'PNG', 15, 10, 40, 15);
      } catch {
        // If logo fails, continue without it
        console.log('Logo could not be loaded');
      }

      // Header - Company Name
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('NIRIKSHAN AI PRIVATE LIMITED', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Attendance Record Certificate', pageWidth / 2, 28, { align: 'center' });

      // Horizontal line
      doc.setLineWidth(0.5);
      doc.line(15, 33, pageWidth - 15, 33);

      // Document details
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const dateGenerated = format(new Date(), 'dd MMMM yyyy');
      doc.text(`Date Generated: ${dateGenerated}`, pageWidth - 15, 42, { align: 'right' });
      doc.text(`Document No: ATT-${Date.now().toString().slice(-8)}`, 15, 42);

      // Employee Details Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('EMPLOYEE DETAILS', 15, 55);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const detailsY = 62;
      doc.text(`Employee Name: ${employeeName}`, 15, detailsY);
      doc.text(`Employee ID: ${employeeCode}`, 15, detailsY + 6);
      doc.text(`Department: ${department || 'N/A'}`, 15, detailsY + 12);
      doc.text(`Designation: ${designation || 'N/A'}`, pageWidth / 2, detailsY);
      doc.text(`Period: ${format(pdfStartDate, 'dd MMM yyyy')} to ${format(pdfEndDate, 'dd MMM yyyy')}`, pageWidth / 2, detailsY + 6);

      // Attendance Table
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ATTENDANCE RECORD', 15, 90);

      const tableData = (pdfAttendance || []).map(a => [
        format(new Date(a.date), 'dd/MM/yyyy'),
        format(new Date(a.date), 'EEEE'),
        a.status.charAt(0).toUpperCase() + a.status.slice(1),
        a.check_in_time ? new Date(a.check_in_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '-',
        a.check_out_time ? new Date(a.check_out_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '-',
        a.notes || '-'
      ]);

      autoTable(doc, {
        startY: 95,
        head: [['Date', 'Day', 'Status', 'Check In', 'Check Out', 'Notes']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 8,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 22 },
          1: { cellWidth: 25 },
          2: { cellWidth: 20 },
          3: { cellWidth: 22 },
          4: { cellWidth: 22 },
          5: { cellWidth: 'auto' }
        }
      });

      // Get the Y position after the table
      const finalY = (doc as any).lastAutoTable.finalY + 10;

      // Summary Statistics
      const pdfStats = {
        present: (pdfAttendance || []).filter(a => a.status === 'present').length,
        halfDay: (pdfAttendance || []).filter(a => a.status === 'half-day').length,
        late: (pdfAttendance || []).filter(a => a.status === 'late').length,
        absent: (pdfAttendance || []).filter(a => a.status === 'absent').length,
        total: (pdfAttendance || []).length
      };

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('SUMMARY', 15, finalY);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Days: ${pdfStats.total}`, 15, finalY + 7);
      doc.text(`Present: ${pdfStats.present}`, 15, finalY + 13);
      doc.text(`Half-Day: ${pdfStats.halfDay}`, 60, finalY + 7);
      doc.text(`Late: ${pdfStats.late}`, 60, finalY + 13);
      doc.text(`Absent: ${pdfStats.absent}`, 105, finalY + 7);
      
      const attendanceRate = pdfStats.total > 0 
        ? Math.round(((pdfStats.present + pdfStats.halfDay * 0.5 + pdfStats.late) / pdfStats.total) * 100) 
        : 0;
      doc.text(`Attendance Rate: ${attendanceRate}%`, 105, finalY + 13);

      // Rights and Validity Section
      const validityY = finalY + 28;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('IMPORTANT NOTICE:', 15, validityY);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const validityText = [
        '• This document is the property of Nirikshan AI Private Limited.',
        '• All intellectual property rights and information contained herein belong to Nirikshan AI.',
        '• Unauthorized reproduction, distribution, or use of this document is strictly prohibited.',
        '• This document is valid ONLY when signed by an authorized signatory of Nirikshan AI Pvt. Ltd.',
        '• Any tampering or modification of this document renders it invalid.'
      ];
      
      validityText.forEach((line, index) => {
        doc.text(line, 15, validityY + 6 + (index * 5));
      });

      // Signature Section
      const signatureY = validityY + 38;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('AUTHORIZED SIGNATORY', pageWidth - 60, signatureY);
      
      doc.setLineWidth(0.3);
      doc.line(pageWidth - 85, signatureY + 18, pageWidth - 15, signatureY + 18);
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('Signature & Stamp', pageWidth - 60, signatureY + 24);
      doc.text('For Nirikshan AI Pvt. Ltd.', pageWidth - 65, signatureY + 30);

      // Footer
      const footerY = pageHeight - 25;
      doc.setLineWidth(0.5);
      doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text('Nirikshan AI Private Limited', pageWidth / 2, footerY, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.text('CIN: U62091HR2025PTC134110', pageWidth / 2, footerY + 4, { align: 'center' });
      doc.text('166A, Village Malra Sarai, Lawan, Lawan, Mahendragarh- 123029, Haryana', pageWidth / 2, footerY + 8, { align: 'center' });
      doc.text('Email: info@nirikshanai.com | Website: www.nirikshanai.com | Phone: +91 94109 92204', pageWidth / 2, footerY + 12, { align: 'center' });

      // Save PDF
      const fileName = `Attendance_Record_${employeeName.replace(/\s+/g, '_')}_${format(pdfStartDate, 'ddMMMyyyy')}_to_${format(pdfEndDate, 'ddMMMyyyy')}.pdf`;
      doc.save(fileName);
      
      toast.success('PDF exported successfully');
      setPdfDialogOpen(false);
      setPdfStartDate(undefined);
      setPdfEndDate(undefined);
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-green-50 dark:bg-green-950/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Present</p>
                <p className="text-xl font-bold text-green-600">{stats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-950/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-xs text-muted-foreground">Half-Day</p>
                <p className="text-xl font-bold text-orange-600">{stats.halfDay}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-950/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-xs text-muted-foreground">Late</p>
                <p className="text-xl font-bold text-yellow-600">{stats.late}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-950/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-xs text-muted-foreground">Absent</p>
                <p className="text-xl font-bold text-red-600">{stats.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Rate</p>
                <p className={`text-xl font-bold ${
                  stats.rate >= 90 ? 'text-green-600' :
                  stats.rate >= 75 ? 'text-yellow-600' : 'text-red-600'
                }`}>{stats.rate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Attendance History
            </CardTitle>
            <CardDescription>
              Your attendance records
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {getMonthOptions().map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchAttendance}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={exportToExcel} className="gap-1">
              <Download className="h-4 w-4" />
              Excel
            </Button>
            
            {/* PDF Export Dialog */}
            <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Attendance as PDF
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Select the date range for your official attendance record. The PDF will include company letterhead, your attendance details, and requires an authorized signature to be valid.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !pdfStartDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pdfStartDate ? format(pdfStartDate, "dd MMM yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[200]" align="start">
                          <Calendar
                            mode="single"
                            selected={pdfStartDate}
                            onSelect={setPdfStartDate}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">To Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !pdfEndDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pdfEndDate ? format(pdfEndDate, "dd MMM yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[200]" align="start">
                          <Calendar
                            mode="single"
                            selected={pdfEndDate}
                            onSelect={setPdfEndDate}
                            disabled={(date) => date > new Date() || (pdfStartDate ? date < pdfStartDate : false)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      <strong>Note:</strong> This document is valid only when signed by an authorized signatory from Nirikshan AI Pvt. Ltd.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPdfDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={exportToPDF} 
                    disabled={!pdfStartDate || !pdfEndDate || pdfLoading}
                    className="gap-2"
                  >
                    {pdfLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {attendance.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No attendance records found for this month.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => (
                    <TableRow key={record.id} className={
                      record.status === 'present' ? 'bg-green-50/50 dark:bg-green-950/10' :
                      record.status === 'absent' ? 'bg-red-50/50 dark:bg-red-950/10' :
                      ''
                    }>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{formatTime(record.check_in_time)}</TableCell>
                      <TableCell>{formatTime(record.check_out_time)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {record.notes || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
