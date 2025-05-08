import "../styles/MainPageStyle.css";
import UserButton from "../components/UserButton";
import Schedule from "../components/Schedule";
import BookingSection from "../components/BookingSection";
import { useNavigate } from "react-router-dom";
import DateModule from "../components/DateModule";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const MainPage = () => {
  const navigate = useNavigate();
  const { dateModuleVisibility } = useContext(MainContext);

  const navigateToRoomPage = () => {
    navigate("/room");
  };

  return (
    <div className="main-page">
      <button onClick={navigateToRoomPage}>X</button>
      <Schedule />
      <BookingSection />
      {dateModuleVisibility === true && <DateModule />}
      <UserButton originalPage={"main"} />
    </div>
  );
};

export default MainPage;
