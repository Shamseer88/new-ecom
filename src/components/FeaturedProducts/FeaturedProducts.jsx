import { useEffect, useState } from "react";
import ProductCardList from "../ProductCardList/ProductCardList";
import "./FaeturedProducts.css";
import axios from "axios";
import { base_domain, api_key } from "../../utils/apiDetails";

const FeaturedProducts = ({ feature }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (baseDomain, apiKey) => {
    try {
      const response = await axios.get(
        `${baseDomain}/api/v1/ecommerce/clothes/products?filter={"sellerTag":"${feature}"}`,
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
    <div className="feature-section">
      <h2>{feature}</h2>
      <ProductCardList products={products} />
    </div>
  );
};

export default FeaturedProducts;
