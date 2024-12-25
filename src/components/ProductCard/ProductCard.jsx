import { FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ name, image, price }) => {
  return (
    <div className="product-card">
      <div className="product-imge">
        <img src={image} alt={name} />
      </div>
      <div className="product-name">
        <p>{name}</p>
      </div>
      <div className="product-details">
        <div className="product-details-left">
          <p>₹{price}</p>
        </div>
        <div className="product-details-right">
          <FaRegHeart />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
