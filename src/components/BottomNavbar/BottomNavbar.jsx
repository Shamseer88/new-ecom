import React from "react";
import "./BottomNavbar.css";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import SearchBar from "../SearchBar/SearchBar";

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <CategoryMenu />
      <SearchBar />
    </div>
  );
};

export default BottomNavbar;
