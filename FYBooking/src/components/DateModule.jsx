import { useContext, useEffect, useState } from "react";
import "../styles/DateModuleStyle.css";
import MainContext from "../providers/contexts/MainContext";
import { addNewObject, getSelectedItems } from "../data/db";

const DateModule = () => {
  // const { selectedDateTime, selectedRoom, setDateModuleVisibility } =
  //   useContext(MainContext);

  const { setDateModuleVisibility } = useContext(MainContext);

  const [selectedDateTime] = useState(
    JSON.parse(sessionStorage.getItem("setSelectedDateTime"))
  );
  const [selectedRoom] = useState(
    JSON.parse(sessionStorage.getItem("selectedRoom"))
  );

  const [bookingId, setBookingId] = useState(0);
  const getbookings = getSelectedItems("bookings");

  const [newBookingData, setNewBookingData] = useState({
    room_name: selectedRoom.room_name,
    room_id: selectedRoom.room_id,
    start_time: selectedDateTime.startTime,
    end_time: selectedDateTime.endTime,
    date: selectedDateTime.date,
    dayName: selectedDateTime.dayName,
    month: selectedDateTime.month,
    user_id: sessionStorage.getItem("userId"),
    username: sessionStorage.getItem("username"),
    organization: selectedRoom.organization,
  });

  useEffect(() => {
    if (getbookings.length > 0) {
      const maxId = Math.max(
        ...getbookings.map((booking) => booking.booking_id || 0)
      );
      setBookingId(maxId + 1);
    }
  }, [getbookings]);

  const createBooking = () => {
    const newBooking = {
      ...newBookingData,
      organization: selectedRoom.organization,
      booking_id: bookingId,
    };

    addNewObject("bookings", newBooking);
  };
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

        <button onClick={createBooking} className="date-module-book-btn">
          Book
        </button>
      </div>
    </div>
  );
};

export default DateModule;
