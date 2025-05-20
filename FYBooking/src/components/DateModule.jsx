import { useContext, useEffect, useRef, useState } from "react";
import "../styles/DateModuleStyle.css";
import MainContext from "../providers/contexts/MainContext";
import { addNewObject, getSelectedItems } from "../data/db";

const DateModule = () => {
  const {
    setDateModuleVisibility,
    updateBookings,
    setUpdateBookings,
    isBooked,
  } = useContext(MainContext);

  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
  });

  const [selectedDateTime] = useState(
    JSON.parse(sessionStorage.getItem("setSelectedDateTime"))
  );
  const [selectedRoom] = useState(
    JSON.parse(sessionStorage.getItem("selectedRoom"))
  );

  const [bookingId, setBookingId] = useState(0);
  const getbookings = getSelectedItems("bookings");
  const loggedInUser = getSelectedItems("loggedInUser");

  const [newBookingData, setNewBookingData] = useState({
    room_name: selectedRoom.room_name,
    room_id: selectedRoom.room_id,
    start_time: selectedDateTime.startTime,
    end_time: selectedDateTime.endTime,
    date: selectedDateTime.date,
    dayName: selectedDateTime.dayName,
    month: selectedDateTime.month,
    user_id: loggedInUser.user_id,
    username: loggedInUser.username,
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
    <div
      className="date-module-div"
      role="dialog"
      aria-modal="true"
      aria-labelledby="date-module"
      ref={dialogRef}
      tabIndex={-1}
    >
      {!isBooked && (
        <button
          onClick={() => setDateModuleVisibility(false)}
          className="date-module-close-btn"
          aria-label="close module"
        >
          X
        </button>
      )}
      <div className="date-module-inner-div">
        <div className="date-module-info-div">
          <p>{selectedRoom.room_name}</p>
          <p>{`${selectedDateTime.dayName} ${selectedDateTime.date} ${selectedDateTime.month}`}</p>
          <p>{`${selectedDateTime.startTime} - ${selectedDateTime.endTime}`}</p>
          {isBooked && <p style={{ color: "#ffb7b7" }}>Is already booked</p>}
        </div>

        {isBooked ? (
          <button
            onClick={() => setDateModuleVisibility(false)}
            className="date-module-book-btn"
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => {
              createBooking();
              setUpdateBookings(!updateBookings);
              setDateModuleVisibility(false);
            }}
            className="date-module-book-btn"
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
};

export default DateModule;
