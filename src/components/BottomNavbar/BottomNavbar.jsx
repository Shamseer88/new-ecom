import React from "react";
import "./BottomNavbar.css";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import SearchBar from "../SearchBar/SearchBar";

const BottomNavbar = ({ gender }) => {
  return (
    <div className="bottom-navbar">
      <CategoryMenu geneder={gender} />
      <SearchBar />
    </div>
  );
};

export default BottomNavbar;
