import { useEffect, useState } from "react";
import "./CategoriesTiles.css";
import fetchCategories from "../../utils/getCategories";

const CategoriesTiles = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="category-tiles">
      {categories.map((category) => (
        <div key={category} className="category-tile">
          <span category-tile-text>{category}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesTiles;
