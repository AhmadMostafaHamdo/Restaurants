import { CloudUpload } from "lucide-react";
import style from "./style.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    restaurantId: "68443aa03906e4a5b852e428",
  });

  const img = useRef(null);

  const handelImage = () => img.current.click();

  const onchangeHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("restaurantId", data.restaurantId);

    try {
      const res = await axios.post("/food/add", formData);
      if (res.data.status === "success") {
        toast.success("Food Added");
        setData({
          ...data,
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add food");
    }
  };

  const handelDrag = (e) => e.preventDefault();
  const handelDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
  };

  return (
    <div className={style.container}>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className={style.form}>
        {/* Image Upload */}
        <div
          className={style.imageContainer}
          onClick={handelImage}
          onDragOver={handelDrag}
          onDrop={handelDrop}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Food preview"
              className={style.preview}
            />
          ) : (
            <div className={style.uploadBox}>
              <CloudUpload className={style.icon} />
              <p>Drag & Drop or click to upload</p>
            </div>
          )}
          <input
            type="file"
            hidden
            ref={img}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Fields */}
        <div className={style.fields}>
          <div className={style.field}>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onchangeHandler}
              required
            />
          </div>

          <div className={style.field}>
            <label>Product Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onchangeHandler}
              required
            />
          </div>

          <div className={style.flexRow}>
            <div className={style.field}>
              <label>Category</label>
              <select
                name="category"
                value={data.category}
                onChange={onchangeHandler}
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
                <option value="Taco">Taco</option>
                <option value="Sushi">Sushi</option>
              </select>
            </div>

            <div className={style.field}>
              <label>Restaurant</label>
              <select
                name="restaurantId"
                value={data.restaurantId}
                onChange={onchangeHandler}
              >
                <option value="68443aa03906e4a5b852e428">Dajajati</option>
                <option value="68443af73906e4a5b852e42b">Lafah</option>
                <option value="68443b4b3906e4a5b852e42f">Alisar</option>
              </select>
            </div>
          </div>

          <div className={style.field}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onchangeHandler}
              min="0"
              step="0.01"
              required
            />
          </div>

          <button type="submit" className={style.submitBtn}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
