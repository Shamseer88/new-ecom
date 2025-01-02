import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import GenderPage from "./pages/GenderPage/GenderPage";
import { GenderProvider } from "./context/GenderContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const gender = location.pathname.split("/")[1];

  const handleCategoryChange = (category) => {
    navigate(`/${gender}/${category}`);
  };

  return (
    <GenderProvider>
      <div className="navbars">
        <TopNavbar />
        <BottomNavbar gender={gender} onCategoryChange={handleCategoryChange} />
      </div>
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
