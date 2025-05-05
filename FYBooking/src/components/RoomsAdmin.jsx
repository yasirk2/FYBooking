import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const RoomsAdmin = () => {
  const { setAdminPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      <button>Add Room</button>
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default RoomsAdmin;