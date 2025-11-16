const express = require("express");
const router = express.Router();
const { sendMessage, getMessage } = require("../controllers/Message");

// إرسال رسالة
router.post("/", sendMessage);

// جلب الرسائل بين مستخدمين
router.get("/:user1/:user2", getMessage);

module.exports = router;
