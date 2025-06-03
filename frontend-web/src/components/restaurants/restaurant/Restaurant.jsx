// src/RestaurantCard.js
import React from "react";
import styles from "./style.module.css";
import Rating from "../rating/Rating";
import { MapPin, Star } from "lucide-react";

const RestaurantCard = ({
  name,
  cuisine,
  image,
  rating,
  open,
  restaurant,
  setRestaurant,
}) => {
  console.log(restaurant)
  return (
    <div
      style={{ border: restaurant ===name ? "1px solid red" : "" }}
      className={styles.restaurantCard}
      onClick={() => setRestaurant(name)}
    >
      <img src={image} alt={name} className={styles.restaurantImage} />
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
