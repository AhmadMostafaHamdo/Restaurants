import React, { useState, useEffect, useRef } from "react";
import pesonal from "../../assets/pesonal.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { getAllUsers } from "../../redux/users/thunkUsers/getAllUsers";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function DeleveryChat() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let { users = [] } = useSelector((state) => state.users);

  const cookie = new Cookies();
  const token = cookie.get("token");
  const decoded = jwtDecode(token || "");
  const currentUserId = decoded?.id ? String(decoded.id) : "";

  users = users.filter((user) => user._id !== currentUserId);

  const toId = (v) => (v ? String(v) : "");

  const normalizeMessage = (m) => ({
    ...m,
    senderId: toId(m.senderId),
    receiverId: toId(m.receiverId),
    _id: toId(m._id),
    createdAt: m.createdAt || new Date().toISOString(),
    text: m.text ?? "",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentUserId) {
      socket.emit("join", currentUserId);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, normalizeMessage(msg)]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedDelivery || !token) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/message/${selectedDelivery._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const normalized = Array.isArray(res.data)
          ? res.data.map(normalizeMessage)
          : [];
        setMessages(normalized);
      } catch (error) {
        console.log("Fetch messages error:", error);
      }
    };
    fetchMessages();
  }, [selectedDelivery, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || !selectedDelivery) return;

    const newMsg = {
      senderId: currentUserId,
      receiverId: selectedDelivery._id,
      text: value,
    };

    socket.emit("sendMessage", newMsg);

    setValue("");
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#f3f4f6" }}
    >
      {/* Delivery List */}
      <div
        style={{
          width: "16rem",
          backgroundColor: "#fff",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            padding: "1rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {decoded.role !== "delivery" ? "Delivery List" : "Users List"}
        </h2>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {users.map((d) => {
            if (d.role !== decoded.role) {
              const isOnline = onlineUsers.includes(d._id);
              return (
                <div
                  key={d._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem",
                    cursor: "pointer",
                    backgroundColor:
                      selectedDelivery?._id === d._id
                        ? "#dbeafe"
                        : "transparent",
                  }}
                  onClick={() => setSelectedDelivery(d)}
                >
                  <div style={{ position: "relative", marginRight: "0.75rem" }}>
                    <img
                      src={pesonal}
                      alt={d.name}
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "50%",
                      }}
                    />
                    {isOnline && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#22c55e",
                          borderRadius: "50%",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </div>
                  <span style={{ fontWeight: "500" }}>{d.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Chat Box */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            height: "4rem",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {selectedDelivery ? (
            <>
              <div style={{ position: "relative", marginRight: "0.75rem" }}>
                <img
                  src={selectedDelivery.avatar || pesonal}
                  alt={selectedDelivery.name}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                  }}
                />
                {onlineUsers.includes(selectedDelivery._id) && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#22c55e",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                )}
              </div>
              <span style={{ fontWeight: "500" }}>{selectedDelivery.name}</span>
            </>
          ) : (
            <span style={{ color: "#6b7280" }}>اختر دليفري لبدء الدردشة</span>
          )}
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            overflowY: "auto",
            backgroundColor: "#f9fafb",
          }}
        >
          {messages.map((msg) => {
            const isMine = msg.senderId === currentUserId;
            return (
              <div
                key={msg._id}
                style={{
                  display: "flex",
                  justifyContent: isMine ? "flex-end" : "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "1rem",
                    maxWidth: "70%",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    backgroundColor: isMine ? "#bbf7d0" : "#fff",
                  }}
                >
                  <div style={{ fontSize: "1rem" }}>{msg.text}</div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem",
                      textAlign: "right",
                    }}
                  >
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            padding: "1rem",
            backgroundColor: "#fff",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <input
            type="text"
            style={{
              flex: 1,
              padding: "0.5rem",
              borderRadius: "9999px 0 0 9999px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
            placeholder={
              selectedDelivery ? "اكتب رسالتك..." : "اختر دليفري أولاً"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!selectedDelivery || isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !selectedDelivery}
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              padding: "0 1rem",
              borderRadius: "0 9999px 9999px 0",
              opacity: isLoading || !selectedDelivery ? 0.5 : 1,
              marginLeft: "0.5rem",
            }}
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleveryChat;
