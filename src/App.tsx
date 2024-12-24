import './App.css'
import Home from "./views/home";
import SignUpPage from "./views/signUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./views/signIn";
import Guides from "./views/buyer/guides/guidesShowArea.tsx";
import GuideProfile from "./views/buyer/guides/guideProfile.tsx";
import Vehicles from "./views/buyer/vehicles/vehiclesShowArea.tsx";
import VehicleProfile from "./views/buyer/vehicles/vehicleProfile.tsx";
import GuideProfileManage from "./views/seller/guide/guideProfileManage.tsx";
import VehicleProfileManage from "./views/seller/vehicle/vehicleProfileManage.tsx";


function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/guides" element={<Guides/>} />
                  <Route path="/guide-profile" element={<GuideProfile/>} />
                  <Route path="/vehicles" element={<Vehicles/>} />
                  <Route path="/vehicle-profile" element={<VehicleProfile/>} />
                  <Route path="/guide-manage" element={<GuideProfileManage/>} />
                  <Route path="/vehicle-manage" element={<VehicleProfileManage/>} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
