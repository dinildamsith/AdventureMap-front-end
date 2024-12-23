import './App.css'
import Home from "./views/home";
import SignUpPage from "./views/signUp";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/sign-up" element={<SignUpPage />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
