import { useNavigate } from "react-router-dom";
import "../styles/UserPageStyle.css";
import MyProfile from "../components/MyProfile";
import MyBookings from "../components/MyBookings";
import { addNewObject, getSelectedItems } from "../data/db";
import FooterNav from "../components/FooterNav";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";

const UserPage = () => {
  const navigate = useNavigate();
  const loggedInUser = getSelectedItems("loggedInUser");
  const { setHistory, displayComponent, setDisplayComponent } =
    useContext(MainContext);

  const navigateToAdminPage = () => {
    navigate("/admin");
    addNewObject("history", { type: "route", value: "/admin" });
    setHistory(getSelectedItems("history"));
  };

  const navigateToComponent = (component) => {
    setDisplayComponent(component);
    sessionStorage.setItem("component", component);
    addNewObject("history", { type: "component", value: component });
    setHistory(getSelectedItems("history"));
  };

  const logout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("history");
    sessionStorage.removeItem("component");
    navigate("/");
  };

  return (
    <>
      {displayComponent === "myProfile" ? (
        <>
          <h1 className="page-title">My Profile</h1>
          <MyProfile />
        </>
      ) : displayComponent === "myBooking" ? (
        <>
          <h1 className="page-title">My Bookings</h1>
          <MyBookings />
        </>
      ) : (
        <>
          <h1 className="page-title">{loggedInUser.username}</h1>
          <div className="user-menu">
            <button
              className="user-action-button"
              onClick={() => navigateToComponent("myProfile")}
            >
              My profile
            </button>
            <button
              className="user-action-button"
              onClick={() => navigateToComponent("myBooking")}
            >
              My bookings
            </button>
            {loggedInUser.role === "admin" && (
              <button
                className="user-action-button"
                onClick={navigateToAdminPage}
              >
                Admin panel
              </button>
            )}
            <button className="user-action-button" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      )}
      <FooterNav />
    </>
  );
};

export default UserPage;
