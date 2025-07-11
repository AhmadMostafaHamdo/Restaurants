import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { listOfFood } from "../../api/listOfMenu";
import Cart from "../../components/restaurants/cart/Cart";
import style from "./style.module.css";
import CountUp from "react-countup";
import { Container } from "react-bootstrap";

const Carts = () => {
  const items = useSelector((state) => state.cart.items);
  const [openPayment, setOpenPayment] = useState(false);
  const { totalAmount, cartItems } = useMemo(() => {
    let amount = 0;
    const filteredItems = listOfFood.filter((food) => items[food.id]);

    filteredItems.forEach((food) => {
      amount += food.price * items[food.id];
    });

    return { totalAmount: amount, cartItems: filteredItems };
  }, [items]);
  const handelPayment = () => {
    setOpenPayment(true);
  };
  const handelCanclPayment = () => {
    setOpenPayment(false);
  };
  return (
    <Container>
      {openPayment && (
        <div className={style.popupOverlay}>
          <div className={style.popupContainer}>
            <h3 className={style.popupTitle}>Confirm Payment</h3>
            <p className={style.popupMessage}>
              Are you sure you want to proceed with the payment?
            </p>
            <div className={style.buttonGroup}>
              <button className={style.secondaryButton} onClick={handelCanclPayment}>Cancel</button>
              <button className={style.primaryButton}>Pay Now</button>
            </div>
          </div>
        </div>
      )}
      <div className={style.carts}>
        {cartItems.map((food) => (
          <React.Fragment key={food.id}>
            <Cart
              id={food.id}
              alt={food.alt}
              img={food.image}
              name={food.name}
              price={food.price}
            />
            <hr />
          </React.Fragment>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className={style.totalCarts}>
            <h3>Cart Totals</h3>
            <p>
              Price:
              <span>
                <CountUp end={totalAmount} duration={0.7} />$
              </span>
            </p>
            <hr />
            <p>
              Delivery: <span>2$</span>
            </p>
            <hr />
            <p>
              Total Price:
              <span>
                <CountUp start={totalAmount} end={totalAmount + 2} />$
              </span>
            </p>
          </div>
          <div>
            <button
              style={{
                width: "13rem",
                padding: "1rem",
                borderRadius: ".4rem",
                background: "black",
                color: "white",
                fontSize: "1.3rem",
              }}
              onClick={handelPayment}
            >
              checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Carts;
