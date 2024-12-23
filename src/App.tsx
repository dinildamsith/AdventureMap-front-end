import './App.css'
import Home from "./views/home";
import SignUpPage from "./views/signUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInPage from "./views/signIn";
import Guides from "./views/guides";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/guides" element={<Guides/>} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
