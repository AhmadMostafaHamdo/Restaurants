const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateUserRegister,
  validateUserUpdate,
} = require("../model/User");
const jwt = require("jsonwebtoken");
// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({ status: "successed", data: users });
});
// Get User By Id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(200)
      .json({ status: "succussed", data: { msg: "user not found" } });
  }
  return res.status(200).json({ status: "ssuccusseduccussed", data: user });
});

// Create User
const createUser = asyncHandler(async (req, res) => {
  const { error } = validateUserRegister(req.body);
  const { name, email, password, phone } = req.body;
  if (error) {
    return res
      .status(400)
      .json({ status: "Failed", data: { msg: error.details[0].message } });
  }
  const user = await User.findOne({ email }, { _v: 0, password: 0 });
  if (user) {
    return res.status(422).json({
      status: "failed",
      data: { msg: "this email has already taken" },
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashPassword, phone });
  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.SECRETKEY,
    { expiresIn: "100d" }
  );
  newUser.token = token;
  await newUser.save();
  console.log({ ...newUser._doc, password: undefined }); // استخدم _doc لتجنب عرض الدوال

  return res.status(201).json({
    status: "successed",
    data: { msg: "user has been created succussfuly", user: newUser },
  });
});
// Update User
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "Failed", data: { msg: error.details[0].message } });
  }
  const { name, email, password, phone } = req.body;
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", data: { msg: "this user unexist" } });
  }
  const userUpdated = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name,
        email,
        password,
        phone,
      },
    }
  );
  userUpdated.save();
  return res.status(200).json({
    status: "successed",
    data: { msg: "user has been updated", user: userUpdated },
  });
});
// Delete All Users
const deleteAllUsers = asyncHandler(async (req, res) => {
  const user = await User.deleteMany({});
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", data: { msg: "no users" } });
  }
  return res.status(200).json({
    status: "successed",
    data: { msg: "users have been deleted successfuly" },
  });
}); // Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", data: { msg: "this user unexist" } });
  }
  return res.status(200).json({
    status: "successed",
    data: { msg: "user has been deleted successfuly" },
  });
});
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteAllUsers,
  deleteUser,
};
