import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { DateRange } from "react-day-picker";
import { 
  Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Search, Users, 
  MessageSquare, Filter, CalendarDays, Download, BarChart3, Building2,
  Plus, Trash2, Edit, Briefcase, UserPlus, Link2, FileText, Eye, Mail, Phone, Linkedin, Github, Globe, ExternalLink
} from "lucide-react";
import TodaysAttendance from "@/components/admin/TodaysAttendance";
import IndividualAttendanceReport from "@/components/admin/IndividualAttendanceReport";

const IST_TIMEZONE = 'Asia/Kolkata';
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
  status: string;
  end_date: string | null;
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
  salary_expectation: string | null;
  why_join_startup: string | null;
  relevant_experience: string | null;
  availability: string | null;
  how_did_you_hear: string | null;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string | null;
  created_at: string;
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

const EMPLOYEE_STATUSES = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800 border-green-200" },
  { value: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800 border-gray-200" },
  { value: "resigned", label: "Resigned", color: "bg-red-100 text-red-800 border-red-200" },
  { value: "internship_ended", label: "Internship Ended", color: "bg-orange-100 text-orange-800 border-orange-200" },
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
    status: "active",
    end_date: "",
  });
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState<string>("all");

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
  
  // Individual Attendance Editing State
  const [editingAttendanceEmployee, setEditingAttendanceEmployee] = useState<Employee | null>(null);
  const [individualAttendanceDates, setIndividualAttendanceDates] = useState<Date[]>([]);
  const [individualAttendanceStatus, setIndividualAttendanceStatus] = useState<string>("present");
  const [individualAttendanceNotes, setIndividualAttendanceNotes] = useState<string>("");
  const [dateSelectionMode, setDateSelectionMode] = useState<"multiple" | "range">("multiple");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  // Individual Report State
  const [viewingReportEmployee, setViewingReportEmployee] = useState<Employee | null>(null);

  // Job Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationSearchQuery, setApplicationSearchQuery] = useState("");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  // Holidays State
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [holidaysLoading, setHolidaysLoading] = useState(true);
  const [isHolidayDialogOpen, setIsHolidayDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [holidayFormData, setHolidayFormData] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    type: "public",
    description: "",
  });

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
      fetchHolidays();
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

  // ==================== HOLIDAYS FUNCTIONS ====================

  const fetchHolidays = async () => {
    setHolidaysLoading(true);
    const { data, error } = await supabase
      .from("holidays")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      toast.error("Failed to fetch holidays");
      console.error(error);
    } else {
      setHolidays(data || []);
    }
    setHolidaysLoading(false);
  };

  const resetHolidayForm = () => {
    setHolidayFormData({
      name: "",
      date: new Date().toISOString().split("T")[0],
      type: "public",
      description: "",
    });
    setEditingHoliday(null);
  };

  const openHolidayDialog = (holiday?: Holiday) => {
    if (holiday) {
      setEditingHoliday(holiday);
      setHolidayFormData({
        name: holiday.name,
        date: holiday.date,
        type: holiday.type,
        description: holiday.description || "",
      });
    } else {
      resetHolidayForm();
    }
    setIsHolidayDialogOpen(true);
  };

  const handleSaveHoliday = async () => {
    if (!holidayFormData.name || !holidayFormData.date) {
      toast.error("Please fill in holiday name and date");
      return;
    }

    if (editingHoliday) {
      const { error } = await supabase
        .from("holidays")
        .update({
          name: holidayFormData.name,
          date: holidayFormData.date,
          type: holidayFormData.type,
          description: holidayFormData.description || null,
        })
        .eq("id", editingHoliday.id);

      if (error) {
        toast.error("Failed to update holiday: " + error.message);
      } else {
        toast.success("Holiday updated successfully");
        setIsHolidayDialogOpen(false);
        resetHolidayForm();
        fetchHolidays();
      }
    } else {
      const { error } = await supabase.from("holidays").insert({
        name: holidayFormData.name,
        date: holidayFormData.date,
        type: holidayFormData.type,
        description: holidayFormData.description || null,
        created_by: user?.id,
      });

      if (error) {
        if (error.message.includes("duplicate")) {
          toast.error("A holiday already exists on this date");
        } else {
          toast.error("Failed to add holiday: " + error.message);
        }
      } else {
        toast.success("Holiday added successfully");
        setIsHolidayDialogOpen(false);
        resetHolidayForm();
        fetchHolidays();
      }
    }
  };

  const handleDeleteHoliday = async (id: string) => {
    const { error } = await supabase.from("holidays").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete holiday: " + error.message);
    } else {
      toast.success("Holiday deleted successfully");
      fetchHolidays();
    }
  };

  const getHolidayTypeBadge = (type: string) => {
    switch (type) {
      case "public":
        return <Badge className="bg-red-100 text-red-800">Public Holiday</Badge>;
      case "company":
        return <Badge className="bg-blue-100 text-blue-800">Company Holiday</Badge>;
      case "optional":
        return <Badge className="bg-yellow-100 text-yellow-800">Optional Holiday</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // Check if a date is a holiday
  const isHoliday = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.some(h => h.date === dateStr);
  };

  // Get holiday for a date
  const getHolidayForDate = (date: Date): Holiday | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.find(h => h.date === dateStr);
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
      status: "active",
      end_date: "",
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
      status: formData.status,
      end_date: formData.end_date || null,
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
        status: formData.status,
        end_date: formData.end_date || null,
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
      status: employee.status || "active",
      end_date: employee.end_date || "",
    });
  };

  const filteredEmployees = allEmployees.filter(
    (emp) => {
      const matchesSearch = 
        emp.full_name.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
        (emp.department?.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ?? false) ||
        (emp.designation?.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ?? false);
      const matchesStatus = employeeStatusFilter === "all" || emp.status === employeeStatusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  const getEmployeeStatusBadge = (status: string) => {
    const config = EMPLOYEE_STATUSES.find(s => s.value === status) || EMPLOYEE_STATUSES[0];
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const employeeStats = {
    total: allEmployees.length,
    active: allEmployees.filter(e => e.status === "active").length,
    inactive: allEmployees.filter(e => e.status === "inactive").length,
    resigned: allEmployees.filter(e => e.status === "resigned").length,
    internship_ended: allEmployees.filter(e => e.status === "internship_ended").length,
  };

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
    const todayIST = toZonedTime(new Date(), IST_TIMEZONE);
    
    // Check if selected month is current month
    const isCurrentMonth = todayIST.getFullYear() === year && (todayIST.getMonth() + 1) === month;
    
    // Count working days only up to today for current month, or full month for past months
    const lastDayToCount = isCurrentMonth ? todayIST.getDate() : new Date(year, month, 0).getDate();
    
    let workingDays = 0;
    for (let d = 1; d <= lastDayToCount; d++) {
      const date = new Date(year, month - 1, d);
      const day = date.getDay();
      // Skip Sundays (0) and Saturdays (6)
      if (day !== 0 && day !== 6) {
        // Also skip holidays
        if (!isHoliday(date)) {
          workingDays++;
        }
      }
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
        const leave = empAttendance.filter(a => a.status === 'leave').length;
        
        // Calculate actual working days for this employee (accounting for joining date)
        let empWorkingDays = workingDays;
        if (emp.joining_date) {
          const joiningDate = new Date(emp.joining_date);
          if (joiningDate.getFullYear() === year && joiningDate.getMonth() + 1 === month) {
            // Employee joined this month, count working days from joining date
            empWorkingDays = 0;
            for (let d = joiningDate.getDate(); d <= lastDayToCount; d++) {
              const date = new Date(year, month - 1, d);
              const day = date.getDay();
              if (day !== 0 && day !== 6 && !isHoliday(date)) {
                empWorkingDays++;
              }
            }
          }
        }
        
        const markedDays = present + halfDay + late + leave;
        const absent = Math.max(0, empWorkingDays - markedDays);
        
        return {
          employee: emp,
          present,
          absent,
          halfDay,
          late,
          totalDays: empWorkingDays,
          attendanceRate: empWorkingDays > 0 ? Math.round(((present + halfDay * 0.5 + late) / empWorkingDays) * 100) : 0,
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

  // Individual Attendance Functions
  const openEditAttendance = async (employee: Employee) => {
    setEditingAttendanceEmployee(employee);
    setIndividualAttendanceDates([new Date()]);
    setIndividualAttendanceStatus("present");
    setIndividualAttendanceNotes("");
    setDateSelectionMode("multiple");
    setDateRange(undefined);
    
    // Fetch existing attendance for this employee
    const { data: existingAttendance } = await supabase
      .from("attendance")
      .select("date, status")
      .eq("employee_id", employee.id);
    
    setEmployeeExistingAttendance(existingAttendance || []);
  };
  
  // State for existing attendance records
  const [employeeExistingAttendance, setEmployeeExistingAttendance] = useState<{date: string, status: string}[]>([]);
  
  // Get attendance status for a specific date
  const getAttendanceStatusForDate = (date: Date): string | null => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = employeeExistingAttendance.find(a => a.date === dateStr);
    return record ? record.status : null;
  };
  
  // Get color class based on attendance status
  const getAttendanceColorClass = (status: string): string => {
    switch (status) {
      case 'present':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'absent':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'half-day':
        return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'late':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'leave':
        return 'bg-purple-500 text-white hover:bg-purple-600';
      default:
        return '';
    }
  };

  // Helper to get dates from range
  const getDatesFromRange = (from: Date, to: Date): Date[] => {
    const dates: Date[] = [];
    const current = new Date(from);
    while (current <= to) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Get effective dates based on mode
  const getEffectiveDates = (): Date[] => {
    if (dateSelectionMode === "range" && dateRange?.from && dateRange?.to) {
      return getDatesFromRange(dateRange.from, dateRange.to);
    }
    return individualAttendanceDates;
  };

  const handleSaveIndividualAttendance = async () => {
    const effectiveDates = getEffectiveDates();
    
    if (!editingAttendanceEmployee || effectiveDates.length === 0) {
      toast.error("Please select at least one date");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Handle reset/delete operation
    if (individualAttendanceStatus === 'reset') {
      for (const date of effectiveDates) {
        const selectedDate = format(date, 'yyyy-MM-dd');
        
        const { error } = await supabase
          .from("attendance")
          .delete()
          .eq("employee_id", editingAttendanceEmployee.id)
          .eq("date", selectedDate);

        if (error) {
          errorCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Reset attendance for ${editingAttendanceEmployee.full_name} on ${successCount} date(s)${individualAttendanceNotes ? ` - Reason: ${individualAttendanceNotes}` : ''}`);
      }
      if (errorCount > 0) {
        toast.error(`Failed to reset ${errorCount} record(s)`);
      }
      
      setEditingAttendanceEmployee(null);
      fetchAttendanceData();
      return;
    }

    for (const date of effectiveDates) {
      const selectedDate = format(date, 'yyyy-MM-dd');
      
      // Check if attendance already exists for this employee on this date
      const { data: existingAttendance, error: fetchError } = await supabase
        .from("attendance")
        .select("id, check_in_time")
        .eq("employee_id", editingAttendanceEmployee.id)
        .eq("date", selectedDate)
        .maybeSingle();

      if (fetchError) {
        errorCount++;
        continue;
      }

      if (existingAttendance) {
        // Update existing record - preserve original check_in_time if updating
        const { error } = await supabase
          .from("attendance")
          .update({
            status: individualAttendanceStatus,
            notes: individualAttendanceNotes || null,
          })
          .eq("id", existingAttendance.id);

        if (error) {
          errorCount++;
        } else {
          successCount++;
        }
      } else {
        // Insert new record with proper check_in_time based on status
        const { error } = await supabase
          .from("attendance")
          .insert({
            employee_id: editingAttendanceEmployee.id,
            date: selectedDate,
            status: individualAttendanceStatus,
            notes: individualAttendanceNotes || null,
            check_in_time: individualAttendanceStatus !== 'absent' ? new Date().toISOString() : null,
          });

        if (error) {
          errorCount++;
        } else {
          successCount++;
        }
      }
    }

    if (successCount > 0) {
      toast.success(`Saved attendance for ${editingAttendanceEmployee.full_name} on ${successCount} date(s)`);
    }
    if (errorCount > 0) {
      toast.error(`Failed to save ${errorCount} record(s)`);
    }
    
    setEditingAttendanceEmployee(null);
    fetchAttendanceData();
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
            <TabsList className="grid w-full max-w-4xl grid-cols-5">
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
              <TabsTrigger value="holidays" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Holidays
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
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setEmployeeStatusFilter("active")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Active</p>
                            <p className="text-2xl font-bold text-green-600">{employeeStats.active}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setEmployeeStatusFilter("inactive")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-500/10 rounded-lg">
                            <XCircle className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Inactive</p>
                            <p className="text-2xl font-bold text-gray-600">{employeeStats.inactive}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setEmployeeStatusFilter("resigned")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-500/10 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Resigned</p>
                            <p className="text-2xl font-bold text-red-600">{employeeStats.resigned}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setEmployeeStatusFilter("internship_ended")}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Clock className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Internship Ended</p>
                            <p className="text-2xl font-bold text-orange-600">{employeeStats.internship_ended}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Employee Search & Filter */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search by name, ID, department, or designation..."
                            value={employeeSearchQuery}
                            onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <Select value={employeeStatusFilter} onValueChange={setEmployeeStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              {EMPLOYEE_STATUSES.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
                        <div className="overflow-x-auto overflow-y-visible">
                          <Table className="relative">
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joining Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredEmployees.map((employee) => (
                                <TableRow key={employee.id} className={employee.status !== 'active' ? 'opacity-60' : ''}>
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
                                    {getEmployeeStatusBadge(employee.status)}
                                  </TableCell>
                                  <TableCell>
                                    {employee.joining_date ? (
                                      <span className="flex items-center gap-1 text-sm">
                                        <CalendarIcon className="h-3 w-3" />
                                        {new Date(employee.joining_date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {employee.end_date ? (
                                      <span className="flex items-center gap-1 text-sm text-red-600">
                                        <CalendarIcon className="h-3 w-3" />
                                        {new Date(employee.end_date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
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
                            <CalendarDays className="h-5 w-5 text-primary" />
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
                          <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
              {viewingReportEmployee ? (
                <IndividualAttendanceReport
                  employee={viewingReportEmployee}
                  onBack={() => setViewingReportEmployee(null)}
                  holidays={holidays}
                />
              ) : attendanceLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Today's Attendance Section */}
                  <TodaysAttendance 
                    employees={allEmployees} 
                    onRefresh={fetchAttendanceData} 
                  />

                  {/* Monthly Summary Section */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      Monthly Summary
                    </h3>
                    
                    {/* Attendance Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                              <p className="text-3xl font-bold mt-1">{overallStats.totalEmployees}</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-l-green-500">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                              <p className="text-3xl font-bold mt-1 text-green-600">{overallStats.avgAttendance}%</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-full">
                              <BarChart3 className="h-6 w-6 text-green-500" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Total Present</p>
                              <p className="text-3xl font-bold mt-1 text-blue-600">{overallStats.totalPresent}</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-full">
                              <CheckCircle className="h-6 w-6 text-blue-500" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-l-4 border-l-red-500">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Total Absent</p>
                              <p className="text-3xl font-bold mt-1 text-red-600">{overallStats.totalAbsent}</p>
                            </div>
                            <div className="p-3 bg-red-500/10 rounded-full">
                              <XCircle className="h-6 w-6 text-red-500" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Filters and Actions Card */}
                    <Card className="mb-6">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Filter className="h-5 w-5" />
                              Filters & Actions
                            </CardTitle>
                            <CardDescription>Filter attendance data or mark attendance for a specific date</CardDescription>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[180px] justify-start text-left font-normal",
                                    !markAttendanceDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {markAttendanceDate ? format(markAttendanceDate, "PP") : <span>Pick date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-popover border shadow-xl z-[100]" align="end" sideOffset={8}>
                                <Calendar
                                  mode="single"
                                  selected={markAttendanceDate}
                                  onSelect={(date) => date && setMarkAttendanceDate(date)}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <Button onClick={handleMarkAllPresent} className="gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Mark All Present
                            </Button>
                            <Button onClick={exportToExcel} variant="outline" className="gap-2">
                              <Download className="h-4 w-4" />
                              Export Excel
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="w-[160px]">
                                  <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border shadow-lg z-50">
                                  {getMonthOptions().map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                <SelectTrigger className="w-[160px]">
                                  <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border shadow-lg z-50">
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
                        </div>
                      </CardContent>
                    </Card>

                    {/* Attendance Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Monthly Attendance Records
                        </CardTitle>
                        <CardDescription>
                          Showing attendance for {new Date(selectedMonth + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })} (up to today's date for current month)
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
                                  <TableHead className="text-center">Actions</TableHead>
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
                                    <TableCell className="text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setViewingReportEmployee(summary.employee)}
                                          className="gap-1"
                                        >
                                          <BarChart3 className="h-3 w-3" />
                                          Report
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openEditAttendance(summary.employee)}
                                          className="gap-1"
                                        >
                                          <Edit className="h-3 w-3" />
                                          Edit
                                        </Button>
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
                  </div>
                </>
              )}
            </TabsContent>

            {/* ==================== HOLIDAYS TAB ==================== */}
            <TabsContent value="holidays" className="space-y-6">
              {holidaysLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  {/* Add Holiday Button */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Company Holidays</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage public holidays, company holidays, and optional holidays
                      </p>
                    </div>
                    <Button onClick={() => openHolidayDialog()} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Holiday
                    </Button>
                  </div>

                  {/* Holiday Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Holidays</p>
                            <p className="text-2xl font-bold">{holidays.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-500/10 rounded-lg">
                            <CalendarIcon className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Public</p>
                            <p className="text-2xl font-bold text-red-600">
                              {holidays.filter(h => h.type === 'public').length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Building2 className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {holidays.filter(h => h.type === 'company').length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Optional</p>
                            <p className="text-2xl font-bold text-yellow-600">
                              {holidays.filter(h => h.type === 'optional').length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Holidays Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Holiday Calendar
                      </CardTitle>
                      <CardDescription>
                        Note: Sundays are automatically marked as holidays in attendance tracking
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {holidays.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No holidays configured</p>
                          <p className="text-sm">Add holidays to track them in attendance</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Holiday Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {holidays.map((holiday) => (
                                <TableRow key={holiday.id}>
                                  <TableCell>
                                    <span className="flex items-center gap-2 font-medium">
                                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                      {new Date(holiday.date).toLocaleDateString('en-IN', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                      })}
                                    </span>
                                  </TableCell>
                                  <TableCell className="font-medium">{holiday.name}</TableCell>
                                  <TableCell>{getHolidayTypeBadge(holiday.type)}</TableCell>
                                  <TableCell className="max-w-[200px]">
                                    {holiday.description ? (
                                      <p className="truncate" title={holiday.description}>
                                        {holiday.description}
                                      </p>
                                    ) : (
                                      <span className="text-muted-foreground">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openHolidayDialog(holiday)}
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
                                            <AlertDialogTitle>Delete Holiday</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete "{holiday.name}"? This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => handleDeleteHoliday(holiday.id)}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="joining_date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.joining_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.joining_date ? format(new Date(formData.joining_date), "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.joining_date ? new Date(formData.joining_date) : undefined}
                    onSelect={(date) => setFormData({ ...formData, joining_date: date ? format(date, 'yyyy-MM-dd') : '' })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {(formData.status === 'resigned' || formData.status === 'internship_ended' || formData.status === 'inactive') && (
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (Resignation/Internship End)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end_date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date ? format(new Date(formData.end_date), "dd MMM yyyy") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[200]" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.end_date ? new Date(formData.end_date) : undefined}
                      onSelect={(date) => setFormData({ ...formData, end_date: date ? format(date, 'yyyy-MM-dd') : '' })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="edit_joining_date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.joining_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.joining_date ? format(new Date(formData.joining_date), "dd MMM yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.joining_date ? new Date(formData.joining_date) : undefined}
                    onSelect={(date) => setFormData({ ...formData, joining_date: date ? format(date, 'yyyy-MM-dd') : '' })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit_status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value, end_date: value === 'active' ? '' : formData.end_date })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {(formData.status === 'resigned' || formData.status === 'internship_ended' || formData.status === 'inactive') && (
              <div className="space-y-2">
                <Label htmlFor="edit_end_date">End Date (Resignation/Internship End)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="edit_end_date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.end_date ? format(new Date(formData.end_date), "dd MMM yyyy") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[200]" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.end_date ? new Date(formData.end_date) : undefined}
                      onSelect={(date) => setFormData({ ...formData, end_date: date ? format(date, 'yyyy-MM-dd') : '' })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
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

      {/* Individual Attendance Dialog */}
      <Dialog open={!!editingAttendanceEmployee} onOpenChange={(open) => !open && setEditingAttendanceEmployee(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Attendance
            </DialogTitle>
          </DialogHeader>
          
          {editingAttendanceEmployee && (
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">{editingAttendanceEmployee.full_name}</p>
                <p className="text-sm text-muted-foreground">{editingAttendanceEmployee.employee_id}</p>
                {editingAttendanceEmployee.department && (
                  <Badge variant="secondary" className="mt-2">{editingAttendanceEmployee.department}</Badge>
                )}
              </div>
              
              {/* Date Selection Mode Toggle */}
              <div className="space-y-2">
                <Label>Selection Mode</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={dateSelectionMode === "multiple" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateSelectionMode("multiple")}
                    className="flex-1"
                  >
                    Multiple Dates
                  </Button>
                  <Button
                    type="button"
                    variant={dateSelectionMode === "range" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateSelectionMode("range")}
                    className="flex-1"
                  >
                    Date Range
                  </Button>
                </div>
              </div>

              {/* Legend for attendance colors */}
              <div className="space-y-2">
                <Label>Attendance Legend</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-500 text-white text-xs">Present</Badge>
                  <Badge className="bg-red-500 text-white text-xs">Absent</Badge>
                  <Badge className="bg-blue-500 text-white text-xs">Half-Day</Badge>
                  <Badge className="bg-yellow-500 text-white text-xs">Late</Badge>
                  <Badge className="bg-purple-500 text-white text-xs">Leave</Badge>
                  <Badge className="bg-gray-400 text-white text-xs">Sunday</Badge>
                  <Badge className="bg-orange-400 text-white text-xs">Holiday</Badge>
                </div>
              </div>

              {/* Multiple Dates Picker */}
              {dateSelectionMode === "multiple" && (
                <div className="space-y-2">
                  <Label>Select Dates ({individualAttendanceDates.length} selected)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          individualAttendanceDates.length === 0 && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {individualAttendanceDates.length > 0 
                          ? individualAttendanceDates.length === 1
                            ? format(individualAttendanceDates[0], "PPP")
                            : `${individualAttendanceDates.length} dates selected`
                          : <span>Pick dates</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border shadow-xl z-[100]" align="start" sideOffset={8}>
                      <Calendar
                        mode="multiple"
                        selected={individualAttendanceDates}
                        onSelect={(dates) => setIndividualAttendanceDates(dates || [])}
                        disabled={(date) => {
                          // Disable future dates
                          if (date > new Date()) return true;
                          // Disable Sundays (holiday)
                          if (date.getDay() === 0) return true;
                          // Disable configured holidays
                          if (isHoliday(date)) return true;
                          // Disable dates before joining date
                          if (editingAttendanceEmployee?.joining_date) {
                            const joiningDate = new Date(editingAttendanceEmployee.joining_date);
                            joiningDate.setHours(0, 0, 0, 0);
                            if (date < joiningDate) return true;
                          }
                          return false;
                        }}
                        modifiers={{
                          sunday: (date) => date.getDay() === 0,
                          holiday: (date) => isHoliday(date),
                          present: employeeExistingAttendance
                            .filter(a => a.status === 'present')
                            .map(a => new Date(a.date)),
                          absent: employeeExistingAttendance
                            .filter(a => a.status === 'absent')
                            .map(a => new Date(a.date)),
                          halfDay: employeeExistingAttendance
                            .filter(a => a.status === 'half-day')
                            .map(a => new Date(a.date)),
                          late: employeeExistingAttendance
                            .filter(a => a.status === 'late')
                            .map(a => new Date(a.date)),
                          leave: employeeExistingAttendance
                            .filter(a => a.status === 'leave')
                            .map(a => new Date(a.date)),
                        }}
                        modifiersClassNames={{
                          sunday: 'bg-gray-400 text-white opacity-50',
                          holiday: 'bg-orange-400 text-white opacity-50',
                          present: 'bg-green-500 text-white hover:bg-green-600',
                          absent: 'bg-red-500 text-white hover:bg-red-600',
                          halfDay: 'bg-blue-500 text-white hover:bg-blue-600',
                          late: 'bg-yellow-500 text-white hover:bg-yellow-600',
                          leave: 'bg-purple-500 text-white hover:bg-purple-600',
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {individualAttendanceDates.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {individualAttendanceDates.slice(0, 5).map((date, index) => {
                        const status = getAttendanceStatusForDate(date);
                        return (
                          <Badge 
                            key={index} 
                            className={cn(
                              "text-xs",
                              status ? getAttendanceColorClass(status) : "bg-secondary text-secondary-foreground"
                            )}
                          >
                            {format(date, "MMM d")}
                            {status && ` (${status})`}
                          </Badge>
                        );
                      })}
                      {individualAttendanceDates.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{individualAttendanceDates.length - 5} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Date Range Picker */}
              {dateSelectionMode === "range" && (
                <div className="space-y-2">
                  <Label>
                    Select Date Range 
                    {dateRange?.from && dateRange?.to && (
                      <span className="text-muted-foreground ml-2">
                        ({getDatesFromRange(dateRange.from, dateRange.to).length} days)
                      </span>
                    )}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange?.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "PPP")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border shadow-xl z-[100]" align="start" sideOffset={8}>
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        disabled={(date) => {
                          // Disable future dates
                          if (date > new Date()) return true;
                          // Disable Sundays (holiday)
                          if (date.getDay() === 0) return true;
                          // Disable configured holidays
                          if (isHoliday(date)) return true;
                          // Disable dates before joining date
                          if (editingAttendanceEmployee?.joining_date) {
                            const joiningDate = new Date(editingAttendanceEmployee.joining_date);
                            joiningDate.setHours(0, 0, 0, 0);
                            if (date < joiningDate) return true;
                          }
                          return false;
                        }}
                        modifiers={{
                          sunday: (date) => date.getDay() === 0,
                          holiday: (date) => isHoliday(date),
                          present: employeeExistingAttendance
                            .filter(a => a.status === 'present')
                            .map(a => new Date(a.date)),
                          absent: employeeExistingAttendance
                            .filter(a => a.status === 'absent')
                            .map(a => new Date(a.date)),
                          halfDay: employeeExistingAttendance
                            .filter(a => a.status === 'half-day')
                            .map(a => new Date(a.date)),
                          late: employeeExistingAttendance
                            .filter(a => a.status === 'late')
                            .map(a => new Date(a.date)),
                          leave: employeeExistingAttendance
                            .filter(a => a.status === 'leave')
                            .map(a => new Date(a.date)),
                        }}
                        modifiersClassNames={{
                          sunday: 'bg-gray-400 text-white opacity-50',
                          holiday: 'bg-orange-400 text-white opacity-50',
                          present: 'bg-green-500 text-white hover:bg-green-600',
                          absent: 'bg-red-500 text-white hover:bg-red-600',
                          halfDay: 'bg-blue-500 text-white hover:bg-blue-600',
                          late: 'bg-yellow-500 text-white hover:bg-yellow-600',
                          leave: 'bg-purple-500 text-white hover:bg-purple-600',
                        }}
                        initialFocus
                        numberOfMonths={2}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={individualAttendanceStatus} onValueChange={setIndividualAttendanceStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border shadow-lg z-50">
                    <SelectItem value="present">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Present
                      </div>
                    </SelectItem>
                    <SelectItem value="absent">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Absent
                      </div>
                    </SelectItem>
                    <SelectItem value="half-day">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        Half-Day
                      </div>
                    </SelectItem>
                    <SelectItem value="late">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        Late
                      </div>
                    </SelectItem>
                    <SelectItem value="reset">
                      <div className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4 text-gray-600" />
                        Reset (Delete Record)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {individualAttendanceStatus === 'reset' && (
                  <p className="text-xs text-muted-foreground">
                    This will delete the attendance record(s) for the selected date(s). Employee will need to mark attendance again.
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="Add any notes about this attendance..."
                  value={individualAttendanceNotes}
                  onChange={(e) => setIndividualAttendanceNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveIndividualAttendance}>
              Save Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Holiday Dialog */}
      <Dialog open={isHolidayDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsHolidayDialogOpen(false);
          resetHolidayForm();
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              {editingHoliday ? "Edit Holiday" : "Add Holiday"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="holiday_name">Holiday Name *</Label>
              <Input
                id="holiday_name"
                placeholder="e.g., Independence Day"
                value={holidayFormData.name}
                onChange={(e) => setHolidayFormData({ ...holidayFormData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="holiday_date">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !holidayFormData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {holidayFormData.date 
                      ? format(new Date(holidayFormData.date), "PPP")
                      : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border shadow-xl z-[200]" align="start" sideOffset={8}>
                  <Calendar
                    mode="single"
                    selected={holidayFormData.date ? new Date(holidayFormData.date) : undefined}
                    onSelect={(date) => setHolidayFormData({ 
                      ...holidayFormData, 
                      date: date ? format(date, 'yyyy-MM-dd') : '' 
                    })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="holiday_type">Type *</Label>
              <Select
                value={holidayFormData.type}
                onValueChange={(value) => setHolidayFormData({ ...holidayFormData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Public Holiday
                    </div>
                  </SelectItem>
                  <SelectItem value="company">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Company Holiday
                    </div>
                  </SelectItem>
                  <SelectItem value="optional">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Optional Holiday
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="holiday_description">Description (Optional)</Label>
              <Textarea
                id="holiday_description"
                placeholder="Add a description for this holiday..."
                value={holidayFormData.description}
                onChange={(e) => setHolidayFormData({ ...holidayFormData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveHoliday}>
              {editingHoliday ? "Save Changes" : "Add Holiday"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHRManagement;
