import { AlignJustify, Search, ShoppingBasket, X } from "lucide-react";
import pesonal from "../../../assets/pesonal.png";
import style from "./style.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { getUserById } from "../../../redux/users/thunkUsers/getUserById";
const {
  header,
  logo,
  headerRight,
  search,
  btn,
  menu,
  ul,
  open,
  active,
  shoopingItems,
  profile,
} = style;

const Header = ({ setTranslate }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = Object.values(items).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  useEffect(() => {
    const cookies = new Cookies();

    const token = cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(getUserById(decoded?.id));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [dispatch]);
  const { user } = useSelector((state) => state.users);
  return (
    <nav className={`${header}`} id="header">
      <ToastContainer />
      <Link to="/" className={logo}>
        Food
      </Link>
      {
        <ul className={`${ul} ${open ? open : ""}`}>
          <li>
            <NavLink
              to="/#home"
              className={({ isActive }) => (isActive ? active : "")}
              onClick={() => setTranslate("home")}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#menu"
              className={({ isActive }) => (isActive ? active : "")}
              onClick={() => setTranslate("menu")}
            >
              menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#foods"
              className={({ isActive }) => (isActive ? active : "")}
              onClick={() => setTranslate("foods")}
            >
              foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#contact-us"
              className={({ isActive }) => (isActive ? active : "")}
              onClick={() => setTranslate("contact")}
            >
              contact us
            </NavLink>
          </li>
        </ul>
      }
      <div>
        <div className={headerRight}>
          <div className={search}>
            <Search />
          </div>
          <div className={shoopingItems}>
            <NavLink to="/carts">
              <ShoppingBasket />
              <span>{totalQuantity ? totalQuantity : 0}</span>
            </NavLink>
          </div>
          {cookies.get("token") ? (
            <div>
              <Link to="/profile">
                <img
                  src={
                    user?.image
                      ? `http://localhost:5000/images/${user.image}`
                      : pesonal
                  }
                  alt="Profile"
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>
            </div>
          ) : (
            <button className={btn}>
              <Link to="/register" style={{ color: "white" }}>
                sign up
              </Link>
            </button>
          )}
          <div className={menu} onClick={toggleMenu}>
            {open ? (
              <X width={35} height={35} />
            ) : (
              <AlignJustify width={35} height={35} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
