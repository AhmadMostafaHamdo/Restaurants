import React from "react";
import { useSelector } from "react-redux";
import FoodItemCounter from "../Food/FoodItemCounter";
import styles from "./style.module.css";

const Cart = ({ id, img, name, price, alt }) => {
  const items = useSelector((state) => state.cart.items);
  const quantity = items[id] || 0;
  const itemTotal = (price * quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImageContainer}>
        <img
          src={`https://restaurants-bc7m.onrender.com/images/${img}`}
          alt={alt}
          className={styles.itemImage}
          loading="lazy"
        />
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{name}</h3>
          <p className={styles.itemPrice}>${price.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.itemControls}>
        <FoodItemCounter id={id} />
        <div className={styles.itemTotal}>${itemTotal}</div>
      </div>
    </div>
  );
};

export default Cart;
