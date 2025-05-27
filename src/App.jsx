import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtherPage from "./pages/OtherPage";
import NoPage from "./pages/no-page/NoPage";
import AboutPage from "./pages/about/AboutPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import { VehicleTypes } from "./pages/vehicles/models/VehicleTypes";
import UploadPage from "./pages/admin/upload/UploadPage";
import AdminDisplay from "./pages/admin/display/AdminDisplay";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <VehiclesPage path={"/"} vehicleType={VehicleTypes.ClassicCars} />
            }
          />
        
          <Route path="about" element={<AboutPage path={"about"} />} />

          <Route
            path={VehicleTypes.ModernClassics}
            element={
              <VehiclesPage
                path={VehicleTypes.ModernClassics}
                vehicleType={VehicleTypes.ModernClassics}
              />
            }
          />
          {/* 



*/}
          <Route path="admin/display" element={<AdminDisplay />} />
          <Route path="admin/upload" element={<UploadPage />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
