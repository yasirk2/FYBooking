import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems, addNewObject, deleteObject } from "../data/db";
import handleChange from "../utils/handleChange";

const RoomsAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    room_name: "",
    slot_duration: 30,
    start_time: "08:00",
    end_time: "12:00",
  });
  const [roomId, setRoomId] = useState(0);
  const { setAdminPageDisplay, rooms, setRooms } = useContext(MainContext);

  let tempOrg = "FYBooking";

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
  };

  // Function to remove a room
  const removeRoom = (index) => {
    deleteObject("rooms", "room_id", index);
    setRooms(getSelectedItems("rooms"));
  };

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      {formVisibility === true && (
        <div className="admin-add-container">
          <button className="exit-button" onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-room-form" onSubmit={createRoom}>
            <label className="admin-form-label" htmlFor="room-name">Room Name</label>
            <input
              className="admin-form-input"
              type="text"
              name="room_name"
              id="room-name"
              onChange={(e) => handleChange(e, setNewRoomData)}
              value={newRoomData.room_name}
              placeholder="Room Name"
              required
            />
            <label className="admin-form-label" htmlFor="slot-duration">Booking Duration</label>
            <input
              className="admin-form-input"
              type="number"
              name="slot_duration"
              id="slot-duration"
              placeholder="60"
              onChange={(e) => handleChange(e, setNewRoomData)}
              value={newRoomData.slot_duration}
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
                  onChange={(e) => handleChange(e, setNewRoomData)}
                  value={newRoomData.start_time}
                  aria-label="Start time"
                />
                <span>-</span>
                <input
                  type="time"
                  id="end-time"
                  name="end_time"
                  placeholder="End"
                  onChange={(e) => handleChange(e, setNewRoomData)}
                  value={newRoomData.end_time}
                  aria-label="End time"
                />
              </div>
            </fieldset>
            <button type="submit">Create Room</button>
          </form>
        </div>
      )}
      {formVisibility === false && (
        <>
          <button className="admin-user-or-room-buttons" onClick={() => setFormVisibility(true)}>Add New Room</button>
          <h2 className="user-or-room-display-title">Existing Rooms</h2>
          {rooms && (
            <div>
              {rooms.map((room) => {
                return (
                  <div className="user-or-room-display-container" key={room.room_id}>
                    <p className="id-tag">{room.room_id}</p>
                    <span className="main-information">
                      <h3>{room.room_name}</h3>
                      <p>
                        {room.start_time} - {room.end_time}
                      </p>
                    </span>
                    <button className="edit-button" onClick={() => removeRoom(room.room_id)}>X</button>
                  </div>
                );
              })}
            </div>
          )}
          <button className="admin-user-or-room-buttons" onClick={goBack}>Back</button>
        </>
      )}
    </>
  );
};

export default RoomsAdmin;
