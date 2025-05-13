const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db ...");
  } catch (err) {
    console.log("connected failed to mongo db", err);
  }
}
module.exports = connectToDb;
