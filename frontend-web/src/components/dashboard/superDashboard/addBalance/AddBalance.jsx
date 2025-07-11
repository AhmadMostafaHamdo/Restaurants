import { useState } from "react";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { addBalanceThunk } from "../../../../redux/balance/thunk/addBalanceThunk";

const AddBalance = () => {
  const [balance, setBalance] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(addBalanceThunk({ email, balance }));
    setBalance(""); // Clear input after submission
  };

  return (
    <div className={style.addBalance}>
      <form onSubmit={handelSubmit}>
        <h1>Enter amount of balance</h1>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Balance amount..."
          min="0.01"
          step="0.01"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User email..."
          required
        />
        <button type="submit">Add Balance</button>
      </form>
    </div>
  );
};

export default AddBalance;
