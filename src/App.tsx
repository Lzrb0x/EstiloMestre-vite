import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingIcon } from "./components/LoadingIcon";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const BarbershopDetails = lazy(() => import("./pages/Barbershop/BarbershopDetails"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingIcon />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/barbershop/:id/barbershopDetails" element={<BarbershopDetails />} />
      </Routes>
    </Suspense>
  );
}
