import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/no-page/NoPage";
import AboutPage from "./pages/about/AboutPage";
import { VehicleTypes } from "./pages/vehicles/models/VehicleTypes";
import UploadPage from "./pages/admin/upload/UploadPage";
import DetailsPage from "./pages/details/DetailsPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import FaqPage from "./pages/faq/FaqPage";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminShowcase from "./pages/admin/showcase/AdminShowcase";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { useEffect } from "react";

const supabase = createClient(
  "https://xxsbhmnnstzhatmoivxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0"
);

export default function App() {
  useEffect(() => {
    async function fetchCurrentUser() {
      const { data, error } = await supabase.auth.getSession();

      // console.log(data);
    }

    fetchCurrentUser();
  }, [supabase]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<VehiclesPage />} />
        <Route path="/about-us" element={<AboutPage path={"about-us"} />} />
        <Route
          path={`/${VehicleTypes.ClassicCars.value}`}
          element={<VehiclesPage vehicleType={VehicleTypes.ClassicCars} />}
        />
        <Route
          path={`/${VehicleTypes.ModernClassics.value}`}
          element={<VehiclesPage vehicleType={VehicleTypes.ModernClassics} />}
        />
        <Route
          path={`/${VehicleTypes.ClassicBikes.value}`}
          element={<VehiclesPage vehicleType={VehicleTypes.ClassicBikes} />}
        />
        <Route
          path={`/${VehicleTypes.Automobiles.value}`}
          element={<VehiclesPage vehicleType={VehicleTypes.Automobiles} />}
        />
        <Route path="/:carType/:carSlugName" element={<DetailsPage />} />

        <Route path="/how-to-sell-with-us" element={<FaqPage />} />

        {/* Admin section */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<UploadPage />} />
        <Route path="/admin/showcase" element={<AdminShowcase />} />

        {/* Global fallback */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
