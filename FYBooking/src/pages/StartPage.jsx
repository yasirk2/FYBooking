import { useNavigate } from "react-router-dom";
import "../styles/StartPageStyle.css";
import { addUsers, getUsers } from "../data/db";
import { useEffect } from "react";

const StartPage = () => {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/room");
  };

  // Creates the first admin account
  useEffect(() => {
    const storedUsers = getUsers()

    if(storedUsers.length === 0) {
      const adminUser = {
        username: "admin",
        password: "admin",
        role: "admin",
        organization: "FYBooking",
        user_id: 1,
      }
      addUsers(adminUser)
    }
  }, [])

  return (
    <>
      <h1 className="page-title">FYBooking</h1>
      <form className="login-form" onSubmit={login}>
        <input type="text" id="name" name="name" placeholder="Username" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default StartPage;
