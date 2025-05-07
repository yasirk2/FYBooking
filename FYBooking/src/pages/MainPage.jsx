import "../styles/MainPageStyle.css";
import UserButton from "../components/UserButton";
import Schedule from "../components/Schedule";
import BookingSection from "../components/BookingSection";

const MainPage = () => {
  return (
    <div className="main-page">
      <Schedule />
      <BookingSection />
      <UserButton originalPage={"main"} />
    </div>
  );
};

export default MainPage;
