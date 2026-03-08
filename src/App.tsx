import { lazy, Suspense, useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { PageTransition } from "@/components/PageTransition";
import { EyeLoader, EyeLoaderInline } from "@/components/EyeLoader";
import { MouseColorSplatter } from "@/components/MouseColorSplatter";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"));
const Services = lazy(() => import("./pages/Services"));
const ExpertisePage = lazy(() => import("./pages/expertise/index"));
const ExpertiseCategoryPage = lazy(() => import("./pages/expertise/[categorySlug]"));
const ExpertiseServicePage = lazy(() => import("./pages/expertise/[categorySlug]/[serviceSlug]"));
const Projects = lazy(() => import("./pages/Projects"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Journey = lazy(() => import("./pages/Journey"));
const Applications = lazy(() => import("./pages/Applications"));
const Auth = lazy(() => import("./pages/Auth"));
const CertificateVerify = lazy(() => import("./pages/CertificateVerify"));
const AdminCertificates = lazy(() => import("./pages/admin/Certificates"));
const AdminHRManagement = lazy(() => import("./pages/admin/HRManagement"));
const EmployeeLogin = lazy(() => import("./pages/employee/Login"));
const EmployeeDashboard = lazy(() => import("./pages/employee/Dashboard"));
const CampaignIntelligence = lazy(() => import("./pages/CampaignIntelligence"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => <EyeLoaderInline />;

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/who-we-are" element={<PageTransition><WhoWeAre /></PageTransition>} />
        <Route path="/expertise" element={<PageTransition><ExpertisePage /></PageTransition>} />
        <Route path="/expertise/:categorySlug" element={<PageTransition><ExpertiseCategoryPage /></PageTransition>} />
        <Route path="/expertise/:categorySlug/:serviceSlug" element={<PageTransition><ExpertiseServicePage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
        <Route path="/journey" element={<PageTransition><Journey /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/applications" element={<PageTransition><Applications /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/verify" element={<PageTransition><CertificateVerify /></PageTransition>} />
        <Route path="/verify/:certificateNumber" element={<PageTransition><CertificateVerify /></PageTransition>} />
        <Route path="/admin/certificates" element={<PageTransition><AdminCertificates /></PageTransition>} />
        <Route path="/admin/hr" element={<PageTransition><AdminHRManagement /></PageTransition>} />
        <Route path="/employee/login" element={<PageTransition><EmployeeLogin /></PageTransition>} />
        <Route path="/employee/dashboard" element={<PageTransition><EmployeeDashboard /></PageTransition>} />
        <Route path="/campaign-intelligence" element={<PageTransition><CampaignIntelligence /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const handleLoaderComplete = useCallback(() => setAppReady(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          {!appReady && <EyeLoader onComplete={handleLoaderComplete} />}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes />
              </Suspense>
              <Chatbot />
              <MouseColorSplatter />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
