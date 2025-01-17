import { FiSliders } from "react-icons/fi";
import { useEffect, useState } from "react";
import fetchCategories from "../../utils/getCategories";
import { MdOutlineChevronRight } from "react-icons/md";

import "./Sidebar.css";
import { FaCheck } from "react-icons/fa";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    "white",
    "black",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "violet",
  ];

  const loadCategories = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategories(data);
      console.log(categories);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    console.log("COLOR", color);
  };

  useEffect(() => {
    loadCategories();
  }, []);
  return (
    <div className="sidebar-div">
      <div className="sidebar-top-heading">
        <h3>Filters</h3>
        <FiSliders />
      </div>
      <hr />
      <div className="sidebar-categories">
        {categories?.map((category) => (
          <div className="sidebar-category-item" key={category}>
            <p>{category}</p>
            <MdOutlineChevronRight />
          </div>
        ))}
      </div>
      <hr />
      <h4 className="sidebar-headings">Colors</h4>
      <div className="sidebar-colors">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          >
            {selectedColor === color && <FaCheck className="color-tick-icon" />}
          </button>
        ))}
      </div>
      <hr />
      <div className="apply-filter-btn-div">
        <button className="apply-filter-btn">Apply Filters</button>
      </div>
    </div>
  );
};

export default Sidebar;
