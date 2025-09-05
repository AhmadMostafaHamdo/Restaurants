const express = require("express");
const router = express.Router();
const protected = require("../middleware/auth");
const { getMessage, postMessage } = require("../controllers/Message");

router.get("/:id", protected, getMessage);
router.post("/:id", protected, postMessage);

module.exports = router;
