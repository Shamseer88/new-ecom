import React from "react";
import "./BottomNavbar.css";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import SearchBar from "../SearchBar/SearchBar";

const BottomNavbar = ({ onCategoryChange }) => {
  return (
    <div className="bottom-navbar">
      <CategoryMenu onCategoryChange={onCategoryChange} />
      <SearchBar />
    </div>
  );
};

export default BottomNavbar;
