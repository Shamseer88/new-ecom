import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Men from "./pages/Men";
import Women from "./pages/Women";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";

function App() {
  return (
    <>
      <TopNavbar />
      <BottomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
      </Routes>
    </>
  );
}

export default App;
