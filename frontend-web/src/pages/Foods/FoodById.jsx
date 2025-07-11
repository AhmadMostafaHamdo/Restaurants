import React, { useEffect } from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom"; // Added missing import
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFoodById } from "../../redux/food/thunk/thunkGetFoodById";
import FoodItem from "../../components/restaurants/Food/FoodItem";
const { foods } = style;

const FoodById = () => {
  const { food = [], loading } = useSelector((state) => state.food); // Added loading state
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(thunkGetFoodById(id));
  }, [dispatch, id]); // Fixed dependencies: removed 'food', added 'id'

  // Basic loading state handling
  if (loading) return <div>Loading...</div>;

  // Handle case where food isn't loaded yet
  if (!food) return <div>Food not found!</div>;
  console.log(food);
  return (
    <div className={foods}>
      {food.map((food) => (
        <FoodItem
          id={food._id}
          name={food.name}
          description={food.description}
          image={food.image}
          price={food.price}
          key={food._id}
        />
      ))}
    </div>
  );
};

export default FoodById;
