import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import GenderPage from "./pages/GenderPage/GenderPage";
import { GenderProvider } from "./context/GenderContext";

function App() {
  const location = useLocation();
  const gender = location.pathname.split("/")[1];
  console.log("GENDER", gender);
  return (
    <GenderProvider>
      <TopNavbar />
      <BottomNavbar gender={gender} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:gender/:category?" element={<GenderPage />} />
      </Routes>
    </GenderProvider>
  );
}

export default App;
