import ProductCard from "../ProductCard/ProductCard";
import "./ProductCardList.css";

const ProductCardList = ({ products }) => {
  return (
    <div className="product-list">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          image={product.displayImage}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
