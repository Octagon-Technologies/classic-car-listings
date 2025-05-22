import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtherPage from "./pages/OtherPage";
import NoPage from "./pages/no-page/NoPage";
import HomePage from "./pages/home/HomePage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import {VehicleTypes} from "./pages/vehicles/models/VehicleTypes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage/>} />

          <Route path="about" element={<OtherPage path={"about"} />} />
          <Route
            path="classic-cars"
            element={
              <VehiclesPage
                path={"classic-cars"}
                vehicleType={VehicleTypes.ClassicCars}
              />
            }
          />
          <Route
            path="modern-classics"
            element={
              <VehiclesPage
                path={"modern-classics"}
                vehicleType={VehicleTypes.ModernClassics}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
