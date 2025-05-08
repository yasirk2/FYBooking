import MainContext from "./contexts/MainContext";
import { useEffect, useState } from "react";

const MainProvider = ({ children }) => {
  const [userPageDisplay, setUserPageDisplay] = useState(null);
  const [adminPageDisplay, setAdminPageDisplay] = useState(null);
  const [previousPage, setPreviousPage] = useState(() => {
    const storedPage = sessionStorage.getItem("previousPage");
    return storedPage || null;
  });
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateTime, setSelectedDateTime] = useState({});
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateModuleVisibility, setDateModuleVisibility] = useState(false);

  // Sparar previousPage i sessionStorage ifall en refresh utförs
  useEffect(() => {
    if (previousPage) {
      sessionStorage.setItem("previousPage", previousPage);
    }
  }, [previousPage]);

  return (
    <MainContext.Provider
      value={{
        userPageDisplay,
        setUserPageDisplay,
        adminPageDisplay,
        setAdminPageDisplay,
        previousPage,
        setPreviousPage,
        selectedDate,
        setSelectedDate,
        selectedDateTime,
        setSelectedDateTime,
        selectedRoom,
        setSelectedRoom,
        dateModuleVisibility,
        setDateModuleVisibility,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
