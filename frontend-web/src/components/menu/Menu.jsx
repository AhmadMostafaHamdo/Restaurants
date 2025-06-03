import style from "./style.module.css";
import { Container } from "react-bootstrap";
const { menu, menuItem, menuList, img, active } = style;
import { listOfMenu } from "../../api/listOfMenu";
import Restaurants from "../restaurants/restarants/Restarants";
const Menu = ({ category, setCategory, restaurant, setRestaurant }) => {
  console.log(restaurant);
  // listOfMenu.map((ele) => console.log( ele.resturants[0]));
  return (
    <Container>
      <div className={menu} id="menu">
        <Restaurants restaurant={restaurant} setRestaurant={setRestaurant} />
        <h1>Explore our menu</h1>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes.Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time
        </p>
        <div className={menuList}>
          {listOfMenu.map((menu, index) => {
            if (restaurant === "All" || menu.resturants.includes(restaurant)) {
              return (
                <div key={index} className={menuItem}>
                  <img
                    src={menu.src}
                    className={`${img} ${category === menu.name ? active : ""}`}
                    onClick={() => setCategory(menu.name)}
                  />
                  <h5>{menu.name}</h5>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Container>
  );
};

export default Menu;
