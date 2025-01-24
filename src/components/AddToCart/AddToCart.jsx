import "./AddToCart.css";
import axios from "axios";
import { base_domain, api_key } from "../../utils/apiDetails";
import { toast } from "react-toastify";

const AddToCart = ({ count, increment, decrement, addToCart }) => {
  return (
    <div className="add-to-cart-div">
      <div className="add-to-cart-count">
        <span className="add-to-cart-sign" onClick={decrement}>
          -
        </span>
        <span>{count}</span>
        <span className="add-to-cart-sign" onClick={increment}>
          +
        </span>
      </div>
      <div className="add-to-cart-btn">
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default AddToCart;
