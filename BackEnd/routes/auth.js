const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { register, login, refresh, logout } = require("../controllers/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|svg|webp/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());
  cb(isValid ? null : new Error("Only images are allowed"), isValid);
};

const upload = multer({ storage, fileFilter });

// المسارات
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
