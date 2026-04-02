import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CrmLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#050A14" }}>
      <div className="w-full max-w-md p-8 rounded-2xl border" style={{ background: "#0A1628", borderColor: "#1A2C45" }}>
        <div className="text-center mb-8">
          <img src="/nirikshan-ai-logo.svg" alt="Nirikshan AI" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold" style={{ color: "#fff", fontFamily: "Syne, sans-serif" }}>
            CRM Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8899AA" }}>Sign in to your workspace</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#8899AA" }}>Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@nirikshanai.com"
              required
              className="border-[#1A2C45] bg-[#0F1E35] text-white placeholder:text-[#556677] focus-visible:ring-[#00D4FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#8899AA" }}>Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border-[#1A2C45] bg-[#0F1E35] text-white placeholder:text-[#556677] focus-visible:ring-[#00D4FF] pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#556677] hover:text-white">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-[#00D4FF] hover:bg-[#00B8E0] text-[#050A14] font-semibold">
            {loading ? "Signing in..." : <><LogIn className="h-4 w-4 mr-2" /> Sign In</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CrmLogin;
