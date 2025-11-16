import { CirclePlus, ClipboardList } from "lucide-react";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";

const { sidebar, sidebarOption, active, horizontal, vertical } = style;

const SideBar = ({ direction = "vertical" }) => {
  return (
    <div
      className={`${sidebar} ${
        direction === "horizontal" ? horizontal : vertical
      }`}
    >
      <NavLink
        to="add"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        <CirclePlus className={style.icon} />
        <span className={style.text}>Add Items</span>
      </NavLink>

      <NavLink
        to="list"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        <ClipboardList className={style.icon} />
        <span className={style.text}>List Items</span>
      </NavLink>
    </div>
  );
};

export default SideBar;
