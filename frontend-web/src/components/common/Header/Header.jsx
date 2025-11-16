import { AlignJustify, Search, ShoppingBasket, X } from "lucide-react";
import personal from "../../../assets/pesonal.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import Cookies from "universal-cookie";
import { getUserById } from "../../../redux/users/thunkUsers/getUserById";
import { motion, AnimatePresence } from "framer-motion";
import style from "./style.module.css";

const links = [
  { name: "Home", hash: "#home", translate: "home" },
  { name: "Restaurants", hash: "#resturents", translate: "resturents" },
  { name: "Menu", hash: "#menu", translate: "menu" },
  { name: "Foods", hash: "#foods", translate: "foods" },
  { name: "Contact Us", hash: "#contact-us", translate: "contact-us" },
];

const Header = ({ setTranslate }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu((prev) => !prev);

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(getUserById(decoded?.id));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [dispatch, cookies]);

  const { user } = useSelector((state) => state.users);

  return (
    <motion.nav
      className={style.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />

      {/* Logo */}
      <Link to="/" className={style.logo}>
        Food
      </Link>

      {/* Desktop Menu */}
      <ul className={style.ul}>
        {links.map((link) => {
          const isActive = location.hash === link.hash;
          return (
            <li key={link.hash}>
              <NavLink
                to={`/${link.hash}`}
                className={isActive ? style.active : ""}
                onClick={() => setTranslate(link.translate)}
              >
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Right Side */}
      <div className={style.headerRight}>
          <div className={style.shoopingItems}>
          <NavLink to="/carts">
            <ShoppingBasket />
            <span>{totalQuantity || 0}</span>
          </NavLink>
        </div>

        {cookies.get("token") ? (
          <Link to="/profile">
            <img
              src={
                user?.image
                  ? `https://restaurants-bc7m.onrender.com/images/${user.image}`
                  : personal
              }
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </Link>
        ) : (
          <button className={style.btn}>
            <Link to="/register" style={{ color: "white" }}>
              Sign Up
            </Link>
          </button>
        )}

        {/* Mobile Toggle */}
        <div className={style.menu} onClick={toggleMenu}>
          {openMenu ? (
            <X width={35} height={35} />
          ) : (
            <AlignJustify width={35} height={35} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.ul
            className={style.mobileMenu}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => {
              const isActive = location.hash === link.hash;
              return (
                <li key={link.hash}>
                  <NavLink
                    to={`/${link.hash}`}
                    className={isActive ? style.active : ""}
                    onClick={() => {
                      setTranslate(link.translate);
                      setOpenMenu(false);
                    }}
                  >
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
