import { useEffect, useState } from "react";
import { base_domain, api_key } from "../../utils/apiDetails";
import Sidebar from "../../components/SideBar/Sidebar";
import "./GenderPage.css";
import axios from "axios";
import ProductCardList from "../../components/ProductCardList/ProductCardList";
import { useParams } from "react-router-dom";
import MobileFilter from "../../components/SideBar/MobileFilter";
import Loader from "../../components/Loader/Loader";

const GenderPage = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);
  const [showNoProductWarning, setShowNoProductWarning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [seeMoreLoading, setSeeMoreLoading] = useState(false);

  const fetchProducts = async (resetPage = false) => {
    try {
      if (resetPage) {
        setLoading(true);
        setProducts([]);
        setCurrentPage(1);
      } else {
        setSeeMoreLoading(true);
      }

      const filter = category
        ? JSON.stringify({ gender, subCategory: category })
        : JSON.stringify({ gender });
      const encodedFilter = encodeURIComponent(filter);

      const response = await axios.get(
        `${base_domain}/api/v1/ecommerce/clothes/products?filter=${encodedFilter}&page=${
          resetPage ? 1 : currentPage
        }`,
        {
          headers: {
            projectId: api_key,
          },
        }
      );

      if (response && response.data.status === "success") {
        const fetchedProducts = response.data.data;

        // Append new products to existing ones or reset if required
        setProducts((prevProducts) =>
          resetPage ? fetchedProducts : [...prevProducts, ...fetchedProducts]
        );

        // Hide "See More" if fewer than 20 products are fetched
        setShowSeeMore(fetchedProducts.length === 20);
        setShowNoProductWarning(fetchedProducts.length === 0);
      } else {
        setShowNoProductWarning(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowNoProductWarning(true);
      } else {
        console.error("Error fetching products:", error);
      }
    } finally {
      setLoading(false);
      setSeeMoreLoading(false);
    }
  };

  const handleSeeMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Reset products and fetch new ones when gender or category changes
  useEffect(() => {
    fetchProducts(true);
  }, [gender, category]);

  // Fetch next page when currentPage changes
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts();
    }
  }, [currentPage]);

  return (
    <div
      className="gender-page"
      style={{
        justifyContent:
          loading || showNoProductWarning ? "flex-start" : "space-between",
      }}
    >
      <div className="left-sidebar">
        <Sidebar />
      </div>
      <div className="mobile-filter-div">
        <MobileFilter />
      </div>
      {loading ? (
        <div className="loading-div">
          <Loader />
        </div>
      ) : showNoProductWarning ? (
        <div className="no-products-div">
          <h2>
            Sorry, no products match your selection. Please try some other
            selections!
          </h2>
        </div>
      ) : (
        <div className="product-container">
          <ProductCardList
            products={products}
            heading={category ? `${gender} - ${category}` : gender}
            hasHeading="true"
          />
          {showSeeMore && !seeMoreLoading && (
            <div className="see-more-container">
              <button className="see-more-button" onClick={handleSeeMore}>
                See More
              </button>
            </div>
          )}
          {seeMoreLoading && (
            <div className="see-more-loader">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenderPage;
