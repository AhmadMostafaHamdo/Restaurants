import style from "./style.module.css";
import FoodItem from "../../components/restaurants/Food/FoodItem";
import { listOfFood } from "../../api/listOfMenu";
import { Container } from "react-bootstrap";

const { foods } = style;
const Foods = ({ category, restaurant }) => {
  return (
    <Container>
      <div className={foods} id="foods">
        {listOfFood.map((food) => {
          if (
            (category === "All" || category == food.category) &&
            (restaurant === "All" || restaurant == food.restaurant)
          ) {
            return (
              <FoodItem
                id={food.id}
                name={food.name}
                alt={food.alt}
                description={food.description}
                image={food.image}
                price={food.price}
                key={food.id}
              />
            );
          }
        })}
      </div>
    </Container>
  );
};

export default Foods;
