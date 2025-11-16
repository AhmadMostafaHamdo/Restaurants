const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: ["https://restaurants-bc7m.onrender.com/"],
});
module.exports = { io, app, server };
