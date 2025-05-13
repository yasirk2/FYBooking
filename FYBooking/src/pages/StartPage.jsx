import { useNavigate } from "react-router-dom";
import "../styles/StartPageStyle.css";
import { addNewObject, getSelectedItems } from "../data/db";
import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";

const StartPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getSelectedItems("users"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginInfo, setLoginInfo] = useState();
  const { setHistory } = useContext(MainContext);

  const login = (e) => {
    e.preventDefault();
    const findUser = users.find((user) => user.username === username);

    if (findUser === undefined) {
      setLoginInfo(false);
    } else if (findUser.password === password) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(findUser));
      sessionStorage.setItem("component", "");
      addNewObject("history", { type: "route", value: "/room" });
      setHistory(getSelectedItems("history"));
      navigate("/room");
      setLoginInfo(true);
    }
  };

  // Creates the first admin account
  useEffect(() => {
    const storedUsers = getSelectedItems("users");
    if (storedUsers.length === 0) {
      const adminUser = {
        username: "admin",
        password: "admin",
        role: "admin",
        organization: "FYBooking",
        user_id: 0,
      };
      addNewObject("users", adminUser);
      setUsers(getSelectedItems("users"));
    }
  }, []);

  return (
    <>
      <h1 className="page-title">FYBooking</h1>
      <form className="login-form" onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="name"
          name="name"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {loginInfo === false && (
        <p className="wrong-login-info">Username or password is wrong</p>
      )}
    </>
  );
};

export default StartPage;
