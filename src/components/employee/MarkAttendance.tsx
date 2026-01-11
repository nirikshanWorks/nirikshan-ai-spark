import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, Clock, Fingerprint, CalendarOff, PartyPopper } from "lucide-react";
import { format } from "date-fns";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string | null;
}

interface MarkAttendanceProps {
  employeeId: string;
  todayAttendance: any;
  onAttendanceMarked: () => void;
}

export const MarkAttendance = ({ employeeId, todayAttendance, onAttendanceMarked }: MarkAttendanceProps) => {
  const [loading, setLoading] = useState(false);
  const [todayHoliday, setTodayHoliday] = useState<Holiday | null>(null);
  const [checkingHoliday, setCheckingHoliday] = useState(true);

  const today = new Date();
  const isSunday = today.getDay() === 0;

  useEffect(() => {
    checkTodayHoliday();
  }, []);

  const checkTodayHoliday = async () => {
    const todayStr = format(today, 'yyyy-MM-dd');
    const { data } = await supabase
      .from("holidays")
      .select("*")
      .eq("date", todayStr)
      .maybeSingle();
    
    setTodayHoliday(data);
    setCheckingHoliday(false);
  };

  const handleMarkAttendance = async () => {
    if (todayAttendance) {
      toast({
        title: "Already Marked",
        description: "You have already marked your attendance for today.",
        variant: "destructive",
      });
      return;
    }

    if (isSunday) {
      toast({
        title: "Cannot Mark Attendance",
        description: "Today is Sunday - a weekly holiday.",
        variant: "destructive",
      });
      return;
    }

    if (todayHoliday) {
      toast({
        title: "Cannot Mark Attendance",
        description: `Today is ${todayHoliday.name} - a holiday.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("attendance")
        .insert({
          employee_id: employeeId,
          status: "present",
          check_in_time: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Attendance Marked!",
        description: "Your attendance has been recorded successfully.",
      });

      onAttendanceMarked();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark attendance",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendance || todayAttendance.check_out_time) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("attendance")
        .update({ check_out_time: new Date().toISOString() })
        .eq("id", todayAttendance.id);

      if (error) throw error;

      toast({
        title: "Checked Out!",
        description: "Your check-out time has been recorded.",
      });

      onAttendanceMarked();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to check out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingHoliday) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5" />
            Mark Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  // Show holiday message for Sunday
  if (isSunday) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarOff className="w-5 h-5" />
            Weekly Holiday
          </CardTitle>
          <CardDescription>
            Attendance marking is not available today
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8 space-y-6">
          <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
            <PartyPopper className="w-20 h-20 text-gray-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600">It's Sunday!</h3>
            <p className="text-muted-foreground mt-2">
              Enjoy your weekly holiday. See you on Monday!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show holiday message for configured holidays
  if (todayHoliday) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarOff className="w-5 h-5" />
            Holiday
          </CardTitle>
          <CardDescription>
            Attendance marking is not available today
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8 space-y-6">
          <div className="w-40 h-40 rounded-full bg-orange-100 flex items-center justify-center">
            <PartyPopper className="w-20 h-20 text-orange-500" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-orange-600">{todayHoliday.name}</h3>
            {todayHoliday.description && (
              <p className="text-muted-foreground mt-2 max-w-sm">
                {todayHoliday.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-4">
              Enjoy your holiday! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="w-5 h-5" />
          Mark Attendance
        </CardTitle>
        <CardDescription>
          Tap the button below to mark your attendance for today
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-8 space-y-6">
        {!todayAttendance ? (
          <>
            <Button
              size="lg"
              className="w-40 h-40 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={handleMarkAttendance}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="w-12 h-12" />
                  <span>TAP TO</span>
                  <span>CHECK IN</span>
                </div>
              )}
            </Button>
            <p className="text-muted-foreground text-center">
              Click the button above to mark yourself present
            </p>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-40 h-40 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600">Present Today!</h3>
              <p className="text-muted-foreground mt-1">
                Checked in at {new Date(todayAttendance.check_in_time).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            {!todayAttendance.check_out_time ? (
              <Button
                variant="outline"
                size="lg"
                onClick={handleCheckOut}
                disabled={loading}
                className="mt-4"
              >
                <Clock className="w-4 h-4 mr-2" />
                {loading ? "Processing..." : "Check Out"}
              </Button>
            ) : (
              <p className="text-muted-foreground">
                Checked out at {new Date(todayAttendance.check_out_time).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
