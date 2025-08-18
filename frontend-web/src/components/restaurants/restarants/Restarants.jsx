import RestaurantCard from "../restaurant/Restaurant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resturantThunk } from "../../../redux/resturant/resturantThunk/resturanrThunk";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Restaurants = ({ setRestaurant }) => {
  const dispatch = useDispatch();
  const { resturant } = useSelector((state) => state.resturant);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    dispatch(resturantThunk());
  }, [dispatch]);

  useEffect(() => {
    if (resturant) {
      setRestaurants(resturant);
    }
  }, [resturant]);

  useEffect(() => {
    // Set up WebSocket listeners
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Listen for restaurant status updates
    socket.on("restaurant-status-updated", (data) => {
      console.log("Received status update:", data);
      setRestaurants(prevRestaurants =>
        prevRestaurants.map(restaurant =>
          restaurant._id === data.restaurantId
            ? { ...restaurant, open: data.isOpen }
            : restaurant
        )
      );
    });

    // Cleanup function
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("restaurant-status-updated");
    };
  }, []);

  if (!restaurants) return <p>Loading restaurants...</p>;

  return (
    <div>
      <h1>Restaurant List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", paddingBottom: "19vh" }}>
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants
            .filter((restaurant) => restaurant && restaurant.name)
            .map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                image={restaurant.image}
                open={restaurant.open}
                setRestaurant={setRestaurant}
                id={restaurant._id}
                socket={socket} // Pass socket to child component
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