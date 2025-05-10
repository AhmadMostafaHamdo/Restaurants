import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Error from "../pages/Error";
import Home from "../pages/Home";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },
]);
export default AppRouter;
