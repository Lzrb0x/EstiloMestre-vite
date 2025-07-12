import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const BarbershopPage = lazy(() => import("./pages/BarbershopPage"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[90vh] text-9xl font-medium text-primary">
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/barbershop" element={<BarbershopPage />} />
      </Routes>
    </Suspense>
  );
}
