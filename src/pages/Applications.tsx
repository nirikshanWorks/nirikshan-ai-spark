import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  status?: "pending" | "selected" | "rejected" | "interview_scheduled";
}

type SortField = "created_at" | "name" | "job_applied_for" | "status";
type SortOrder = "asc" | "desc";

const Applications = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut, supabase } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailDialog, setEmailDialog] = useState<{
    open: boolean;
    type: "selection" | "rejection" | "interview";
    application: JobApplication | null;
  }>({ open: false, type: "selection", application: null });
  const [sending, setSending] = useState(false);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10; // Set the number of applications per page

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!authLoading && (!user || !isAdmin)) {
      toast.error("You must be an admin to access this page");
      navigate("/auth");
      return;
    }

    if (!authLoading && user && isAdmin) {
      fetchApplications();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchApplications = async () => {
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

      setApplications(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortedApplications = () => {
    return [...applications].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "created_at") {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
      } else if (sortField === "status") {
        const statusOrder = { pending: 0, interview_scheduled: 1, selected: 2, rejected: 3 };
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
    application: JobApplication
  ) => {
    setEmailDialog({ open: true, type, application });
  };

  const closeEmailDialog = () => {
    setEmailDialog({ open: false, type: "selection", application: null });
  };

  const sendEmail = async () => {
    if (!emailDialog.application) return;

    setSending(true);
    try {
      const response = await fetch("http://localhost:4000/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailDialog.application.email,
          candidateName: emailDialog.application.name,
          position: emailDialog.application.job_applied_for,
          type: emailDialog.type,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send email");
      }

      let newStatus: JobApplication["status"] = "pending";
      if (emailDialog.type === "selection") {
        newStatus = "selected";
      } else if (emailDialog.type === "rejection") {
        newStatus = "rejected";
      } else if (emailDialog.type === "interview") {
        newStatus = "interview_scheduled";
      }

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
      toast.error(err.message || "Failed to send email");
    } finally {
      setSending(false);
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

  const getStatusBadge = (status?: string) => {
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
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const filteredApplications = getSortedApplications();

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * applicationsPerPage;
    return filteredApplications.slice(startIndex, startIndex + applicationsPerPage);
  }, [filteredApplications, currentPage]);

  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

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
                  Job Applications
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Review and manage candidate applications
                </p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : paginatedApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
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
                          Position
                          <SortIcon field="job_applied_for" />
                        </Button>
                      </TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Links</TableHead>
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
                    {paginatedApplications.map((app, index) => (
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
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
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
                                onClick={() => openEmailDialog("interview", app)}
                                className="text-blue-600 focus:text-blue-600"
                              >
                                <Calendar className="h-4 w-4 mr-2" />
                                Send Interview Email
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openEmailDialog("selection", app)}
                                className="text-green-600 focus:text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Send Selection Email
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openEmailDialog("rejection", app)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Send Rejection Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
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
                  <strong>{emailDialog.application?.job_applied_for}</strong>.
                </>
              ) : emailDialog.type === "rejection" ? (
                <>
                  Send a <strong className="text-red-600">rejection</strong>{" "}
                  email to <strong>{emailDialog.application?.name}</strong> for{" "}
                  <strong>{emailDialog.application?.job_applied_for}</strong>.
                </>
              ) : (
                <>
                  Send a{" "}
                  <strong className="text-blue-600">Round 1 Interview</strong>{" "}
                  invitation to <strong>{emailDialog.application?.name}</strong>{" "}
                  for{" "}
                  <strong>{emailDialog.application?.job_applied_for}</strong>.
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
              <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Interview Details:</strong>
                  <br />
                  📅 Date: Wednesday, December 10
                  <br />
                  🕖 Time: 7:00 PM – 10:00 PM
                  <br />
                  🔗 Link: meet.google.com/jzr-fqov-wmu
                </p>
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

      <Footer />
    </div>
  );
};

export default Applications;