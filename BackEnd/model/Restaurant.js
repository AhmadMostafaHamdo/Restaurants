
const mongoose = require("mongoose");
const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  cuisine: { type: String, required: true, trim: true },
  rating: { type: Number, required: true },
  image: { type: Object, required: true },
  open: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = { Restaurant };
