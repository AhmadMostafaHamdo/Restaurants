import React from "react";
import { NavLink } from "react-router-dom";
import style from "../../sideBar/style.module.css";

const { sidebar, sidebarOption, active } = style;

const Sidebar = () => {
  return (
    <div className={sidebar}>
      <NavLink
        to="create-user"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        👤 Create User
      </NavLink>
      <NavLink
        to="users"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        👥 Users
      </NavLink>
      <NavLink
        to="create-resturent"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        🍴 Create Restaurant
      </NavLink>
      <NavLink
        to="resturants"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        🏢 Restaurants
      </NavLink>
      <NavLink
        to="/super-dashboard/add-balance"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        💰 Add Balance
      </NavLink>
      <NavLink
        to="/super-dashboard/messages"
        className={({ isActive }) =>
          `${sidebarOption} ${isActive ? active : ""}`
        }
      >
        💬 Messages
      </NavLink>
    </div>
  );
};

export default Sidebar;
