import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Users, Clock, CheckSquare, Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Stats {
  totalEmployees: number;
  presentToday: number;
  openTasks: number;
  openLeads: number;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="rounded-xl p-5 border border-[#1A2C45]" style={{ background: "#0F1E35" }}>
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-lg" style={{ background: `${color}15` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-[#8899AA]">{label}</p>
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user, role } = useCrmAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ totalEmployees: 0, presentToday: 0, openTasks: 0, openLeads: 0 });
  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const today = format(new Date(), "yyyy-MM-dd");

    const fetchStats = async () => {
      const [profilesRes, attendanceRes, tasksRes, leadsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("attendance").select("id", { count: "exact", head: true }).eq("date", today).eq("status", "present"),
        supabase.from("tasks").select("id", { count: "exact", head: true }).in("status", ["todo", "in-progress"]),
        supabase.from("leads").select("id", { count: "exact", head: true }).in("status", ["new", "contacted", "qualified"]),
      ]);
      setStats({
        totalEmployees: profilesRes.count || 0,
        presentToday: attendanceRes.count || 0,
        openTasks: tasksRes.count || 0,
        openLeads: leadsRes.count || 0,
      });
    };

    const fetchMyTasks = async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("assigned_to", user.id)
        .in("status", ["todo", "in-progress"])
        .order("due_date", { ascending: true })
        .limit(5);
      setMyTasks(data || []);
    };

    fetchStats();
    fetchMyTasks();
  }, [user]);

  const priorityColor: Record<string, string> = {
    urgent: "#EF4444", high: "#F97316", medium: "#EAB308", low: "#22C55E",
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Employees" value={stats.totalEmployees} color="#00D4FF" />
        <StatCard icon={Clock} label="Present Today" value={stats.presentToday} color="#22C55E" />
        <StatCard icon={CheckSquare} label="Open Tasks" value={stats.openTasks} color="#EAB308" />
        <StatCard icon={Target} label="Open Leads" value={stats.openLeads} color="#A855F7" />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate("/dashboard/attendance")}
          className="bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF]/20 border border-[#00D4FF]/30">
          <Clock className="h-4 w-4 mr-2" /> Mark Attendance
        </Button>
        <Button onClick={() => navigate("/dashboard/leads")}
          className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30">
          <Plus className="h-4 w-4 mr-2" /> Add Lead
        </Button>
        <Button onClick={() => navigate("/dashboard/tasks")}
          className="bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30">
          <Plus className="h-4 w-4 mr-2" /> Create Task
        </Button>
      </div>

      {/* My Tasks */}
      <div className="rounded-xl border border-[#1A2C45] p-5" style={{ background: "#0F1E35" }}>
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "Syne, sans-serif" }}>My Tasks</h3>
        {myTasks.length === 0 ? (
          <p className="text-[#556677] text-sm">No pending tasks</p>
        ) : (
          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0A1628] border border-[#1A2C45]">
                <div>
                  <p className="text-sm text-white font-medium">{task.title}</p>
                  {task.due_date && (
                    <p className={`text-xs mt-0.5 ${new Date(task.due_date) < new Date() ? "text-red-400" : "text-[#556677]"}`}>
                      Due: {format(new Date(task.due_date), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: priorityColor[task.priority] || "#8899AA" }} />
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A2C45] text-[#8899AA]">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
