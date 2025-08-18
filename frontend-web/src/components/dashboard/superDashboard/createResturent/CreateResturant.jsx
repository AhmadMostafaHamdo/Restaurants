import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const CreateResturant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    rating: "",
    open: false,
    image: null,
    user: "684a98a685b6108d2cfd9b14",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("cuisine", formData.cuisine);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("open", formData.open);
      formDataToSend.append("user", formData.user);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await axios.post("/resturants", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Restaurant created successfully!");
      setFormData({
        name: "",
        cuisine: "",
        rating: "",
        open: false,
        image: null,
        user: formData.user,
      });
      setImagePreview(null);

      setTimeout(() => navigate("/restaurants"), 2000);
    } catch (err) {
      let errorMessage = "Failed to create restaurant";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Please upload an image";
        } else if (err.response.status === 422) {
          errorMessage = "Restaurant already exists";
        } else {
          errorMessage = err.response.data.message || errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="custom-form">
        <h2>Create New Restaurant</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <label>
          Restaurant Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter restaurant name"
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Cuisine Type
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
            placeholder="Enter cuisine type"
          />
        </label>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem 0",
          }}
        >
          <div>
            <label>
              Rating (1-5)
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="1"
                max="5"
                step="0.1"
                placeholder="Enter rating"
              />
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="open"
                checked={formData.open}
                onChange={handleChange}
              />
              <span>Currently Open?</span>
            </label>
          </div>
        </div>

        <label>
          Restaurant Image
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <small >
            Please upload a high-quality image of your restaurant
          </small>
        </label>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default CreateResturant;
