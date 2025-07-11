// src/RestaurantCard.js
import React from "react";
import styles from "./style.module.css";
import Rating from "../rating/Rating";
import { MapPin, Star } from "lucide-react";

const RestaurantCard = ({
  id,
  name,
  cuisine,
  image,
  rating,
  open,
  setRestaurant,
}) => {
  const handelClick = () => {
    setRestaurant(name);
    window.location.href = `/food/${id}`;
  };
  return (
    <div className={styles.restaurantCard} onClick={handelClick}>
      <img
        src={`http://localhost:5000/images/${image}`}
        alt={name}
        className={styles.restaurantImage}
      />
      <div className={styles.restaurantInfo}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={styles.restaurantName}>{name}</h2>
          <span style={{ color: open ? "green" : "red" }}>
            {open ? "open" : "close"}
          </span>
        </div>
        <p className={styles.restaurantCuisine}>{cuisine}</p>
        <div className={styles.ratingPlusMap}>
          <Rating />
          <div>
            ({rating}
            <Star fill="#ff5722" color="#ff5722" width={15} />)
          </div>
          <MapPin />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
