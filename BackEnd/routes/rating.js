const express = require("express");
const router = express.Router();
const { sendResetLink } = require("../controllers/rating");

// Send rating link to user's email
router.post("/request-rating", sendResetLink);
// Verify rating link token
// router.get("/verify-rating/:userId/:token", verifyRatingLink);

// Add this later for actual rating submission
// router.post('/submit-rating/:userId/:token', submitRating);

module.exports = router;
