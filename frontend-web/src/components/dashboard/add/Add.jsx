import { CloudUpload } from "lucide-react";
import style from "./style.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const { uploadImage, filed, labelImg } = style;

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    restaurantId: "68443aa03906e4a5b852e428", // Set initial value
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

    // Basic validation
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

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
        // Reset form BUT KEEP RESTAURANT SELECTION
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
          restaurantId: data.restaurantId, // Keep the current restaurant selection
        });
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add food");
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
            <img src={URL.createObjectURL(image)} alt="Food preview" />
          ) : (
            <div className={uploadImage}>
              <p>Drag and Drop or select</p>
              <CloudUpload width={50} height={50} />
              <input
                type="file"
                hidden
                ref={img}
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
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
            onChange={onchangeHandler}
            required
          />
        </div>
        <div className={filed}>
          <label htmlFor="description">Product description</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={onchangeHandler}
            required
          />
        </div>
        <div className={filed} style={{ display: "flex" }}>
          <div>
            <label htmlFor="category" style={{ width: "130px" }}>
              Category
            </label>
            <br />
            <select
              id="category"
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
          <div>
            <label htmlFor="restaurant"> Restaurant</label>
            <br />
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
        <div className={filed}>
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={onchangeHandler}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className={filed}>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
