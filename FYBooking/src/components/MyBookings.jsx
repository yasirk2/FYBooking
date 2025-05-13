import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { deleteObject, getSelectedItems } from "../data/db";

const MyBookings = () => {
  const { setUserPageDisplay } = useContext(MainContext);
  const [bookings, setBookings] = useState(getSelectedItems("bookings"));
  const loggedInUser = getSelectedItems("loggedInUser");
  const [myBookings, setMyBookings] = useState();

  useEffect(() => {
    const findMyBookings = bookings.filter(
      (booking) => booking.user_id === loggedInUser.user_id
    );
    setMyBookings(findMyBookings);
  }, [bookings]);

  const goBack = () => {
    setUserPageDisplay(null);
  };

  const cancelBooking = (objectId) => {
    deleteObject("bookings", "booking_id", objectId)
    setBookings(getSelectedItems("bookings"))
  };

  return (
    <>
      {myBookings && myBookings.length > 0 && (
        <>
          {myBookings.map((booking) => (
            <div className="booking-container" key={booking.booking_id}>
              <div className="date-tag">
                <p>
                  {booking.month} {booking.date}
                </p>
                <p>{booking.dayName}</p>
              </div>
              <div className="my-booking-information">
                <p>{booking.room_name}</p>
                <p>
                  {booking.start_time} - {booking.end_time}
                </p>
              </div>
              <button className="cancel-button" onClick={() => cancelBooking(booking.booking_id)}>Cancel</button>
            </div>
          ))}
        </>
      )}
      <button
        className="user-action-button my-profile-bookings"
        onClick={goBack}
      >
        Back
      </button>
    </>
  );
};

export default MyBookings;
