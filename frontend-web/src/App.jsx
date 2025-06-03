import { useEffect, useRef, useState } from "react";
import Header from "./components/common/Header/Header";
import Divider from "./components/divider/Divider";
import Menu from "./components/menu/Menu";
import Foods from "./pages/Foods/Foods";
import "./index.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [translate, setTranslate] = useState("");
  const [showUp, setShowUp] = useState(false);
  const [category, setCategory] = useState("All");
  const [restaurant, setRestaurant] = useState("All");
  const btn = useRef();
  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 200) {
        setShowUp(true);
      } else {
        setShowUp(false);
      }
    };
    window.addEventListener("scroll", handelScroll);
  }, []);
  useEffect(() => {
    translate
      ? document
          .getElementById(translate)
          .scrollIntoView({ behavior: "smooth" })
      : "";
  }, [translate]);

  return (
    <>
      <ToastContainer />
      <Header setTranslate={setTranslate} />
      <Outlet />
      <Divider />
      <Menu
        setCategory={setCategory}
        category={category}
        restaurant={restaurant}
        setRestaurant={setRestaurant}
      />
      <Divider />
      <Foods category={category} restaurant={restaurant} />
      <Divider />
      {showUp && (
        <a href="#header" className="scroll-to-up">
          up
        </a>
      )}
    </>
  );
}

export default App;
