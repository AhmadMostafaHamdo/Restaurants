import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Trash2, X } from "lucide-react";
import Lottie from "lottie-react";
import emptyList from "../../../assets/lottieFiles/emptyList.json";
import style from "./style.module.css";

const { listTable } = style;

const List = () => {
  const [list, setList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/food/list");
        setList(res.data.food);
      } catch (error) {
        toast.error("Failed to load food list");
      }
    };
    fetchData();
  }, []);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeConfirmation();
      }
    };

    if (showConfirmation) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmation]);

  const openConfirmation = (id) => {
    setFoodToDelete(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setFoodToDelete(null);
  };

  const handleRemoveFood = async () => {
    if (!foodToDelete) return;

    try {
      await axios.delete("/food/remove", {
        data: { id: foodToDelete },
      });

      setList((prevList) =>
        prevList.filter((food) => food._id !== foodToDelete)
      );
      toast.success("Food deleted successfully");
    } catch (error) {
      toast.error("Failed to delete food");
      console.log(error);
    } finally {
      closeConfirmation();
    }
  };

  return (
    <div style={{ width: "60%", position: "relative" }}>
      <ToastContainer />

      {list.length !== 0 ? (
        <>
          <div className={listTable}>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.map((food) => (
            <div className={listTable} key={food._id}>
              <span>
                <img
                  src={`https://restaurants-bc7m.onrender.com/images/${food.image}`}
                  width={40}
                  height={40}
                  alt={food.name}
                  style={{ borderRadius: "4px", objectFit: "cover" }}
                />
              </span>
              <span>{food.name}</span>
              <span>{food.category}</span>
              <span>{food.price} $</span>
              <span onClick={() => openConfirmation(food._id)}>
                <Trash2 color="#ff6b6b" cursor="pointer" size={20} />
              </span>
            </div>
          ))}
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className={style.modalOverlay}>
          <div
            ref={modalRef}
            className={`${style.modalContent} ${
              showConfirmation ? style.modalEnter : ""
            }`}
          >
            <button className={style.closeButton} onClick={closeConfirmation}>
              <X size={20} />
            </button>

            <div className={style.modalIcon}>
              <div className={style.trashIconWrapper}>
                <Trash2 color="#fff" size={32} />
              </div>
            </div>

            <h2 className={style.modalTitle}>Confirm Deletion</h2>
            <p className={style.modalText}>
              Are you sure you want to delete this food item? This action cannot
              be undone.
            </p>

            <div className={style.modalActions}>
              <button
                className={style.cancelButton}
                onClick={closeConfirmation}
              >
                Cancel
              </button>
              <button className={style.deleteButton} onClick={handleRemoveFood}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
