import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getSelectedItems, addNewObject, deleteLatestObject } from "../data/db";
import MainContext from "../providers/contexts/MainContext";

const FooterNav = () => {
  const navigate = useNavigate();
  const { setDateModuleVisibility, history, setHistory, setDisplayComponent } =
    useContext(MainContext);
  const currentPage = history[history.length - 1];
  const previousPage = history[history.length - 2];
  const loggedInUser = getSelectedItems("loggedInUser");
  const connected = getSelectedItems("tabletRoom");

  const handleBack = () => {
    if (currentPage.type === "route" && previousPage.type === "route") {
      if (currentPage.value === "/main") {
        setDateModuleVisibility(false);
        sessionStorage.setItem("selectedRoom", "");
      }
      navigate(previousPage.value);
      deleteLatestObject("history");
      setHistory(getSelectedItems("history"));
    }

    if (currentPage.type === "component") {
      setDisplayComponent("");
      sessionStorage.setItem("component", "");
      deleteLatestObject("history");
      setHistory(getSelectedItems("history"));
    }
  };

  const navigateToUserPage = () => {
    if (currentPage.value === "/main") {
      setDateModuleVisibility(false);
    }
    navigate("/user");
    addNewObject("history", { type: "route", value: "/user" });
    setHistory(getSelectedItems("history"));
  };

  const logout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("history");
    sessionStorage.removeItem("component");
    navigate("/");
  };

  return (
    <footer className="page-footer">
      <nav className="footer-nav">
        {loggedInUser.user_id !== "guest" && history.length > 1 && (
          <button className="footer-back-button" onClick={handleBack}>
            <img
              alt="arrow back"
              className="footer-back-button-image"
              src="/Arrowback.svg"
            />
          </button>
        )}
        {(currentPage.value === "/room" ||
          (currentPage.value === "/main" && connected === true) ||
          (currentPage.value === "/main" &&
            previousPage.value === "/room")) && (
          <button
            className="to-user-page-button"
            onClick={
              loggedInUser.user_id === "guest" ? logout : navigateToUserPage
            }
          >
            {loggedInUser.user_id === "guest" ? (
              "Logout"
            ) : (
              <img
                src="/user.png"
                alt="profile button"
                className="user-button-image"
              />
            )}
          </button>
        )}
      </nav>
    </footer>
  );
};

export default FooterNav;
