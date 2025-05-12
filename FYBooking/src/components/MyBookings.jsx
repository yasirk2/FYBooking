import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const MyBookings = () => {
  const { setUserPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setUserPageDisplay(null);
  };

  return (
    <>
      <p>MyBookings</p>
      <button className="user-action-button my-profile-bookings" onClick={goBack}>Back</button>
    </>
  );
};

export default MyBookings;
