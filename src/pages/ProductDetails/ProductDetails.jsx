import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";
import { base_domain, api_key } from "../../utils/apiDetails";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); // To track the selected image

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
        // Set the first image as the selected image by default
        setSelectedImage(response.data.data.images[0]);
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

  // Function to handle image click and update the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-details-page">
      <h1>Product Details</h1>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <div className="product-images">
            {/* Main selected image */}
            <div className="main-image">
              <img
                src={selectedImage}
                alt={product.name}
                className="selected-image"
              />
            </div>
            <div className="image-thumbnails">
              {/* Thumbnail images */}
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
          </div>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
        </div>
      ) : (
        <p>No product details found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
