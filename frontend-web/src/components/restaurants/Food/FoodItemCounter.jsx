import style from "./style.module.css";
import { addToCart, removeFromCart } from "../../../redux/addToCart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const { foodItemCount } = style;
const FoodItemCounter = ({ id }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const itemCount = items[id] || 0;
  return (
    <div className={foodItemCount}>
      {itemCount ? (
        <div>
          <Minus onClick={() => dispatch(removeFromCart(id))} />
          <span>{itemCount}</span>
          <Plus onClick={() => dispatch(addToCart(id))} />
        </div>
      ) : (
        <Plus onClick={() => dispatch(addToCart(id))} />
      )}
    </div>
  );
};

export default FoodItemCounter;
