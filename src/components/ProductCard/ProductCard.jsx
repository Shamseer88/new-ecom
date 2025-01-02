import { FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, image, price, brand }) => {
  const navigate = useNavigate();
  const showDetailsPage = (id) => {
    console.log("ID", id);
    navigate(`/product/${id}`);
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
        <div className="product-details-right">
          <FaRegHeart />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
