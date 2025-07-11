import RestaurantCard from "../restaurant/Restaurant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resturantThunk } from "../../../redux/resturant/resturantThunk/resturanrThunk";

const Restaurants = ({ setRestaurant }) => {
  const dispatch = useDispatch();
  const { resturant } = useSelector((state) => state.resturant);
  useEffect(() => {
    dispatch(resturantThunk());
  }, [dispatch]);

  if (!resturant) return <p>Loading restaurants...</p>;

  return (
    <div>
      <h1>Restaurant List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(resturant) && resturant.length > 0 ? (
          resturant
            .filter((restaurant) => restaurant && restaurant.name)
            .map((restaurant, index) => (
              <RestaurantCard
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                image={restaurant.image}
                open={restaurant.open}
                setRestaurant={setRestaurant}
                id={restaurant._id}
              />
            ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
