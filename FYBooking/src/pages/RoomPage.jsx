import { useNavigate } from "react-router-dom";
import UserButton from "../components/UserButton";
import "../styles/RoomPageStyle.css";

const RoomPage = () => {
  const navigate = useNavigate()
  
  const navigateToMainPage = () => {
    navigate("/main")
  };

  return (
    <>
      <h1 className="page-title">Choose Room</h1>
      <div className="room-list">
        <button className="room-button" onClick={navigateToMainPage}>Office 1</button>
        <button className="room-button" onClick={navigateToMainPage}>Office 2</button>
        <button className="room-button" onClick={navigateToMainPage}>Office 3</button>
        <button className="room-button" onClick={navigateToMainPage}>Office 4</button>
      </div>
      <UserButton originalPage={"room"} />
    </>
  );
};

export default RoomPage;
