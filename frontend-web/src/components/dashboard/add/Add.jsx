import { CloudUpload } from "lucide-react";
import style from "./style.module.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const { uploadImage, filed, labelImg } = style;
const Add = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const img = useRef(null);
  const handelImage = () => {
    img.current.click();
  };
  const onchangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const res = await axios.post(
      "http://localhost:5000/api/food/add",
      formData
    );
    if (res.data.status === "success") {
      console.log(res.data);
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success("Food Added");
    } else {
    }
  };
  const handelDrag = (e) => {
    e.preventDefault();
  };
  const handelDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={onSubmitHandler}>
        <div
          className={filed}
          onClick={handelImage}
          onDragOver={handelDrag}
          onDrop={handelDrop}
        >
          <label className={labelImg}>Upload Image</label>
          {image ? (
            <img src={URL.createObjectURL(image)} />
          ) : (
            <div className={uploadImage}>
              <p>Drag and Drop or select</p>
              <CloudUpload width={50} height={50} />
              <input
                type="file"
                hidden
                ref={img}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          )}
        </div>
        <div className={filed}>
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => onchangeHandler(e)}
          />
        </div>
        <div className={filed}>
          <label htmlFor="description">Product description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => onchangeHandler(e)}
          />
        </div>
        <div className={filed} style={{ display: "flex", gap: "20px" }}>
          <div>
            <label htmlFor="category">Product Category</label>
            <br />
            <select
              id="category"
              name="category"
              onChange={(e) => onchangeHandler(e)}
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
          <div>
            <label htmlFor="restarant">Product Restarant</label>
            <br />
            <select
              id="category"
              name="restarant"
              onChange={(e) => onchangeHandler(e)}
            >
              <option value="Lafah">Lafah</option>
              <option value="Alyasar">Alyasar</option>
              <option value="Dajajati">Dajajati</option>
            </select>
          </div>
        </div>
        <div className={filed}>
          <label htmlFor="price">Product Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={data.price}
            onChange={(e) => onchangeHandler(e)}
          />
        </div>
        <div className={filed}>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
