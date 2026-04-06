import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Building2, Mail, Phone, User, CheckSquare, XSquare } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const PIPELINE = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
const PIPELINE_LABELS: Record<string, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified", proposal: "Proposal Sent", won: "Won", lost: "Lost",
};
const PIPELINE_COLORS: Record<string, string> = {
  new: "#00D4FF", contacted: "#A855F7", qualified: "#EAB308", proposal: "#F97316", won: "#22C55E", lost: "#EF4444",
};

const DashboardLeads = () => {
  const { user, isAdmin, isManager } = useCrmAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", company: "", service_interest: "", message: "", source: "manual", assigned_to: "" });

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    supabase.from("profiles").select("id, full_name, email").then(({ data }) => setProfiles(data || []));
  }, []);

  const handleCreate = async () => {
    if (!newLead.name) return;
    const { error } = await supabase.from("leads").insert({
      ...newLead,
      assigned_to: newLead.assigned_to || null,
      email: newLead.email || null,
      phone: newLead.phone || null,
      company: newLead.company || null,
      service_interest: newLead.service_interest || null,
      message: newLead.message || null,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Lead added" });
      setShowCreate(false);
      setNewLead({ name: "", email: "", phone: "", company: "", service_interest: "", message: "", source: "manual", assigned_to: "" });
      fetchLeads();
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    await supabase.from("leads").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", leadId);
    fetchLeads();
  };

  const getAssigneeName = (id: string | null) => {
    if (!id) return "Unassigned";
    const p = profiles.find(p => p.id === id);
    return p?.full_name || p?.email || "Unknown";
  };

  const wonCount = leads.filter(l => l.status === "won").length;
  const lostCount = leads.filter(l => l.status === "lost").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/20 text-green-400 border-0">Won: {wonCount}</Badge>
          <Badge className="bg-red-500/20 text-red-400 border-0">Lost: {lostCount}</Badge>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">
          <Plus className="h-4 w-4 mr-1" /> Add Lead
        </Button>
      </div>

      {/* Pipeline */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 rounded-xl bg-[#0F1E35] animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {PIPELINE.map(status => {
            const columnLeads = leads.filter(l => l.status === status);
            return (
              <div key={status} className="rounded-xl border border-[#1A2C45] overflow-hidden" style={{ background: "#0A1628" }}>
                <div className="px-3 py-2.5 border-b border-[#1A2C45] flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: PIPELINE_COLORS[status] }} />
                  <span className="text-xs font-semibold text-white">{PIPELINE_LABELS[status]}</span>
                  <Badge className="ml-auto bg-[#1A2C45] text-[#8899AA] border-0 text-[9px]">{columnLeads.length}</Badge>
                </div>
                <div className="p-2 space-y-2 max-h-[55vh] overflow-y-auto">
                  {columnLeads.length === 0 ? (
                    <p className="text-center text-[#556677] text-[10px] py-4">No leads</p>
                  ) : columnLeads.map(lead => (
                    <div key={lead.id} onClick={() => setSelectedLead(lead)}
                      className="rounded-lg p-2.5 border border-[#1A2C45] cursor-pointer hover:border-[#00D4FF]/30 transition"
                      style={{ background: "#0F1E35" }}>
                      <p className="text-xs text-white font-medium truncate">{lead.name}</p>
                      {lead.company && <p className="text-[10px] text-[#556677] flex items-center gap-1 mt-0.5"><Building2 className="h-2.5 w-2.5" />{lead.company}</p>}
                      <p className="text-[9px] text-[#556677] mt-1">{format(new Date(lead.created_at), "MMM d")}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Lead Details</DialogTitle></DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                {selectedLead.company && <p className="text-sm text-[#8899AA] flex items-center gap-1"><Building2 className="h-3 w-3" />{selectedLead.company}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {selectedLead.email && <div><span className="text-[#556677]">Email</span><p className="text-[#8899AA] flex items-center gap-1"><Mail className="h-3 w-3" />{selectedLead.email}</p></div>}
                {selectedLead.phone && <div><span className="text-[#556677]">Phone</span><p className="text-[#8899AA] flex items-center gap-1"><Phone className="h-3 w-3" />{selectedLead.phone}</p></div>}
                <div><span className="text-[#556677]">Source</span><p className="text-[#8899AA]">{selectedLead.source}</p></div>
                <div><span className="text-[#556677]">Interest</span><p className="text-[#8899AA]">{selectedLead.service_interest || "—"}</p></div>
                <div><span className="text-[#556677]">Assigned To</span><p className="text-[#8899AA] flex items-center gap-1"><User className="h-3 w-3" />{getAssigneeName(selectedLead.assigned_to)}</p></div>
              </div>
              {selectedLead.message && <div><span className="text-[#556677] text-sm">Message</span><p className="text-[#8899AA] text-sm mt-1">{selectedLead.message}</p></div>}

              {/* Status Change */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#556677]">Status:</span>
                <Select value={selectedLead.status} onValueChange={v => { updateLeadStatus(selectedLead.id, v); setSelectedLead({ ...selectedLead, status: v }); }}>
                  <SelectTrigger className="flex-1 bg-[#0A1628] border-[#1A2C45] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                    {PIPELINE.map(s => <SelectItem key={s} value={s} className="text-white">{PIPELINE_LABELS[s]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Reassign */}
              {(isAdmin || isManager) && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#556677]">Assign:</span>
                  <Select value={selectedLead.assigned_to || ""} onValueChange={async v => {
                    await supabase.from("leads").update({ assigned_to: v }).eq("id", selectedLead.id);
                    setSelectedLead({ ...selectedLead, assigned_to: v });
                    fetchLeads();
                  }}>
                    <SelectTrigger className="flex-1 bg-[#0A1628] border-[#1A2C45] text-white">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                      {profiles.map(p => <SelectItem key={p.id} value={p.id} className="text-white">{p.full_name || p.email}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Lead Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Add New Lead</DialogTitle></DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {(["name", "email", "phone", "company", "service_interest"] as const).map(field => (
              <Input key={field} placeholder={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                value={(newLead as any)[field]} onChange={e => setNewLead(p => ({ ...p, [field]: e.target.value }))}
                className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            ))}
            <Textarea placeholder="Message / Notes" value={newLead.message}
              onChange={e => setNewLead(p => ({ ...p, message: e.target.value }))}
              className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            <Select value={newLead.source} onValueChange={v => setNewLead(p => ({ ...p, source: v }))}>
              <SelectTrigger className="bg-[#0A1628] border-[#1A2C45] text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                {["manual", "website", "referral"].map(s => <SelectItem key={s} value={s} className="text-white capitalize">{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={newLead.assigned_to} onValueChange={v => setNewLead(p => ({ ...p, assigned_to: v }))}>
              <SelectTrigger className="bg-[#0A1628] border-[#1A2C45] text-white"><SelectValue placeholder="Assign to..." /></SelectTrigger>
              <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                {profiles.map(p => <SelectItem key={p.id} value={p.id} className="text-white">{p.full_name || p.email}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleCreate} className="w-full bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">Add Lead</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardLeads;
