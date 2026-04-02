import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const STATUSES = ["todo", "in-progress", "review", "done"] as const;
const STATUS_LABELS: Record<string, string> = { todo: "To Do", "in-progress": "In Progress", review: "In Review", done: "Done" };
const STATUS_COLORS: Record<string, string> = { todo: "#8899AA", "in-progress": "#00D4FF", review: "#EAB308", done: "#22C55E" };
const PRIORITY_COLORS: Record<string, string> = { urgent: "#EF4444", high: "#F97316", medium: "#EAB308", low: "#22C55E" };

const DashboardTasks = () => {
  const { user, isAdmin, isManager } = useCrmAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState<"my" | "all">("my");
  const [newTask, setNewTask] = useState({ title: "", description: "", assigned_to: "", due_date: "", priority: "medium" });

  const fetchTasks = async () => {
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    setTasks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    supabase.from("profiles").select("id, full_name, email").then(({ data }) => setProfiles(data || []));

    // Realtime
    const channel = supabase.channel("tasks-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, () => fetchTasks())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredTasks = tab === "my" ? tasks.filter(t => t.assigned_to === user?.id) : tasks;

  const handleCreate = async () => {
    if (!newTask.title) return;
    const { error } = await supabase.from("tasks").insert({
      title: newTask.title,
      description: newTask.description || null,
      assigned_to: newTask.assigned_to || null,
      assigned_by: user?.id,
      due_date: newTask.due_date || null,
      priority: newTask.priority,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Task created" });
      setShowCreate(false);
      setNewTask({ title: "", description: "", assigned_to: "", due_date: "", priority: "medium" });
    }
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    await supabase.from("tasks").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", taskId);
  };

  const getAssigneeName = (id: string | null) => {
    if (!id) return "Unassigned";
    const p = profiles.find(p => p.id === id);
    return p?.full_name || p?.email || "Unknown";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="flex gap-2">
          <button onClick={() => setTab("my")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${tab === "my" ? "bg-[#00D4FF]/10 text-[#00D4FF]" : "text-[#8899AA] hover:text-white"}`}>
            My Tasks
          </button>
          {(isAdmin || isManager) && (
            <button onClick={() => setTab("all")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${tab === "all" ? "bg-[#00D4FF]/10 text-[#00D4FF]" : "text-[#8899AA] hover:text-white"}`}>
              All Tasks
            </button>
          )}
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">
          <Plus className="h-4 w-4 mr-1" /> Create Task
        </Button>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-48 rounded-xl bg-[#0F1E35] animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUSES.map(status => {
            const columnTasks = filteredTasks.filter(t => t.status === status);
            return (
              <div key={status} className="rounded-xl border border-[#1A2C45] overflow-hidden" style={{ background: "#0A1628" }}>
                <div className="px-4 py-3 border-b border-[#1A2C45] flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[status] }} />
                  <span className="text-sm font-semibold text-white">{STATUS_LABELS[status]}</span>
                  <Badge className="ml-auto bg-[#1A2C45] text-[#8899AA] border-0 text-[10px]">{columnTasks.length}</Badge>
                </div>
                <div className="p-2 space-y-2 max-h-[60vh] overflow-y-auto">
                  {columnTasks.length === 0 ? (
                    <p className="text-center text-[#556677] text-xs py-6">No tasks</p>
                  ) : columnTasks.map(task => {
                    const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== "done";
                    return (
                      <div key={task.id} className={`rounded-lg p-3 border transition hover:border-[#00D4FF]/30 ${isOverdue ? "border-red-500/40" : "border-[#1A2C45]"}`}
                        style={{ background: "#0F1E35" }}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm text-white font-medium leading-tight flex-1">{task.title}</p>
                          <span className="h-2 w-2 rounded-full shrink-0 mt-1.5 ml-2" style={{ background: PRIORITY_COLORS[task.priority] }} />
                        </div>
                        {task.description && <p className="text-xs text-[#556677] line-clamp-2 mb-2">{task.description}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-[8px]">
                                {getAssigneeName(task.assigned_to).slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] text-[#556677]">{getAssigneeName(task.assigned_to)}</span>
                          </div>
                          {task.due_date && (
                            <span className={`text-[10px] flex items-center gap-0.5 ${isOverdue ? "text-red-400" : "text-[#556677]"}`}>
                              <Calendar className="h-2.5 w-2.5" />{format(new Date(task.due_date), "MMM d")}
                            </span>
                          )}
                        </div>
                        {/* Status change */}
                        <Select value={task.status} onValueChange={(v) => updateStatus(task.id, v)}>
                          <SelectTrigger className="mt-2 h-7 text-[10px] bg-[#0A1628] border-[#1A2C45] text-[#8899AA]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                            {STATUSES.map(s => <SelectItem key={s} value={s} className="text-white text-xs">{STATUS_LABELS[s]}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="bg-[#0F1E35] border-[#1A2C45] text-white max-w-md">
          <DialogHeader><DialogTitle className="text-white">Create Task</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Task title" value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))}
              className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677]" />
            <Textarea placeholder="Description (optional)" value={newTask.description}
              onChange={e => setNewTask(p => ({ ...p, description: e.target.value }))}
              className="bg-[#0A1628] border-[#1A2C45] text-white placeholder:text-[#556677] min-h-[80px]" />
            <Select value={newTask.assigned_to} onValueChange={v => setNewTask(p => ({ ...p, assigned_to: v }))}>
              <SelectTrigger className="bg-[#0A1628] border-[#1A2C45] text-white">
                <SelectValue placeholder="Assign to..." />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                {profiles.map(p => <SelectItem key={p.id} value={p.id} className="text-white">{p.full_name || p.email}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" value={newTask.due_date} onChange={e => setNewTask(p => ({ ...p, due_date: e.target.value }))}
                className="bg-[#0A1628] border-[#1A2C45] text-white" />
              <Select value={newTask.priority} onValueChange={v => setNewTask(p => ({ ...p, priority: v }))}>
                <SelectTrigger className="bg-[#0A1628] border-[#1A2C45] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1E35] border-[#1A2C45]">
                  {["low", "medium", "high", "urgent"].map(p => <SelectItem key={p} value={p} className="text-white capitalize">{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreate} className="w-full bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14]">Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardTasks;
