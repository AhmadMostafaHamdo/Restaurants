import React from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const PrivateRoute = ({ children }) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { role } = jwtDecode(token);
  if (role == "admin") return <div>{children}</div>;
  else {
    window.location.href = "/";
  }
};

export default PrivateRoute;
