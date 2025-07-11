const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();
const connectToDB = require("./config/db");
require("dotenv").config();
// Connect To DB
connectToDB();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(bodyParser.json());

//routes
server.use("/api/auth", require("./routes/auth"));
server.use("/api/users", require("./routes/users"));
server.use("/api/food", require("./routes/foods"));
server.use("/api/resturants", require("./routes/reasturant"));
server.use("/api/menu", require("./routes/menu"));
server.use("/api/rating", require("./routes/rating"));
server.use("/images", express.static("uploads"));

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
