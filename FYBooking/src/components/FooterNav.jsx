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

  const handleBack = () => {
    if (currentPage.type === "route" && previousPage.type === "route") {
      if (currentPage.value === "/main") {
        setDateModuleVisibility(false);
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

  return (
    <footer className="page-footer">
      {history.length > 1 && <button onClick={handleBack}>Back</button>}
      {(currentPage.value === "/room" ||
        (currentPage.value === "/main" && previousPage.value === "/room")) && (
        <button className="user-button" onClick={navigateToUserPage}>
          UserButton
        </button>
      )}
    </footer>
  );
};

export default FooterNav;
