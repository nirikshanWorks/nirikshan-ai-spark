import { useState, useEffect } from "react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock, Users, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const IST_TIMEZONE = 'Asia/Kolkata';

interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  department: string | null;
  status: string;
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

interface TodaysAttendanceProps {
  employees: Employee[];
  onRefresh: () => void;
}

const TodaysAttendance = ({ employees, onRefresh }: TodaysAttendanceProps) => {
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  const todayIST = toZonedTime(new Date(), IST_TIMEZONE);
  const todayStr = formatInTimeZone(new Date(), IST_TIMEZONE, 'yyyy-MM-dd');
  const displayDate = formatInTimeZone(new Date(), IST_TIMEZONE, 'EEEE, MMMM d, yyyy');
  const currentTime = formatInTimeZone(new Date(), IST_TIMEZONE, 'hh:mm a');

  useEffect(() => {
    fetchTodayAttendance();
    
    // Refresh every minute
    const interval = setInterval(fetchTodayAttendance, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchTodayAttendance = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("date", todayStr);

    if (error) {
      toast.error("Failed to fetch today's attendance");
      console.error(error);
    } else {
      setTodayAttendance(data || []);
    }
    setLoading(false);
  };

  // Only count active employees
  const activeEmployees = employees.filter(e => e.status === 'active');
  
  const getAttendanceForEmployee = (employeeId: string) => {
    return todayAttendance.find(a => a.employee_id === employeeId);
  };

  const stats = {
    total: activeEmployees.length,
    present: todayAttendance.filter(a => a.status === 'present').length,
    halfDay: todayAttendance.filter(a => a.status === 'half-day').length,
    late: todayAttendance.filter(a => a.status === 'late').length,
    absent: todayAttendance.filter(a => a.status === 'absent').length,
    notMarked: activeEmployees.length - todayAttendance.filter(a => 
      activeEmployees.some(e => e.id === a.employee_id)
    ).length,
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: React.ReactNode }> = {
      present: { 
        className: "bg-green-100 text-green-800", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      'half-day': { 
        className: "bg-blue-100 text-blue-800", 
        icon: <Clock className="h-3 w-3" /> 
      },
      late: { 
        className: "bg-yellow-100 text-yellow-800", 
        icon: <Clock className="h-3 w-3" /> 
      },
      absent: { 
        className: "bg-red-100 text-red-800", 
        icon: <XCircle className="h-3 w-3" /> 
      },
      leave: { 
        className: "bg-purple-100 text-purple-800", 
        icon: <Clock className="h-3 w-3" /> 
      },
    };
    const { className, icon } = config[status] || { className: "bg-gray-100 text-gray-800", icon: null };
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with current time */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Today's Attendance
          </h3>
          <p className="text-sm text-muted-foreground">
            {displayDate} • {currentTime} IST
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { fetchTodayAttendance(); onRefresh(); }} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Present</p>
                <p className="text-xl font-bold text-green-600">{stats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Half Day</p>
                <p className="text-xl font-bold text-blue-600">{stats.halfDay}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Late</p>
                <p className="text-xl font-bold text-yellow-600">{stats.late}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Absent</p>
                <p className="text-xl font-bold text-red-600">{stats.absent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Not Marked</p>
                <p className="text-xl font-bold text-gray-600">{stats.notMarked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Employee Attendance Status</CardTitle>
          <CardDescription>Real-time attendance for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEmployees.map((employee) => {
                  const attendance = getAttendanceForEmployee(employee.id);
                  
                  return (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.full_name}</p>
                          <p className="text-xs text-muted-foreground">{employee.employee_id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {employee.department ? (
                          <Badge variant="secondary" className="text-xs">{employee.department}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {attendance ? (
                          getStatusBadge(attendance.status)
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600">
                            Not Marked
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {attendance?.check_in_time ? (
                          <span className="text-sm">
                            {formatInTimeZone(new Date(attendance.check_in_time), IST_TIMEZONE, 'hh:mm a')}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {attendance?.check_out_time ? (
                          <span className="text-sm">
                            {formatInTimeZone(new Date(attendance.check_out_time), IST_TIMEZONE, 'hh:mm a')}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {attendance?.notes || '-'}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaysAttendance;
