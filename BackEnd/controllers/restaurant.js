// 🏨 Restaurant Controller
const { Restaurant } = require("../model/Restaurant");
const asyncHandler = require("express-async-handler");
const getAllRestaurants = asyncHandler(async (_req, res) => {
  const restaurants = await Restaurant.find({}, { __v: 0 });
  res.status(200).json({ status: "success", data: restaurants });
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id, { __v: 0 });
  if (!restaurant)
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  res.status(200).json({ status: "success", data: restaurant });
});

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, cuisine, rating, open, user } = req.body;
  if (!req.file)
    return res.status(400).json({ status: "failed", msg: "No image uploaded" });

  const exists = await Restaurant.findOne({ name });
  if (exists)
    return res
      .status(422)
      .json({ status: "failed", msg: "Restaurant already exists" });

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

const updateRestaurant = asyncHandler(async (req, res) => {
  const update = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!update)
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  res.status(200).json({ status: "success", data: update });
});

const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant)
    return res
      .status(404)
      .json({ status: "fail", msg: "Restaurant not found" });
  fs.unlink(`uploads/${restaurant.image}`, () => {});
  await restaurant.deleteOne();
  res.status(200).json({ status: "success", msg: "Restaurant deleted" });
});

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
