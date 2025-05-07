import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getUsers, addUsers } from "../data/db";

const UsersAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    role: "client",
  });
  const [users, setUsers] = useState(getUsers());
  const { setAdminPageDisplay } = useContext(MainContext);

  // Handles data changes in the form for new users data
  const handleChange = (e, data) => {
    const { name, value } = e.target;
    data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function that creates the new user and stores it
  const creatUser = (e) => {
    e.preventDefault();

    let tempOrg = "FYBooking";

    const uniqueId = users.length + 1;

    const newUser = {
      ...newUserData,
      organization: tempOrg,
      user_id: uniqueId,
    };

    addUsers(newUser);
    setUsers(getUsers());
  };

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      {formVisibility === true && (
        <div>
          <button onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-user-form" onSubmit={creatUser}>
            <label htmlFor="new-user-username">Username</label>
            <input
              type="text"
              name="username"
              id="new-user-username"
              onChange={(e) => handleChange(e, setNewUserData)}
              placeholder="Username"
            />
            <label htmlFor="new-user-password">Password</label>
            <input
              type="password"
              name="password"
              id="new-user-password"
              onChange={(e) => handleChange(e, setNewUserData)}
              placeholder="Password"
            />
            <fieldset>
              <legend>Role</legend>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  defaultChecked
                  onChange={(e) => handleChange(e, setNewUserData)}
                />
                Client
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
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
      <div></div>
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default UsersAdmin;
