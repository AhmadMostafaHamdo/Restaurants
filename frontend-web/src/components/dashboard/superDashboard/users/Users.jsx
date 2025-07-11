import React, { useEffect } from "react";
import style from "./style.module.css";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/users/thunkUsers/getAllUsers";
import { deleteUser } from "../../../../redux/resturant/resturantThunk/deleteUser";
import { ToastContainer } from "react-bootstrap";
const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, users]);
  const handelDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <div>
      <ToastContainer />
      <table>
        <thead>
          <td>name</td>
          <td>email</td>
          <td>role</td>
          <td>action</td>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={index}
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
                    onClick={() => handelDeleteUser(user._id)}
                  />
                  <Edit color="blue" cursor="pointer" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
