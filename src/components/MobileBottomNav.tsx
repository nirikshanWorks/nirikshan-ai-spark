import { Home, Package, Layers, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "HOME", path: "/" },
  { icon: Layers, label: "SOLUTIONS", path: "/services" },
  { icon: Package, label: "PRODUCTS", path: "/products" },
  { icon: Phone, label: "CONTACT", path: "/contact" },
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
      <div className="bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-xl border-t border-concrete/40 dark:border-charcoal-border shadow-md">
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
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-all duration-150 relative group ${
                  isActive
                    ? "text-charcoal dark:text-ivory"
                    : "text-concrete-dark dark:text-concrete hover:text-charcoal"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active indicator line */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-0.5 bg-sage-deep dark:bg-sage" />
                )}
                <span
                  className={`flex items-center justify-center w-8 h-6 transition-all duration-150 ${
                    isActive ? "text-sage-deep dark:text-sage" : "group-hover:text-burntamber"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </span>
                <span
                  className={`text-[9px] font-mono tracking-wider ${
                    isActive ? "font-bold text-sage-deep dark:text-sage" : "group-hover:text-burntamber"
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
