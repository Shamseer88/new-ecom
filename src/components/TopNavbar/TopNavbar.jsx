import "./TopNavbar.css";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useGender } from "../../context/GenderContext";

const TopNavbar = () => {
  const { setGender } = useGender();
  return (
    <div className="topnavbar">
      <div className="topnavbar-left">
        <NavLink to="/" className="logo-text">
          <h3>SHOP.CO</h3>
        </NavLink>
      </div>
      <div className="topnavbar-middle">
        <NavLink
          to="/Men"
          onClick={() => setGender("Men")}
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          MEN
        </NavLink>
        <NavLink
          to="/Women"
          onClick={() => setGender("Women")}
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          WOMEN
        </NavLink>
      </div>
      <div className="topnavbar-right">
        <FaRegUser className="user-icon" />
        <FaRegHeart size={17} className="heart-icon" />
        <FiShoppingCart size={18} className="cart-icon" />
      </div>
    </div>
  );
};

export default TopNavbar;
