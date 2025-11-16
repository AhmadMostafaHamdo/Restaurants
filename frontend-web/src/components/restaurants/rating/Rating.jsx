import axios from "axios";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
const Rating = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handelStarsRating = async (e, currentIndex) => {
    e.stopPropagation();
    setRating(currentIndex);
    await handelRating(currentIndex); // أرسل القيمة مباشرة
  };

  const handelMouseEnter = (e, currentIndex) => {
    e.stopPropagation();
    setHover(currentIndex);
  };

  const handelMouseLeave = (e) => {
    e.stopPropagation();
    setHover(rating);
  };

  const handelRating = async (value) => {
    try {
      const res = await axios.put(`/resturants/${id}/rating`, {
        rating: value,
      });
      toast.success(res.data?.message);
      console.log(res.data);
      console.log("Rating sent:", value);
    } catch (error) {
      console.error("Error sending rating:", error);
    }
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
            onClick={(e) => handelStarsRating(e, i)}
            onMouseEnter={(e) => handelMouseEnter(e, i)}
            onMouseLeave={(e) => handelMouseLeave(e)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </p>
  );
};

export default Rating;
