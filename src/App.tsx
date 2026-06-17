import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Challenge from "./pages/Challenge";
import ChallengeSelect from "./pages/ChallengeSelect";
import Teacher from "./pages/Teacher";
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
          <Route path="/desafios" element={<ChallengeSelect />} />
          <Route path="/desafio/:id" element={<Challenge />} />
          <Route path="/professor" element={<Teacher />} />
          {/* Legacy redirect */}
          <Route path="/desafio" element={<Navigate to="/desafio/1" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
