import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, FileText, Mail, Phone, Github, Linkedin, Briefcase } from "lucide-react";

const supabaseUrl = "https://ggoqrdvlvapmcgonufds.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdnb3FyZHZsdmFwbWNnb251ZmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDM1NTEsImV4cCI6MjA4MDAxOTU1MX0.5e0PnzXKad0Ydb4tXF0KIjzpHXFKEGWkuzImDwDEIwY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
}

const Applications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

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

  const handleViewResume = async (resumeUrl: string, applicantName: string) => {
    try {
      // The resume_url might be a full URL or just a path
      // Extract the path if it's a full URL
      let filePath = resumeUrl;
      if (resumeUrl.includes('/storage/v1/object/public/resumes/')) {
        filePath = resumeUrl.split('/storage/v1/object/public/resumes/')[1];
      } else if (resumeUrl.includes('/resumes/')) {
        filePath = resumeUrl.split('/resumes/')[1];
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Job Applications</CardTitle>
            <p className="text-muted-foreground mt-2">
              Review and manage candidate applications
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No applications yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Links</TableHead>
                      <TableHead className="text-right">Resume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
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
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleViewResume(app.resume_url, app.name)}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            View Resume
                          </Button>
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
      <Footer />
    </div>
  );
};

export default Applications;
