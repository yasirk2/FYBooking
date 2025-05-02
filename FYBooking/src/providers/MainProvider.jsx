import MainContext from "./contexts/MainContext";

const MainProvider = ({ children }) => {

  return (
    <MainContext.Provider
      value={{
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;