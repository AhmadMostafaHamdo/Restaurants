// في backend/routes/chat.js
const express = require("express");
const router = express.Router();
router.post("/stream", async (req, res) => {
  try {
    const { messages } = req.body;

    // إعداد رؤوس SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // محاكاة رد الذكاء الاصطناعي (حل مؤقت)
    const responseText =
      "أنا المساعد الذكي. حالياً أتعلم فقط، لكن يمكنني مساعدتك في أسئلة عامة!";
    const words = responseText.split(" ");

    // إرسال الرد كلمه كلمة
    for (const word of words) {
      res.write(`data: ${JSON.stringify({ token: word + " " })}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    res.write(`data: ${JSON.stringify({ completed: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
