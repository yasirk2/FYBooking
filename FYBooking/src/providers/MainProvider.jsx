import MainContext from "./contexts/MainContext";
import { useState } from "react";
import { getSelectedItems } from "../data/db";

const MainProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateTime, setSelectedDateTime] = useState({});
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateModuleVisibility, setDateModuleVisibility] = useState(false);
  const [rooms, setRooms] = useState(getSelectedItems("rooms"));
  const [updateBookings, setUpdateBookings] = useState(false);
  const [isBooked, setIsBooked] = useState(true);
  const [history, setHistory] = useState(getSelectedItems("history"));
  const [displayComponent, setDisplayComponent] = useState(
    sessionStorage.getItem("component")
  );

  return (
    <MainContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedDateTime,
        setSelectedDateTime,
        selectedRoom,
        setSelectedRoom,
        dateModuleVisibility,
        setDateModuleVisibility,
        rooms,
        setRooms,
        updateBookings,
        setUpdateBookings,
        isBooked,
        setIsBooked,
        history,
        setHistory,
        displayComponent,
        setDisplayComponent,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
