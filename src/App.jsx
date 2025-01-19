import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import GenderPage from "./pages/GenderPage/GenderPage";
import { GenderProvider } from "./context/GenderContext";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const gender = location.pathname.split("/")[1];

  const handleCategoryChange = (category) => {
    navigate(`/${gender}/${category}`);
  };

  return (
    <AuthProvider>
      <GenderProvider>
        <div className="navbars">
          <TopNavbar />
          <BottomNavbar
            gender={gender}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:gender/:category?" element={<GenderPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </GenderProvider>
    </AuthProvider>
  );
}

export default App;
