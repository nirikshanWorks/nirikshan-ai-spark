import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { LogIn, Mail, Lock } from "lucide-react";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkEmployeeAndRedirect(session.user.id);
      }
    });
  }, []);

  const checkEmployeeAndRedirect = async (userId: string) => {
    const { data: employee } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (employee) {
      navigate("/employee/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Wait briefly for the session to fully propagate before querying RLS-protected tables
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Re-fetch session to ensure auth.uid() is available for RLS
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Session not established. Please try again.");
      }

      // Check if user is an employee
      const { data: employee, error: empError } = await supabase
        .from("employees")
        .select("id, full_name")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (empError || !employee) {
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You are not registered as an employee. Please contact HR.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Welcome back!",
        description: `Logged in as ${employee.full_name}`,
      });

      navigate("/employee/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Employee Portal</CardTitle>
          <CardDescription>
            Login with your company email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLogin;
