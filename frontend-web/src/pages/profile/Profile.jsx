import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import defaultAvatar from "../../assets/profile.jpeg";
import style from "./style.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../redux/users/thunkUsers/getUserById";

const Profile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { user, loading } = useSelector((state) => state.users);
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(getUserById(decoded?.id));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [dispatch, cookies, user?.balance]);
  return (
    <div className={style.profileContainer}>
      <div className={style.profileHeader}>
        <div className={style.avatarContainer}>
          <img
            src={
              user.image
                ? `http://localhost:5000/images/${user.image}`
                : defaultAvatar
            }
            alt="Profile"
            className={style.avatarImage}
          />
        </div>

        <h1>{user.name}</h1>
        <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className={style.profileContent}>
        <div className={style.userDetails}>
          <div className={style.infoCard}>
            <h3 className={style.infoTitle}>Personal Information</h3>
            <div className={style.contactInfo}>
              <p className={style.infoValue}>{user.email}</p>
              <p className={style.infoValue}>{user.phone}</p>
            </div>
          </div>

          <div className={style.balanceCard}>
            <h3 className={style.infoTitle}>Account Balance</h3>
            <p className={style.infoValue}>{user.balance}$</p>
          </div>
        </div>

        <div className={style.statsGrid}>
          <div className={style.statItem}>
            <span>Orders</span>
            <strong>24</strong>
          </div>
          <div className={style.statItem}>
            <span>Reviews</span>
            <strong>12</strong>
          </div>
          <div className={style.statItem}>
            <span>Wishlist</span>
            <strong>{totalQuantity}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
