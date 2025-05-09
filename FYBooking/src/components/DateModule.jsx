import { useContext, useEffect } from "react";
import "../styles/DateModuleStyle.css";
import MainContext from "../providers/contexts/MainContext";

const DateModule = () => {
  const { selectedDateTime, selectedRoom, setDateModuleVisibility } =
    useContext(MainContext);

  useEffect(() => {
    console.log(selectedDateTime);
  }, [selectedDateTime]);
  return (
    <div className="date-module-div">
      <button
        onClick={() => setDateModuleVisibility(false)}
        className="date-module-close-btn"
      >
        X
      </button>
      <div className="date-module-inner-div">
        <div className="date-module-info-div">
          <p>{selectedRoom.room_name}</p>
          <p>{`${selectedDateTime.dayName} ${selectedDateTime.date} ${selectedDateTime.month}`}</p>
          <p>{`${selectedDateTime.startTime} - ${selectedDateTime.endTime}`}</p>
        </div>

        <button className="date-module-book-btn">Book</button>
      </div>
    </div>
  );
};

export default DateModule;
