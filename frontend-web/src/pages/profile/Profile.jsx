import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import defaultAvatar from "../../assets/profile.jpeg";
import style from "./style.module.css";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { getUserById } from "../../redux/users/thunkUsers/getUserById";
import updatedIcon from "../../assets/updatedIcon.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const file = useRef();

  const { user } = useSelector((state) => state.users);
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
  }, [dispatch, cookies]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user?._id]);

  const handleChooseImage = () => file.current.click();

  const handleSaveChanges = async () => {
    try {
      const token = cookies.get("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      if (image) formData.append("image", image);

      const res = await axios.patch(
        `https://restaurants-bc7m.onrender.com/api/users/${user?._id}`,
        formData
      );
      toast.success("Profile updated successfully ✅");
      const decoded = jwtDecode(token);
      dispatch(getUserById(decoded?.id));
      setEditMode({ name: false, phone: false, email: false });
      setImage(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile ");
    }
  };

  const handleCancel = () => {
    if (user)
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    setEditMode({ name: false, phone: false, email: false });
    setImage(null);
  };

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "/";
  };

  return (
    <div className={style.profileContainer}>
      <ToastContainer />
      <div className={style.profileHeader}>
        <div className={style.avatarContainer} onClick={handleChooseImage}>
          <img
            src={
              user?.image
                ? `https://restaurants-bc7m.onrender.com/images/${user.image}`
                : defaultAvatar
            }
            alt="Profile"
            className={style.avatarImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            ref={file}
            style={{ display: "none" }}
          />
        </div>
        <h1>{user?.name || "Guest"}</h1>
        <p>
          Member since{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className={style.profileContent}>
        <div className={style.userDetails}>
          <div className={style.infoCard}>
            <h3 className={style.infoTitle}>Email</h3>
            <div className={style.contactInfo}>
              <input
                type="email"
                value={form.email}
                disabled={!editMode.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <img
                src={updatedIcon}
                alt="edit"
                onClick={() =>
                  setEditMode({ ...editMode, email: !editMode.email })
                }
              />
            </div>
          </div>

          <div className={style.infoCard}>
            <h3 className={style.infoTitle}>Name</h3>
            <div className={style.contactInfo}>
              <input
                type="text"
                value={form.name}
                disabled={!editMode.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <img
                src={updatedIcon}
                alt="edit"
                onClick={() =>
                  setEditMode({ ...editMode, name: !editMode.name })
                }
              />
            </div>
          </div>

          <div className={style.infoCard}>
            <h3 className={style.infoTitle}>Phone</h3>
            <div className={style.contactInfo}>
              <input
                type="text"
                value={form.phone}
                disabled={!editMode.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <img
                src={updatedIcon}
                alt="edit"
                onClick={() =>
                  setEditMode({ ...editMode, phone: !editMode.phone })
                }
              />
            </div>
          </div>

          <div className={style.balanceCard}>
            <h3 className={style.infoTitle}>Account Balance</h3>
            <p className={style.infoValue}>{user?.balance || 0}$</p>
          </div>

          <div className={style.balanceCard}>
            <h3 className={style.infoTitle}>Wishlist</h3>
            <p className={style.infoValue}>{totalQuantity}</p>
          </div>
        </div>
      </div>

      <div className={style.buttonsContainer}>
        {(editMode.name || editMode.phone || editMode.email || image) && (
          <>
            <button onClick={handleSaveChanges} className={style.saveButton}>
              Save Changes
            </button>
            <button onClick={handleCancel} className={style.cancelButton}>
              Cancel
            </button>
          </>
        )}
        <button onClick={handleLogout} className={style.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
