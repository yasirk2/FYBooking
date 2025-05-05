import { useNavigate } from "react-router-dom";
import "../styles/StartPageStyle.css";

const StartPage = () => {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/room");
  };

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
