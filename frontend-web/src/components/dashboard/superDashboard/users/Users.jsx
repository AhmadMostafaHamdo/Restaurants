import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/users/thunkUsers/getAllUsers";
import { deleteUser } from "../../../../redux/resturant/resturantThunk/deleteUser";
import { Modal, Button } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users only on component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete._id))
        .then(() => {
          // Close modal after successful deletion
          setShowDeleteModal(false);
          setUserToDelete(null);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setShowDeleteModal(false);
          setUserToDelete(null);
        });
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <table className={style.usersTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={{ background: index % 2 === 0 ? "#e8f5e9" : "#ffebee" }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Trash2
                  color="red"
                  cursor="pointer"
                  style={{ marginRight: "6px" }}
                  onClick={() => handleDeleteClick(user)}
                />
                <Edit color="blue" cursor="pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToDelete && (
            <div>
              <p>
                Are you sure you want to delete user{" "}
                <strong>{userToDelete.name}</strong>?
              </p>
              <p>Email: {userToDelete.email}</p>
              <p className="text-danger">This action cannot be undone.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
