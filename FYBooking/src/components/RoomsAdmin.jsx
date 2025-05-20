import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import {
  getSelectedItems,
  addNewObject,
  deleteObject,
  updateObject,
} from "../data/db";
import handleChange from "../utils/handleChange";
import useMediaQuery from "../utils/useMediaQuery";
import { useNavigate } from "react-router-dom";

const RoomsAdmin = () => {
  const navigate = useNavigate();
  const [formVisibility, setFormVisibility] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [tempConnected, setTempConnected] = useState(
    () => sessionStorage.getItem("tabletRoom") === "true"
  );
  const [isConnected, setIsConnected] = useState(
    () => sessionStorage.getItem("tabletRoom") === "true"
  );
  const [checkedRoom, setCheckedRoom] = useState(() => {
    const stored = sessionStorage.getItem("selectedRoom");
    return stored ? JSON.parse(stored) : { room_id: "" };
  });
  const [selectedRoom, setSelectedRoom] = useState({
    room_id: 0,
    room_name: "",
    slot_duration: 0,
    start_time: "",
    end_time: "",
  });
  const [newRoomData, setNewRoomData] = useState({
    room_name: "",
    slot_duration: 30,
    start_time: "08:00",
    end_time: "12:00",
  });
  const [roomId, setRoomId] = useState(0);
  const { rooms, setRooms } = useContext(MainContext);

  let tempOrg = "FYBooking";

  const isTabletLandscape = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1400px) and (orientation: landscape)"
  );

  const isTabletPortrait = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)"
  );

  // Updates RoomId to always be 1 more than the current highest RoomId in sessionStorage
  useEffect(() => {
    if (rooms.length) {
      const maxId = Math.max(...rooms.map((room) => room.room_id || 0));
      setRoomId(maxId + 1);
    }
  }, [rooms]);

  // Function that creates a new room
  const createRoom = (e) => {
    e.preventDefault();

    const newRoom = {
      ...newRoomData,
      organization: tempOrg,
      room_id: roomId,
    };

    if (newRoomData.start_time < newRoomData.end_time) {
      addNewObject("rooms", newRoom);
      setRooms(getSelectedItems("rooms"));
      setNewRoomData((prevData) => ({
        ...prevData,
        room_name: "",
        slot_duration: 30,
        start_time: "08:00",
        end_time: "12:00",
      }));
    }

    setFormVisibility(false);
  };

  // Function to remove a room
  const removeRoom = (index) => {
    deleteObject("rooms", "room_id", index);
    setRooms(getSelectedItems("rooms"));
    setFormVisibility(false);
  };

  const updateRoom = (e) => {
    e.preventDefault();
    updateObject("rooms", selectedRoom, "room_id");
    setRooms(getSelectedItems("rooms"));
    setFormVisibility(false);
  };

  const logout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("history");
    sessionStorage.removeItem("component");
    navigate("/");
  };

  return (
    <>
      {formVisibility === true && (
        <div className="admin-add-container">
          <button
            className="exit-button"
            onClick={() => setFormVisibility(false)}
            aria-label="Close create room"
          >
            X
          </button>
          <form className="add-room-form" onSubmit={createRoom}>
            <label className="admin-form-label" htmlFor="room-name">
              Room Name
            </label>
            <input
              className="admin-form-input"
              type="text"
              name="room_name"
              id="room-name"
              onChange={(e) => {
                updateMode
                  ? handleChange(e, setSelectedRoom)
                  : handleChange(e, setNewRoomData);
              }}
              value={
                updateMode ? selectedRoom.room_name : newRoomData.room_name
              }
              placeholder="Room Name"
              required
            />
            <label className="admin-form-label" htmlFor="slot-duration">
              Booking Duration
            </label>
            <input
              className="admin-form-input"
              type="number"
              name="slot_duration"
              id="slot-duration"
              placeholder="60"
              onChange={(e) => {
                updateMode
                  ? handleChange(e, setSelectedRoom)
                  : handleChange(e, setNewRoomData);
              }}
              value={
                updateMode
                  ? selectedRoom.slot_duration
                  : newRoomData.slot_duration
              }
              min={30}
              step={30}
            />
            <fieldset className="admin-fieldset">
              <legend className="admin-form-label">Booking Time Span</legend>
              <div className="time-inputs">
                <input
                  type="time"
                  id="start-time"
                  name="start_time"
                  placeholder="Start"
                  onChange={(e) => {
                    updateMode
                      ? handleChange(e, setSelectedRoom)
                      : handleChange(e, setNewRoomData);
                  }}
                  value={
                    updateMode
                      ? selectedRoom.start_time
                      : newRoomData.start_time
                  }
                  aria-label="Start time"
                />
                <span>-</span>
                <input
                  type="time"
                  id="end-time"
                  name="end_time"
                  placeholder="End"
                  onChange={(e) => {
                    updateMode
                      ? handleChange(e, setSelectedRoom)
                      : handleChange(e, setNewRoomData);
                  }}
                  value={
                    updateMode ? selectedRoom.end_time : newRoomData.end_time
                  }
                  aria-label="End time"
                />
              </div>
            </fieldset>
            {updateMode ? (
              <>
                {(isTabletLandscape || isTabletPortrait) && (
                  <label htmlFor="connect-to-tablet" className="">
                    <input
                      type="checkbox"
                      id="connect-to-tablet"
                      name="connect_to_tablet"
                      defaultChecked={
                        isConnected &&
                        selectedRoom.room_id === checkedRoom.room_id
                      }
                      onClick={(e) => {
                        setTempConnected(e.target.checked);
                      }}
                      disabled={
                        isConnected &&
                        selectedRoom.room_id !== checkedRoom.room_id
                      }
                    />
                    Connect this room to tablet
                  </label>
                )}
                <div className="update-remove-btn-div">
                  <button
                    className="update-btn"
                    onClick={(e) => {
                      updateRoom(e);
                      if (tempConnected !== isConnected) {
                        if (tempConnected) {
                          sessionStorage.setItem(
                            "selectedRoom",
                            JSON.stringify(selectedRoom)
                          );
                          setCheckedRoom(getSelectedItems("selectedRoom"));
                        } else if (!tempConnected) {
                          sessionStorage.setItem("selectedRoom", "");
                        }
                        logout();
                        setIsConnected(tempConnected);
                        sessionStorage.setItem("tabletRoom", tempConnected);
                      }
                    }}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="remove-btn"
                    type="button"
                    onClick={() => removeRoom(selectedRoom.room_id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <button className="create-item-btn">Create room</button>
            )}
          </form>
        </div>
      )}
      {formVisibility === false && (
        <>
          <button
            className="admin-user-or-room-buttons"
            onClick={() => {
              setFormVisibility(true);
              setUpdateMode(false);
            }}
          >
            Add New Room
          </button>
          <h2 className="user-or-room-display-title">Existing Rooms</h2>
          {rooms && (
            <div className="users-rooms-main-container">
              {rooms.map((room) => {
                return (
                  <div
                    className="user-or-room-display-container"
                    key={room.room_id}
                  >
                    <p className="id-tag">{room.room_id}</p>
                    <span className="main-information">
                      <h3>{room.room_name}</h3>
                      <p>
                        {room.start_time} - {room.end_time}
                      </p>
                    </span>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setFormVisibility(true);
                        setUpdateMode(true);
                        setSelectedRoom({
                          room_id: room.room_id,
                          room_name: room.room_name,
                          slot_duration: room.slot_duration,
                          start_time: room.start_time,
                          end_time: room.end_time,
                          organization: tempOrg,
                        });
                      }}
                      aria-label={`Edit the room ${room.room_name}`}
                    >
                      <img src="editing.svg" alt="edit" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RoomsAdmin;
