import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Search, Users, 
  MessageSquare, Filter, CalendarDays, Download, BarChart3, Building2,
  Plus, Trash2, Edit, Briefcase, UserPlus, Link2, FileText, Eye, Mail, Phone, Linkedin, Github, Globe, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  user_id: string;
  employee_id: string;
  full_name: string;
  department: string | null;
  designation: string | null;
  joining_date: string | null;
  created_at: string | null;
}

interface UserProfile {
  id: string;
  email: string;
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

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  linkedin_profile: string;
  github_profile: string;
  portfolio_link: string | null;
  job_applied_for: string;
  resume_url: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  offer_accepted: boolean | null;
  offer_accepted_at: string | null;
}

// ==================== CONSTANTS ====================

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Research & Development",
  "Customer Support",
];

const DESIGNATIONS = [
  "Intern",
  "Junior Engineer",
  "Engineer",
  "Senior Engineer",
  "Lead Engineer",
  "Manager",
  "Senior Manager",
  "Director",
  "Vice President",
  "CTO",
  "CEO",
];

// ==================== MAIN COMPONENT ====================

const AdminHRManagement = () => {
  const { user, isAdmin, loading: authLoading, supabase } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "employees";

  // Employee Management State
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [availableUsers, setAvailableUsers] = useState<UserProfile[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    user_id: "",
    employee_id: "",
    full_name: "",
    department: "",
    designation: "",
    joining_date: new Date().toISOString().split("T")[0],
  });

  // Leave Management State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [leaveSearchQuery, setLeaveSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [adminRemarks, setAdminRemarks] = useState("");
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  // Attendance State
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [markAttendanceDate, setMarkAttendanceDate] = useState<Date>(new Date());

  // Job Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationSearchQuery, setApplicationSearchQuery] = useState("");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
      return;
    }
    if (user && isAdmin) {
      fetchAllEmployees();
      fetchAvailableUsers();
      fetchLeaveRequests();
      fetchAttendanceData();
      fetchApplications();
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

  // ==================== EMPLOYEE MANAGEMENT FUNCTIONS ====================

  const fetchAllEmployees = async () => {
    setEmployeesLoading(true);
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch employees");
      console.error(error);
    } else {
      setAllEmployees(data || []);
    }
    setEmployeesLoading(false);
  };

  const fetchAvailableUsers = async () => {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email");

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return;
    }

    const { data: existingEmployees, error: empError } = await supabase
      .from("employees")
      .select("user_id");

    if (empError) {
      console.error("Error fetching employees:", empError);
      return;
    }

    const linkedUserIds = new Set(existingEmployees?.map(e => e.user_id) || []);
    const available = (profiles || []).filter(p => !linkedUserIds.has(p.id));
    setAvailableUsers(available);
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      employee_id: "",
      full_name: "",
      department: "",
      designation: "",
      joining_date: new Date().toISOString().split("T")[0],
    });
  };

  const handleCreateEmployee = async () => {
    if (!formData.user_id || !formData.employee_id || !formData.full_name) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase.from("employees").insert({
      user_id: formData.user_id,
      employee_id: formData.employee_id,
      full_name: formData.full_name,
      department: formData.department || null,
      designation: formData.designation || null,
      joining_date: formData.joining_date || null,
    });

    if (error) {
      toast.error("Failed to create employee: " + error.message);
      console.error(error);
    } else {
      toast.success("Employee created successfully");
      setIsCreateOpen(false);
      resetForm();
      fetchAllEmployees();
      fetchAvailableUsers();
    }
  };

  const handleUpdateEmployee = async () => {
    if (!editingEmployee) return;

    if (!formData.employee_id || !formData.full_name) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase
      .from("employees")
      .update({
        employee_id: formData.employee_id,
        full_name: formData.full_name,
        department: formData.department || null,
        designation: formData.designation || null,
        joining_date: formData.joining_date || null,
      })
      .eq("id", editingEmployee.id);

    if (error) {
      toast.error("Failed to update employee: " + error.message);
      console.error(error);
    } else {
      toast.success("Employee updated successfully");
      setEditingEmployee(null);
      resetForm();
      fetchAllEmployees();
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    const { error } = await supabase.from("employees").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete employee: " + error.message);
      console.error(error);
    } else {
      toast.success("Employee deleted successfully");
      fetchAllEmployees();
      fetchAvailableUsers();
    }
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      user_id: employee.user_id,
      employee_id: employee.employee_id,
      full_name: employee.full_name,
      department: employee.department || "",
      designation: employee.designation || "",
      joining_date: employee.joining_date || new Date().toISOString().split("T")[0],
    });
  };

  const filteredEmployees = allEmployees.filter(
    (emp) =>
      emp.full_name.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
      (emp.department?.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ?? false) ||
      (emp.designation?.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ?? false)
  );

  // ==================== JOB APPLICATIONS FUNCTIONS ====================

  const fetchApplications = async () => {
    setApplicationsLoading(true);
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch applications");
      console.error(error);
    } else {
      setApplications(data || []);
    }
    setApplicationsLoading(false);
  };

  const handleUpdateApplicationStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("job_applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update application status: " + error.message);
      console.error(error);
    } else {
      toast.success(`Application status updated to ${newStatus}`);
      fetchApplications();
    }
  };

  const handleDeleteApplication = async (id: string) => {
    const { error } = await supabase.from("job_applications").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete application: " + error.message);
      console.error(error);
    } else {
      toast.success("Application deleted successfully");
      fetchApplications();
    }
  };

  const getApplicationStatusBadge = (status: string | null) => {
    const config: Record<string, { className: string; icon: React.ReactNode }> = {
      pending: { 
        className: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: <Clock className="h-3 w-3" /> 
      },
      reviewed: { 
        className: "bg-blue-100 text-blue-800 border-blue-200", 
        icon: <Eye className="h-3 w-3" /> 
      },
      shortlisted: { 
        className: "bg-purple-100 text-purple-800 border-purple-200", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      interview: { 
        className: "bg-cyan-100 text-cyan-800 border-cyan-200", 
        icon: <Calendar className="h-3 w-3" /> 
      },
      selected: { 
        className: "bg-green-100 text-green-800 border-green-200", 
        icon: <CheckCircle className="h-3 w-3" /> 
      },
      rejected: { 
        className: "bg-red-100 text-red-800 border-red-200", 
        icon: <XCircle className="h-3 w-3" /> 
      },
    };
    const { className, icon } = config[status || "pending"] || config.pending;
    return (
      <Badge variant="outline" className={`${className} gap-1`}>
        {icon}
        {(status || "pending").charAt(0).toUpperCase() + (status || "pending").slice(1)}
      </Badge>
    );
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.name.toLowerCase().includes(applicationSearchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(applicationSearchQuery.toLowerCase()) ||
      app.job_applied_for.toLowerCase().includes(applicationSearchQuery.toLowerCase());
    
    const matchesStatus = applicationStatusFilter === "all" || app.status === applicationStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const applicationStats = {
    total: applications.length,
    pending: applications.filter(a => !a.status || a.status === "pending").length,
    shortlisted: applications.filter(a => a.status === "shortlisted").length,
    selected: applications.filter(a => a.status === "selected").length,
    rejected: applications.filter(a => a.status === "rejected").length,
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

    return allEmployees
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
    totalEmployees: allEmployees.length,
    avgAttendance: summaries.length > 0 
      ? Math.round(summaries.reduce((acc, s) => acc + s.attendanceRate, 0) / summaries.length) 
      : 0,
    totalPresent: summaries.reduce((acc, s) => acc + s.present, 0),
    totalAbsent: summaries.reduce((acc, s) => acc + s.absent, 0),
  };

  const departments = [...new Set(allEmployees.map(e => e.department).filter(Boolean))];

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
      const emp = allEmployees.find(e => e.id === a.employee_id);
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

  const handleMarkAllPresent = async () => {
    if (allEmployees.length === 0) {
      toast.error("No employees to mark attendance for");
      return;
    }

    const selectedDate = format(markAttendanceDate, 'yyyy-MM-dd');
    const formattedDisplayDate = format(markAttendanceDate, 'PPP');
    
    // Check which employees already have attendance marked for selected date
    const { data: existingAttendance, error: fetchError } = await supabase
      .from("attendance")
      .select("employee_id")
      .eq("date", selectedDate);

    if (fetchError) {
      toast.error("Failed to check existing attendance: " + fetchError.message);
      console.error(fetchError);
      return;
    }

    const markedEmployeeIds = new Set(existingAttendance?.map(a => a.employee_id) || []);
    const employeesToMark = allEmployees.filter(emp => !markedEmployeeIds.has(emp.id));

    if (employeesToMark.length === 0) {
      toast.info(`All employees have already been marked for ${formattedDisplayDate}`);
      return;
    }

    const attendanceRecords = employeesToMark.map(emp => ({
      employee_id: emp.id,
      date: selectedDate,
      status: "present",
      check_in_time: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("attendance")
      .insert(attendanceRecords);

    if (error) {
      toast.error("Failed to mark attendance: " + error.message);
      console.error(error);
    } else {
      toast.success(`Marked ${employeesToMark.length} employees as present for ${formattedDisplayDate}`);
      fetchAttendanceData();
    }
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
                Manage employees, applications, leave requests, and attendance reports
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={defaultTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full max-w-3xl grid-cols-4">
              <TabsTrigger value="employees" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Employees
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <FileText className="h-4 w-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="leaves" className="gap-2">
                <CalendarDays className="h-4 w-4" />
                Leaves
              </TabsTrigger>
              <TabsTrigger value="attendance" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Attendance
              </TabsTrigger>
            </TabsList>

            {/* ==================== EMPLOYEES TAB ==================== */}
            <TabsContent value="employees" className="space-y-6">
              {employeesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Add Employee Button */}
                  <div className="flex justify-end">
                    <Button onClick={() => { resetForm(); setIsCreateOpen(true); }} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Employee
                    </Button>
                  </div>

                  {/* Employee Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Employees</p>
                            <p className="text-2xl font-bold">{allEmployees.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <Building2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Departments</p>
                            <p className="text-2xl font-bold">
                              {new Set(allEmployees.map(e => e.department).filter(Boolean)).size}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Link2 className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Linked Accounts</p>
                            <p className="text-2xl font-bold">{allEmployees.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/10 rounded-lg">
                            <UserPlus className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Unlinked Users</p>
                            <p className="text-2xl font-bold">{availableUsers.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Employee Search */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search by name, ID, department, or designation..."
                          value={employeeSearchQuery}
                          onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Employee Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Employee Directory
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredEmployees.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No employees found</p>
                          <p className="text-sm">Create an employee to get started</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Joining Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredEmployees.map((employee) => (
                                <TableRow key={employee.id}>
                                  <TableCell className="font-mono text-sm">
                                    {employee.employee_id}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {employee.full_name}
                                  </TableCell>
                                  <TableCell>
                                    {employee.department ? (
                                      <Badge variant="secondary" className="gap-1">
                                        <Building2 className="h-3 w-3" />
                                        {employee.department}
                                      </Badge>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {employee.designation ? (
                                      <Badge variant="outline">{employee.designation}</Badge>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {employee.joining_date ? (
                                      <span className="flex items-center gap-1 text-sm">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(employee.joining_date).toLocaleDateString()}
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openEditDialog(employee)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="sm" className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete {employee.full_name}? This will also delete all their attendance and leave records.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => handleDeleteEmployee(employee.id)}
                                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
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

            {/* ==================== APPLICATIONS TAB ==================== */}
            <TabsContent value="applications" className="space-y-6">
              {applicationsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Application Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold">{applicationStats.total}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setApplicationStatusFilter("pending")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">{applicationStats.pending}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setApplicationStatusFilter("shortlisted")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/10 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Shortlisted</p>
                            <p className="text-2xl font-bold text-purple-600">{applicationStats.shortlisted}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setApplicationStatusFilter("selected")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Selected</p>
                            <p className="text-2xl font-bold text-green-600">{applicationStats.selected}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setApplicationStatusFilter("rejected")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-500/10 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                            <p className="text-2xl font-bold text-red-600">{applicationStats.rejected}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Application Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search by name, email, or position..."
                            value={applicationSearchQuery}
                            onChange={(e) => setApplicationSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={applicationStatusFilter} onValueChange={setApplicationStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="selected">Selected</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Applications Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Job Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredApplications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No applications found</p>
                          {applicationStatusFilter !== "all" && (
                            <Button variant="link" onClick={() => setApplicationStatusFilter("all")}>
                              Clear filter
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Applied</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredApplications.map((app) => (
                                <TableRow key={app.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{app.name}</p>
                                      <p className="text-xs text-muted-foreground">{app.email}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">{app.job_applied_for}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <a href={`tel:${app.phone_number}`} className="text-muted-foreground hover:text-foreground">
                                        <Phone className="h-4 w-4" />
                                      </a>
                                      {app.linkedin_profile && (
                                        <a href={app.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500">
                                          <Linkedin className="h-4 w-4" />
                                        </a>
                                      )}
                                      {app.github_profile && (
                                        <a href={app.github_profile} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                          <Github className="h-4 w-4" />
                                        </a>
                                      )}
                                      {app.portfolio_link && (
                                        <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                          <Globe className="h-4 w-4" />
                                        </a>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </TableCell>
                                  <TableCell>{getApplicationStatusBadge(app.status)}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedApplication(app)}
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      
                                      {app.resume_url && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          asChild
                                        >
                                          <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                          </a>
                                        </Button>
                                      )}
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="sm" className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete the application from {app.name}? This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => handleDeleteApplication(app.id)}
                                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
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

            {/* ==================== LEAVE MANAGEMENT TAB ==================== */}
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
                        <CalendarDays className="h-5 w-5" />
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

            {/* ==================== ATTENDANCE TAB ==================== */}
            <TabsContent value="attendance" className="space-y-6">
              {attendanceLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[200px] justify-start text-left font-normal",
                              !markAttendanceDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {markAttendanceDate ? format(markAttendanceDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={markAttendanceDate}
                            onSelect={(date) => date && setMarkAttendanceDate(date)}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <Button onClick={handleMarkAllPresent} variant="outline" className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Mark Everyone Present
                      </Button>
                    </div>
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

      {/* ==================== DIALOGS ==================== */}

      {/* Create Employee Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Employee
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user_id">Link to User Account *</Label>
              <Select
                value={formData.user_id}
                onValueChange={(value) => setFormData({ ...formData, user_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user account" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No unlinked users available
                    </SelectItem>
                  ) : (
                    availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.email}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Only users without an employee profile are shown
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employee_id">Employee ID *</Label>
              <Input
                id="employee_id"
                placeholder="e.g., EMP001"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                placeholder="Enter full name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => setFormData({ ...formData, designation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGNATIONS.map((des) => (
                    <SelectItem key={des} value={des}>
                      {des}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joining_date">Joining Date</Label>
              <Input
                id="joining_date"
                type="date"
                value={formData.joining_date}
                onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateEmployee} disabled={availableUsers.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              Create Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={!!editingEmployee} onOpenChange={(open) => !open && setEditingEmployee(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Employee
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_employee_id">Employee ID *</Label>
              <Input
                id="edit_employee_id"
                placeholder="e.g., EMP001"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit_full_name">Full Name *</Label>
              <Input
                id="edit_full_name"
                placeholder="Enter full name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit_department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit_designation">Designation</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => setFormData({ ...formData, designation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGNATIONS.map((des) => (
                    <SelectItem key={des} value={des}>
                      {des}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit_joining_date">Joining Date</Label>
              <Input
                id="edit_joining_date"
                type="date"
                value={formData.joining_date}
                onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateEmployee}>
              <Edit className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      {/* Application Details Dialog */}
      <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Application Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="text-sm font-medium">{selectedApplication.name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <a href={`mailto:${selectedApplication.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {selectedApplication.email}
                  </a>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <a href={`tel:${selectedApplication.phone_number}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {selectedApplication.phone_number}
                  </a>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Position:</span>
                  <Badge variant="secondary">{selectedApplication.job_applied_for}</Badge>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Applied:</span>
                  <span className="text-sm">{new Date(selectedApplication.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  {getApplicationStatusBadge(selectedApplication.status)}
                </div>
                {selectedApplication.offer_accepted !== null && (
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Offer:</span>
                    <Badge variant={selectedApplication.offer_accepted ? "default" : "destructive"}>
                      {selectedApplication.offer_accepted ? "Accepted" : "Declined"}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedApplication.linkedin_profile && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.linkedin_profile} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {selectedApplication.github_profile && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.github_profile} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {selectedApplication.portfolio_link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.portfolio_link} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Portfolio
                    </a>
                  </Button>
                )}
                {selectedApplication.resume_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.resume_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select 
                  value={selectedApplication.status || "pending"} 
                  onValueChange={(value) => {
                    handleUpdateApplicationStatus(selectedApplication.id, value);
                    setSelectedApplication({ ...selectedApplication, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHRManagement;
