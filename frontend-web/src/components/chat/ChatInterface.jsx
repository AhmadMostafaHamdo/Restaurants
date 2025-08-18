import React, { useState, useRef, useEffect } from "react";
import TypingIndicator from "./Typography";
import Message from "./ Message";
import { streamChat } from "../../utils/api";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "مرحبًا! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // التمرير التلقائي للرسائل الجديدة
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // التركيز على حقل الإدخال عند التحميل
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // إدارة اختصارات لوحة المفاتيح (Ctrl+Enter للإرسال)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter" && !isLoading && input.trim()) {
        handleSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setTyping(true);

    let assistantResponse = "";
    let assistantMessageIndex = -1;

    try {
      await streamChat(
        newMessages,
        (token) => {
          assistantResponse += token;
          setMessages((prev) => {
            // إنشاء رسالة مساعد جديدة إذا لم تكن موجودة
            if (assistantMessageIndex === -1) {
              assistantMessageIndex = prev.length;
              return [
                ...prev,
                { role: "assistant", content: assistantResponse },
              ];
            }

            // تحديث رسالة المساعد الحالية
            return prev.map((msg, index) =>
              index === assistantMessageIndex
                ? { ...msg, content: assistantResponse }
                : msg
            );
          });
        },
        (error) => {
          console.error("Error during streaming:", error);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "أنا المساعد الذكي. حالياً أتعلم فقط، لكن يمكنني مساعدتك في أسئلة عامة",
            },
          ]);
        },
        () => {
          setIsLoading(false);
          setTyping(false);
        }
      );
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsLoading(false);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-900">
      {/* شريط العنوان */}
      <div className="py-4 mb-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center text-blue-400">
          المساعد الذكي
        </h1>
      </div>

      {/* منطقة المحادثة */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2 bg-gray-800 rounded-lg">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}

        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* نموذج الإدخال */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              جاري الإرسال...
            </span>
          ) : (
            "إرسال"
          )}
        </button>
      </form>

      {/* تذييل */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>مدعوم بواسطة DeepSeek API • MERN Stack</p>
        <p className="mt-1">للإرسال: Ctrl+Enter أو زر الإرسال</p>
      </div>
    </div>
  );
};

export default ChatInterface;