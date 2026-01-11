import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { 
  Calendar, CheckCircle, XCircle, Clock, Search, Users, 
  MessageSquare, Filter, CalendarDays, Download, BarChart3, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import * as XLSX from "xlsx";

// ==================== INTERFACES ====================

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  admin_remarks: string | null;
  created_at: string;
  employee?: {
    full_name: string;
    employee_id: string;
    department: string | null;
  };
}

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

// ==================== MAIN COMPONENT ====================

const AdminHRManagement = () => {
  const { user, isAdmin, loading: authLoading, supabase } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "leaves";

  // Leave Management State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [leaveSearchQuery, setLeaveSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [adminRemarks, setAdminRemarks] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  // Attendance State
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState("");
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
      fetchLeaveRequests();
      fetchAttendanceData();
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAttendanceData();
    }
  }, [selectedMonth]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  // ==================== LEAVE MANAGEMENT FUNCTIONS ====================

  const fetchLeaveRequests = async () => {
    setLeaveLoading(true);
    const { data, error } = await supabase
      .from("leave_requests")
      .select(`
        *,
        employee:employees(full_name, employee_id, department)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch leave requests");
      console.error(error);
    } else {
      setLeaveRequests(data || []);
    }
    setLeaveLoading(false);
  };

  const handleLeaveAction = async () => {
    if (!selectedRequest || !actionType) return;

    const newStatus = actionType === "approve" ? "approved" : "rejected";

    const { error } = await supabase
      .from("leave_requests")
      .update({
        status: newStatus,
        admin_remarks: adminRemarks || null,
      })
      .eq("id", selectedRequest.id);

    if (error) {
      toast.error(`Failed to ${actionType} leave request: ${error.message}`);
      console.error(error);
    } else {
      toast.success(`Leave request ${newStatus} successfully`);
      setSelectedRequest(null);
      setAdminRemarks("");
      setActionType(null);
      fetchLeaveRequests();
    }
  };

  const openActionDialog = (request: LeaveRequest, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(action);
    setAdminRemarks(request.admin_remarks || "");
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: React.ReactNode }> = {
      pending: { 
        className: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: <Clock className="h-3 w-3" /> 
      },
      approved: { 
        className: "bg-green-100 text-green-800 border-green-200", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      rejected: { 
        className: "bg-red-100 text-red-800 border-red-200", 
        icon: <XCircle className="h-3 w-3" /> 
      },
    };
    const { className, icon } = config[status] || config.pending;
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getLeaveTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      sick: "Sick Leave",
      casual: "Casual Leave",
      earned: "Earned Leave",
      unpaid: "Unpaid Leave",
      other: "Other",
    };
    return labels[type] || type;
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const filteredLeaveRequests = leaveRequests.filter((req) => {
    const matchesSearch = 
      req.employee?.full_name?.toLowerCase().includes(leaveSearchQuery.toLowerCase()) ||
      req.employee?.employee_id?.toLowerCase().includes(leaveSearchQuery.toLowerCase()) ||
      req.reason.toLowerCase().includes(leaveSearchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const leaveStats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.status === "pending").length,
    approved: leaveRequests.filter(r => r.status === "approved").length,
    rejected: leaveRequests.filter(r => r.status === "rejected").length,
  };

  // ==================== ATTENDANCE FUNCTIONS ====================

  const fetchAttendanceData = async () => {
    setAttendanceLoading(true);
    
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
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

    setAttendanceLoading(false);
  };

  const getEmployeeSummaries = (): EmployeeSummary[] => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    let workingDays = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const day = new Date(year, month - 1, d).getDay();
      if (day !== 0 && day !== 6) workingDays++;
    }

    return employees
      .filter(emp => {
        const matchesSearch = 
          emp.full_name.toLowerCase().includes(attendanceSearchQuery.toLowerCase()) ||
          emp.employee_id.toLowerCase().includes(attendanceSearchQuery.toLowerCase());
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
    
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Monthly Summary');
    
    const detailedWs = XLSX.utils.json_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(wb, detailedWs, 'Detailed Attendance');
    
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

  // ==================== RENDER ====================

  if (authLoading) {
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
                <Users className="h-8 w-8 text-primary" />
                HR Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage leave requests and view attendance reports
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={defaultTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="leaves" className="gap-2">
                <CalendarDays className="h-4 w-4" />
                Leave Management
              </TabsTrigger>
              <TabsTrigger value="attendance" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Attendance Reports
              </TabsTrigger>
            </TabsList>

            {/* Leave Management Tab */}
            <TabsContent value="leaves" className="space-y-6">
              {leaveLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Leave Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Requests</p>
                            <p className="text-2xl font-bold">{leaveStats.total}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("pending")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{leaveStats.pending}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("approved")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Approved</p>
                            <p className="text-2xl font-bold text-green-600">{leaveStats.approved}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("rejected")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-500/10 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                            <p className="text-2xl font-bold text-red-600">{leaveStats.rejected}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Leave Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search by employee name, ID, or reason..."
                            value={leaveSearchQuery}
                            onChange={(e) => setLeaveSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Leave Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Leave Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredLeaveRequests.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No leave requests found</p>
                          {statusFilter !== "all" && (
                            <Button variant="link" onClick={() => setStatusFilter("all")}>
                              Clear filter
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Days</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Remarks</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredLeaveRequests.map((request) => (
                                <TableRow key={request.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{request.employee?.full_name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {request.employee?.employee_id} • {request.employee?.department}
                                      </p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{getLeaveTypeLabel(request.leave_type)}</Badge>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    <div className="flex flex-col">
                                      <span>{new Date(request.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                      <span className="text-muted-foreground">to {new Date(request.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">
                                      {calculateDays(request.start_date, request.end_date)} days
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="max-w-[200px]">
                                    <p className="truncate" title={request.reason}>{request.reason}</p>
                                  </TableCell>
                                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                                  <TableCell className="max-w-[150px]">
                                    {request.admin_remarks ? (
                                      <p className="truncate text-sm" title={request.admin_remarks}>
                                        {request.admin_remarks}
                                      </p>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {request.status === "pending" ? (
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                          onClick={() => openActionDialog(request, "approve")}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Approve
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                          onClick={() => openActionDialog(request, "reject")}
                                        >
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Reject
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openActionDialog(request, request.status === "approved" ? "reject" : "approve")}
                                      >
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        Update
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Attendance Reports Tab */}
            <TabsContent value="attendance" className="space-y-6">
              {attendanceLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Export Button */}
                  <div className="flex justify-end">
                    <Button onClick={exportToExcel} className="gap-2">
                      <Download className="h-4 w-4" />
                      Export to Excel
                    </Button>
                  </div>

                  {/* Attendance Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                  {/* Attendance Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search by employee name or ID..."
                            value={attendanceSearchQuery}
                            onChange={(e) => setAttendanceSearchQuery(e.target.value)}
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

                  {/* Attendance Table */}
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
                                      <span className="text-sm font-medium">{summary.attendanceRate}%</span>
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
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Leave Action Dialog */}
      <Dialog open={!!selectedRequest && !!actionType} onOpenChange={(open) => {
        if (!open) {
          setSelectedRequest(null);
          setActionType(null);
          setAdminRemarks("");
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === "approve" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Approve Leave Request
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Reject Leave Request
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Employee:</span>
                  <span className="text-sm font-medium">{selectedRequest.employee?.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <span className="text-sm">{getLeaveTypeLabel(selectedRequest.leave_type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm">
                    {new Date(selectedRequest.start_date).toLocaleDateString()} - {new Date(selectedRequest.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Days:</span>
                  <span className="text-sm">{calculateDays(selectedRequest.start_date, selectedRequest.end_date)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remarks">Admin Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  placeholder="Add any remarks or notes..."
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleLeaveAction}
              className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHRManagement;
