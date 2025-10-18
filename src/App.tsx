import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import WhoWeAre from "./pages/WhoWeAre";
import Services from "./pages/Services";
import ExpertisePage from "./pages/expertise/index";
import ExpertiseCategoryPage from "./pages/expertise/[categorySlug]";
import ExpertiseServicePage from "./pages/expertise/[categorySlug]/[serviceSlug]";
import Projects from "./pages/Projects";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/expertise/*" element={
            <Routes>
              <Route index element={<ExpertisePage />} />
              <Route path=":categorySlug" element={<ExpertiseCategoryPage />} />
              <Route path=":categorySlug/:serviceSlug" element={<ExpertiseServicePage />} />
            </Routes>
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
