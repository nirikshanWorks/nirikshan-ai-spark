import { useEffect } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useCrmAuth, CrmAuthProvider } from "@/hooks/useCrmAuth";
import {
  LayoutDashboard, Users, Clock, CheckSquare, Target, MessageCircle,
  LogOut, ChevronLeft, ChevronRight, Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/dashboard/employees", label: "Employees", icon: Users },
  { path: "/dashboard/attendance", label: "Attendance", icon: Clock },
  { path: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/dashboard/leads", label: "Leads", icon: Target },
  { path: "/dashboard/messages", label: "Messages", icon: MessageCircle },
];

const DashboardLayoutInner = () => {
  const { user, profile, role, loading, signOut } = useCrmAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050A14" }}>
        <div className="animate-spin h-8 w-8 border-2 border-[#00D4FF] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const roleBadgeColor = role === "admin" ? "bg-red-500/20 text-red-400" : role === "manager" ? "bg-yellow-500/20 text-yellow-400" : "bg-[#00D4FF]/20 text-[#00D4FF]";

  return (
    <div className="min-h-screen flex" style={{ background: "#050A14", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "w-16" : "w-60"}`}
        style={{ background: "#0A1628", borderRight: "1px solid #1A2C45" }}>
        
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[#1A2C45] shrink-0">
          {!collapsed && <img src="/nirikshan-ai-logo.svg" alt="Logo" className="h-7" />}
          <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}
            className="ml-auto text-[#556677] hover:text-white hidden lg:block">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.end ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <NavLink key={item.path} to={item.path} end={item.end}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "text-[#00D4FF] bg-[#00D4FF]/10 border-l-2 border-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                    : "text-[#8899AA] hover:text-white hover:bg-white/5 border-l-2 border-transparent"}`}>
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-[#1A2C45] shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <Badge className={`text-[10px] px-1.5 py-0 ${roleBadgeColor} border-0`}>{role}</Badge>
              </div>
            </div>
          )}
          <Button variant="ghost" onClick={signOut}
            className={`w-full text-[#8899AA] hover:text-red-400 hover:bg-red-500/10 ${collapsed ? "px-0 justify-center" : "justify-start"}`}>
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center px-4 lg:px-6 border-b border-[#1A2C45] shrink-0 sticky top-0 z-30"
          style={{ background: "#050A14" }}>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#8899AA] hover:text-white mr-3">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            {navItems.find(n => n.end ? location.pathname === n.path : location.pathname.startsWith(n.path))?.label || "Dashboard"}
          </h2>
          <div className="ml-auto flex items-center gap-3">
            <Badge className={`${roleBadgeColor} border-0 hidden sm:inline-flex`}>{role}</Badge>
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-[#1A2C45] text-[#00D4FF] text-xs">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
