import { useNavigate } from "react-router-dom";
import UserButton from "../components/UserButton";
import "../styles/RoomPageStyle.css";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const RoomPage = () => {
  const navigate = useNavigate();
  const { rooms } = useContext(MainContext);

  const navigateToMainPage = () => {
    navigate("/main");
  };

  return (
    <>
      <h1 className="page-title">Choose Room</h1>
      <div className="room-list">
        {rooms && (
          <>
            {rooms.map((room) => {
              return (
                <button
                  key={room.room_id}
                  className="room-button"
                  onClick={() => {
                    navigateToMainPage();

                    sessionStorage.setItem(
                      "selectedRoom",
                      JSON.stringify(room)
                    );
                  }}
                >
                  {room.room_name}
                </button>
              );
            })}
          </>
        )}
      </div>
      <UserButton originalPage={"room"} />
    </>
  );
};

export default RoomPage;
