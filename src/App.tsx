import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";

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
import AcceptOffer from "./pages/AcceptOffer";
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/who-we-are" element={<WhoWeAre />} />
                <Route path="/expertise" element={<ExpertisePage />} />
                <Route path="/expertise/:categorySlug" element={<ExpertiseCategoryPage />} />
                <Route path="/expertise/:categorySlug/:serviceSlug" element={<ExpertiseServicePage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/accept-offer" element={<AcceptOffer />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
