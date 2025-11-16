import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(messages);
  // Stats for dashboard cards
  const [stats, setStats] = useState({
    total: 0,
  });

  // Fetch messages from backend API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/contact");
        setMessages(response.data.messages);
        console.log(response.data);
        // Calculate stats
        const total = response.data.messages.length;

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch messages. Please try again later.");
        setLoading(false);
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  // Filter messages based on status and search term
  const filteredMessages = messages.filter((message) => {
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Update message status
  const updateMessageStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/contact/${id}`, { status: newStatus });

      // Update local state
      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, status: newStatus } : msg
        )
      );

      // Update stats
      const newStats = { ...stats };
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }

      setStats(newStats);
    } catch (err) {
      console.error("Error updating message status:", err);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <p>{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="messages-dashboard">
      <h1 className="dashboard-title">Contact Messages</h1>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card total">
          <h3>Total Messages</h3>
          <h2>{messages?.length}</h2>
          <div className="stat-icon">
            <i className="fas fa-inbox"></i>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters" style={{display:"flex",alignItems:"center"}}>
        <div className="filter-group">
          <label>Status</label>
          All Messages
        </div>

        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="messages-container">
        {filteredMessages.length === 0 ? (
          <div className="no-messages">
            <i className="fas fa-inbox"></i>
            <p>No messages found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>content</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message._id}>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{formatDate(message.date)}</td>

                  <td>{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedMessage(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="message-detail">
                <h3>Contact Information</h3>
                <div className="detail-row">
                  <div className="detail-label">Name:</div>
                  <div className="detail-value">{selectedMessage.name}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Email:</div>
                  <div className="detail-value">{selectedMessage.email}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Date:</div>
                  <div className="detail-value">
                    {formatDate(selectedMessage.date)}
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Status:</div>
                  <div className="detail-value">
                    <span className={`status status-${selectedMessage.status}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="message-detail">
                <h3>Message</h3>
                <div className="message-content">{selectedMessage.message}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedMessage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
