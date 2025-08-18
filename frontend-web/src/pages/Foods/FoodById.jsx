import React, { useEffect } from "react";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFoodById } from "../../redux/food/thunk/thunkGetFoodById";
import FoodItem from "../../components/restaurants/Food/FoodItem";

const FoodById = () => {
  const dispatch = useDispatch();
  const { food = [], loading, error } = useSelector((state) => state.food);
  const { restaurantId } = useParams();

  useEffect(() => {
    if (restaurantId) {
      dispatch(thunkGetFoodById(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (loading) return <div>جاري التحميل...</div>;

  if (error) return <div style={{ color: "red" }}>حدث خطأ: {error}</div>;

  if (!food.length) return <div>لا توجد أطعمة متاحة لهذا المطعم.</div>;

  return (
    <div className={style.foods} style={{ paddingTop: "2rem" }}>
      {food.map((item) => (
        <FoodItem
          key={item._id}
          id={item._id}
          name={item.name}
          description={item.description}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default FoodById;
