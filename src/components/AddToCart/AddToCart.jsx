import "./AddToCart.css";

const AddToCart = ({ count, increment, decrement }) => {
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
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default AddToCart;
