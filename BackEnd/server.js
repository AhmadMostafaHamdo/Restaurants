// server.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectToDB = require("./config/db");
const { Message } = require("./model/Message");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Socket.IO مع CORS عام
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// اتصال MongoDB
connectToDB();

// Middlewares
app.use(
  cors({
    origin: "*", // يسمح لأي دومين
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/food", require("./routes/foods"));
app.use("/api/resturants", require("./routes/reasturant"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/rating", require("./routes/rating"));
app.use("/api/message", require("./routes/messages"));
app.use("/api/sales", require("./routes/sales"));

// ✅ Contact Route مباشر هنا (يمكنك نقله إلى contactUs.js)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  // هنا يمكنك حفظ الرسالة في MongoDB أو إرسال إيميل
  console.log("Contact Message Received:", { name, email, message });

  return res
    .status(200)
    .json({ status: "success", message: "Message received" });
});

// Static images
app.use("/images", express.static("uploads"));

// 🟢 Socket.IO
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      const newMessage = new Message({ senderId, receiverId, text });
      await newMessage.save();

      const receiverSocketId = onlineUsers.get(receiverId);
      const senderSocketId = onlineUsers.get(senderId);

      if (receiverSocketId)
        io.to(receiverSocketId).emit("receiveMessage", newMessage);
      if (senderSocketId)
        io.to(senderSocketId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) onlineUsers.delete(userId);
    }
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

// جعل io متاح في req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 server is running on port ${PORT}`);
});
