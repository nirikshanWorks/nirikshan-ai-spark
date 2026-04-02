import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  department: string | null;
  designation: string | null;
  joining_date: string | null;
  avatar_url: string | null;
  is_active: boolean | null;
}

const DashboardEmployees = () => {
  const { isAdmin } = useCrmAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ email: "", full_name: "", department: "", designation: "", phone: "" });
  const [addLoading, setAddLoading] = useState(false);

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*").order("full_name");
    setProfiles((data as Profile[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const departments = [...new Set(profiles.map(p => p.department).filter(Boolean))];

  const filtered = profiles.filter(p => {
    const matchSearch = !search || [p.full_name, p.email, p.designation].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchDept = deptFilter === "all" || p.department === deptFilter;
    return matchSearch && matchDept;
  });

  const handleAddEmployee = async () => {
    if (!newEmployee.email || !newEmployee.full_name) return;
    setAddLoading(true);
    // Update profile for existing user or create invite
    const { error } = await supabase.from("profiles").upsert({
      id: crypto.randomUUID(), // This is a placeholder; real flow would use Supabase Auth invite
      email: newEmployee.email,
      full_name: newEmployee.full_name,
      department: newEmployee.department || null,
      designation: newEmployee.designation || null,
      phone: newEmployee.phone || null,
      is_active: true,
    });
    setAddLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Employee added" });
      setShowAdd(false);
      setNewEmployee({ email: "", full_name: "", department: "", designation: "", phone: "" });
      fetchProfiles();
    }
  };

  const roleBadge = (dept: string | null) => {
    const colors: Record<string, string> = {
      Engineering: "bg-blue-500/20 text-blue-400",
      Design: "bg-pink-500/20 text-pink-400",
      Marketing: "bg-green-500/20 text-green-400",
      Sales: "bg-yellow-500/20 text-yellow-400",
    };
    return colors[dept || ""] || "bg-[#1A2C45] text-[#8899AA]";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#556677]" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..."
            className="pl-9 bg-[#0F1E35] border-[#1A2C45] text-white placeholder:text-[#556677] focus-visible:ring-[#00D4FF]" />
        </div>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-[180px] bg-[#0F1E35] border-[#1A2C45] text-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
            <SelectItem value="all" className="text-white">All Departments</SelectItem>
            {departments.map(d => <SelectItem key={d} value={d!} className="text-white">{d}</SelectItem>)}
          </SelectContent>
        </Select>
        {isAdmin && (
          <Button onClick={() => setShowAdd(true)} className="bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">
            <Plus className="h-4 w-4 mr-1" /> Add Employee
          </Button>
        )}
      </div>

      {/* Employee Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 rounded-xl bg-[#0F1E35] animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => {
            const initials = (p.full_name || p.email).split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
            return (
              <div key={p.id} onClick={() => setSelected(p)}
                className="rounded-xl border border-[#1A2C45] p-4 cursor-pointer hover:border-[#00D4FF]/40 transition-all"
                style={{ background: "#0F1E35" }}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={p.avatar_url || undefined} />
                    <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-sm">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{p.full_name || p.email}</p>
                    <p className="text-xs text-[#556677] truncate">{p.designation || "—"}</p>
                  </div>
                  <Badge className={`text-[10px] border-0 ${p.is_active !== false ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {p.is_active !== false ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {p.department && <Badge className={`mt-3 text-[10px] border-0 ${roleBadge(p.department)}`}>{p.department}</Badge>}
              </div>
            );
          })}
        </div>
      )}

      {/* Profile Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Employee Profile</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selected.avatar_url || undefined} />
                  <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-lg">
                    {(selected.full_name || selected.email).split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{selected.full_name || selected.email}</h3>
                  <p className="text-sm text-[#8899AA]">{selected.designation || "—"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[#556677]">Email</span><p className="text-[#8899AA] flex items-center gap-1"><Mail className="h-3 w-3" />{selected.email}</p></div>
                <div><span className="text-[#556677]">Phone</span><p className="text-[#8899AA] flex items-center gap-1"><Phone className="h-3 w-3" />{selected.phone || "—"}</p></div>
                <div><span className="text-[#556677]">Department</span><p className="text-[#8899AA]">{selected.department || "—"}</p></div>
                <div><span className="text-[#556677]">Joined</span><p className="text-[#8899AA]">{selected.joining_date ? format(new Date(selected.joining_date), "MMM d, yyyy") : "—"}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Add New Employee</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {(["full_name", "email", "phone", "department", "designation"] as const).map(field => (
              <Input key={field} placeholder={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                value={(newEmployee as any)[field]}
                onChange={e => setNewEmployee(prev => ({ ...prev, [field]: e.target.value }))}
                className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            ))}
            <Button onClick={handleAddEmployee} disabled={addLoading} className="w-full bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">
              {addLoading ? "Adding..." : "Add Employee"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardEmployees;
