import "../styles/MainPageStyle.css";
import UserButton from "../components/UserButton";
import Schedule from "../components/Schedule";
import BookingSection from "../components/BookingSection";

const MainPage = () => {
  return (
    <>
      <Schedule />
      <BookingSection />
      <UserButton originalPage={"main"} />
    </>
  );
};

export default MainPage;
