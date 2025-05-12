import { useNavigate } from "react-router-dom";
import "../styles/UserPageStyle.css";
import MainContext from "../providers/contexts/MainContext";
import { useContext } from "react";
import MyProfile from "../components/MyProfile";
import MyBookings from "../components/MyBookings";

const UserPage = () => {
  const navigate = useNavigate();
  const { userPageDisplay, setUserPageDisplay, previousPage } =
    useContext(MainContext);

  const navigateToAdminPage = () => {
    navigate("/admin");
  };

  const logout = () => {
    navigate("/");
  };

  const navigateToPreviousPage = () => {
    navigate(`/${previousPage}`);
  };

  return (
    <>
      {userPageDisplay === "profile" ? (
        <>
          <h1 className="page-title">My Profile</h1>
          <MyProfile />
        </>
      ) : userPageDisplay === "booking" ? (
        <>
          <h1 className="page-title">My Bookings</h1>
          <MyBookings />
        </>
      ) : (
        <>
          <h1 className="page-title">{sessionStorage.getItem("username")}</h1>
          <div className="user-menu">
            <button
              className="user-action-button"
              onClick={() => setUserPageDisplay("profile")}
            >
              My profile
            </button>
            <button
              className="user-action-button"
              onClick={() => setUserPageDisplay("booking")}
            >
              My bookings
            </button>
            {sessionStorage.getItem("role") === "admin" && (
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
            <button
              className="user-action-button"
              onClick={navigateToPreviousPage}
            >
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;
