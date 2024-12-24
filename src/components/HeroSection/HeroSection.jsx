import { NavLink } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section-div">
      <div className="hero-left">
        <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <div className="hero-button-div">
          <NavLink to="/men">
            <PrimaryButton text="Shop Now" />
          </NavLink>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/public/hero-bg-mobile.png"
          alt=""
          className="hero-right-img"
        />
      </div>
    </div>
  );
};

export default HeroSection;
