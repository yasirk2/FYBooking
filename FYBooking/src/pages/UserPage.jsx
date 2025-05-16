import { useNavigate } from "react-router-dom";
import "../styles/UserPageStyle.css";
import MyProfile from "../components/MyProfile";
import MyBookings from "../components/MyBookings";
import { addNewObject, getSelectedItems } from "../data/db";
import FooterNav from "../components/FooterNav";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";
import useMediaQuery from "../utils/useMediaQuery";

const UserPage = () => {
  const navigate = useNavigate();
  const loggedInUser = getSelectedItems("loggedInUser");
  const { setHistory, displayComponent, setDisplayComponent } =
    useContext(MainContext);

  const isNotPhone = useMediaQuery("(min-width: 768px)");

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
    <div className="user-page-main-container">
      {isNotPhone ? (
        <>
          <h1 className="page-title">{loggedInUser.username}</h1>
          <div className="user-container">
            <div className="user-component">
              <h2 className="page-title">My Profile</h2>
              <MyProfile />
            </div>
            <div className="user-component">
              <h2 className="page-title">My Bookings</h2>
              <div className="my-booking-main-container">
                <MyBookings />
              </div>
            </div>
            <div className="user-button-container">
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
          </div>
        </>
      ) : (
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
        </>
      )}

      <FooterNav />
    </div>
  );
};

export default UserPage;
