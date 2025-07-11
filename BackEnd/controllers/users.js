// 👥 User Controller
const { validateUserUpdate, User } = require("../model/User");
const asyncHandler = require("express-async-handler");
const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({}, { password: 0, __v: 0 });
  res.status(200).json({ status: "success", data: users });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({ status: "fail", msg: "User not found" });
  res.status(200).json({ status: "success", data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: "fail", msg: error.details[0].message });

  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated)
    return res.status(404).json({ status: "fail", msg: "User not found" });

  res
    .status(200)
    .json({ status: "success", data: updated, msg: "added balance " });
});
const increaseBalance = asyncHandler(async (req, res) => {
  const { balance, email } = req.body;

  // 1. Find user by email (corrected query)
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (typeof balance !== "number" || balance <= 0) {
    return res.status(400).json({
      msg: "Invalid balance amount",
    });
  }

  // 2. Calculate new balance
  const newBalance = +user.balance + balance;

  // 3. Update user (corrected update logic)
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: { balance: newBalance } },
    { new: true } // Return updated document
  );

  // 4. Proper response with updated data
  res.status(200).json({
    status: "success",
    data: updatedUser,
    msg: "Balance increased successfully",
  });
});
const decriseBalance = asyncHandler(async (req, res) => {
  const { balance, email } = req.body;
  const user = await User.findOne(email);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  await User.updateOne(
    { email },
    {
      $set: {
        balance: balance - balance,
      },
    }
  );
  res
    .status(200)
    .json({ status: "success", data: updated, msg: "decrise balance" });
});
const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ status: "fail", msg: "User not found" });
  if (deleted.role === "restaurantAdmin" && deleted.restaurant) {
    await Restaurant.findByIdAndDelete(deleted.restaurant);
  }
  res.status(200).json({ status: "success", msg: "User deleted" });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  increaseBalance,
  decriseBalance,
};
