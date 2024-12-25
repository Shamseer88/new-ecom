import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductCard from "../components/ProductCard/ProductCard";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts feature="new arrival" />
      <FeaturedProducts feature="best seller" />
    </div>
  );
};

export default Home;
