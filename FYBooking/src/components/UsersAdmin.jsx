import { useContext, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { addUsers } from "../data/db";

const UsersAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const { setAdminPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      {formVisibility === true && (
        <div>
          <button onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-user-form" onSubmit={console.log("hej")}>
            <label htmlFor="username">Username</label>
            <input type="text"  name="username" id="username" placeholder="Username"/>
            <label htmlFor="new-user-password">Password</label>
            <input type="password" name="new-user-password" id="new-user-password" placeholder="Password"/>
            <label htmlFor="role">Role</label>
            <input type="text" name="role" id="role" placeholder="Role"/>
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