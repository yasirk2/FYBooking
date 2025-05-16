import "../styles/MainPageStyle.css";
import Schedule from "../components/Schedule";
import BookingSection from "../components/BookingSection";
import DateModule from "../components/DateModule";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";
import FooterNav from "../components/FooterNav";

const MainPage = () => {
  const { dateModuleVisibility } = useContext(MainContext);

  return (
    <div className="web-app-container">
      <div className="main-section-container">
        <Schedule />
      </div>
      <BookingSection />
      {dateModuleVisibility === true && <DateModule />}
      <FooterNav />
    </div>
  );
};

export default MainPage;
