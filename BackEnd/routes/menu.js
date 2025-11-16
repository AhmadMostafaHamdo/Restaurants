const express = require("express");
const multer = require("multer");
const {
  addMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), addMenu);
router.get("/", getMenus);
router.get("/:id", getMenuById);

module.exports = router;
