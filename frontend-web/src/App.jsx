import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ background: "#eee" }}>
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
