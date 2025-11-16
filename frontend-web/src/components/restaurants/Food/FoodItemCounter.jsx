// FoodItemCounter.jsx
import React, { memo } from "react";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../../../redux/addToCart/cartSlice";
import style from "./style.module.css";

const FoodItemCounter = memo(({ id }) => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.cart.items[id] ?? 0);

  const handleIncrement = () => {
    if (itemCount < 5) {
      dispatch(addToCart(id));
    } else {
      toast.error("You can't choose more than 5 meals");
    }
  };

  const handleDecrement = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={style.foodItemCount}>
      {itemCount ? (
        <div>
          <Minus onClick={handleDecrement} />
          <span>{itemCount}</span>
          <Plus onClick={handleIncrement} />
        </div>
      ) : (
        <Plus onClick={handleIncrement} />
      )}
    </div>
  );
});

FoodItemCounter.displayName = "FoodItemCounter";

export default FoodItemCounter;
