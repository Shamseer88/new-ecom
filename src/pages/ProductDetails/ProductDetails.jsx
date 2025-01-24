import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { base_domain, api_key } from "../../utils/apiDetails";
import Rating from "../../components/Rating/Rating";
import ChooseSize from "../../components/ChooseSize/ChooseSize";
import AddToCart from "../../components/AddToCart/AddToCart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const token = localStorage.getItem("token");

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_domain}/api/v1/ecommerce/product/${productId}`,
        {
          headers: {
            projectID: api_key,
          },
        }
      );
      if (response && response.status === 200) {
        setProduct(response.data.data);
        setSelectedImage(response.data.data.images[0]);
        setSelectedSize(response.data.data.sizes?.[0]);
      } else {
        setError("Failed to fetch product details");
      }
    } catch (err) {
      setError("An error occurred while fetching product details");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function formatDescription(description) {
    const indexOfTag = description.indexOf("<");
    if (indexOfTag !== -1) {
      return description.substring(0, indexOfTag);
    } else {
      return description;
    }
  }

  const incrementCount = (prevCount) => {
    setCount(prevCount + 1);
  };

  const decrementCount = (prevCount) => {
    if (prevCount === 1) {
      return;
    } else {
      setCount(prevCount - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.warning("Please select a size before adding to cart!");
      return;
    }

    try {
      const response = await axios.patch(
        `${base_domain}/api/v1/ecommerce/cart/${id}`,
        { quantity: count, size: selectedSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Item added to cart successfully!");
        setCount(1);
      }
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="product-details-page">
      {product ? (
        <div>
          <div className="product-details-main">
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-image ${
                    image === selectedImage ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
            <div className="main-image">
              <img
                src={selectedImage}
                alt={product.name}
                className="selected-image"
              />
            </div>
            <div className="details-div">
              <h2>
                {product.brand} {"-"} {product.name}
              </h2>
              <Rating rating={product.ratings} />
              <p className="product-details-price">₹{product.price}</p>
              <p className="product-details-description">
                {formatDescription(product.description)}
              </p>
              <hr />
              <div className="choose-size-of-product">
                <ChooseSize
                  sizes={product.size}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </div>
              <hr />
              <div className="add-to-cart-component">
                <AddToCart
                  count={count}
                  increment={() => incrementCount(count)}
                  decrement={() => decrementCount(count)}
                  addToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No product details found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
