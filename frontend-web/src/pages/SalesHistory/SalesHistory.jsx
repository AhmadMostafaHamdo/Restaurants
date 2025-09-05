import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "./style.module.css";
const SalesHistory = () => {
  const { user } = useSelector((state) => state.users);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(`/sales/${user._id}`);
        setSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };

    if (user?._id) {
      fetchSales();
    }
  }, [user]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>📦 Purchase History</h2>

      {sales.length === 0 ? (
        <div className={style.empty}>No purchases found.</div>
      ) : (
        <div className={style.salesList}>
          {sales.map((sale) => (
            <div key={sale._id} className={style.card}>
              <div className={style.cardHeader}>
                <p className={style.date}>
                  Date: <span>{new Date(sale.createdAt).toLocaleString()}</span>
                </p>
                <p className={style.total}>Total: ${sale.totalAmount}</p>
              </div>

              <ul className={style.itemsList}>
                {sale.items.map((item, index) => (
                  <li key={index} className={style.item}>
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} × ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
