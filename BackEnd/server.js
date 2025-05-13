const express = require("express");
const cors = require("cors");
const server = express();
const connectToDB = require("./config/db");
require("dotenv").config();
// Connect To DB
connectToDB();
server.use(cors());
server.use(express.json());
//routes
server.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
