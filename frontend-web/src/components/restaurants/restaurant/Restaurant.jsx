import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Rating from "../rating/Rating";
import { MapPin, Star } from "lucide-react";
import io from "socket.io-client";

const socket = io("https://restaurants-bc7m.onrender.com/"); // تأكد من تطابق العنوان مع خادمك

const RestaurantCard = ({
  id,
  name,
  cuisine,
  image,
  rating,
  open: initialOpen,
  setRestaurant,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  useEffect(() => {
    // الاستماع لتحديثات حالة المطعم
    socket.on("restaurant-status-updated", (data) => {
      if (data.restaurantId === id) {
        setIsOpen(data.isOpen);
      }
    });

    return () => {
      socket.off("restaurant-status-updated");
    };
  }, [id]);

  const handelClick = () => {
    setRestaurant(name);
    window.location.href = `/food/${id}`;
  };

  const toggleRestaurantStatus = (e) => {
    e.stopPropagation(); // منع تنشيط حدث النقر على البطاقة
    const newStatus = !isOpen;

    // إرسال التحديث إلى الخادم
    socket.emit("update-restaurant-status", {
      restaurantId: id,
      isOpen: newStatus,
    });

    // تحديث الحالة محليًا (سيتم تحديثها رسميًا عند استلام التأكيد من الخادم)
    setIsOpen(newStatus);
  };

  return (
    <div className={styles.restaurantCard} onClick={handelClick}>
      <img
        src={`https://restaurants-bc7m.onrender.com/images/${image}`}
        alt={name}
        className={styles.restaurantImage}
      />
      <div className={styles.restaurantInfo}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className={styles.restaurantName}>{name}</h2>
          <button
            onClick={toggleRestaurantStatus}
            style={{
              color: isOpen ? "green" : "red",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            {isOpen ? "مفتوح" : "مغلق"}
          </button>
        </div>
        <p className={styles.restaurantCuisine}>{cuisine}</p>
        <div className={styles.ratingPlusMap}>
          <Rating id={id} />
          <div>
            ({rating}
            <Star fill="#ff5722" color="#ff5722" width={15} />)
          </div>
          <MapPin />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
