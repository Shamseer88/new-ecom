import { FiSliders } from "react-icons/fi";
import { useEffect, useState } from "react";
import fetchCategories from "../../utils/getCategories";
import { MdOutlineChevronRight } from "react-icons/md";

import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategories(data);
      console.log(categories);
    }
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
    </div>
  );
};

export default Sidebar;
