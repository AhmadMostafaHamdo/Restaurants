  const { Message } = require("../model/Message");

  const getMessage = async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    try {
      const messages = await Message.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ createdAt: 1 }); // sort oldest → newest
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  const postMessage = async (req, res) => {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    try {
      const newMessage = new Message({ senderId, receiverId, text });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  module.exports = { getMessage, postMessage };
