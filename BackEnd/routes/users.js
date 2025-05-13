const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/users");
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
deleteUser;
router.delete("/", deleteAllUsers);
router.delete("/:id", deleteUser);
deleteUser;

module.exports = router;
