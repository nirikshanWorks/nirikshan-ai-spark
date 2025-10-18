import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const IndexPage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const WhoWeArePage = lazy(() => import("./pages/WhoWeAre"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ExpertisePage = lazy(() => import("./pages/expertise/index"));
const ExpertiseCategoryPage = lazy(() => import("./pages/expertise/[categorySlug]"));
const ExpertiseServicePage = lazy(() => import("./pages/expertise/[categorySlug]/[serviceSlug]"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudies"));
const CareersPage = lazy(() => import("./pages/Careers"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const TermsPage = lazy(() => import("./pages/Terms"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));
const JourneyPage = lazy(() => import("./pages/Journey"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={(
            <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
              <span className="animate-pulse">Loading...</span>
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/who-we-are" element={<WhoWeArePage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/expertise/:categorySlug" element={<ExpertiseCategoryPage />} />
            <Route path="/expertise/:categorySlug/:serviceSlug" element={<ExpertiseServicePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
