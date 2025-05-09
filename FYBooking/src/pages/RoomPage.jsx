import { useNavigate } from "react-router-dom";
import UserButton from "../components/UserButton";
import "../styles/RoomPageStyle.css";
import { useContext, useEffect } from "react";
import MainContext from "../providers/contexts/MainContext";

const RoomPage = () => {
  const navigate = useNavigate();
  const { setSelectedRoom } = useContext(MainContext);

  const navigateToMainPage = () => {
    navigate("/main");
  };

  useEffect(() => {
    console.log(sessionStorage.getItem("username"));
  }, [sessionStorage.getItem("username")]);

  return (
    <>
      <h1 className="page-title">Choose Room</h1>
      <div className="room-list">
        <button
          className="room-button"
          onClick={(e) => {
            navigateToMainPage();
            setSelectedRoom(e.target.innerText);
          }}
        >
          Office 1
        </button>
        <button
          className="room-button"
          onClick={(e) => {
            navigateToMainPage();
            setSelectedRoom(e.target.innerText);
          }}
        >
          Office 2
        </button>
        <button
          className="room-button"
          onClick={(e) => {
            navigateToMainPage();
            setSelectedRoom(e.target.innerText);
          }}
        >
          Office 3
        </button>
        <button
          className="room-button"
          onClick={(e) => {
            navigateToMainPage();
            setSelectedRoom(e.target.innerText);
          }}
        >
          Office 4
        </button>
      </div>
      <UserButton originalPage={"room"} />
    </>
  );
};

export default RoomPage;
