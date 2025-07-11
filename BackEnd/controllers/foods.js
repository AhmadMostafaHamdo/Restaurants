const { Food } = require("../model/Food");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const addFood = asyncHandler(async (req, res) => {
  const { name, description, price, category, restaurantId } = req.body;
  const food = new Food({
    name,
    description,
    price,
    category,
    restaurantId,
    image: req.file.filename,
  });
  const newFood = await food.save();
  return res.status(200).json({ status: "success", newFood });
});
const listFood = asyncHandler(async (req, res) => {
  const food = await Food.find({}, { __v: 0 }).populate("restaurantId");
  if (!food) {
    return res.status(200).json({ status: "success", data: [] });
  }
  return res.status(200).json({ status: "success", food });
});
const getFoodById = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const food = await Food.find({ restaurantId }, { __v: 0 });
  if (!food) {
    return res.status(200).json({ status: "success", data: [] });
  }
  return res.status(200).json({ status: "success", food });
});
const removeFood = asyncHandler(async (req, res) => {
  const food = await Food.findByIdAndDelete(req.body.id);
  if (!food) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "this food not found" } });
  }
  fs.unlink(`uploads/${food.image}`, () => {});
  return res.status(200).json({ status: "success", data: food });
});
module.exports = {
  addFood,
  listFood,
  getFoodById,
  removeFood,
};
