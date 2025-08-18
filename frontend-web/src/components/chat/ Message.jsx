import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ role, content }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (role === "assistant") {
      setDisplayedContent("");
      setCurrentIndex(0);

      if (content) {
        let index = 0;
        const timer = setInterval(() => {
          if (index < content.length) {
            setDisplayedContent((prev) => prev + content[index]);
            index++;
            setCurrentIndex(index);
          } else {
            clearInterval(timer);
          }
        }, 20);

        return () => clearInterval(timer);
      }
    } else {
      setDisplayedContent(content);
    }
  }, [content, role]);

  return (
    <div
      className={`flex ${
        role === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[85%] p-4 rounded-xl ${
          role === "user"
            ? "bg-blue-600 rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>
            {role === "assistant" ? displayedContent : content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
