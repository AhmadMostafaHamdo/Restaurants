import React from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const CheckDelivery = ({ children }) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { role } = jwtDecode(token);
  if (role == "delivery") return <div>{children}</div>;
  else {
    window.location.href = "/delivery";
  }
};

export default CheckDelivery;
