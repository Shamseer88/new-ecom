import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";
import { useEffect, useState } from "react";

const CartPage = () => {
  const { cart, cartLength, removeFromCart, clearCart } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const subTotal = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  useEffect(() => {
    if (subTotal < 999) {
      setDeliveryCharge(50);
      setDeliveryInfo(
        "Free delivery on orders above ₹999. A ₹50 charge applies for orders below ₹999."
      );
    } else {
      setDeliveryCharge(0);
      setDeliveryInfo("Delivery is free for ₹999 or above.");
    }
  }, [subTotal]);

  const totalPrice = subTotal + deliveryCharge;

  return (
    <div className="cart-container">
      <h1>YOUR CART</h1>
      {cartLength === 0 ? (
        <p className="cart-empty-message">Your cart is currently empty.</p>
      ) : (
        <div className="cart-items-container">
          <div className="cart-items">
            {cart.map((cartItem) => (
              <div className="cart-item" key={cartItem.product.id}>
                <div className="cart-item-image">
                  <img
                    src={cartItem.product.displayImage}
                    alt={cartItem.product.name}
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-heading">
                    <h3>{cartItem.product.name}</h3>
                    <button
                      className="cart-item-delete-btn"
                      onClick={() => removeFromCart(cartItem.product._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <p>
                    Size: <span>{cartItem.size}</span>
                  </p>
                  <p>
                    Quantity: <span>{cartItem.quantity}</span>
                  </p>
                  <div className="cart-item-price-container">
                    <h6 className="cart-item-price">
                      ₹{cartItem.product.price}
                    </h6>
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
                <p className="cart-summary-table-value">{cartLength}</p>{" "}
                {/* Display cartLength */}
              </div>
              <div className="cart-summary-table-item">
                <p className="cart-summary-table-description">Subtotal</p>
                <p className="cart-summary-table-value">₹{subTotal}</p>
              </div>
              <div className="cart-summary-table-item">
                <p className="cart-summary-table-description">
                  Delivery Charge
                </p>
                <p className="cart-summary-table-value">₹{deliveryCharge}</p>
              </div>
              <div className="cart-summary-table-item">
                <p className="cart-summary-table-description-total">Total</p>
                <p className="cart-summary-table-value-total">₹{totalPrice}</p>
              </div>
              <button className="cart-checkout-btn">Go to Checkout</button>
            </div>
            <button className="cart-clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <p className="delivery-info">{deliveryInfo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
