import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { 
  Calendar, CheckCircle, XCircle, Clock, Search, Users, 
  Download, BarChart3, CalendarDays, Filter, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import * as XLSX from "xlsx";

interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  department: string | null;
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

interface EmployeeSummary {
  employee: Employee;
  present: number;
  absent: number;
  halfDay: number;
  late: number;
  totalDays: number;
  attendanceRate: number;
}

const AdminAttendanceReports = () => {
  const { user, isAdmin, loading: authLoading, supabase } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
      return;
    }
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, authLoading, navigate, selectedMonth]);

  const fetchData = async () => {
    setLoading(true);
    
    // Parse month
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    // Fetch employees
    const { data: empData, error: empError } = await supabase
      .from("employees")
      .select("id, employee_id, full_name, department")
      .order("full_name");

    if (empError) {
      toast.error("Failed to fetch employees");
      console.error(empError);
    } else {
      setEmployees(empData || []);
    }

    // Fetch attendance for the month
    const { data: attData, error: attError } = await supabase
      .from("attendance")
      .select("*")
      .gte("date", startDate.toISOString().split('T')[0])
      .lte("date", endDate.toISOString().split('T')[0]);

    if (attError) {
      toast.error("Failed to fetch attendance");
      console.error(attError);
    } else {
      setAttendance(attData || []);
    }

    setLoading(false);
  };

  const getEmployeeSummaries = (): EmployeeSummary[] => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Calculate working days (exclude weekends)
    let workingDays = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const day = new Date(year, month - 1, d).getDay();
      if (day !== 0 && day !== 6) workingDays++;
    }

    return employees
      .filter(emp => {
        const matchesSearch = 
          emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = departmentFilter === "all" || emp.department === departmentFilter;
        return matchesSearch && matchesDept;
      })
      .map(emp => {
        const empAttendance = attendance.filter(a => a.employee_id === emp.id);
        const present = empAttendance.filter(a => a.status === 'present').length;
        const halfDay = empAttendance.filter(a => a.status === 'half-day').length;
        const late = empAttendance.filter(a => a.status === 'late').length;
        const absent = workingDays - present - halfDay - late;
        
        return {
          employee: emp,
          present,
          absent: Math.max(0, absent),
          halfDay,
          late,
          totalDays: workingDays,
          attendanceRate: workingDays > 0 ? Math.round(((present + halfDay * 0.5 + late) / workingDays) * 100) : 0,
        };
      });
  };

  const summaries = getEmployeeSummaries();

  const overallStats = {
    totalEmployees: employees.length,
    avgAttendance: summaries.length > 0 
      ? Math.round(summaries.reduce((acc, s) => acc + s.attendanceRate, 0) / summaries.length) 
      : 0,
    totalPresent: summaries.reduce((acc, s) => acc + s.present, 0),
    totalAbsent: summaries.reduce((acc, s) => acc + s.absent, 0),
  };

  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];

  const exportToExcel = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    // Summary sheet data
    const summaryData = summaries.map(s => ({
      'Employee ID': s.employee.employee_id,
      'Full Name': s.employee.full_name,
      'Department': s.employee.department || 'N/A',
      'Present Days': s.present,
      'Half Days': s.halfDay,
      'Late Days': s.late,
      'Absent Days': s.absent,
      'Total Working Days': s.totalDays,
      'Attendance Rate (%)': s.attendanceRate,
    }));

    // Detailed attendance data
    const detailedData = attendance.map(a => {
      const emp = employees.find(e => e.id === a.employee_id);
      return {
        'Date': a.date,
        'Employee ID': emp?.employee_id || 'Unknown',
        'Full Name': emp?.full_name || 'Unknown',
        'Department': emp?.department || 'N/A',
        'Status': a.status,
        'Check In': a.check_in_time ? new Date(a.check_in_time).toLocaleTimeString() : '-',
        'Check Out': a.check_out_time ? new Date(a.check_out_time).toLocaleTimeString() : '-',
        'Notes': a.notes || '',
      };
    }).sort((a, b) => a.Date.localeCompare(b.Date));

    const wb = XLSX.utils.book_new();
    
    // Add summary sheet
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Monthly Summary');
    
    // Add detailed sheet
    const detailedWs = XLSX.utils.json_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(wb, detailedWs, 'Detailed Attendance');
    
    // Export
    XLSX.writeFile(wb, `Attendance_Report_${monthName.replace(' ', '_')}.xlsx`);
    toast.success(`Exported attendance report for ${monthName}`);
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                Attendance Reports
              </h1>
              <p className="text-muted-foreground mt-2">
                Monthly attendance summaries and analytics
              </p>
            </div>
            
            <Button onClick={exportToExcel} className="gap-2">
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-bold">{overallStats.totalEmployees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-2xl font-bold text-green-600">{overallStats.avgAttendance}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Present</p>
                    <p className="text-2xl font-bold text-blue-600">{overallStats.totalPresent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Absent</p>
                    <p className="text-2xl font-bold text-red-600">{overallStats.totalAbsent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by employee name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
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
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept!}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Summary
              </CardTitle>
              <CardDescription>
                Attendance summary for {new Date(selectedMonth + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {summaries.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No employees found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-center">Present</TableHead>
                        <TableHead className="text-center">Half-Day</TableHead>
                        <TableHead className="text-center">Late</TableHead>
                        <TableHead className="text-center">Absent</TableHead>
                        <TableHead className="text-center">Working Days</TableHead>
                        <TableHead className="text-center">Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaries.map((summary) => (
                        <TableRow key={summary.employee.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{summary.employee.full_name}</p>
                              <p className="text-xs text-muted-foreground">{summary.employee.employee_id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {summary.employee.department ? (
                              <Badge variant="secondary">{summary.employee.department}</Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {summary.present}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">{summary.halfDay}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              {summary.late}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              {summary.absent}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{summary.totalDays}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    summary.attendanceRate >= 90 ? 'bg-green-500' :
                                    summary.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${summary.attendanceRate}%` }}
                                />
                              </div>
                              <span className={`text-sm font-medium ${
                                summary.attendanceRate >= 90 ? 'text-green-600' :
                                summary.attendanceRate >= 75 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {summary.attendanceRate}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAttendanceReports;
