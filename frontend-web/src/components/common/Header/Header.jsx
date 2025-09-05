import { AlignJustify, Search, ShoppingBasket, X } from "lucide-react";
import pesonal from "../../../assets/pesonal.png";
import style from "./style.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
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
  active,
  shoopingItems,
} = style;

const links = [
  { name: "home", hash: "#home", translate: "home" },
  { name: "resturents", hash: "#resturents", translate: "resturents" },
  { name: "menu", hash: "#menu", translate: "menu" },
  { name: "foods", hash: "#foods", translate: "foods" },
  { name: "contact us", hash: "#contact-us", translate: "contact-us" },
];

const Header = ({ setTranslate }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpenMenu(!openMenu);

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
    <nav className={header}>
      <ToastContainer />
      <Link to="/" className={logo}>
        Food
      </Link>

      <ul className={`${ul} ${openMenu ? "open" : ""}`}>
        {links.map((link) => {
          // Check if the current location.hash matches this link
          const isActive = location.hash === link.hash;

          return (
            <li key={link.hash}>
              <NavLink
                to={`/${link.hash}`}
                className={isActive ? active : ""}
                onClick={() => {
                  setTranslate(link.translate);
                  setOpenMenu(false); // close menu on mobile
                }}
              >
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className={headerRight}>
        <div className={search}>
          <Search />
        </div>

        <div className={shoopingItems}>
          <NavLink to="/carts">
            <ShoppingBasket />
            <span>{totalQuantity || 0}</span>
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
          {openMenu ? (
            <X width={35} height={35} />
          ) : (
            <AlignJustify width={35} height={35} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
