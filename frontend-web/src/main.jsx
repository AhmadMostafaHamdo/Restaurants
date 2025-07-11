import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./services/axios-default";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={AppRouter} />
    </PersistGate>
  </Provider>
);
