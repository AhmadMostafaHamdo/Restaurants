const { Restaurant } = require("../model/Restaurant");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// Get all restaurants
const getAllRestaurants = asyncHandler(async (_req, res) => {
  const restaurants = await Restaurant.find({}, { __v: 0 });
  res.status(200).json({ status: "success", data: restaurants });
});

// Get single restaurant by ID
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id, { __v: 0 });
  if (!restaurant) {
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  }
  res.status(200).json({ status: "success", data: restaurant });
});

// Create new restaurant
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, cuisine, rating, open, user } = req.body;

  if (!req.file) {
    return res.status(400).json({ status: "failed", msg: "No image uploaded" });
  }

  const exists = await Restaurant.findOne({ name });
  if (exists) {
    return res
      .status(422)
      .json({ status: "failed", msg: "Restaurant already exists" });
  }

  const restaurant = await new Restaurant({
    name,
    cuisine,
    rating,
    open,
    image: req.file.filename,
    user,
  }).save();

  res.status(201).json({ status: "success", data: restaurant });
});

// Update restaurant (general updates)
const updateRestaurant = asyncHandler(async (req, res) => {
  const update = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!update) {
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  }

  res.status(200).json({ status: "success", data: update });
});

// Update restaurant status specifically
const updateRestaurantStatus = asyncHandler(async (req, res) => {
  const { open } = req.body;

  const update = await Restaurant.findByIdAndUpdate(
    req.params.id,
    { open },
    { new: true }
  );

  if (!update) {
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  }

  // Emit WebSocket event if io is available
  if (req.io && open !== undefined) {
    req.io.emit("restaurant-status-updated", {
      restaurantId: req.params.id,
      isOpen: update.open,
    });
  }

  res.status(200).json({ status: "success", data: update });
});

// Delete restaurant
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  }

  // Delete associated image file
  fs.unlink(`uploads/${restaurant.image}`, () => {});

  await restaurant.deleteOne();
  res.status(200).json({ status: "success", msg: "Restaurant deleted" });
});

// تحديث التقييم مباشرة (رقم جديد)
const updateRating = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { rating } = req.body; // القيمة الجديدة

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "التقييم يجب أن يكون بين 1 و 5" });
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { rating },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "المطعم غير موجود" });
    }

    res.json({ message: "تم تحديث التقييم", restaurant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
};


module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  updateRestaurantStatus,
  updateRating,
};
