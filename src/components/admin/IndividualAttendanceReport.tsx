import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, isSameMonth } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { Calendar as CalendarIcon, Download, BarChart3, CheckCircle, XCircle, Clock, ArrowLeft, FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const IST_TIMEZONE = 'Asia/Kolkata';

interface Employee {
  id: string;
  user_id: string;
  employee_id: string;
  full_name: string;
  department: string | null;
  designation: string | null;
  joining_date: string | null;
  status: string;
  end_date: string | null;
}

interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  status: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
}

interface IndividualAttendanceReportProps {
  employee: Employee;
  onBack: () => void;
  holidays: Holiday[];
}

const IndividualAttendanceReport = ({ employee, onBack, holidays }: IndividualAttendanceReportProps) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = toZonedTime(new Date(), IST_TIMEZONE);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeAttendance();
  }, [selectedMonth, employee.id]);

  const fetchEmployeeAttendance = async () => {
    setLoading(true);
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("employee_id", employee.id)
      .gte("date", format(startDate, 'yyyy-MM-dd'))
      .lte("date", format(endDate, 'yyyy-MM-dd'))
      .order("date", { ascending: true });

    if (error) {
      toast.error("Failed to fetch attendance records");
      console.error(error);
    } else {
      setAttendanceRecords(data || []);
    }
    setLoading(false);
  };

  const isHoliday = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.some(h => h.date === dateStr);
  };

  const getHolidayForDate = (date: Date): Holiday | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.find(h => h.date === dateStr);
  };

  const getAttendanceForDate = (date: Date): AttendanceRecord | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return attendanceRecords.find(a => a.date === dateStr);
  };

  const calculateStats = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const todayIST = toZonedTime(new Date(), IST_TIMEZONE);
    const todayStr = formatInTimeZone(new Date(), IST_TIMEZONE, 'yyyy-MM-dd');
    
    const isCurrentMonth = todayIST.getFullYear() === year && (todayIST.getMonth() + 1) === month;
    const lastDayToCount = isCurrentMonth ? todayIST.getDate() : new Date(year, month, 0).getDate();
    
    let workingDays = 0;
    let present = 0;
    let absent = 0;
    let halfDay = 0;
    let late = 0;
    let leave = 0;

    // Calculate working days up to today (or end of month if past month)
    for (let d = 1; d <= lastDayToCount; d++) {
      const date = new Date(year, month - 1, d);
      const day = date.getDay();
      
      // Skip Sundays and Saturdays
      if (day === 0 || day === 6) continue;
      
      // Skip holidays
      if (isHoliday(date)) continue;
      
      // Skip if before joining date
      if (employee.joining_date) {
        const joiningDate = new Date(employee.joining_date);
        if (date < joiningDate) continue;
      }
      
      // Skip if after end date (for inactive/internship ended employees)
      if (employee.end_date) {
        const endDate = new Date(employee.end_date);
        if (date > endDate) continue;
      }
      
      workingDays++;
      
      const attendance = getAttendanceForDate(date);
      if (attendance) {
        switch (attendance.status) {
          case 'present':
            present++;
            break;
          case 'half-day':
            halfDay++;
            break;
          case 'late':
            late++;
            break;
          case 'leave':
            leave++;
            break;
          case 'absent':
            absent++;
            break;
        }
      } else {
        // No record means absent (only for past dates)
        const dateStr = format(date, 'yyyy-MM-dd');
        if (dateStr < todayStr) {
          absent++;
        }
      }
    }

    const attendanceRate = workingDays > 0 
      ? Math.round(((present + halfDay * 0.5 + late) / workingDays) * 100) 
      : 0;

    return { workingDays, present, absent, halfDay, late, leave, attendanceRate };
  };

  const stats = calculateStats();

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

  const getCalendarDays = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));
    return eachDayOfInterval({ start, end });
  };

  const getDayStatus = (date: Date) => {
    const todayIST = toZonedTime(new Date(), IST_TIMEZONE);
    const dateStr = format(date, 'yyyy-MM-dd');
    const todayStr = formatInTimeZone(new Date(), IST_TIMEZONE, 'yyyy-MM-dd');
    
    if (date.getDay() === 0) return { status: 'sunday', label: 'Sun', color: 'bg-gray-400' };
    if (date.getDay() === 6) return { status: 'saturday', label: 'Sat', color: 'bg-gray-300' };
    
    const holiday = getHolidayForDate(date);
    if (holiday) return { status: 'holiday', label: holiday.name, color: 'bg-orange-400' };
    
    if (employee.joining_date && date < new Date(employee.joining_date)) {
      return { status: 'before-joining', label: 'N/A', color: 'bg-gray-200' };
    }
    
    // After end date (for internship ended / resigned)
    if (employee.end_date && date > new Date(employee.end_date)) {
      return { status: 'after-end', label: 'Ended', color: 'bg-gray-200' };
    }
    
    const attendance = getAttendanceForDate(date);
    if (attendance) {
      switch (attendance.status) {
        case 'present':
          return { status: 'present', label: 'Present', color: 'bg-green-500' };
        case 'half-day':
          return { status: 'half-day', label: 'Half Day', color: 'bg-blue-500' };
        case 'late':
          return { status: 'late', label: 'Late', color: 'bg-yellow-500' };
        case 'leave':
          return { status: 'leave', label: 'Leave', color: 'bg-purple-500' };
        case 'absent':
          return { status: 'absent', label: 'Absent', color: 'bg-red-500' };
      }
    }
    
    // Future date
    if (dateStr > todayStr) {
      return { status: 'future', label: '-', color: 'bg-gray-100' };
    }
    
    // No record for past working day = absent
    return { status: 'absent', label: 'Absent', color: 'bg-red-500' };
  };

  const exportReport = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    const calendarDays = getCalendarDays();
    const detailedData = calendarDays.map(date => {
      const dayStatus = getDayStatus(date);
      const attendance = getAttendanceForDate(date);
      
      return {
        'Date': format(date, 'yyyy-MM-dd'),
        'Day': format(date, 'EEEE'),
        'Status': dayStatus.label,
        'Check In': attendance?.check_in_time ? formatInTimeZone(new Date(attendance.check_in_time), IST_TIMEZONE, 'hh:mm a') : '-',
        'Check Out': attendance?.check_out_time ? formatInTimeZone(new Date(attendance.check_out_time), IST_TIMEZONE, 'hh:mm a') : '-',
        'Notes': attendance?.notes || '',
      };
    });

    const summaryData = [{
      'Employee ID': employee.employee_id,
      'Name': employee.full_name,
      'Department': employee.department || 'N/A',
      'Month': monthName,
      'Working Days': stats.workingDays,
      'Present': stats.present,
      'Half Days': stats.halfDay,
      'Late': stats.late,
      'Leave': stats.leave,
      'Absent': stats.absent,
      'Attendance Rate': `${stats.attendanceRate}%`,
    }];

    const wb = XLSX.utils.book_new();
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    const detailedWs = XLSX.utils.json_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(wb, detailedWs, 'Daily Attendance');
    
    XLSX.writeFile(wb, `${employee.employee_id}_Attendance_${monthName.replace(' ', '_')}.xlsx`);
    toast.success(`Exported Excel report for ${employee.full_name}`);
  };

  const exportToPDF = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Header - Company Name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('NIRIKSHAN AI PRIVATE LIMITED', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Monthly Attendance Report', pageWidth / 2, 28, { align: 'center' });

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(15, 33, pageWidth - 15, 33);

    // Document details
    doc.setFontSize(10);
    doc.text(`Date Generated: ${format(new Date(), 'dd MMMM yyyy')}`, pageWidth - 15, 42, { align: 'right' });
    doc.text(`Document No: ATT-${Date.now().toString().slice(-8)}`, 15, 42);

    // Employee Details Section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE DETAILS', 15, 55);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const detailsY = 62;
    doc.text(`Employee Name: ${employee.full_name}`, 15, detailsY);
    doc.text(`Employee ID: ${employee.employee_id}`, 15, detailsY + 6);
    doc.text(`Department: ${employee.department || 'N/A'}`, 15, detailsY + 12);
    doc.text(`Designation: ${employee.designation || 'N/A'}`, pageWidth / 2, detailsY);
    doc.text(`Period: ${monthName}`, pageWidth / 2, detailsY + 6);
    if (employee.status !== 'active') {
      doc.text(`Status: ${employee.status.replace('_', ' ').toUpperCase()}`, pageWidth / 2, detailsY + 12);
    }
    if (employee.end_date) {
      doc.text(`End Date: ${format(new Date(employee.end_date), 'dd MMM yyyy')}`, pageWidth / 2, detailsY + 18);
    }

    // Summary Statistics
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SUMMARY', 15, 90);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Working Days: ${stats.workingDays}`, 15, 98);
    doc.text(`Present: ${stats.present}`, 15, 104);
    doc.text(`Half-Day: ${stats.halfDay}`, 60, 98);
    doc.text(`Late: ${stats.late}`, 60, 104);
    doc.text(`Leave: ${stats.leave}`, 105, 98);
    doc.text(`Absent: ${stats.absent}`, 105, 104);
    doc.text(`Attendance Rate: ${stats.attendanceRate}%`, 150, 98);

    // Attendance Table
    const calendarDays = getCalendarDays();
    const tableData = calendarDays
      .filter(date => {
        const dayStatus = getDayStatus(date);
        return dayStatus.status !== 'future' && dayStatus.status !== 'after-end';
      })
      .map(date => {
        const dayStatus = getDayStatus(date);
        const attendance = getAttendanceForDate(date);
        
        return [
          format(date, 'dd/MM/yyyy'),
          format(date, 'EEE'),
          dayStatus.label,
          attendance?.check_in_time ? formatInTimeZone(new Date(attendance.check_in_time), IST_TIMEZONE, 'hh:mm a') : '-',
          attendance?.check_out_time ? formatInTimeZone(new Date(attendance.check_out_time), IST_TIMEZONE, 'hh:mm a') : '-',
          attendance?.notes || '-'
        ];
      });

    autoTable(doc, {
      startY: 115,
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
        1: { cellWidth: 15 },
        2: { cellWidth: 22 },
        3: { cellWidth: 22 },
        4: { cellWidth: 22 },
        5: { cellWidth: 'auto' }
      }
    });

    // Rights and Validity Section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('IMPORTANT NOTICE:', 15, finalY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const validityText = [
      '• This document is the property of Nirikshan AI Private Limited.',
      '• All intellectual property rights and information contained herein belong to Nirikshan AI.',
      '• This document is valid ONLY when signed by an authorized signatory of Nirikshan AI Pvt. Ltd.'
    ];
    
    validityText.forEach((line, index) => {
      doc.text(line, 15, finalY + 6 + (index * 5));
    });

    // Signature Section
    const signatureY = finalY + 28;
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
    const fileName = `${employee.employee_id}_Attendance_${monthName.replace(' ', '_')}.pdf`;
    doc.save(fileName);
    
    toast.success(`Exported PDF report for ${employee.full_name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-xl font-bold">{employee.full_name}</h2>
            <p className="text-sm text-muted-foreground">
              {employee.employee_id} • {employee.department || 'No Department'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
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
          <Button onClick={exportReport} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Excel
          </Button>
          <Button onClick={exportToPDF} variant="default" className="gap-2">
            <FileText className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Working Days</p>
            <p className="text-2xl font-bold">{stats.workingDays}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Half Day</p>
            <p className="text-2xl font-bold text-blue-600">{stats.halfDay}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Late</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Leave</p>
            <p className="text-2xl font-bold text-purple-600">{stats.leave}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Rate</p>
            <p className={`text-2xl font-bold ${
              stats.attendanceRate >= 90 ? 'text-green-600' : 
              stats.attendanceRate >= 75 ? 'text-yellow-600' : 'text-red-600'
            }`}>{stats.attendanceRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm w-20">Present</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${stats.workingDays > 0 ? (stats.present / stats.workingDays) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stats.present}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-20">Half Day</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${stats.workingDays > 0 ? (stats.halfDay / stats.workingDays) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stats.halfDay}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-20">Late</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${stats.workingDays > 0 ? (stats.late / stats.workingDays) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stats.late}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-20">Leave</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all"
                  style={{ width: `${stats.workingDays > 0 ? (stats.leave / stats.workingDays) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stats.leave}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-20">Absent</span>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${stats.workingDays > 0 ? (stats.absent / stats.workingDays) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stats.absent}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Monthly Calendar
          </CardTitle>
          <CardDescription>
            Visual overview of attendance for {new Date(selectedMonth + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-xs">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-xs">Half Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-xs">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500"></div>
              <span className="text-xs">Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-xs">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-400"></div>
              <span className="text-xs">Weekend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-400"></div>
              <span className="text-xs">Holiday</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells for days before month starts */}
            {Array.from({ length: getCalendarDays()[0]?.getDay() || 0 }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Calendar days */}
            {getCalendarDays().map(date => {
              const dayStatus = getDayStatus(date);
              const attendance = getAttendanceForDate(date);
              
              return (
                <Popover key={date.toISOString()}>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all hover:ring-2 hover:ring-primary",
                        dayStatus.color,
                        dayStatus.status === 'future' ? 'text-muted-foreground' : 'text-white',
                        dayStatus.status === 'before-joining' && 'text-muted-foreground'
                      )}
                    >
                      <span className="font-medium">{format(date, 'd')}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" side="top">
                    <div className="space-y-2">
                      <p className="font-medium">{format(date, 'EEEE, MMM d, yyyy')}</p>
                      <Badge className={cn(dayStatus.color, 'text-white')}>
                        {dayStatus.label}
                      </Badge>
                      {attendance && (
                        <div className="text-sm space-y-1 pt-2 border-t">
                          {attendance.check_in_time && (
                            <p className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              In: {formatInTimeZone(new Date(attendance.check_in_time), IST_TIMEZONE, 'hh:mm a')}
                            </p>
                          )}
                          {attendance.check_out_time && (
                            <p className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              Out: {formatInTimeZone(new Date(attendance.check_out_time), IST_TIMEZONE, 'hh:mm a')}
                            </p>
                          )}
                          {attendance.notes && (
                            <p className="text-muted-foreground text-xs">{attendance.notes}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-left py-2 px-3">Day</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Check In</th>
                  <th className="text-left py-2 px-3">Check Out</th>
                  <th className="text-left py-2 px-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {getCalendarDays().map(date => {
                  const dayStatus = getDayStatus(date);
                  const attendance = getAttendanceForDate(date);
                  
                  if (dayStatus.status === 'future') return null;
                  
                  return (
                    <tr key={date.toISOString()} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3">{format(date, 'MMM d')}</td>
                      <td className="py-2 px-3">{format(date, 'EEE')}</td>
                      <td className="py-2 px-3">
                        <Badge className={cn(dayStatus.color, 'text-white text-xs')}>
                          {dayStatus.label}
                        </Badge>
                      </td>
                      <td className="py-2 px-3">
                        {attendance?.check_in_time 
                          ? formatInTimeZone(new Date(attendance.check_in_time), IST_TIMEZONE, 'hh:mm a')
                          : '-'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {attendance?.check_out_time 
                          ? formatInTimeZone(new Date(attendance.check_out_time), IST_TIMEZONE, 'hh:mm a')
                          : '-'
                        }
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">{attendance?.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndividualAttendanceReport;
