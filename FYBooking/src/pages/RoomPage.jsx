import UserButton from "../components/UserButton";
import "../styles/RoomPageStyle.css";

const RoomPage = () => {
  return (
    <>
      <h1 className="page-title">RoomPage</h1>
      <div className="room-list">
        <button className="room-button">Office 1</button>
        <button className="room-button">Office 2</button>
        <button className="room-button">Office 3</button>
        <button className="room-button">Office 4</button>
      </div>
      <UserButton />
    </>
  );
};

export default RoomPage;
