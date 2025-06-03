import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Trash2 } from "lucide-react";
import emptyList from "../../../assets/lottieFiles/emptyList.json";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import Lottie from "lottie-react";
const { listTable } = style;
const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/food/list");
      setList(res.data.food);
    };
    fetchData();
  }, []);
  const handelRemoveFood = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/food/remove", {
        data: {
          id: id,
        },
      });
      setList((preventList) => preventList.filter((food) => food._id !== id));
      toast.success("food deleted successfuly");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(list ? "d" : "");
  return (
    <div style={{ width: "60%" }}>
      {list.length !== 0 ? (
        <>
          <ToastContainer />
          <div className={listTable}>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((food) => {
            return (
              <div className={listTable}>
                <span>
                  <img
                    src={`http://localhost:5000/images/${food.image}`}
                    width={20}
                    height={20}
                    style={{ borderRadius: "0" }}
                  />
                </span>
                <span>{food.name}</span>
                <span>{food.category}</span>
                <span>{food.price} $</span>
                <span onClick={() => handelRemoveFood(food._id)}>
                  <Trash2 color="red" cursor="pointer" />
                </span>
              </div>
            );
          })}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={emptyList}
            style={{
              width: "300px",
            }}
          />
          <p style={{ fontSize: "22px", color: " #777676", fontWeight: "500" }}>
            Empty List
          </p>
        </div>
      )}
    </div>
  );
};

export default List;
