const express = require("express");
const multer = require("multer");
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  updateRestaurantStatus,
  updateRating,
} = require("../controllers/restaurant");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// GET all restaurants
router.get("/", getAllRestaurants);

// GET single restaurant
router.get("/:id", getRestaurantById);

// POST create new restaurant
router.post("/", upload.single("image"), createRestaurant);

// PATCH update restaurant (general updates)
router.patch("/:id", updateRestaurant);

// PATCH update restaurant status specifically
router.patch("/:id/status", updateRestaurantStatus);

// DELETE restaurant
router.delete("/:id", deleteRestaurant);
// Rating restaurant
router.put("/:restaurantId/rating", updateRating);

module.exports = router;
