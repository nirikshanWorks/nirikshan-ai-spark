import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Ghost404 } from "@/components/ui/ghost-404-page";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 — Page Not Found | Nirikshan AI";
  }, [location.pathname]);

  return <Ghost404 />;
};

export default NotFound;
