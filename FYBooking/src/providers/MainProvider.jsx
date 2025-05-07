import MainContext from "./contexts/MainContext";
import { useState } from "react";

const MainProvider = ({ children }) => {
  const [userPageDisplay, setUserPageDisplay] = useState(null);
  const [adminPageDisplay, setAdminPageDisplay] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  return (
    <MainContext.Provider
      value={{
        userPageDisplay,
        setUserPageDisplay,
        adminPageDisplay,
        setAdminPageDisplay,
        previousPage,
        setPreviousPage,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
