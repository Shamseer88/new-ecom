import React from "react";
import { useWishList } from "../../context/WishListContext";
import { useNavigate } from "react-router-dom";
import "./WishListPage.css";

const WishListPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishList();
  const navigate = useNavigate();

  const goToDetailsPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="wishlist-page">
      <h2>YOUR WISHLIST</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty-message">Your wishlist is empty.</p>
      ) : (
        <>
          <div className="wishlist-items">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="wishlist-item"
                onClick={() => goToDetailsPage(product._id)}
              >
                <img
                  src={product.displayImage}
                  alt={product.name}
                  className="wishlist-image"
                />
                <div className="wishlist-details">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation
                      removeFromWishlist(product._id);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="clear-wishlist-button" onClick={clearWishlist}>
            Clear Wishlist
          </button>
        </>
      )}
    </div>
  );
};

export default WishListPage;
