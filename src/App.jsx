import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, data } from "react-router-dom";
import OtherPage from "./pages/OtherPage";
import NoPage from "./pages/no-page/NoPage";
import AboutPage from "./pages/about/AboutPage";
import { VehicleTypes } from "./pages/vehicles/models/VehicleTypes";
import UploadPage from "./pages/admin/upload/UploadPage";
import AdminDisplay from "./pages/admin/dashboard/AdminDashboard";
import DetailsPage from "./pages/details/DetailsPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
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

      console.log(data);
    }

    fetchCurrentUser();
  }, [supabase]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <VehiclesPage vehicleType={VehicleTypes.ClassicCars} />
            }
          />
          <Route path="about" element={<AboutPage path={"about"} />} />
          <Route
            path={VehicleTypes.ModernClassics.value}
            element={
              <VehiclesPage
                vehicleType={VehicleTypes.ModernClassics}
              />
            }
          />
          <Route path="/:carType/:carSlugName" element={<DetailsPage />} />
          {/* 



*/}
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="showcase" element={<AdminShowcase />} />
            {/* <Route path="login" element={<LoginPage />} /> */}
            <Route path="*" element={<NoPage />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
