import { useSelector } from "react-redux";
import FoodItemCounter from "../Food/FoodItemCounter";
import style from "./style.module.css";
const { cart, imageTextWrapper, cartCounter } = style;
const Cart = ({ id, img, name, price, alt }) => {
  const items = useSelector((state) => state.cart.items);
  return (
    <div className={cart}>
      <div className={imageTextWrapper}>
        <img src={img} alt={alt} />
        <p>{name}</p>
      </div>
      <div className={cartCounter}>
        <FoodItemCounter id={id} />
      </div>
      <div>{price}</div>
      <div>{price * items[id]}$</div>
    </div>
  );
};

export default Cart;
