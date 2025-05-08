import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems, addNewObject, deleteObject } from "../data/db";
import handleChange from "../utils/handleChange";

const UsersAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
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
  };

  // Function to remove a user
  const removeUser = (index) => {
    deleteObject("users", "user_id", index);
    setUsers(getSelectedItems("users"));
  };

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      {formVisibility === true && (
        <div>
          <button onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-user-form" onSubmit={createUser}>
            <label htmlFor="new-user-username">Username</label>
            <input
              type="text"
              name="username"
              id="new-user-username"
              onChange={(e) => handleChange(e, setNewUserData)}
              value={newUserData.username}
              placeholder="Username"
            />
            <label htmlFor="new-user-password">Password</label>
            <input
              type="password"
              name="password"
              id="new-user-password"
              onChange={(e) => handleChange(e, setNewUserData)}
              value={newUserData.password}
              placeholder="Password"
            />
            <fieldset>
              <legend>Role</legend>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={newUserData.role === "client"}
                  onChange={(e) => handleChange(e, setNewUserData)}
                />
                Client
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={newUserData.role === "admin"}
                  onChange={(e) => handleChange(e, setNewUserData)}
                />
                Admin
              </label>
            </fieldset>
            <button type="submit">Create User</button>
          </form>
        </div>
      )}
      <button onClick={() => setFormVisibility(true)}>Add New User</button>
      <h2>Existing Users</h2>
      {users && (
        <div>
          {users.map((user, index) => {
            return (
              <div key={index}>
                <p>{user.user_id}</p>
                <h3>{user.username}</h3>
                <button onClick={() => removeUser(index)}>X</button>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default UsersAdmin;
