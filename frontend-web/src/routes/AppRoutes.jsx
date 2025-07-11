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
import SuperDashboard from "../pages/Dashboard/superDashboard/Dashboard";
import Users from "../components/dashboard/superDashboard/users/Users";
import Resturants from "../components/dashboard/superDashboard/resturants/Resturants";
import CreateUser from "../components/dashboard/superDashboard/createUser/CreateUser";
import Profile from "../pages/profile/Profile";
import AddBalance from "../components/dashboard/superDashboard/addBalance/AddBalance";
import FoodById from "../pages/Foods/FoodById";
const PrivateRoute = () => {};
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/food/:id",
    element: <FoodById />,
  },
  {
    path: "super-dashboard",
    element: <SuperDashboard />,
    children: [
      { path: "create-user", element: <CreateUser /> },
      { path: "users", element: <Users /> },
      { path: "resturants", element: <Resturants /> },
      { path: "add-balance", element: <AddBalance /> },
    ],
  },
]);
export default AppRouter;
