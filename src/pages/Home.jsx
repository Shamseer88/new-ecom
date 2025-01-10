import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import CategoriesTiles from "../components/CategoriesTiles/CategoriesTiles";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts feature="new arrival" />
      <CategoriesTiles />
      <FeaturedProducts feature="best seller" />
    </div>
  );
};

export default Home;
