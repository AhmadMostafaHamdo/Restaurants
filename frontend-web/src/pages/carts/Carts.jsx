import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/restaurants/cart/Cart";
import style from "./style.module.css";
import CountUp from "react-countup";
import { Container } from "react-bootstrap";
import { desriseBalance } from "../../redux/balance/thunk/desriseBalance";
import { clearCart } from "../../redux/addToCart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Carts = () => {
  const items = useSelector((state) => state.cart.items); // Cart items
  const { foods } = useSelector((state) => state.food); // All foods
  const { user } = useSelector((state) => state.users); // User data

  const [openPayment, setOpenPayment] = useState(false); // Payment popup state
  const [submitting, setSubmitting] = useState(false); // Payment loading state
  const [email, setEmail] = useState(user?.email || ""); // Email input state

  const dispatch = useDispatch();

  // Calculate total amount and filtered cart items
  const { totalAmount, cartItems } = useMemo(() => {
    let amount = 0;
    const filteredItems = foods.filter((food) => items[food._id]);
    filteredItems.forEach((food) => {
      amount += food.price * items[food._id];
    });
    return { totalAmount: amount, cartItems: filteredItems };
  }, [items, foods]);

  const cartCount = Object.keys(items).length; // Number of items in cart
  const deliveryFee = cartCount > 0 ? 2 : 0; // Delivery fee
  const grandTotal = totalAmount + deliveryFee; // Grand total

  const handleTryPayment = () => {
    if (!email) {
      toast.error("Please enter your email before checkout.");
      return;
    }
    setOpenPayment(true);
  };
  const handleCancelPayment = () => setOpenPayment(false);

  const handlePayment = async () => {
    setSubmitting(true);
    try {
      // Use email input for payment
      await dispatch(desriseBalance({ email, balance: totalAmount }));

      await axios.post("/sales", {
        userId: user?._id,
        email, // Include email in sale
        items: cartItems.map((food) => ({
          productId: food._id,
          name: food.name,
          price: food.price,
          quantity: items[food._id],
        })),
        totalAmount: grandTotal,
      });

      dispatch(clearCart());
      setOpenPayment(false);
      toast.success("Purchase successful ✅");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ paddingBottom: "9rem", paddingTop: "4rem" }}>
      {/* Payment popup */}
      <AnimatePresence>
        {openPayment && (
          <motion.div
            className={style.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={style.popupContainer}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            >
              <h3 className={style.popupTitle}>Confirm Payment</h3>
              <p className={style.popupMessage}>
                Are you sure you want to proceed with the payment of{" "}
                <strong>{grandTotal}$</strong> for <strong>{email}</strong>?
              </p>
              <div className={style.buttonGroup}>
                <button
                  className={style.secondaryButton}
                  onClick={handleCancelPayment}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  className={style.primaryButton}
                  onClick={handlePayment}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear cart button */}
      <button
        onClick={() => dispatch(clearCart())}
        className={style.clearCartButton}
      >
        Clear Cart
      </button>

      {/* Cart items list with animations */}
      <div className={style.carts}>
        <AnimatePresence>
          {cartItems.map((food) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Cart
                id={food._id}
                alt={food.alt}
                img={food.image}
                name={food.name}
                price={food.price}
              />
              <hr />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Checkout summary */}
        <div className={style.checkoutSummary}>
          <div className={style.totalCarts}>
            <h3>Cart Totals</h3>
            <p>
              Price:{" "}
              <span>
                <CountUp end={totalAmount} duration={0.7} />$
              </span>
            </p>
            <hr />
            <p>
              Delivery: <span>{deliveryFee}$</span>
            </p>
            <hr />
            <p>
              Total Price:{" "}
              <span>
                <CountUp end={grandTotal} duration={0.7} />$
              </span>
            </p>
          </div>

          <div className={style.checkoutActions}>
            {/* Email input */}
            <input
              type="email"
              placeholder="Enter your email"
          
              onChange={(e) => setEmail(e.target.value)}
              className={style.emailInput}
            />
            <button
              className={style.checkoutButton}
              onClick={handleTryPayment}
              disabled={cartCount === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Carts;
