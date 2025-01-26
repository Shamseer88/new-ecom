import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-div">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for products"
      />
      <div className="search-icon-div">
        <AiOutlineSearch onClick={handleSearch} className="search-icon" />
      </div>
    </div>
  );
};

export default SearchBar;
