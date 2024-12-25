import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import fetchCategories from "../../utils/getCategories";

import "./CategoryMenu.css";

const CategoryMenu = () => {
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
            <p key={index} className="category-item" onClick={closeMenu}>
              {capitalizeFirstLetter(category)}
            </p>
          ))}
        </div>
      )}
      <div className="inline-menu">
        {categories.map((category, index) => (
          <p key={index} className="category-item">
            {capitalizeFirstLetter(category)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
