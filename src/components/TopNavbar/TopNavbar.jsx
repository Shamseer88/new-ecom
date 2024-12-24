import "./TopNavbar.css";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";

const TopNavbar = () => {
  return (
    <div className="topnavbar">
      <div className="topnavbar-left">
        <NavLink to="/" className="logo-text">
          <h3>SHOP.CO</h3>
        </NavLink>
      </div>
      <div className="topnavbar-middle">
        <NavLink to="/men">MEN</NavLink>
        <NavLink to="/women">WOMEN</NavLink>
      </div>
      <div className="topnavbar-right">
        <FaRegUser />
        <FaRegHeart />
        <FiShoppingCart />
      </div>
    </div>
  );
};

export default TopNavbar;
