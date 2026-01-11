import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  CheckCircle, 
  Calendar, 
  Clock, 
  User,
  CalendarDays,
  FileText
} from "lucide-react";
import { MarkAttendance } from "@/components/employee/MarkAttendance";
import { AttendanceHistory } from "@/components/employee/AttendanceHistory";
import { LeaveRequestForm } from "@/components/employee/LeaveRequestForm";
import { LeaveHistory } from "@/components/employee/LeaveHistory";

interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  department: string | null;
  designation: string | null;
}

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/employee/login");
      return;
    }

    // Fetch employee data
    const { data: emp, error } = await supabase
      .from("employees")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error || !emp) {
      toast({
        title: "Access Denied",
        description: "You are not registered as an employee.",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      navigate("/employee/login");
      return;
    }

    setEmployee(emp);
    fetchTodayAttendance(emp.id);
    setLoading(false);
  };

  const fetchTodayAttendance = async (empId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("employee_id", empId)
      .eq("date", today)
      .maybeSingle();
    
    setTodayAttendance(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/employee/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">{employee?.full_name}</h1>
              <p className="text-sm text-muted-foreground">
                {employee?.designation} • {employee?.department}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  todayAttendance ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Status</p>
                  <p className="font-semibold text-lg">
                    {todayAttendance ? 'Present' : 'Not Marked'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-in Time</p>
                  <p className="font-semibold text-lg">
                    {todayAttendance?.check_in_time 
                      ? new Date(todayAttendance.check_in_time).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : '--:--'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-semibold text-lg">{employee?.employee_id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Mark Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="attendance-history" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="apply-leave" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Apply Leave</span>
            </TabsTrigger>
            <TabsTrigger value="leave-history" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Leaves</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <MarkAttendance 
              employeeId={employee?.id || ''} 
              todayAttendance={todayAttendance}
              onAttendanceMarked={() => fetchTodayAttendance(employee?.id || '')}
            />
          </TabsContent>

          <TabsContent value="attendance-history">
            <AttendanceHistory 
              employeeId={employee?.id || ''} 
              employeeName={employee?.full_name}
              employeeCode={employee?.employee_id}
              department={employee?.department || ''}
              designation={employee?.designation || ''}
            />
          </TabsContent>

          <TabsContent value="apply-leave">
            <LeaveRequestForm employeeId={employee?.id || ''} />
          </TabsContent>

          <TabsContent value="leave-history">
            <LeaveHistory employeeId={employee?.id || ''} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
