const { Food } = require("../model/Food");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const { Restaurant } = require("../model/Restaurant");
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
// Get foods by restaurant
const getFoodsByRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate restaurant ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid restaurant ID format"
    });
  }

  // Check if restaurant exists
  const restaurantExists = await Restaurant.exists({ _id: id });
  if (!restaurantExists) {
    return res.status(404).json({
      status: "fail",
      message: "Restaurant not found"
    });
  }

  // Get ONLY the foods for this restaurant
  const foods = await Food.find({ restaurantId: id })
    .select("-__v") // Exclude version field
    .lean();

  return res.status(200).json({ 
    status: "success", 
    results: foods.length,
    data: foods 
  });
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
  getFoodsByRestaurant,
  removeFood,
};
