const express = require("express");
const multer = require("multer");
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", upload.single("image"), createRestaurant);
router.patch("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
