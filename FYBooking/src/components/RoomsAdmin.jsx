import { useContext, useState } from "react";
import MainContext from "../providers/contexts/MainContext";

const RoomsAdmin = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const { setAdminPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      {formVisibility === true && (
        <div>
          <button onClick={() => setFormVisibility(false)}>X</button>
          <form className="add-room-form" onSubmit={console.log("hej")}>
            <label htmlFor="room-name">Room Name</label>
            <input type="text"  name="room-name" id="room-name" placeholder="Room Name"/>
            <label htmlFor="slot-duration">Booking Duratiion</label>
            <input type="number" name="slot-duration" id="slot-duration" placeholder="60" min={30} step={10}/>
            <fieldset>
              <legend>Booking Time Span</legend>
              <div className="time-inputs">
                <input
                  type="time"
                  id="start-time"
                  name="start-time"
                  placeholder="Start"
                  aria-label="Start time"
                />
                <span>-</span>
                <input
                  type="time"
                  id="end-time"
                  name="end-time"
                  placeholder="End"
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
      <div></div>
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default RoomsAdmin;