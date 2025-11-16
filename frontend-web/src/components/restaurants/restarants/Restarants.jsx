import RestaurantCard from "../restaurant/Restaurant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resturantThunk } from "../../../redux/resturant/resturantThunk/resturanrThunk";
import io from "socket.io-client";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./style.css";
import Title from "../../common/title/Title";
const socket = io("http://localhost:5000");

const Restaurants = ({ setRestaurant }) => {
  const dispatch = useDispatch();
  const { resturant } = useSelector((state) => state.resturant);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants
  useEffect(() => {
    dispatch(resturantThunk());
  }, [dispatch]);

  useEffect(() => {
    if (resturant) setRestaurants(resturant);
  }, [resturant]);

  // WebSocket updates
  useEffect(() => {
    socket.on("connect", () => console.log("Connected to WebSocket server"));
    socket.on("disconnect", () => console.log("Disconnected"));
    socket.on("restaurant-status-updated", (data) => {
      setRestaurants((prev) =>
        prev.map((r) =>
          r._id === data.restaurantId ? { ...r, open: data.isOpen } : r
        )
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("restaurant-status-updated");
    };
  }, []);

  if (!restaurants) return <p>Loading restaurants...</p>;

  return (
    <Container>
      <div id="resturents" style={{ paddingTop: "100px", minHeight: "90vh" }}>
        {/* Animated page title */}
        <Title title="Restaurant List" />

        {/* Cards grid */}
        <motion.div
          className="restaurants-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {Array.isArray(restaurants) && restaurants.length > 0 ? (
            restaurants
              .filter((r) => r && r.name)
              .map((restaurant) => (
                <motion.div
                  key={restaurant._id}
                  className="restaurant-card-wrapper"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <RestaurantCard
                    name={restaurant.name}
                    cuisine={restaurant.cuisine}
                    rating={restaurant.rating}
                    image={restaurant.image}
                    open={restaurant.open}
                    setRestaurant={setRestaurant}
                    id={restaurant._id}
                    socket={socket}
                  />
                </motion.div>
              ))
          ) : (
            <p>No restaurants found.</p>
          )}
        </motion.div>
      </div>
    </Container>
  );
};

export default Restaurants;
