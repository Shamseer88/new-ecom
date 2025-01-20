import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useWishList } from "../../context/WishListContext";

const ProductCard = ({ id, name, image, price, brand }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishList();
  const isInWishlist = wishlist?.some((product) => product._id === id);
  const navigate = useNavigate();
  const showDetailsPage = (id) => {
    console.log("ID", id);
    navigate(`/product/${id}`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(id); // Remove if already in wishlist
    } else {
      addToWishlist(id); // Add if not in wishlist
    }
  };

  return (
    <div className="product-card" key={id} onClick={() => showDetailsPage(id)}>
      <div className="product-imge">
        <img src={image} alt={name} />
      </div>
      <div className="product-name">
        <p>
          <span className="product-brand">{brand}</span> - {name}
        </p>
      </div>
      <div className="product-details">
        <div className="product-details-left">
          <p>₹{price}</p>
        </div>
        <div className="product-details-right" onClick={handleToggleWishlist}>
          {isInWishlist ? (
            <FaHeart color="red" /> // Filled red heart for wishlist items
          ) : (
            <FaRegHeart /> // Regular heart for non-wishlist items
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
