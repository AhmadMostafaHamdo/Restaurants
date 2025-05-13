const Joi = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
const validateUserRegister = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
    password: Joi.string().required().trim().min(8),
    email: Joi.string().required().trim().email(),
    phone: Joi.string().required().trim(),
  });
  return schema.validate(obj);
};
const validateUserUpdate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim(),
    password: Joi.string().trim().min(8),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim(),
  });
  return schema.validate(obj);
};
const User = mongoose.model("User", userSchema);
module.exports = { User, validateUserRegister, validateUserUpdate };
