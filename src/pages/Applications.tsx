import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Briefcase,
  Calendar,
  CheckCircle,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  LogOut,
  Mail,
  MoreHorizontal,
  Phone,
  Send,
  Trash2,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface JobApplication {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone_number: string;
  linkedin_profile: string;
  github_profile: string;
  portfolio_link: string | null;
  job_applied_for: string;
  resume_url: string;
  status?: "pending" | "selected" | "rejected" | "interview_scheduled" | "offer_accepted";
  offer_accepted?: boolean | null;
  offer_accepted_at?: string | null;
}

interface SocialInternshipApplication {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  track: string;
  resume_link: string | null;
  statement_of_purpose: string;
  status: "pending" | "selected" | "rejected" | "interview_scheduled" | "offer_accepted";
}

type SortField = "created_at" | "name" | "job_applied_for" | "status";
type SortOrder = "asc" | "desc";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TRACKS_MAP: Record<string, string> = {
  "tech-for-good": "Tech for Good (AI & Software) Internship",
  "rural-operations": "Community & Rural Operations Internship",
  "digital-literacy": "Digital Literacy & Education Internship",
};

const Applications = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut, supabase } = useAuth();
  const [activeTab, setActiveTab] = useState<"jobs" | "social">("jobs");
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [socialApplications, setSocialApplications] = useState<SocialInternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [socialLoading, setSocialLoading] = useState(true);
  const [emailDialog, setEmailDialog] = useState<{
    open: boolean;
    type: "selection" | "rejection" | "interview";
    application: any;
  }>({ open: false, type: "selection", application: null });
  const [sending, setSending] = useState(false);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [excelAvailable] = useState<boolean | null>(null);
  const applicationsPerPage = 10;
  
  // Interview details state
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [meetLink, setMeetLink] = useState("");
  
  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    application: any;
  }>({ open: false, application: null });
  const [deleting, setDeleting] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applications");
        return;
      }

      // Cast the data to match our interface
      const typedData = (data || []).map(app => ({
        ...app,
        status: app.status as JobApplication['status']
      }));
      
      setApplications(typedData);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchSocialApplications = useCallback(async () => {
    setSocialLoading(true);
    try {
      const { data, error } = await supabase
        .from("social_internship_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching social applications:", error);
        toast.error("Failed to load social applications");
        return;
      }

      const typedData = (data || []).map(app => ({
        ...app,
        status: app.status as SocialInternshipApplication['status']
      }));
      
      setSocialApplications(typedData);
    } catch (err) {
      console.error("Fetch social error:", err);
      toast.error("Failed to load social applications");
    } finally {
      setSocialLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!authLoading && (!user || !isAdmin)) {
      toast.error("You must be an admin to access this page");
      navigate("/auth");
      return;
    }

    if (!authLoading && user && isAdmin) {
      fetchApplications();
      fetchSocialApplications();
    }
  }, [user, isAdmin, authLoading, navigate, fetchApplications, fetchSocialApplications]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedApplications = () => {
    const list = activeTab === "jobs" ? applications : socialApplications;
    return [...list].sort((a: any, b: any) => {
      let fieldKey = sortField as string;
      if (activeTab === "social") {
        if (sortField === "job_applied_for") {
          fieldKey = "track";
        }
      }
      
      let aValue: any = a[fieldKey];
      let bValue: any = b[fieldKey];

      if (sortField === "created_at") {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
      } else if (sortField === "status") {
        const statusOrder: Record<string, number> = { pending: 0, interview_scheduled: 1, selected: 2, rejected: 3 };
        aValue = statusOrder[a.status || "pending"];
        bValue = statusOrder[b.status || "pending"];
      } else {
        aValue = String(aValue || "").toLowerCase();
        bValue = String(bValue || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  const handleViewResume = async (resumeUrl: string, applicantName: string) => {
    try {
      // The resume_url might be a full URL or just a path
      // Extract the path if it's a full URL
      let filePath = resumeUrl;
      if (resumeUrl.includes("/storage/v1/object/public/resumes/")) {
        filePath = resumeUrl.split("/storage/v1/object/public/resumes/")[1];
      } else if (resumeUrl.includes("/resumes/")) {
        filePath = resumeUrl.split("/resumes/")[1];
      }

      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(filePath, 3600); // Valid for 1 hour

      if (error || !data?.signedUrl) {
        console.error("Error creating signed URL:", error);
        toast.error("Unable to open resume");
        return;
      }

      // Open in new tab
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
      toast.success(`Opening resume for ${applicantName}`);
    } catch (err) {
      console.error("View resume error:", err);
      toast.error("Failed to open resume");
    }
  };

  const openEmailDialog = (
    type: "selection" | "rejection" | "interview",
    application: any,
    appType: "jobs" | "social"
  ) => {
    setEmailDialog({ open: true, type, application: { ...application, type: appType } });
    // Reset interview fields when opening dialog
    if (type === "interview") {
      setInterviewDate("");
      setInterviewTime("");
      setMeetLink("");
    }
  };

  const closeEmailDialog = () => {
    setEmailDialog({ open: false, type: "selection", application: null });
    setInterviewDate("");
    setInterviewTime("");
    setMeetLink("");
  };

  const sendEmail = async () => {
    if (!emailDialog.application) return;

    setSending(true);
    try {
      const isJobs = emailDialog.application.type === "jobs";
      const positionLabel = isJobs
        ? emailDialog.application.job_applied_for
        : TRACKS_MAP[emailDialog.application.track] || emailDialog.application.track;

      const emailBody: any = {
        to: emailDialog.application.email,
        candidateName: emailDialog.application.name,
        position: positionLabel,
        type: emailDialog.type,
      };
      
      // Add interview details if it's an interview email
      if (emailDialog.type === "interview") {
        emailBody.interviewDate = interviewDate;
        emailBody.interviewTime = interviewTime;
        emailBody.meetLink = meetLink;
      }

      const { data, error } = await supabase.functions.invoke("send-application-email", {
        body: emailBody,
      });

      if (error) {
        // surface function error details
        const msg = error.message || (typeof error === "string" ? error : "Failed to send email");
        throw new Error(msg);
      }

      let newStatus: any = "pending";
      if (emailDialog.type === "selection") {
        newStatus = "selected";
      } else if (emailDialog.type === "rejection") {
        newStatus = "rejected";
      } else if (emailDialog.type === "interview") {
        newStatus = "interview_scheduled";
      }

      if (isJobs) {
        const { error: updateError } = await supabase
          .from("job_applications")
          .update({ status: newStatus })
          .eq("id", emailDialog.application.id);

        if (updateError) {
          console.error("Error updating status:", updateError);
        }

        setApplications((prev) =>
          prev.map((app) =>
            app.id === emailDialog.application?.id
              ? { ...app, status: newStatus }
              : app
          )
        );
      } else {
        const { error: updateError } = await supabase
          .from("social_internship_applications")
          .update({ status: newStatus })
          .eq("id", emailDialog.application.id);

        if (updateError) {
          console.error("Error updating social status:", updateError);
        }

        setSocialApplications((prev) =>
          prev.map((app) =>
            app.id === emailDialog.application?.id
              ? { ...app, status: newStatus }
              : app
          )
        );
      }

      const emailTypeLabel =
        emailDialog.type === "selection"
          ? "Selection"
          : emailDialog.type === "rejection"
          ? "Rejection"
          : "Interview";

      toast.success(
        `${emailTypeLabel} email sent to ${emailDialog.application.name}`
      );
      closeEmailDialog();
    } catch (err: any) {
      console.error("Email send error:", err);
      toast.error(err.message || "Failed to send email. Please try again.");
    } finally {
      setSending(false); // Reset sending state after email attempt
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status?: string, offerAccepted?: boolean | null) => {
    if (offerAccepted === true) {
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-700">Offer Accepted</Badge>
      );
    }
    switch (status) {
      case "selected":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Selected</Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "interview_scheduled":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            Interview Scheduled
          </Badge>
        );
      case "offer_accepted":
        return (
          <Badge className="bg-emerald-600 hover:bg-emerald-700">Offer Accepted</Badge>
        );
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const openDeleteDialog = (application: any, appType: "jobs" | "social") => {
    setDeleteDialog({ open: true, application: { ...application, type: appType } });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, application: null });
  };

  const handleDeleteApplication = async () => {
    if (!deleteDialog.application) return;

    setDeleting(true);
    try {
      const isJobs = deleteDialog.application.type === "jobs";
      if (isJobs) {
        // First, delete the resume from storage
        let filePath = deleteDialog.application.resume_url;
        if (filePath && filePath.includes("/storage/v1/object/public/resumes/")) {
          filePath = filePath.split("/storage/v1/object/public/resumes/")[1];
        } else if (filePath && filePath.includes("/resumes/")) {
          filePath = filePath.split("/resumes/")[1];
        }

        if (filePath) {
          const { error: storageError } = await supabase.storage
            .from("resumes")
            .remove([filePath]);

          if (storageError) {
            console.error("Error deleting resume from storage:", storageError);
            // Continue with database deletion even if storage fails
          }
        }

        // Delete from database
        const { error: dbError } = await supabase
          .from("job_applications")
          .delete()
          .eq("id", deleteDialog.application.id);

        if (dbError) {
          console.error("Error deleting application:", dbError);
          toast.error("Failed to delete application");
          return;
        }

        // Update local state
        setApplications((prev) =>
          prev.filter((app) => app.id !== deleteDialog.application?.id)
        );
      } else {
        // Delete social application
        const { error: dbError } = await supabase
          .from("social_internship_applications")
          .delete()
          .eq("id", deleteDialog.application.id);

        if (dbError) {
          console.error("Error deleting social application:", dbError);
          toast.error("Failed to delete application");
          return;
        }

        // Update local state
        setSocialApplications((prev) =>
          prev.filter((app) => app.id !== deleteDialog.application?.id)
        );
      }

      toast.success(`Application from ${deleteDialog.application.name} deleted successfully`);
      closeDeleteDialog();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete application");
    } finally {
      setDeleting(false);
    }
  };

  // Replace the existing exportToExcel with this version
  const exportToExcel = async (scope: "all" | "currentPage" = "all") => {
    // helper: trigger download for a Blob
    const downloadBlob = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    try {
      const rows =
        scope === "currentPage" ? paginatedApplications : getSortedApplications();
      if (!rows || rows.length === 0) {
        toast.error("No application data to export");
        return;
      }

      const data = rows.map((app: any) => {
        const statusLabel =
          app.status === "selected"
            ? "Selected"
            : app.status === "rejected"
            ? "Rejected"
            : app.status === "interview_scheduled"
            ? "Interview Scheduled"
            : "Pending";

        if (activeTab === "jobs") {
          return {
            "Submitted At": formatDate(app.created_at),
            Name: app.name,
            Email: app.email,
            "Phone Number": app.phone_number,
            Position: app.job_applied_for,
            Status: statusLabel,
            LinkedIn: app.linkedin_profile,
            GitHub: app.github_profile,
            Portfolio: app.portfolio_link || "",
            "Resume URL": app.resume_url,
          };
        } else {
          return {
            "Submitted At": formatDate(app.created_at),
            Name: app.name,
            Email: app.email,
            "Phone Number": app.phone,
            College: app.college,
            Track: TRACKS_MAP[app.track] || app.track,
            "Statement of Purpose": app.statement_of_purpose,
            Status: statusLabel,
            "Resume Link": app.resume_link || "",
          };
        }
      });

      // Try dynamic import of xlsx. If it fails, fallback to CSV.
      let xlsx: any = null;
      try {
        // @ts-ignore - allow dynamic import even if types are missing
        xlsx = await import(/* @vite-ignore */ "xlsx");
      } catch {
        xlsx = null;
      }

      const baseName =
        scope === "currentPage"
          ? `applications_page_${currentPage}`
          : "applications_all";

      if (xlsx?.utils) {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Applications");
        xlsx.writeFile(workbook, `${baseName}.xlsx`);
        toast.success("Exported applications to Excel");
        return;
      }

      // Fallback: CSV export
      const headers = Object.keys(data[0]);
      const escapeCell = (val: any) => {
        const s = String(val ?? "");
        // escape double-quotes
        const escaped = s.replace(/"/g, '""');
        // wrap with quotes if contains commas, quotes, or newlines
        return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
      };
      const csv =
        [headers.join(",")]
          .concat(
            data.map((row) =>
              headers.map((h) => escapeCell((row as any)[h])).join(",")
            )
          )
          .join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      downloadBlob(blob, `${baseName}.csv`);
      toast.success("Exported applications to CSV (xlsx module not found)");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export applications");
    }
  };

  const filteredApplications = useMemo(() => {
    return getSortedApplications();
  }, [applications, socialApplications, activeTab, sortField, sortOrder]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * applicationsPerPage;
    return filteredApplications.slice(startIndex, startIndex + applicationsPerPage);
  }, [filteredApplications, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / applicationsPerPage));

  const applicationTrends = useMemo(() => {
    const trends: { [key: string]: number } = {};
    if (activeTab === "jobs") {
      applications.forEach(app => {
        trends[app.job_applied_for] = (trends[app.job_applied_for] || 0) + 1;
      });
    } else {
      socialApplications.forEach(app => {
        const label = TRACKS_MAP[app.track] || app.track;
        trends[label] = (trends[label] || 0) + 1;
      });
    }
    return trends;
  }, [applications, socialApplications, activeTab]);

  const chartData = {
    labels: Object.keys(applicationTrends),
    datasets: [
      {
        label: 'Number of Applications',
        data: Object.values(applicationTrends),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Ensure chartData is valid before rendering
  const isChartDataValid = chartData.labels.length > 0 && chartData.datasets[0].data.length > 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">
                  Applications Dashboard
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Review and manage candidate and intern applications
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => exportToExcel("currentPage")}
                  className="gap-2"
                  disabled={(activeTab === "jobs" ? loading : socialLoading) || paginatedApplications.length === 0}
                  title={excelAvailable === false ? "XLSX not installed. Falling back to CSV." : undefined}
                >
                  Export Current Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportToExcel("all")}
                  className="gap-2"
                  disabled={(activeTab === "jobs" ? loading : socialLoading) || (activeTab === "jobs" ? applications.length === 0 : socialApplications.length === 0)}
                  title={excelAvailable === false ? "XLSX not installed. Falling back to CSV." : undefined}
                >
                  Export All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs Trigger to toggle Active Context */}
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val as "jobs" | "social");
                setCurrentPage(1);
              }}
              className="mb-8"
            >
              <TabsList className="grid w-full grid-cols-2 max-w-[450px]">
                <TabsTrigger value="jobs" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Careers ({applications.length})
                </TabsTrigger>
                <TabsTrigger value="social" className="gap-2">
                  <Users className="h-4 w-4" />
                  Social Internships ({socialApplications.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Chart Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Application Trends</h2>
              {isChartDataValid ? (
                <div className="h-64 w-full">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              ) : (
                <p className="text-muted-foreground">No data available for chart.</p>
              )}
            </div>
            {(activeTab === "jobs" ? loading : socialLoading) ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : paginatedApplications.length === 0 ? (
              <div className="text-center py-12">
                {activeTab === "jobs" ? (
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                ) : (
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                )}
                <p className="text-muted-foreground">No applications found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sr No.</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("created_at")}
                          className="flex items-center p-0 h-auto font-semibold hover:bg-transparent"
                        >
                          Date
                          <SortIcon field="created_at" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("name")}
                          className="flex items-center p-0 h-auto font-semibold hover:bg-transparent"
                        >
                          Name
                          <SortIcon field="name" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("job_applied_for")}
                          className="flex items-center p-0 h-auto font-semibold hover:bg-transparent"
                        >
                          {activeTab === "jobs" ? "Position" : "Track"}
                          <SortIcon field="job_applied_for" />
                        </Button>
                      </TableHead>
                      {activeTab === "social" && <TableHead>College</TableHead>}
                      <TableHead>Contact</TableHead>
                      {activeTab === "social" && <TableHead className="max-w-[250px]">Statement of Purpose</TableHead>}
                      {activeTab === "jobs" && <TableHead>Links</TableHead>}
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("status")}
                          className="flex items-center p-0 h-auto font-semibold hover:bg-transparent"
                        >
                          Status
                          <SortIcon field="status" />
                        </Button>
                      </TableHead>
                      <TableHead>Resume</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTab === "jobs" ? (
                      (paginatedApplications as JobApplication[]).map((app, index) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(app.created_at)}
                          </TableCell>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.job_applied_for}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <a
                                href={`mailto:${app.email}`}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </a>
                              <a
                                href={`tel:${app.phone_number}`}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                <Phone className="h-3 w-3" />
                                {app.phone_number}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <a
                                href={app.linkedin_profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80"
                                title="LinkedIn"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                              <a
                                href={app.github_profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80"
                                title="GitHub"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                              {app.portfolio_link && (
                                <a
                                  href={app.portfolio_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80"
                                  title="Portfolio"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status, app.offer_accepted)}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() =>
                                handleViewResume(app.resume_url, app.name)
                              }
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              View
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("interview", app, "jobs")}
                                  className="text-blue-600 focus:text-blue-600"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Send Interview Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("selection", app, "jobs")}
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Send Selection Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("rejection", app, "jobs")}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Send Rejection Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDeleteDialog(app, "jobs")}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Application
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      (paginatedApplications as SocialInternshipApplication[]).map((app, index) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(app.created_at)}
                          </TableCell>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{TRACKS_MAP[app.track] || app.track}</TableCell>
                          <TableCell>{app.college}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <a
                                href={`mailto:${app.email}`}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </a>
                              <a
                                href={`tel:${app.phone}`}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                <Phone className="h-3 w-3" />
                                {app.phone}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[250px] truncate" title={app.statement_of_purpose}>
                            {app.statement_of_purpose}
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            {app.resume_link ? (
                              <Button
                                onClick={() =>
                                  window.open(app.resume_link!, "_blank", "noopener,noreferrer")
                                }
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                View Link
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">No Link</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("interview", app, "social")}
                                  className="text-blue-600 focus:text-blue-600"
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Send Interview Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("selection", app, "social")}
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Send Selection Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmailDialog("rejection", app, "social")}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Send Rejection Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDeleteDialog(app, "social")}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Application
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Confirmation Dialog */}
      <Dialog
        open={emailDialog.open}
        onOpenChange={(open) => !open && closeEmailDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {emailDialog.type === "selection" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Send Selection Email
                </>
              ) : emailDialog.type === "rejection" ? (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Send Rejection Email
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Send Interview Email
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {emailDialog.type === "selection" ? (
                <>
                  Send a <strong className="text-green-600">selection</strong>{" "}
                  email to <strong>{emailDialog.application?.name}</strong> for{" "}
                  <strong>
                    {emailDialog.application?.type === "jobs"
                      ? emailDialog.application?.job_applied_for
                      : TRACKS_MAP[emailDialog.application?.track] || emailDialog.application?.track}
                  </strong>.
                </>
              ) : emailDialog.type === "rejection" ? (
                <>
                  Send a <strong className="text-red-600">rejection</strong>{" "}
                  email to <strong>{emailDialog.application?.name}</strong> for{" "}
                  <strong>
                    {emailDialog.application?.type === "jobs"
                      ? emailDialog.application?.job_applied_for
                      : TRACKS_MAP[emailDialog.application?.track] || emailDialog.application?.track}
                  </strong>.
                </>
              ) : (
                <>
                  Send a{" "}
                  <strong className="text-blue-600">Round 1 Interview</strong>{" "}
                  invitation to <strong>{emailDialog.application?.name}</strong>{" "}
                  for{" "}
                  <strong>
                    {emailDialog.application?.type === "jobs"
                      ? emailDialog.application?.job_applied_for
                      : TRACKS_MAP[emailDialog.application?.track] || emailDialog.application?.track}
                  </strong>.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> {emailDialog.application?.email}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>From:</strong> ai.nirikshan@gmail.com
            </p>
            {emailDialog.type === "interview" && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-sm font-medium">📅 Interview Date</label>
                  <input
                     type="text"
                     placeholder="e.g., Wednesday, December 10, 2025"
                     value={interviewDate}
                     onChange={(e) => setInterviewDate(e.target.value)}
                     className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-background"
                   />
                </div>
                <div>
                  <label className="text-sm font-medium">⏰ Interview Time</label>
                  <input
                     type="text"
                     placeholder="e.g., 7:00 PM – 8:00 PM IST"
                     value={interviewTime}
                     onChange={(e) => setInterviewTime(e.target.value)}
                     className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-background"
                   />
                </div>
                <div>
                  <label className="text-sm font-medium">🔗 Google Meet Link</label>
                  <input
                     type="url"
                     placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                     value={meetLink}
                     onChange={(e) => setMeetLink(e.target.value)}
                     className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-background"
                   />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
               variant="outline"
               onClick={closeEmailDialog}
               disabled={sending}
             >
              Cancel
            </Button>
            <Button
               onClick={sendEmail}
               disabled={sending}
               className={
                 emailDialog.type === "selection"
                   ? "bg-green-600 hover:bg-green-700"
                   : emailDialog.type === "rejection"
                   ? "bg-red-600 hover:bg-red-700"
                   : "bg-blue-600 hover:bg-blue-700"
               }
             >
              {sending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => !open && closeDeleteDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Application
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete the application from{" "}
              <strong>{deleteDialog.application?.name}</strong> for{" "}
              <strong>
                {deleteDialog.application?.type === "jobs"
                  ? deleteDialog.application?.job_applied_for
                  : TRACKS_MAP[deleteDialog.application?.track] || deleteDialog.application?.track}
              </strong>?
              <br />
              <br />
              This action cannot be undone. {deleteDialog.application?.type === "jobs" && "The resume file will also be deleted from storage."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteApplication}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Applications;