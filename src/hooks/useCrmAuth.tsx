import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type CrmRole = "admin" | "manager" | "employee";

interface CrmProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  department: string | null;
  designation: string | null;
  avatar_url: string | null;
  is_active: boolean;
}

interface CrmAuthContextType {
  user: User | null;
  session: Session | null;
  profile: CrmProfile | null;
  role: CrmRole;
  loading: boolean;
  isAdmin: boolean;
  isManager: boolean;
  signOut: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthContextType | undefined>(undefined);

export const CrmAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<CrmProfile | null>(null);
  const [role, setRole] = useState<CrmRole>("employee");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (data) setProfile(data as CrmProfile);
  };

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (data && data.length > 0) {
      const roles = data.map((r: any) => r.role);
      if (roles.includes("admin")) setRole("admin");
      else if (roles.includes("manager")) setRole("manager");
      else setRole("employee");
    } else {
      setRole("employee");
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
          fetchRole(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setRole("employee");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        Promise.all([fetchProfile(session.user.id), fetchRole(session.user.id)]).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole("employee");
  };

  return (
    <CrmAuthContext.Provider value={{
      user, session, profile, role, loading,
      isAdmin: role === "admin",
      isManager: role === "manager",
      signOut,
    }}>
      {children}
    </CrmAuthContext.Provider>
  );
};

export const useCrmAuth = () => {
  const context = useContext(CrmAuthContext);
  if (!context) throw new Error("useCrmAuth must be used within CrmAuthProvider");
  return context;
};
