import React, { useEffect, useRef, useState } from "react";
import "./TopNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useGender } from "../../context/GenderContext";
import { useAuth } from "../../context/AuthContext";

const TopNavbar = () => {
  const { setGender } = useGender();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowPopup(false); // Close the popup after logout
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setShowPopup(false); // Close the popup after navigating to login
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutsidePopup = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsidePopup);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, []);

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
        <div
          className={user && "user-name"}
          onClick={() => setShowPopup((prev) => !prev)} // Toggle popup visibility
        >
          <FaRegUser className="user-icon" />
          {user && <p>Welcome {user.name}</p>}
        </div>
        {showPopup && (
          <div className="popup" ref={popupRef}>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <div className="popup-buttons-div">
                <button onClick={handleLoginRedirect}>Login</button>
                <button onClick={handleRegisterRedirect}>Register</button>
              </div>
            )}
          </div>
        )}
        <FaRegHeart size={17} className="heart-icon" />
        <FiShoppingCart size={18} className="cart-icon" />
      </div>
    </div>
  );
};

export default TopNavbar;
