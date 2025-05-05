import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const MyProfile = () => {
  const { setUserPageDisplay } = useContext(MainContext);

  const goBack = () => {
    setUserPageDisplay(null);
  };
  
  return (
    <>
      <p>MyProfile</p>
      <button onClick={goBack}>Back</button>
    </>
  );
};

export default MyProfile;
