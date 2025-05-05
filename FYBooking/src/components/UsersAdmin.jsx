import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const UsersAdmin = () => {
  const { setAdminPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setAdminPageDisplay(null);
  };

  return (
    <>
      <button>Add User</button>
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default UsersAdmin;