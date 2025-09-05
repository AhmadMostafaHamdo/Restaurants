const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  decriseBalance,
  increaseBalance,
} = require("../controllers/users");

const router = express.Router();
const multer = require("multer");
const path = require("path");


// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"), // مجلد الصور
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    ),
});
const upload = multer({ storage });

// الراوتات
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// تحديث المستخدم مع صورة
router.patch("/:id", upload.single("image"), updateUser);

router.delete("/:id", deleteUser);
router.put("/add-balance", increaseBalance);
router.put("/decrise-balance", decriseBalance);

module.exports = router;
