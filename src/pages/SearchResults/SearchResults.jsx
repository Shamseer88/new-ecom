import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCardList from "../../components/ProductCardList/ProductCardList";
import Loader from "../../components/Loader/Loader";
import { base_domain, api_key } from "../../utils/apiDetails";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  console.log("query", query);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNoProductWarning, setShowNoProductWarning] = useState(false);

  // Updated API call to match the new format (without pagination)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setProducts([]);

      const filter = JSON.stringify({ name: query });
      const encodedFilter = encodeURIComponent(filter);

      const response = await axios.get(
        `${base_domain}/api/v1/ecommerce/clothes/products?search=${encodedFilter}`,
        {
          headers: {
            projectID: api_key,
          },
        }
      );

      if (response && response.data.status === "success") {
        const fetchedProducts = response.data.data;
        setProducts(fetchedProducts);
        setShowNoProductWarning(fetchedProducts.length === 0);
      } else {
        setShowNoProductWarning(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setShowNoProductWarning(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProducts(); // fetch products when the query changes
    }
  }, [query]);

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
        </div>
      )}
    </div>
  );
};

export default SearchResults;
