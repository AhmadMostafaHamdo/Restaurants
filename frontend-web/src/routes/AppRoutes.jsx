import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/home/Home";
import App from "../App";
import Carts from "../pages/carts/Carts";
import Add from "../components/dashboard/add/Add";
import List from "../components/dashboard/list/List";
import Orders from "../components/dashboard/orders/Orders";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/carts", element: <Carts /> },
    ],
  },
  { path: "login", element: <Login />, errorElement: <Error /> },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "add", element: <Add /> },
      { path: "list", element: <List /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  {
    path: "carts",
    element: <Carts />,
  },
]);
export default AppRouter;
