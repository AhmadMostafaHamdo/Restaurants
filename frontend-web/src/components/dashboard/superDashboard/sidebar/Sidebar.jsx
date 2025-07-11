import React from "react";
import { NavLink } from "react-router-dom";
import style from "../../sideBar/style.module.css";
const { sidebar, sidebarOption, active } = style;
const Sidebar = () => {
  return (
    <div className={sidebar}>
      <div>
        <NavLink
          to="create-user"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          Create User
        </NavLink>
        <NavLink
          to="users"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          Users
        </NavLink>
        <NavLink
          to="users"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          Create Resturant
        </NavLink>
        <NavLink
          to="resturants"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          Resturants
        </NavLink>
        <NavLink
          to="/super-dashboard/add-balance"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        >
          addBalance
        </NavLink>
        <NavLink
          to="add"
          className={`${sidebarOption} ${(isActive) =>
            isActive ? active : ""}`}
        ></NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
