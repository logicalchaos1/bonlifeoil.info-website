import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const BuyersForm = lazy(() => import("./pages/BuyersForm"));
const TrialReport = lazy(() => import("./pages/TrialReport"));
const ChefPartners = lazy(() => import("./pages/ChefPartners"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SeoDashboard = lazy(() => import("./pages/SeoDashboard"));
const ReferralProgram = lazy(() => import("./pages/ReferralProgram"));
const ROICalculator = lazy(() => import("./pages/ROICalculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bonlife</p>
      <p className="text-lg font-medium">Loading the page...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/index" element={<Index />} />
              <Route path="/formulario-comprador" element={<BuyersForm />} />
              <Route path="/reporte-piloto" element={<TrialReport />} />
              <Route path="/chef-partners" element={<ChefPartners />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/seo-dashboard" element={<SeoDashboard />} />
              <Route path="/seo" element={<SeoDashboard />} />
              <Route path="/referidos" element={<ReferralProgram />} />
              <Route path="/calculadora-ahorro" element={<ROICalculator />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
