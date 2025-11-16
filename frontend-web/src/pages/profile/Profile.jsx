import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import defaultAvatar from "../../assets/profile.jpeg";
import style from "./style.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../redux/users/thunkUsers/getUserById";
import updatedIcon from "../../assets/updatedIcon.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [image, setImage] = useState(null);

  // ✅ editMode لكل حقل
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    email: false,
  });

  // ✅ state للفورم
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const file = useRef();

  const { user } = useSelector((state) => state.users);
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = Object.values(items).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // ✅ جلب بيانات المستخدم من التوكن
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

  // ✅ تحميل بيانات الفورم أول مرة فقط
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user?._id]); // يعتمد فقط على تغير الـ user عند التحميل

  // ✅ فتح اختيار الصورة
  const handleChooseImage = () => {
    file.current.click();
  };

  // ✅ حفظ التعديلات (الصورة + البيانات)
  const handleSaveChanges = async () => {
    try {
      const token = cookies.get("token");
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.patch(
        `https://restaurants-bc7m.onrender.com/api/users/${user?._id}`,
        formData
      );
      console.log(res.data)
      toast.success("Profile updated successfully ✅");

      const decoded = jwtDecode(token);
      dispatch(getUserById(decoded?.id));

      // إغلاق وضع التعديل
      setEditMode({ name: false, phone: false, email: false });
      setImage(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile ❌");
    }
  };

  // ✅ إلغاء التعديلات
  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
    setEditMode({ name: false, phone: false, email: false });
    setImage(null);
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
          {/* Email */}
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
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() =>
                  setEditMode({ ...editMode, email: !editMode.email })
                }
              />
            </div>
          </div>

          {/* Name */}
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
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() =>
                  setEditMode({ ...editMode, name: !editMode.name })
                }
              />
            </div>
          </div>

          {/* Phone */}
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
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() =>
                  setEditMode({ ...editMode, phone: !editMode.phone })
                }
              />
            </div>
          </div>

          {/* Balance */}
          <div className={style.balanceCard}>
            <h3 className={style.infoTitle}>Account Balance</h3>
            <p className={style.infoValue}>{user?.balance || 0}$</p>
          </div>

          {/* Wishlist */}
          <div className={style.balanceCard}>
            <h3 className={style.infoTitle}>Wishlist</h3>
            <p className={style.infoValue}>{totalQuantity}</p>
          </div>
        </div>
      </div>

      {/* ✅ أزرار التحكم */}
      {(editMode.name || editMode.phone || editMode.email || image) && (
        <div className={style.buttonsContainer}>
          <button onClick={handleSaveChanges} className={style.saveButton}>
            Save Changes
          </button>
          <button onClick={handleCancel} className={style.cancelButton}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
