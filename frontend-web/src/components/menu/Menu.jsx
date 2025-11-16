// Menu.jsx
import style from "./style.module.css";
import { Container } from "react-bootstrap";
import { listOfMenu } from "../../api/listOfMenu";
import { motion } from "framer-motion";
import Title from "../common/title/Title";

const {
  menu,
  menuItem,
  menuList,
  img,
  active,
  restaurantTitle,
  menuDesc,
  underline,
} = style;

const Menu = ({ category, setCategory, restaurant }) => {
  return (
    <div style={{ paddingTop: "60px" }} id="menu">
      <Container>
        <div className={menu}>
          <Title title=" Explore Our Menu" />

          <p className={menuDesc}>
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>

          <div className={menuList}>
            {listOfMenu
              .filter(
                (item) =>
                  restaurant === "All" || item.resturants.includes(restaurant)
              )
              .map((item, index) => (
                <motion.div
                  className={menuItem}
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setCategory(item.name)}
                >
                  <img
                    src={item.src}
                    className={`${img} ${category === item.name ? active : ""}`}
                    alt={item.name}
                  />
                  <h5>
                    {item.name}
                    {category === item.name && <span className={underline} />}
                  </h5>
                </motion.div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Menu;
