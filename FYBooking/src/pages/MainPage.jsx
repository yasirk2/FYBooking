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
  const { dateModuleVisibility, setDateModuleVisibility } = useContext(MainContext);

  const navigateToRoomPage = () => {
    setDateModuleVisibility(false)
    navigate("/room");
  };

  return (
    <div className="main-page">
      <button className="return-to-room-page-button" onClick={navigateToRoomPage}>X</button>
      <div className="main-section-container">
        <Schedule />
      </div>
      <BookingSection />
      {dateModuleVisibility === true && <DateModule />}
      <UserButton originalPage={"main"} />
    </div>
  );
};

export default MainPage;
