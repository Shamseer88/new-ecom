import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Rating.css";

const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return <FaStar key={index} color="#ffc633" />;
    } else if (rating > index && rating < index + 1) {
      return <FaStarHalfAlt key={index} color="#ffc633" />;
    } else {
      return <FaRegStar key={index} color="#ffc633" />;
    }
  });
  return <div>{stars}</div>;
};

export default Rating;
