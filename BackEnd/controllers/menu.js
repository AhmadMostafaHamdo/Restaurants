// 🧾 Menu Controller
const { Menu } = require("../model/Menu");
const asyncHandler = require("express-async-handler");

// Add Menu
const addMenu = asyncHandler(async (req, res) => {
  const { name, resturantId, foodItems } = req.body;

  const exists = await Menu.findOne({ name });
  if (exists)
    return res.status(422).json({ status: "fail", msg: "Menu already exists" });

  const newMenu = await new Menu({
    name,
    img: req.file.filename,
    resturantId,
    foodItems,
  }).save();
  res.status(201).json({ status: "success", data: newMenu });
});

// Get All Menus
const getMenus = asyncHandler(async (_req, res) => {
  const menus = await Menu.find({})
    .populate("foodItems")
    .populate("resturantId");
  res.status(200).json({ status: "success", data: menus });
});

// Get Menu By ID
const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id)
    .populate("foodItems")
    .populate("resturantId");
  if (!menu)
    return res.status(404).json({ status: "fail", msg: "Menu not found" });
  res.status(200).json({ status: "success", data: menu });
});

// Update Menu
const updateMenu = asyncHandler(async (req, res) => {
  const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated)
    return res.status(404).json({ status: "fail", msg: "Menu not found" });
  res.status(200).json({ status: "success", data: updated });
});

// Delete Menu
const deleteMenu = asyncHandler(async (req, res) => {
  const deleted = await Menu.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ status: "fail", msg: "Menu not found" });
  res.status(200).json({ status: "success", msg: "Menu deleted" });
});

module.exports = { addMenu, getMenus, getMenuById, updateMenu, deleteMenu };
