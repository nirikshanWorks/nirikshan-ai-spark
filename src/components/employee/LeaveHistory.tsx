import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface LeaveHistoryProps {
  employeeId: string;
}

interface LeaveRecord {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  admin_remarks: string | null;
  created_at: string;
}

export const LeaveHistory = ({ employeeId }: LeaveHistoryProps) => {
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, [employeeId]);

  const fetchLeaves = async () => {
    const { data, error } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("employee_id", employeeId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLeaves(data);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getLeaveTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      sick: "Sick Leave",
      casual: "Casual Leave",
      earned: "Earned Leave",
      unpaid: "Unpaid Leave",
      other: "Other",
    };
    return <Badge variant="outline">{labels[type] || type}</Badge>;
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Leave History
        </CardTitle>
        <CardDescription>
          Your leave requests and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {leaves.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No leave requests found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{getLeaveTypeBadge(leave.leave_type)}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(leave.start_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      {" - "}
                      {new Date(leave.end_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{calculateDays(leave.start_date, leave.end_date)}</TableCell>
                    <TableCell>{getStatusBadge(leave.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {leave.admin_remarks || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
