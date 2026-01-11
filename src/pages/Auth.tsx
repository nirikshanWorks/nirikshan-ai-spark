import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail, CheckCircle, Clock, Home } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ email: "", password: "", confirmPassword: "" });

  useEffect(() => {
    // Check if user is already logged in and determine where to redirect
    const checkSessionAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await handleUserRedirect(session.user.id);
      }
    };
    checkSessionAndRole();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        // Use setTimeout to avoid Supabase deadlock
        setTimeout(() => {
          handleUserRedirect(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUserRedirect = async (userId: string) => {
    // Check if user is admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleData) {
      // User is admin, redirect to admin panel
      navigate("/admin/hr");
      return;
    }

    // Check if user is an employee
    const { data: employeeData } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (employeeData) {
      // User is an employee, redirect to employee dashboard
      navigate("/employee/dashboard");
      return;
    }

    // User is neither admin nor employee - show signup complete message
    setSignupComplete(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!loginForm.email || !loginForm.password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.session) {
        toast.success("Logged in successfully!");
        // Redirect will be handled by onAuthStateChange
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      if (signupForm.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/auth`;

      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please login instead.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      // Send notification to HR about new signup
      try {
        const { error: notifyError } = await supabase.functions.invoke("notify-hr-new-user", {
          body: {
            userEmail: signupForm.email,
            signupTime: new Date().toISOString(),
          },
        });

        if (notifyError) {
          console.error("Failed to notify HR:", notifyError);
          // Don't block signup if notification fails
        } else {
          console.log("HR notification sent successfully");
        }
      } catch (notifyErr) {
        console.error("Error sending HR notification:", notifyErr);
      }

      // Show signup complete message
      setSignupComplete(true);
      toast.success("Account created successfully! HR has been notified.");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSignupComplete(false);
  };

  // Show signup complete / pending approval screen
  if (signupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              Thank You for Signing Up!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Your account has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3 text-left">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Please wait for HR to add you as an employee. Once added, you'll be able to access the Employee Dashboard.
                </p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>You will receive access to:</p>
              <ul className="mt-2 space-y-1 text-left list-disc list-inside">
                <li>Mark your daily attendance</li>
                <li>View attendance history</li>
                <li>Apply for leaves</li>
                <li>Track leave request status</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="outline" onClick={handleLogout} className="w-full">
                Sign Out
              </Button>
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full gap-2">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
