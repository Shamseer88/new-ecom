import "./CooseSize.css";

const ChooseSize = ({ sizes, selectedSize, setSelectedSize }) => {
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
