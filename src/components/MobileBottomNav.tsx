import { Home, Briefcase, Layers, Phone, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Layers, label: "Expertise", path: "/expertise" },
  { icon: Briefcase, label: "Projects", path: "/projects" },
  { icon: Phone, label: "Contact", path: "/contact" },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  // Hide on dashboard/admin/employee pages
  const hiddenPaths = ["/dashboard", "/admin", "/employee", "/login"];
  if (hiddenPaths.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      {/* Safe area background */}
      <div className="bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div
          className="flex items-stretch"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive =
              path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 px-1 transition-all duration-200 relative group ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
                )}
                <span
                  className={`flex items-center justify-center w-10 h-7 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 scale-110"
                      : "group-hover:bg-secondary/60"
                  }`}
                >
                  <Icon
                    size={isActive ? 21 : 20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </span>
                <span
                  className={`text-[10px] font-medium leading-tight ${
                    isActive ? "text-primary font-semibold" : ""
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

