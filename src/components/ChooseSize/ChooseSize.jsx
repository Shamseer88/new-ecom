import { useState } from "react";
import "./CooseSize.css";

const ChooseSize = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]);

  const handleSizeClicked = (size) => {
    setSelectedSize(size);
  };
  return (
    <div className="choose-size-div">
      <p className="choose-size-heading">Choose size</p>
      <div className="choose-size-buttons">
        {sizes?.map((size, index) => (
          <button
            key={index}
            onClick={() => handleSizeClicked(size)}
            className={selectedSize === size ? "selected-size" : ""}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseSize;
