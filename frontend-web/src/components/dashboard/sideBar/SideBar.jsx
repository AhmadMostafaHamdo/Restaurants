import { BookA, CirclePlus, ClipboardList } from "lucide-react";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
const { sidebar, sidebarOption, active } = style;
const SideBar = () => {
  return (
    <div className={sidebar}>
      <div>
        <NavLink
          to="add"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          <CirclePlus />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="list"
          className={`${sidebarOption} ${({ isActive }) =>
            isActive ? active : ""}`}
        >
          <ClipboardList />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="orders"
          className={`${sidebarOption} ${({ isActive }) =>
            isActive ? active : ""}`}
        >
          <BookA />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
