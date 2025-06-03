import RestaurantCard from "../restaurant/Restaurant";
import dajajati from "../../../assets/دجاجتي.jpg";
import lafah from "../../../assets/لفاح.jpg";
import alyasar from "../../../assets/اليسار.jpg";
const Restaurants = ({ restaurant, setRestaurant }) => {
  const restaurantData = [
    {
      name: "Dajajati",
      cuisine: "Italian",
      rating: 4.5,
      image: dajajati,
      open: true,
    },
    {
      name: "Lafah",
      cuisine: "Japanese",
      rating: 4.7,
      image: lafah,
      open: false,
    },
    {
      name: "Alyasar",
      cuisine: "Mexican",
      rating: 4.3,
      image: alyasar,
      open: open,
    },
  ];

  return (
    <div>
      <h1>Restaurant List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {restaurantData.map((restaurant, index) => (
          <RestaurantCard
            restaurant={restaurant}
            key={index}
            name={restaurant.name}
            cuisine={restaurant.cuisine}
            rating={restaurant.rating}
            image={restaurant.image}
            open={restaurant.open}
            setRestaurant={setRestaurant}
          />
        ))}
      </div>
    </div>
  );
};
export default Restaurants;
