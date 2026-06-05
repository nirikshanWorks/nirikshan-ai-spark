import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Eye, Mail, Phone, ExternalLink, Search, Trash2, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";

interface InternshipApp {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  track: string;
  resume_link: string | null;
  statement_of_purpose: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { value: "reviewed", label: "Reviewed", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { value: "selected", label: "Selected", color: "bg-green-100 text-green-800 border-green-200" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
];

const TRACK_LABELS: Record<string, string> = {
  "tech-for-good": "Tech for Good (AI & Software)",
  "rural-operations": "Community & Rural Operations",
  "digital-literacy": "Digital Literacy & Education",
};

const InternshipApplications = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<InternshipApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [trackFilter, setTrackFilter] = useState<string>("all");
  const [selected, setSelected] = useState<InternshipApp | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/employee/login");
        return;
      }
      // small delay for RLS session propagation
      await new Promise((r) => setTimeout(r, 400));
      fetchApps();
    };
    init();
  }, [navigate]);

  const fetchApps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_internship_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load applications: " + error.message);
    } else {
      setApps((data || []) as InternshipApp[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("social_internship_applications")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
      return;
    }
    toast.success("Status updated");
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    const { error } = await supabase
      .from("social_internship_applications")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete: " + error.message);
      return;
    }
    toast.success("Application deleted");
    setApps((prev) => prev.filter((a) => a.id !== id));
    setSelected(null);
  };

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.college.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesTrack = trackFilter === "all" || a.track === trackFilter;
    return matchesSearch && matchesStatus && matchesTrack;
  });

  const statusBadge = (status: string) => {
    const s = STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];
    return <Badge variant="outline" className={s.color}>{s.label}</Badge>;
  };

  const counts = STATUS_OPTIONS.reduce<Record<string, number>>((acc, s) => {
    acc[s.value] = apps.filter((a) => a.status === s.value).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Internship Applications — Admin" description="Manage social internship applications" />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/admin/hr"><ArrowLeft className="h-4 w-4 mr-1" /> Back to HR</Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="h-7 w-7 text-primary" />
              Social Internship Applications
            </h1>
            <p className="text-muted-foreground mt-1">Review and manage submissions from the internship form</p>
          </div>
          <Button onClick={fetchApps} variant="outline">Refresh</Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold">{apps.length}</p></CardContent></Card>
          {STATUS_OPTIONS.map((s) => (
            <Card key={s.value}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{counts[s.value] || 0}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or college..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUS_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={trackFilter} onValueChange={setTrackFilter}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                {Object.entries(TRACK_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader><CardTitle>{filtered.length} application{filtered.length !== 1 ? "s" : ""}</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">No applications found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Track</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.name}</TableCell>
                        <TableCell className="text-sm">{a.email}</TableCell>
                        <TableCell className="text-sm">{a.college}</TableCell>
                        <TableCell className="text-sm">{TRACK_LABELS[a.track] || a.track}</TableCell>
                        <TableCell>
                          <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
                            <SelectTrigger className="w-[140px] h-8">{statusBadge(a.status)}</SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(a.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteApp(a.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>Application submitted on {new Date(selected.created_at).toLocaleString()}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex gap-2 flex-wrap">
                  {statusBadge(selected.status)}
                  <Badge variant="outline">{TRACK_LABELS[selected.track] || selected.track}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-primary flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {selected.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-primary flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {selected.phone}
                    </a>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs">College / Organization</p>
                    <p>{selected.college}</p>
                  </div>
                  {selected.resume_link && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Resume</p>
                      <a href={selected.resume_link} target="_blank" rel="noopener noreferrer"
                         className="text-primary flex items-center gap-1 break-all">
                        <ExternalLink className="h-3 w-3" /> {selected.resume_link}
                      </a>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Statement of Purpose</p>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {selected.statement_of_purpose}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                    <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" onClick={() => deleteApp(selected.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternshipApplications;
