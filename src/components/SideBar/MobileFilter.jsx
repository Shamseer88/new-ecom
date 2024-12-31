import { useEffect, useState } from "react";
import "./MobileFilter.css";
import { FiSliders } from "react-icons/fi";
import { MdOutlineChevronRight } from "react-icons/md";
import fetchCategories from "../../utils/getCategories";
import { FaCheck } from "react-icons/fa";

const MobileFilter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isFilterBodyVisible, setIsFilterBodyVisible] = useState(false);

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
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    console.log("COLOR", color);
  };

  const toggleFilterBody = () => {
    setIsFilterBodyVisible((prev) => !prev);
  };

  const applyFilter = () => {
    setIsFilterBodyVisible(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="mobile-filter">
      <div className="mobile-filter-heading" onClick={toggleFilterBody}>
        <h3>Filters</h3>
        <FiSliders />
      </div>
      {isFilterBodyVisible && (
        <div className="mobile-filter-body">
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
                {selectedColor === color && (
                  <FaCheck className="color-tick-icon" />
                )}
              </button>
            ))}
          </div>
          <hr />
          <div className="apply-filter-btn-div">
            <button className="apply-filter-btn" onClick={applyFilter}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
