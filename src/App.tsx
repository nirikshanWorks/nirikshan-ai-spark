import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { PageTransition } from "@/components/PageTransition";

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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse"></div>
      </div>
    </div>
  </div>
);

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
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
            <Chatbot />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
