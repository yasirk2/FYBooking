import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems, addNewObject, deleteObject } from "../data/db";
import handleChange from "../utils/handleChange";

const RoomsAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    room_name: "",
    slot_duration: "",
    start_time: "08:00",
    end_time: "12:00",
  });
  const [roomId, setRoomId] = useState(0);
  const [rooms, setRooms] = useState(getSelectedItems("rooms"));
  const { setAdminPageDisplay } = useContext(MainContext);

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

    addNewObject("rooms", newRoom);
    setRooms(getSelectedItems("rooms"));

    setNewRoomData((prevData) => ({
      ...prevData,
      room_name: "",
      slot_duration: "",
      start_time: "08:00",
      end_time: "12:00",
    }));
  };

  // Function to remove a user
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
        <div>
          <button onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-room-form" onSubmit={createRoom}>
            <label htmlFor="room-name">Room Name</label>
            <input
              type="text"
              name="room_name"
              id="room-name"
              onChange={(e) => handleChange(e, setNewRoomData)}
              value={newRoomData.room_name}
              placeholder="Room Name"
            />
            <label htmlFor="slot-duration">Booking Duration</label>
            <input
              type="number"
              name="slot_duration"
              id="slot-duration"
              placeholder="60"
              onChange={(e) => handleChange(e, setNewRoomData)}
              value={newRoomData.slot_duration}
              min={30}
              step={10}
            />
            <fieldset>
              <legend>Booking Time Span</legend>
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
      <button onClick={() => setFormVisibility(true)}>Add New Room</button>
      <h2>Existing Rooms</h2>
      {rooms && (
        <div>
          {rooms.map((room, index) => {
            return (
              <div key={index}>
                <p>{room.room_id}</p>
                <h3>{room.room_name}</h3>
                <p>{room.start_time} - {room.end_time}</p>
                <button onClick={() => removeRoom(index)}>X</button>
              </div>
            )
          })}
        </div>
      )}
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default RoomsAdmin;
