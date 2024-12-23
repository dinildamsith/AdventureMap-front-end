import './App.css'
import Home from "./views/home";
import SignUpPage from "./views/signUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./views/signIn";
import Guides from "./views/guides/guidesShowArea.tsx";
import GuideProfile from "./views/guides/guideProfile.tsx";
import Vehicles from "./views/vehicles/vehiclesShowArea.tsx";

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
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
