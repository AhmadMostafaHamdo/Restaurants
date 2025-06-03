import style from "./style.module.css";
import Rating from "../rating/Rating";
import FoodItemCounter from "./FoodItemCounter";
const {
  foodItem,
  foodItemImgContainer,
  foodItemImg,
  foodItemInfo,
  foodItemNameRating,
  foodItemDescription,
  foodItemPrice,
} = style;
const FoodItem = ({ id, name, price, description, image, alt }) => {
  return (
    <div className={foodItem}>
      <div className={foodItemImgContainer}>
        <img className={foodItemImg} src={image} alt={alt} />
        <FoodItemCounter id={id} />
      </div>
      <div className={foodItemInfo}>
        <div className={foodItemNameRating}>
          <p>{name}</p>
          <Rating />
        </div>
        <p className={foodItemDescription}>{description}</p>
        <p className={foodItemPrice}>{price}$</p>
      </div>
    </div>
  );
};

export default FoodItem;
