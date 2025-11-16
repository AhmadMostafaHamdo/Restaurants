const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const connectToDB = require("./config/db");
const { Message } = require("./model/Message");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://restaurants-bc7m.onrender.com/",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(
  cors({
    origin: "https://restaurants-bc7m.onrender.com/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/food", require("./routes/foods"));
app.use("/api/resturants", require("./routes/reasturant"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/rating", require("./routes/rating"));
app.use("/api", require("./routes/contactUs"));
app.use("/api/message", require("./routes/messages"));
app.use("/api/sales", require("./routes/sales"));
  
// Static images
app.use("/images", express.static("uploads"));

// 🟢 تخزين المستخدمين المتصلين (userId -> socketId)
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // المستخدم يدخل
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log("🟢 Online Users:", Array.from(onlineUsers.keys()));
  });

  // استقبال الرسائل
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      const newMessage = new Message({ senderId, receiverId, text });
      await newMessage.save();

      // 🎯 إرسال الرسالة للمستلم والمرسل
      const receiverSocketId = onlineUsers.get(receiverId);
      const senderSocketId = onlineUsers.get(senderId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // عند خروج المستخدم
  socket.on("disconnect", () => {
    for (let [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// جعل io متاح في req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 server is running on port ${PORT}`);
});
