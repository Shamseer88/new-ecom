import ProductCard from "../ProductCard/ProductCard";
import "./ProductCardList.css";

const ProductCardList = ({ products, heading, hasHeading }) => {
  return (
    <>
      <div className="product-list-heading">
        <h2>{heading}</h2>
      </div>
      <div
        className="product-list"
        style={{
          justifyContent: hasHeading ? "start" : "center",
        }}
      >
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            brand={product.brand}
            image={product.displayImage}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export default ProductCardList;
