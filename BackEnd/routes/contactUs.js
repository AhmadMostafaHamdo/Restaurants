const express = require("express");
const { Contact } = require("../model/ContactUs");
const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      message,
      date: new Date(),
    });

    await newContact.save();

    // Here you would typically add email sending logic
    // using Nodemailer or other service

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find({});
    return res.status(200).json({ messages });
  } catch (error) {}
});
module.exports = router;
