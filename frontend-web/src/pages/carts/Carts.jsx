import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/restaurants/cart/Cart";
import style from "./style.module.css";
import CountUp from "react-countup";
import { Container } from "react-bootstrap";
import { desriseBalance } from "../../redux/balance/thunk/desriseBalance";
import { clearCart } from "../../redux/addToCart/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Carts = () => {
  const items = useSelector((state) => state.cart.items); // { productId: quantity }
  const { foods } = useSelector((state) => state.food);
  const { user } = useSelector((state) => state.users);

  const [openPayment, setOpenPayment] = useState(false);
  const dispatch = useDispatch();

  const { totalAmount, cartItems } = useMemo(() => {
    let amount = 0;
    const filteredItems = foods.filter((food) => items[food._id]);

    filteredItems.forEach((food) => {
      amount += food.price * items[food._id];
    });

    return { totalAmount: amount, cartItems: filteredItems };
  }, [items, foods]);

  const handelTryPayment = () => {
    setOpenPayment(true);
  };

  const handelPayment = async () => {
    try {
      // 1. خصم الرصيد
      await dispatch(
        desriseBalance({ email: user.email, balance: totalAmount })
      );

      // 2. حفظ المبيعات في قاعدة البيانات
      const res = await axios.post("/sales", {
        userId: user._id,
        items: cartItems.map((food) => ({
          productId: food._id,
          name: food.name,
          price: food.price,
          quantity: items[food._id], // الكمية من الستيت
        })),
        totalAmount,
      });
      console.log(res);

      // 3. تفريغ السلة
      dispatch(clearCart());
      setOpenPayment(false);

      toast.success("تمت عملية الشراء وتسجيل المبيعات ✅");
    } catch (err) {
      console.log(err);
    }
  };

  const handelCanclPayment = () => {
    setOpenPayment(false);
  };

  return (
    <Container style={{ paddingBottom: "9rem", paddingTop: "4rem" }}>
      {openPayment && (
        <div className={style.popupOverlay}>
          <div className={style.popupContainer}>
            <h3 className={style.popupTitle}>Confirm Payment</h3>
            <p className={style.popupMessage}>
              Are you sure you want to proceed with the payment?
            </p>
            <div className={style.buttonGroup}>
              <button
                className={style.secondaryButton}
                onClick={handelCanclPayment}
              >
                Cancel
              </button>
              <button className={style.primaryButton} onClick={handelPayment}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => dispatch(clearCart())}
        style={{ padding: "10px", border: "none", borderRadius: "10px" }}
      >
        clear carts
      </button>

      <div className={style.carts}>
        {cartItems.map((food) => (
          <React.Fragment key={food._id}>
            <Cart
              id={food._id}
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
              Delivery: <span>{Object.keys(items).length > 0 ? 2 : 0}$</span>
            </p>
            <hr />
            <p>
              Total Price:
              <span>
                {Object.keys(items).length > 0 ? (
                  <CountUp start={totalAmount} end={totalAmount + 2} />
                ) : (
                  0
                )}
                $
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="email..."
              value={user?.email || ""}
              disabled
              style={{
                borderRadius: ".4rem",
                padding: ".7rem",
                width: "20rem",
                outline: "none",
                border: "1px solid #ddd",
              }}
            />
            <button
              style={{
                width: "13rem",
                padding: "1rem",
                borderRadius: ".4rem",
                background: "black",
                color: "white",
                fontSize: "1.3rem",
              }}
              onClick={handelTryPayment}
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
