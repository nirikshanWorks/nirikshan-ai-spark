import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { 
  Plus, Trash2, Edit, Copy, ExternalLink, Shield, 
  Search, Calendar, FileText, Lock, LockOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogTrigger,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

interface Certificate {
  id: string;
  certificate_number: string;
  recipient_name: string;
  issue_date: string;
  nda_signed: boolean;
  created_at: string;
}

const AdminCertificates = () => {
  const { user, isAdmin, loading: authLoading, supabase } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    certificate_number: "",
    recipient_name: "",
    issue_date: new Date().toISOString().split("T")[0],
    nda_signed: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
      return;
    }
    if (user && isAdmin) {
      fetchCertificates();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch certificates");
      console.error(error);
    } else {
      setCertificates(data || []);
    }
    setLoading(false);
  };

  const generateCertificateNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `CERT-${year}-${randomNum}`;
  };

  const handleCreate = async () => {
    if (!formData.certificate_number || !formData.recipient_name) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: formData.certificate_number,
      recipient_name: formData.recipient_name,
      issue_date: formData.issue_date,
      nda_signed: formData.nda_signed,
      created_by: user?.id,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("Certificate number already exists");
      } else {
        toast.error("Failed to create certificate");
        console.error(error);
      }
    } else {
      toast.success("Certificate created successfully");
      setIsCreateOpen(false);
      resetForm();
      fetchCertificates();
    }
  };

  const handleUpdate = async () => {
    if (!editingCertificate) return;

    const { error } = await supabase
      .from("certificates")
      .update({
        certificate_number: formData.certificate_number,
        recipient_name: formData.recipient_name,
        issue_date: formData.issue_date,
        nda_signed: formData.nda_signed,
      })
      .eq("id", editingCertificate.id);

    if (error) {
      toast.error("Failed to update certificate");
      console.error(error);
    } else {
      toast.success("Certificate updated successfully");
      setEditingCertificate(null);
      resetForm();
      fetchCertificates();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("certificates").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete certificate");
      console.error(error);
    } else {
      toast.success("Certificate deleted successfully");
      fetchCertificates();
    }
  };

  const copyVerificationLink = (certNumber: string) => {
    const link = `${window.location.origin}/verify/${encodeURIComponent(certNumber)}`;
    navigator.clipboard.writeText(link);
    toast.success("Verification link copied to clipboard");
  };

  const resetForm = () => {
    setFormData({
      certificate_number: "",
      recipient_name: "",
      issue_date: new Date().toISOString().split("T")[0],
      nda_signed: false,
    });
  };

  const openEditDialog = (cert: Certificate) => {
    setEditingCertificate(cert);
    setFormData({
      certificate_number: cert.certificate_number,
      recipient_name: cert.recipient_name,
      issue_date: cert.issue_date,
      nda_signed: cert.nda_signed,
    });
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.certificate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Certificate Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Issue and manage verification certificates
              </p>
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm();
                    setFormData((prev) => ({
                      ...prev,
                      certificate_number: generateCertificateNumber(),
                    }));
                  }}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Issue Certificate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Issue New Certificate</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cert-number">Certificate Number</Label>
                    <Input
                      id="cert-number"
                      value={formData.certificate_number}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, certificate_number: e.target.value }))
                      }
                      placeholder="CERT-2024-0001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient-name">Recipient Name</Label>
                    <Input
                      id="recipient-name"
                      value={formData.recipient_name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, recipient_name: e.target.value }))
                      }
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-date">Issue Date</Label>
                    <Input
                      id="issue-date"
                      type="date"
                      value={formData.issue_date}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, issue_date: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="nda-signed">NDA Signed</Label>
                    <Switch
                      id="nda-signed"
                      checked={formData.nda_signed}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, nda_signed: checked }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleCreate}>Issue Certificate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by certificate number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Certificates Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Issued Certificates ({filteredCertificates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredCertificates.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchQuery ? "No certificates match your search" : "No certificates issued yet"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Certificate No.</TableHead>
                          <TableHead>Recipient Name</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>NDA Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCertificates.map((cert) => (
                          <TableRow key={cert.id}>
                            <TableCell className="font-mono text-sm">
                              {cert.certificate_number}
                            </TableCell>
                            <TableCell className="font-medium">{cert.recipient_name}</TableCell>
                            <TableCell>
                              {new Date(cert.issue_date).toLocaleDateString("en-IN")}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={cert.nda_signed ? "default" : "secondary"}
                                className="gap-1"
                              >
                                {cert.nda_signed ? (
                                  <>
                                    <Lock className="w-3 h-3" /> NDA Signed
                                  </>
                                ) : (
                                  <>
                                    <LockOpen className="w-3 h-3" /> No NDA
                                  </>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => copyVerificationLink(cert.certificate_number)}
                                  title="Copy verification link"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    window.open(`/verify/${cert.certificate_number}`, "_blank")
                                  }
                                  title="View certificate"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>

                                {/* Edit Dialog */}
                                <Dialog
                                  open={editingCertificate?.id === cert.id}
                                  onOpenChange={(open) => {
                                    if (!open) setEditingCertificate(null);
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => openEditDialog(cert)}
                                      title="Edit certificate"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Certificate</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-cert-number">Certificate Number</Label>
                                        <Input
                                          id="edit-cert-number"
                                          value={formData.certificate_number}
                                          onChange={(e) =>
                                            setFormData((prev) => ({
                                              ...prev,
                                              certificate_number: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-recipient-name">Recipient Name</Label>
                                        <Input
                                          id="edit-recipient-name"
                                          value={formData.recipient_name}
                                          onChange={(e) =>
                                            setFormData((prev) => ({
                                              ...prev,
                                              recipient_name: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-issue-date">Issue Date</Label>
                                        <Input
                                          id="edit-issue-date"
                                          type="date"
                                          value={formData.issue_date}
                                          onChange={(e) =>
                                            setFormData((prev) => ({
                                              ...prev,
                                              issue_date: e.target.value,
                                            }))
                                          }
                                        />
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <Label htmlFor="edit-nda-signed">NDA Signed</Label>
                                        <Switch
                                          id="edit-nda-signed"
                                          checked={formData.nda_signed}
                                          onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, nda_signed: checked }))
                                          }
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <Button onClick={handleUpdate}>Save Changes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                {/* Delete Confirmation */}
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      title="Delete certificate"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete certificate{" "}
                                        <span className="font-mono font-semibold">
                                          {cert.certificate_number}
                                        </span>
                                        ? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(cert.id)}
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
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminCertificates;
