import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/no-page/NoPage";
import AboutPage from "./pages/about/AboutPage";
import { OtherTypes, VehicleTypes } from "./pages/vehicles/models/VehicleTypes";
import UploadPage from "./pages/admin/upload/UploadPage";
import DetailsPage from "./pages/details/DetailsPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import FaqPage from "./pages/faq/FaqPage";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminShowcase from "./pages/admin/showcase/AdminShowcase";
import { useEffect } from "react";
import { supabase } from "./config/config";


export default function App() {
  useEffect(() => {
    async function fetchCurrentUser() {
      const { data, error } = await supabase.auth.getSession();
    }

    fetchCurrentUser();
  }, [supabase]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<VehiclesPage otherType={OtherTypes.Everything} />} />
        <Route path="/about-us" element={<AboutPage path={"about-us"} />} />
        <Route path="/all-cars" element={<VehiclesPage otherType={OtherTypes.AllCars} />} />
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
