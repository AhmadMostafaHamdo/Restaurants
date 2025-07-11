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

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/add-balance", increaseBalance);
router.put("/decrise-balance", decriseBalance);
module.exports = router;
