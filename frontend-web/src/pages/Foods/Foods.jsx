import style from "./style.module.css";
import FoodItem from "../../components/restaurants/Food/FoodItem";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetFood } from "../../redux/food/thunk/thunkFood";
import Title from "../../components/common/title/Title";

const { food } = style;
const Foods = ({ category, restaurant }) => {
  const { foods } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetFood());
  }, [dispatch]);
  return (
    <div >
      <Container>
        <Title title="Foods "/>
        <div className={food} id="foods">
          {Array.isArray(foods) &&
            foods.map((food) => {
              if (
                (category === "All" ||
                  category.toLowerCase() == food.category.toLowerCase()) &&
                (restaurant === "All" ||
                  restaurant.toLowerCase() == food.restaurant.toLowerCase())
              ) {
                return (
                  <FoodItem
                    id={food._id}
                    name={food.name}
                    alt={food.alt}
                    description={food.description}
                    image={food.image}
                    price={food.price}
                    category={food.category}
                    key={food.id}
                  />
                );
              }
            })}
        </div>
      </Container>
    </div>
  );
};

export default Foods;
