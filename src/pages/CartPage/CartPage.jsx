import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart } = useCart();
  console.log("cart", cart);
  return (
    <div className="cart-container">
      <h1>YOUR CART</h1>
      <div className="cart-items-container">
        <div className="cart-items">
          {cart.map((cartItem) => (
            <div className="cart-item">
              <div className="cart-item-image">
                <img src={cartItem.product.displayImage} alt="" />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-heading">
                  <h3>{cartItem.product.name}</h3>
                  <FaTrash className="cart-item-delete-btn" />
                </div>
                <p>
                  Size: <span>{cartItem.size}</span>
                </p>
                <p>
                  Quantity: <span>{cartItem.quantity}</span>
                </p>
                <div className="cart-item-price-container">
                  <h6 className="cart-item-price">₹{cartItem.product.price}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-table">
            <div className="cart-summary-table-item">
              <p className="cart-summary-table-description">Total Quantity</p>
              <p className="cart-summary-table-value">10</p>
            </div>
            <div className="cart-summary-table-item">
              <p className="cart-summary-table-description">Subtotal</p>
              <p className="cart-summary-table-value">₹500</p>
            </div>
            <div className="cart-summary-table-item">
              <p className="cart-summary-table-description">Delivery Cahrge</p>
              <p className="cart-summary-table-value">₹15</p>
            </div>
            <div className="hr-div">
              <hr />
            </div>
            <div className="cart-summary-table-item">
              <p className="cart-summary-table-description-total">Total</p>
              <p className="cart-summary-table-value-total">₹1500</p>
            </div>
            <button>Go to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
