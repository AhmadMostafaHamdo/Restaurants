const express = require("express");
const multer = require("multer");
const {
  addFood,
  listFood,
  removeFood,
  getFoodsByRestaurant,
} = require("../controllers/foods");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list/:id", getFoodsByRestaurant);
router.get("/list", listFood);
router.delete("/remove", removeFood);

module.exports = router;
