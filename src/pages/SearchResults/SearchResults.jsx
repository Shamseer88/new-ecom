import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCardList from "../../components/ProductCardList/ProductCardList";
import Loader from "../../components/Loader/Loader";
import { base_domain, api_key } from "../../utils/apiDetails";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNoProductWarning, setShowNoProductWarning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [showSeeMore, setShowSeeMore] = useState(true); // Show the 'See More' button
  const [seeMoreLoading, setSeeMoreLoading] = useState(false); // Loading state for 'See More' button

  const fetchProducts = async (resetPage = false) => {
    try {
      setLoading(resetPage ? true : false);
      setSeeMoreLoading(false);

      if (resetPage) {
        setProducts([]); // Clear previous products if it's the first load
        setCurrentPage(1); // Reset to page 1
      } else {
        setSeeMoreLoading(true); // Show loading spinner for 'See More' button
      }

      const filter = JSON.stringify({ name: query });
      const encodedFilter = encodeURIComponent(filter);

      const response = await axios.get(
        `${base_domain}/api/v1/ecommerce/clothes/products?search=${encodedFilter}&page=${currentPage}`,
        {
          headers: {
            projectID: api_key,
          },
        }
      );

      if (response && response.data.status === "success") {
        const fetchedProducts = response.data.data;
        setProducts((prevProducts) =>
          resetPage ? fetchedProducts : [...prevProducts, ...fetchedProducts]
        );
        setShowSeeMore(fetchedProducts.length === 20); // Show 'See More' if we have 20 items (assuming this is the max limit per page)
        setShowNoProductWarning(fetchedProducts.length === 0);
      } else {
        setShowNoProductWarning(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setShowNoProductWarning(true);
    } finally {
      setLoading(false);
      setSeeMoreLoading(false);
    }
  };

  const handleSeeMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the page number when 'See More' is clicked
  };

  useEffect(() => {
    if (query) {
      fetchProducts(true); // Fetch products when the query changes
    }
  }, [query]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(); // Fetch more products if the current page is greater than 1
    }
  }, [currentPage]);

  return (
    <div className="search-results-page">
      {loading ? (
        <div className="loading-div">
          <Loader />
        </div>
      ) : showNoProductWarning ? (
        <div className="no-products-div">
          <h2>
            No products found for "{query}". Try searching with different
            keywords!
          </h2>
        </div>
      ) : (
        <div className="product-container">
          <ProductCardList
            products={products}
            heading={`Search results for "${query}"`}
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

export default SearchResults;
