import { useNavigate } from "react-router-dom";
import "../styles/StartPageStyle.css";
import { addNewObject, getSelectedItems } from "../data/db";
import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import useMediaQuery from "../utils/useMediaQuery";

const StartPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getSelectedItems("users"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginInfo, setLoginInfo] = useState();
  const { setHistory } = useContext(MainContext);

  const isTabletLandscape = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1400px) and (orientation: landscape)"
  );

  const isTabletPortrait = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)"
  );

  const login = (e) => {
    e.preventDefault();
    const findUser = users.find((user) => user.username === username);

    if (findUser === undefined) {
      setLoginInfo(false);
    } else if (findUser.password === password) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(findUser));
      sessionStorage.setItem("component", "");
      const selectedRoom = sessionStorage.getItem("selectedRoom");
      if (!selectedRoom || selectedRoom.length === 0) {
        sessionStorage.setItem("selectedRoom", "");
      }
      const tabletConnected = sessionStorage.getItem("tabletRoom") === "true";
      if (tabletConnected) {
        addNewObject("history", { type: "route", value: "/main" });
        navigate("/main");
      } else {
        addNewObject("history", { type: "route", value: "/room" });
        navigate("/room");
      }
      setHistory(getSelectedItems("history"));
      setLoginInfo(true);
    }
  };

  const guestLogin = () => {
    const guest = {
      username: "guest",
      user_id: "guest",
    };
    sessionStorage.setItem("loggedInUser", JSON.stringify(guest));
    sessionStorage.setItem("component", "");
    addNewObject("history", { type: "route", value: "/main" });
    setHistory(getSelectedItems("history"));
    navigate("/main");
    setLoginInfo(true);
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

    if (isTabletLandscape || isTabletPortrait) {
      const tablet = getSelectedItems("tabletRoom");
      if (tablet.length === 0) sessionStorage.setItem("tabletRoom", false);
    }
  }, []);

  return (
    <>
      <img className="start-logo" src="../logo.svg" alt="FYBooking logo" />
      <form className="login-form" role="form" onSubmit={login}>
        <label htmlFor="username" className="sr-only">
          {" "}
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {loginInfo === false && (
          <p aria-live="polite" className="wrong-login-info">
            Username or password is wrong
          </p>
        )}
      </form>
      {(isTabletLandscape || isTabletPortrait) &&
        sessionStorage.getItem("tabletRoom") === "true" && (
          <button
            aria-label="log in as guest"
            className="login-guest-btn"
            onClick={guestLogin}
          >
            Login as guest
          </button>
        )}
    </>
  );
};

export default StartPage;
