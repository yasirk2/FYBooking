import MainContext from "./contexts/MainContext";
import { useState } from "react";

const MainProvider = ({ children }) => {
  const [userPageDisplay, setUserPageDisplay] = useState(null)
  const [adminPageDisplay, setAdminPageDisplay] = useState(null)

  return (
    <MainContext.Provider
      value={{
        userPageDisplay,
        setUserPageDisplay,
        adminPageDisplay,
        setAdminPageDisplay,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;