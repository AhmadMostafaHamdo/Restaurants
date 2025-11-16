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
import SuperDashboard from "../pages/Dashboard/superDashboard/Dashboard";
import Users from "../components/dashboard/superDashboard/users/Users";
import Resturants from "../components/dashboard/superDashboard/resturants/Resturants";
import CreateUser from "../components/dashboard/superDashboard/createUser/CreateUser";
import Profile from "../pages/profile/Profile";
import AddBalance from "../components/dashboard/superDashboard/addBalance/AddBalance";
import FoodById from "../pages/Foods/FoodById";
import Delevery from "../pages/delevery/Delevery";
import ChatInterface from "../components/chat/ChatInterface";
import Messages from "../components/dashboard/messages/Messages";
import CreateResturant from "../components/dashboard/superDashboard/createResturent/CreateResturant";
import CheckDelivery from "./CheckDelivery";
import SalesHistory from "../pages/SalesHistory/SalesHistory";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },

  { path: "/carts", element: <Carts />, errorElement: <Error /> },
  { path: "login", element: <Login />, errorElement: <Error /> },

  { path: "/chat", element: <ChatInterface />, errorElement: <Error /> },
  {
    path: "/sales-history",
    element: <SalesHistory />,
    errorElement: <Error />,
  },
  {
    path: "/delivery",
    element: (
      <CheckDelivery>
        <Delevery />
      </CheckDelivery>
    ),
    errorElement: <Error />,
  },
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
      { path: "messages", element: <Messages /> },
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
    path: "/food/:restaurantId",
    element: <FoodById />,
  },
  {
    path: "super-dashboard",
    element: <SuperDashboard />,
    children: [
      { path: "create-user", element: <CreateUser /> },
      { path: "create-resturent", element: <CreateResturant /> },
      { path: "users", element: <Users /> },
      { path: "resturants", element: <Resturants /> },
      { path: "add-balance", element: <AddBalance /> },
      { path: "/super-dashboard/messages", element: <Messages /> },
    ],
  },
]);
export default AppRouter;
