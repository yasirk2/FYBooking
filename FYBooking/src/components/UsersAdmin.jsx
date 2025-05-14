import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import {
  getSelectedItems,
  addNewObject,
  deleteObject,
  updateObject,
} from "../data/db";
import handleChange from "../utils/handleChange";

const UsersAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    user_id: 0,
    username: "",
    password: "",
    role: "",
  });
  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    role: "client",
  });
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState(getSelectedItems("users"));
  const { setAdminPageDisplay } = useContext(MainContext);

  let tempOrg = "FYBooking";

  // Updates UserId to always be 1 more than the current highest UserId in sessionStorage
  useEffect(() => {
    if (users.length > 0) {
      const maxId = Math.max(...users.map((user) => user.user_id || 0));
      setUserId(maxId + 1);
    }
  }, [users]);

  // Function that creates the new user
  const createUser = (e) => {
    e.preventDefault();

    const newUser = {
      ...newUserData,
      organization: tempOrg,
      user_id: userId,
    };

    addNewObject("users", newUser);
    setUsers(getSelectedItems("users"));

    setNewUserData((prevData) => ({
      ...prevData,
      username: "",
      password: "",
      role: "client",
    }));

    setFormVisibility(false);
  };

  // Function to remove a user
  const removeUser = (index) => {
    deleteObject("users", "user_id", index);
    setUsers(getSelectedItems("users"));
    setFormVisibility(false);
  };

  const updateUser = (e) => {
    e.preventDefault();
    updateObject("users", selectedUser, "user_id");
    setUsers(getSelectedItems("users"));
    setFormVisibility(false);
  };

  return (
    <>
      {formVisibility === true && (
        <div className="admin-add-container">
          <button
            className="exit-button"
            onClick={() => {
              setFormVisibility(false);
              setUpdateMode(false);
            }}
          >
            X
          </button>
          <form onSubmit={(e) => createUser(e)} className="add-user-form">
            <label className="admin-form-label" htmlFor="new-user-username">
              Username
            </label>
            <input
              className="admin-form-input"
              type="text"
              name="username"
              id="new-user-username"
              onChange={(e) => {
                updateMode
                  ? handleChange(e, setSelectedUser)
                  : handleChange(e, setNewUserData);
              }}
              value={updateMode ? selectedUser.username : newUserData.username}
              placeholder="Username"
              required
            />
            <label className="admin-form-label" htmlFor="new-user-password">
              Password
            </label>
            <input
              className="admin-form-input"
              type="password"
              name="password"
              id="new-user-password"
              onChange={(e) => {
                updateMode
                  ? handleChange(e, setSelectedUser)
                  : handleChange(e, setNewUserData);
              }}
              value={updateMode ? selectedUser.password : newUserData.password}
              placeholder="Password"
              required
            />
            <fieldset className="admin-fieldset">
              <legend className="admin-form-label">Role</legend>
              <div className="role-inputs">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={
                      updateMode
                        ? selectedUser.role === "client"
                        : newUserData.role === "client"
                    }
                    onChange={(e) => {
                      updateMode
                        ? handleChange(e, setSelectedUser)
                        : handleChange(e, setNewUserData);
                    }}
                  />
                  Client
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={
                      updateMode
                        ? selectedUser.role === "admin"
                        : newUserData.role === "admin"
                    }
                    onChange={(e) => {
                      updateMode
                        ? handleChange(e, setSelectedUser)
                        : handleChange(e, setNewUserData);
                    }}
                  />
                  Admin
                </label>
              </div>
            </fieldset>
            {updateMode ? (
              <div>
                <button onClick={(e) => updateUser(e)}>Update</button>{" "}
                <button
                  type="button"
                  onClick={() => removeUser(selectedUser.user_id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button>Create User</button>
            )}
          </form>
        </div>
      )}
      {formVisibility === false && (
        <>
          <button
            className="admin-user-or-room-buttons"
            onClick={() => setFormVisibility(true)}
          >
            Add New User
          </button>
          <h2 className="user-or-room-display-title">Existing Users</h2>
          {users && (
            <div>
              {users.map((user) => {
                return (
                  <div
                    className="user-or-room-display-container"
                    key={user.user_id}
                  >
                    <p className="id-tag">{user.user_id}</p>
                    <h3 className="main-information">{user.username}</h3>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setFormVisibility(true);
                        setUpdateMode(true);
                        setSelectedUser({
                          user_id: user.user_id,
                          username: user.username,
                          password: user.password,
                          role: user.role,
                        });
                      }}
                    >
                      <img src="editing.svg" alt="edit" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UsersAdmin;
