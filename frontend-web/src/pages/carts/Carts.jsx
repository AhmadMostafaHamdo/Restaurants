import { useSelector } from "react-redux";
import { listOfFood } from "../../api/listOfMenu";
import Cart from "../../components/restaurants/cart/Cart";
import style from "./style.module.css";
import CountUp from "react-countup";
import { Container } from "react-bootstrap";

const { carts, totalCarts } = style;
const Carts = () => {
  const items = useSelector((state) => state.cart.items);
  let totalAmount = 0;
  for (const item in items) {
    let itemInfo = listOfFood.find((food) => food.id === item);
    totalAmount += itemInfo.price * items[item];
  }
  return (
    <Container>
      <div className={carts}>
        {listOfFood.map((food) => {
          if (items[food.id]) {
            return (
              <div key={food.id}>
                <Cart
                  id={food.id}
                  alt={food.alt}
                  img={food.image}
                  name={food.name}
                  price={food.price}
                />
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
        <div className={totalCarts}>
          <h3>Cart Totals</h3>
          <p>
            Price :
            <span>
              <CountUp end={totalAmount} duration={0.7} />$
            </span>
          </p>
          <hr />
          <p>
            Deleivry : <span>2$</span>
          </p>
          <hr />
          <p>
            TotalPrice :{" "}
            <span>
              <CountUp start={totalAmount} end={totalAmount + 2} />$
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Carts;
