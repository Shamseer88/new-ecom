import React from "react";
import { CiSearch } from "react-icons/ci";

import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="searchbar-div">
      <CiSearch />
      <input type="search" placeholder="Search for products..." />
    </div>
  );
};

export default SearchBar;
