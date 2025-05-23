import { useNavigate } from "react-router-dom";
import "../styles/RoomPageStyle.css";
import { useContext, useEffect } from "react";
import MainContext from "../providers/contexts/MainContext";
import FooterNav from "../components/FooterNav";
import { addNewObject, getSelectedItems } from "../data/db";

const RoomPage = () => {
  const navigate = useNavigate();
  const { rooms, setHistory } = useContext(MainContext);

  const navigateToMainPage = () => {
    navigate("/main");
    addNewObject("history", { type: "route", value: "/main" });
    setHistory(getSelectedItems("history"));
  };

  return (
    <div className="web-app-container">
      <h1 className="page-title">Choose Room</h1>
      <div className="room-list" role="list">
        {rooms.length > 0 ? (
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
        ) : (
          <h3>No rooms added</h3>
        )}
      </div>
      <FooterNav />
    </div>
  );
};

export default RoomPage;
