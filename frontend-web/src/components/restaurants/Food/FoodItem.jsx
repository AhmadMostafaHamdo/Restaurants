// FoodItem.jsx
import React, { memo } from "react";
import style from "./style.module.css";
import Rating from "../rating/Rating";
import FoodItemCounter from "./FoodItemCounter";

const FoodItem = memo(({ id, name, price, description, image, alt }) => {
  return (
    <div className={style.foodItem}>
      <div className={style.foodItemImgContainer}>
        <img
          className={style.foodItemImg}
          src={`http://localhost:5000/images/${image}`}
          alt={alt}
          loading="lazy"
        />
        <FoodItemCounter id={id} />
      </div>
      <div className={style.foodItemInfo}>
        <div className={style.foodItemNameRating}>
          <p className={style.foodItemName}>{name}</p>
          <Rating />
        </div>
        <p className={style.foodItemDescription}>{description}</p>
        <p className={style.foodItemPrice}>{price}$</p>
      </div>
    </div>
  );
});

FoodItem.displayName = "FoodItem";

export default FoodItem;
