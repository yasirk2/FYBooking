import { useContext, useEffect, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems } from "../data/db";

const MyBookings = () => {
  const { setUserPageDisplay } = useContext(MainContext);
  const bookings = getSelectedItems("bookings");
  const loggedInUser = getSelectedItems("loggedInUser");
  const [myBookings, setMyBookings] = useState();

  useEffect(() => {
    const findMyBookings = bookings.filter(
      (booking) => booking.user_id === loggedInUser.user_id
    );
    setMyBookings(findMyBookings);
  }, []);

  const goBack = () => {
    setUserPageDisplay(null);
  };

  return (
    <>
      {myBookings && myBookings.length > 0 && (
        <>
          {myBookings.map((booking) => (
            <div key={booking.booking_id}>
              <p>
                {booking.month} {booking.dayName} {booking.date}
              </p>
              <p>
                {booking.room_name} {booking.start_time} - {booking.end_time}
              </p>
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
