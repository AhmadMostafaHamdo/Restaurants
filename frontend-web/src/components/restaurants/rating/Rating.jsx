import { Star } from "lucide-react";
import React, { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const handelStarsRating = (currentIndex) => {
    setRating(currentIndex);
  };
  const handelMouseEnter = (currentIndex) => {
    setHover(currentIndex);
  };
  const handelMouseLeave = (currentIndex) => {
    setHover(rating);
  };
  return (
    <p>
      {Array.from({ length: 5 }, (_, i) => {
        i += 1;
        return (
          <Star
            key={i}
            width={17}
            color="#ff5722"
            fill={i <= (rating || hover) ? "#ff5722" : "none"}
            onClick={() => handelStarsRating(i)}
            onMouseEnter={() => handelMouseEnter(i)}
            onMouseLeave={() => handelMouseLeave(i)}
          />
        );
      })}
    </p>
  );
};

export default Rating;
