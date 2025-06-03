import { AlignJustify, Search, ShoppingBasket, X } from "lucide-react";
import style from "./style.module.css";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
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
} = style;
const Header = ({ setTranslate }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = Object.values(items).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return (
    <nav className={`${header}`} id="header">
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
          <button className={btn}>sign up</button>
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
