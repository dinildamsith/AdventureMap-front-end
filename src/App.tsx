import './App.css';
import { Toaster } from 'react-hot-toast'; // Ensure you have imported the Toaster
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import SignUpPage from "./views/signUp";
import SignInPage from "./views/signIn";
import Guides from "./views/buyer/guides/guidesShowArea.tsx";
import GuideProfile from "./views/buyer/guides/guideProfile.tsx";
import Vehicles from "./views/buyer/vehicles/vehiclesShowArea.tsx";
import VehicleProfile from "./views/buyer/vehicles/vehicleProfile.tsx";
import GuideProfileManage from "./views/seller/guide/guideProfileManage.tsx";
import VehicleProfileManage from "./views/seller/vehicle/vehicleProfileManage.tsx";
import GuideSaveView from "./views/seller/guide/guideSaveView.tsx";
import VehicleSaveView from "./views/seller/vehicle/vehicleSaveView.tsx";
import BuyerProfile from "./views/buyer/buyerProfile.tsx";
import OrderBuyViewVehicle from "./views/buyer/orderBuyViewVehicle.tsx";
import OrderBuyViewGuide from "./views/buyer/orderBuyViewGuide.tsx";
import Locations from "./views/buyer/locations";

function App() {
    return (
        <>
            {/* Add the Toaster component here to ensure it's globally available */}
            <Toaster
                position="top-right" // You can adjust the position as per your preference
                reverseOrder={false}
            />

            {/* Wrap your routes with the BrowserRouter */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/buyer-profile" element={<BuyerProfile/>} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/guide-profile/:guideEmail" element={<GuideProfile />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/vehicle-profile/:vehicleEmail" element={<VehicleProfile />} />
                    <Route path="/guide-manage" element={<GuideProfileManage />} />
                    <Route path="/vehicle-manage" element={<VehicleProfileManage />} />
                    <Route path="/guide-save" element={<GuideSaveView />} />
                    <Route path="/vehicle-save" element={<VehicleSaveView />} />
                    <Route path="/order/:orderVehicle" element={<OrderBuyViewVehicle/>} />
                    <Route path="/order-guide/:orderGuide" element={<OrderBuyViewGuide/>} />
                    <Route path="/locations" element={<Locations/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
