import { useEffect, useState } from "react";
import "./CategoriesTiles.css";
import fetchCategories from "../../utils/getCategories";
import { useGender } from "../../context/GenderContext";
import { NavLink } from "react-router-dom";

const CategoriesTiles = () => {
  const { gender } = useGender();
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
          <NavLink to={`/${gender}/${category}`}>{category}</NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoriesTiles;
