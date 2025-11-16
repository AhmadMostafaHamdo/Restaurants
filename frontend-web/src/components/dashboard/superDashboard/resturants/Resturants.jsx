import axios from "axios";
import React, { useEffect, useState } from "react";
import { Edit, Star, Trash2 } from "lucide-react";
import { Modal, Button, Spinner, Badge } from "react-bootstrap";
import { io } from "socket.io-client";
import Switch from "react-switch";

// Configure socket with reconnection options
const socket = io("https://restaurants-bc7m.onrender.com/", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

const Resturants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const res = await axios.get("/resturants");
        setRestaurants(res.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants");
      }
    };
    getRestaurants();

    // Socket event handlers
    const handleConnect = () => {
      console.log("Connected to WebSocket server");
      setSocketConnected(true);
    };

    const handleDisconnect = (reason) => {
      console.log("Disconnected from WebSocket:", reason);
      setSocketConnected(false);
    };

    const handleStatusUpdate = (data) => {
      console.log("Received status update:", data);
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant._id === data.restaurantId.toString()
            ? { ...restaurant, open: data.isOpen }
            : restaurant
        )
      );
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("restaurant-status-updated", handleStatusUpdate);
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("restaurant-status-updated", handleStatusUpdate);
      socket.off("connect_error");
    };
  }, []);

  const handleDeleteClick = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!restaurantToDelete) return;

    try {
      await axios.delete(`/resturants/${restaurantToDelete._id}`);
      setRestaurants(
        restaurants.filter((r) => r._id !== restaurantToDelete._id)
      );

      // Notify other clients about deletion
      socket.emit("restaurant-deleted", {
        restaurantId: restaurantToDelete._id,
      });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      setError("Failed to delete restaurant");
    } finally {
      setShowDeleteModal(false);
      setRestaurantToDelete(null);
    }
  };

  const toggleRestaurantStatus = async (restaurantId, currentStatus) => {
    const newStatus = !currentStatus;

    // Optimistic UI update
    setRestaurants((prev) =>
      prev.map((r) => (r._id === restaurantId ? { ...r, open: newStatus } : r))
    );

    setUpdatingStatus(restaurantId);

    try {
      // Send update to server
      await axios.patch(`/resturants/${restaurantId}/status`, {
        open: newStatus,
      });

      // Emit socket event to update all clients
      socket.emit("update-restaurant-status", {
        restaurantId,
        isOpen: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update restaurant status");

      // Revert optimistic update on error
      setRestaurants((prev) =>
        prev.map((r) =>
          r._id === restaurantId ? { ...r, open: currentStatus } : r
        )
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Restaurants Management</h2>
        <Badge bg={socketConnected ? "success" : "danger"}>
          {socketConnected ? "Live Updates: ON" : "Live Updates: OFF"}
        </Badge>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "25%" }}>Name</th>
                  <th style={{ width: "15%" }}>Cuisine</th>
                  <th style={{ width: "10%" }}>Rating</th>
                  <th style={{ width: "15%" }}>Image</th>
                  <th style={{ width: "15%" }}>Status</th>
                  <th style={{ width: "20%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant._id}>
                    <td className="align-middle">
                      <strong>{restaurant.name}</strong>
                    </td>
                    <td className="align-middle">
                      <Badge bg="info" className="text-uppercase">
                        {restaurant.cuisine}
                      </Badge>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <span className="me-1">{restaurant.rating}</span>
                        <span className="text-warning">
                          <Star size={16} fill="#ffc107" />
                        </span>
                      </div>
                    </td>
                    <td className="align-middle">
                      {restaurant.image && (
                        <img
                          src={`https://restaurants-bc7m.onrender.com/images/${restaurant.image}`}
                          alt={restaurant.name}
                          className="img-thumbnail rounded"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        {updatingStatus === restaurant._id ? (
                          <div className="d-flex align-items-center">
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            <span className="text-muted">Updating...</span>
                          </div>
                        ) : (
                          <>
                            <Switch
                              checked={restaurant.open}
                              onChange={() =>
                                toggleRestaurantStatus(
                                  restaurant._id,
                                  restaurant.open
                                )
                              }
                              disabled={
                                updatingStatus !== null || !socketConnected
                              }
                              onColor="#28a745"
                              offColor="#dc3545"
                              height={24}
                              width={48}
                              className="me-2"
                            />
                            <span
                              className={
                                restaurant.open ? "text-success" : "text-danger"
                              }
                            >
                              {restaurant.open ? "Open" : "Closed"}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="align-middle d-flex">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => console.log("Edit:", restaurant._id)}
                        disabled={updatingStatus !== null}
                      >
                        <Edit size={16} className="me-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(restaurant)}
                        disabled={updatingStatus !== null}
                      >
                        <Trash2 size={16} className="me-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {restaurantToDelete && (
            <>
              <p>
                Are you sure you want to permanently delete{" "}
                <strong className="text-danger">
                  {restaurantToDelete.name}
                </strong>
                ?
              </p>
              <p className="text-muted">
                This will remove all associated data including menu items and
                reviews.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Resturants;
