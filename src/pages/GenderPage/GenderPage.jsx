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
  const [showNoProductWarning, setShowNoProductWarning] = useState(false);

  const fetchProducts = async (baseDomain, apiKey) => {
    try {
      const filter = category
        ? JSON.stringify({ gender, subCategory: category })
        : JSON.stringify({ gender });
      const encodedFilter = encodeURIComponent(filter);

      const response = await axios.get(
        `${baseDomain}/api/v1/ecommerce/clothes/products?filter=${encodedFilter}&page=1`,
        {
          headers: {
            projectId: apiKey,
          },
        }
      );

      if (response && response.data.status === "success") {
        setProducts(response.data.data);
        setShowNoProductWarning(false);
      } else {
        setShowNoProductWarning(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowNoProductWarning(true);
      } else {
        console.error("Error fetching products:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts(base_domain, api_key);
  }, [gender, category]);

  return (
    <div
      className="gender-page"
      style={{
        justifyContent: showNoProductWarning ? "flex-start" : "space-between",
      }}
    >
      <div className="left-sidebar">
        <Sidebar />
      </div>
      <div className="mobile-filter-div">
        <MobileFilter />
      </div>
      <div className="product-container">
        {showNoProductWarning ? (
          <div className="no-products-div">
            <h2>
              Sorry, no products match your selected filters. Please try some
              other filters!
            </h2>
          </div>
        ) : (
          <ProductCardList
            products={products}
            heading={category ? `${gender} - ${category}` : gender}
            hasHeading="true"
          />
        )}
      </div>
    </div>
  );
};

export default GenderPage;
