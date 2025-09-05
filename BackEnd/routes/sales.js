// routes/sales.js
const express = require("express");
const { createSale, getUserSales } = require("../controllers/sales");

const router = express.Router();

router.post("/", createSale);
router.get("/:userId", getUserSales); // 👈 عرض المبيعات الخاصة بمستخدم

module.exports = router;
