import React, { useEffect, useState } from "react";
import { base_domain, api_key } from "../../utils/apiDetails";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

import "./CategoryMenu.css";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchCategories = async (baseDomain, apiKey) => {
    try {
      const resp = await axios.get(
        `${baseDomain}/api/v1/ecommerce/clothes/categories`,
        {
          headers: {
            projectId: apiKey,
          },
        }
      );
      setCategories(resp.data.data);
      console.log("categories", categories);
    } catch (error) {
      console.error("Error fetching category list", error);
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
    fetchCategories(base_domain, api_key);
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
