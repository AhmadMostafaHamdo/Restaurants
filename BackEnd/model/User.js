const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    balance: { type: String, trim: true, default: "1000" },
    password: { type: String, required: true, trim: true, minlength: 8 },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true },
    image: { type: String },
    cartItem: { type: Object, default: {} },
    role: {
      type: String,
      enum: ["user", "admin", "resturantAdmin", "delivery"],
      default: "user",
    },
  },
  { minimize: false }
);

// ✅ Validations
const validateUserRegister = (obj) =>
  Joi.object({
    name: Joi.string().required().trim(),
    image: Joi.string(),
    password: Joi.string().required().trim().min(8),
    email: Joi.string().required().trim().email(),
    phone: Joi.string().required().trim(),
  }).validate(obj);

const validateUserUpdate = (obj) =>
  Joi.object({
    name: Joi.string().trim(),
    password: Joi.string().trim().min(8),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim(),
  }).validate(obj);

const User = mongoose.model("User", userSchema);
module.exports = { User, validateUserRegister, validateUserUpdate };
