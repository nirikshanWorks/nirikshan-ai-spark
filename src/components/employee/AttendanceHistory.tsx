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
import { CalendarDays, Download, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface AttendanceHistoryProps {
  employeeId: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
}

export const AttendanceHistory = ({ employeeId }: AttendanceHistoryProps) => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

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
          <div className="flex items-center gap-2">
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
              Export
            </Button>
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
