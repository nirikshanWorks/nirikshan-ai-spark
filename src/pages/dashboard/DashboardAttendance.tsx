import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format, differenceInSeconds, startOfWeek, addDays } from "date-fns";
import { Clock, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardAttendance = () => {
  const { user, isAdmin, isManager } = useCrmAuth();
  const { toast } = useToast();
  const [todayRecord, setTodayRecord] = useState<any>(null);
  const [weekRecords, setWeekRecords] = useState<any[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Admin view
  const [allAttendance, setAllAttendance] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [employees, setEmployees] = useState<any[]>([]);

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      // Get employee record
      const { data: emp } = await supabase.from("employees").select("id").eq("user_id", user.id).maybeSingle();
      if (emp) {
        setEmployeeId(emp.id);
        // Today's record
        const { data: todayData } = await supabase.from("attendance").select("*")
          .eq("employee_id", emp.id).eq("date", today).maybeSingle();
        setTodayRecord(todayData);

        // Week records
        const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
        const weekEnd = format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6), "yyyy-MM-dd");
        const { data: weekData } = await supabase.from("attendance").select("*")
          .eq("employee_id", emp.id).gte("date", weekStart).lte("date", weekEnd).order("date");
        setWeekRecords(weekData || []);
      }

      // Admin/Manager data
      if (isAdmin || isManager) {
        const { data: emps } = await supabase.from("employees").select("id, full_name, department, employee_id");
        setEmployees(emps || []);
      }

      setLoading(false);
    };

    init();
  }, [user, isAdmin, isManager]);

  // Live timer
  useEffect(() => {
    if (todayRecord?.check_in_time && !todayRecord?.check_out_time) {
      const startTime = new Date(todayRecord.check_in_time).getTime();
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [todayRecord]);

  // Fetch all attendance for admin
  useEffect(() => {
    if ((isAdmin || isManager) && selectedDate) {
      supabase.from("attendance").select("*, employees(full_name, department, employee_id)")
        .eq("date", selectedDate).then(({ data }) => setAllAttendance(data || []));
    }
  }, [isAdmin, isManager, selectedDate]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCheckIn = async () => {
    if (!employeeId) {
      toast({ title: "Error", description: "Employee profile not found", variant: "destructive" });
      return;
    }
    const { data, error } = await supabase.from("attendance").insert({
      employee_id: employeeId, date: today, status: "present",
      check_in_time: new Date().toISOString(),
    }).select().single();
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { setTodayRecord(data); toast({ title: "Checked in!" }); }
  };

  const handleCheckOut = async () => {
    if (!todayRecord) return;
    const { data, error } = await supabase.from("attendance")
      .update({ check_out_time: new Date().toISOString() })
      .eq("id", todayRecord.id).select().single();
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { setTodayRecord(data); clearInterval(timerRef.current); toast({ title: "Checked out!" }); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin h-8 w-8 border-2 border-[#00D4FF] border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-6">
      {/* Employee Check-in Section */}
      {employeeId && (
        <div className="rounded-xl border border-[#1A2C45] p-6" style={{ background: "#0F1E35" }}>
          <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Today's Attendance</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Timer */}
            <div className="text-center">
              <div className="text-4xl font-mono text-[#00D4FF] font-bold tracking-wider">{formatTime(elapsed)}</div>
              <p className="text-xs text-[#556677] mt-1">Hours Worked</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!todayRecord ? (
                <Button onClick={handleCheckIn} className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg">
                  <LogIn className="h-5 w-5 mr-2" /> Check In
                </Button>
              ) : !todayRecord.check_out_time ? (
                <Button onClick={handleCheckOut} className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                  <LogOut className="h-5 w-5 mr-2" /> Check Out
                </Button>
              ) : (
                <Badge className="bg-green-500/20 text-green-400 border-0 text-sm px-4 py-2">
                  ✓ Completed — {todayRecord.check_in_time && format(new Date(todayRecord.check_in_time), "hh:mm a")}
                  {" → "}{format(new Date(todayRecord.check_out_time), "hh:mm a")}
                </Badge>
              )}
            </div>
          </div>

          {/* Week History */}
          <div className="mt-6">
            <h4 className="text-sm text-[#8899AA] mb-2">This Week</h4>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => {
                const date = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i);
                const dateStr = format(date, "yyyy-MM-dd");
                const record = weekRecords.find(r => r.date === dateStr);
                const isToday = dateStr === today;
                const statusColor = record?.status === "present" ? "#22C55E" : record?.status === "leave" ? "#EAB308" : record ? "#EF4444" : "#1A2C45";
                return (
                  <div key={i} className={`text-center p-2 rounded-lg border ${isToday ? "border-[#00D4FF]" : "border-[#1A2C45]"}`}
                    style={{ background: "#0A1628" }}>
                    <p className="text-[10px] text-[#556677]">{format(date, "EEE")}</p>
                    <p className="text-xs text-white">{format(date, "d")}</p>
                    <div className="h-1.5 w-1.5 rounded-full mx-auto mt-1" style={{ background: statusColor }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Admin/Manager View */}
      {(isAdmin || isManager) && (
        <div className="rounded-xl border border-[#1A2C45] p-5" style={{ background: "#0F1E35" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>Team Attendance</h3>
            <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
              className="w-44 bg-[#0A1628] border-[#1A2C45] text-white" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1A2C45]">
                  <th className="text-left p-3 text-[#556677] font-medium">Employee</th>
                  <th className="text-left p-3 text-[#556677] font-medium">Check In</th>
                  <th className="text-left p-3 text-[#556677] font-medium">Check Out</th>
                  <th className="text-left p-3 text-[#556677] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {allAttendance.length === 0 ? (
                  <tr><td colSpan={4} className="text-center p-6 text-[#556677]">No records for this date</td></tr>
                ) : allAttendance.map(a => (
                  <tr key={a.id} className="border-b border-[#1A2C45]/50 hover:bg-[#0A1628]/50">
                    <td className="p-3 text-white">{(a.employees as any)?.full_name || "—"}</td>
                    <td className="p-3 text-[#8899AA]">{a.check_in_time ? format(new Date(a.check_in_time), "hh:mm a") : "—"}</td>
                    <td className="p-3 text-[#8899AA]">{a.check_out_time ? format(new Date(a.check_out_time), "hh:mm a") : "—"}</td>
                    <td className="p-3">
                      <Badge className={`text-[10px] border-0 ${
                        a.status === "present" ? "bg-green-500/20 text-green-400" :
                        a.status === "leave" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{a.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAttendance;
