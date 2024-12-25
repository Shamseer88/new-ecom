import { useEffect, useState } from "react";

import { base_domain, api_key } from "../utils/apiDetails";
import Sidebar from "../components/SideBar/Sidebar";
import "./Men.css";
import axios from "axios";
import ProductCardList from "../components/ProductCardList/ProductCardList";

const Women = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (baseDomain, apiKey) => {
    try {
      const response = await axios.get(
        `${baseDomain}/api/v1/ecommerce/clothes/products?filter={"gender":"Women"}&page=1`,
        {
          headers: {
            projectId: apiKey,
          },
        }
      );
      setProducts(response.data.data);
      console.log("products", products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(base_domain, api_key);
  }, []);

  return (
    <div className="gender-page">
      <div className="left-sidebar">
        <Sidebar />
      </div>
      <div className="product-container">
        <ProductCardList
          products={products}
          heading="Women"
          hasHeading="true"
        />
      </div>
    </div>
  );
};

export default Women;
