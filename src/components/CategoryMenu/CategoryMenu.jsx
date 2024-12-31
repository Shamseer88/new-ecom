import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import fetchCategories from "../../utils/getCategories";

import "./CategoryMenu.css";
import { NavLink } from "react-router-dom";
import { useGender } from "../../context/GenderContext";

const CategoryMenu = () => {
  const { gender } = useGender();
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loadCategories = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategories(data);
    }
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="category-menu">
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      {isMenuOpen && (
        <div className="menu-items">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "category-item active-category-link"
                  : "category-item"
              }
              onClick={closeMenu}
              to={`/${gender}/${category}`}
            >
              {capitalizeFirstLetter(category)}
            </NavLink>
          ))}
        </div>
      )}
      <div className="inline-menu">
        {categories.map((category, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              isActive ? "category-item active-category-link" : "category-item"
            }
            to={`/${gender}/${category}`}
          >
            {capitalizeFirstLetter(category)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
