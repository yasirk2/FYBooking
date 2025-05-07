import "../styles/MainPageStyle.css";
import UserButton from "../components/UserButton";
import Schedule from "../components/Schedule";
import BookingSection from "../components/BookingSection";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const navigateToRoomPage = () => {
    navigate("/room");
  };

  return (
    <div className="main-page">
      <button onClick={navigateToRoomPage}>X</button>
      <Schedule />
      <BookingSection />
      <UserButton originalPage={"main"} />
    </div>
  );
};

export default MainPage;
