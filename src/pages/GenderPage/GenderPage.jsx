import { useEffect, useState } from "react";
import { base_domain, api_key } from "../../utils/apiDetails";
import Sidebar from "../../components/SideBar/Sidebar";
import "./GenderPage.css";
import axios from "axios";
import ProductCardList from "../../components/ProductCardList/ProductCardList";
import { useParams } from "react-router-dom";
import MobileFilter from "../../components/SideBar/MobileFilter";

const GenderPage = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async (baseDomain, apiKey) => {
    try {
      const filter = category
        ? `{"gender":"${gender}","subCategory":"${category}"}`
        : `{"gender":"${gender}"}`;
      const response = await axios.get(
        `${baseDomain}/api/v1/ecommerce/clothes/products?filter=${filter}&page=1`,
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
  }, [gender, category]);

  return (
    <div className="gender-page">
      <div className="left-sidebar">
        <Sidebar />
      </div>
      <div className="mobile-filter-div">
        <MobileFilter />
      </div>
      <div className="product-container">
        <ProductCardList
          products={products}
          heading={category ? `${gender} - ${category}` : gender}
          hasHeading="true"
        />
      </div>
    </div>
  );
};

export default GenderPage;
