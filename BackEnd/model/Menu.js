
const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  foodItems: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = { Menu };
