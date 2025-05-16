import "../styles/AdminPageStyle.css";
import UsersAdmin from "../components/UsersAdmin";
import RoomsAdmin from "../components/RoomsAdmin";
import FooterNav from "../components/FooterNav";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";
import { addNewObject, getSelectedItems } from "../data/db";
import useMediaQuery from "../utils/useMediaQuery";

const AdminPage = () => {
  const { setHistory, displayComponent, setDisplayComponent } =
    useContext(MainContext);

  const isNotPhone = useMediaQuery("(min-width: 768px)");

  const navigateToComponent = (component) => {
    setDisplayComponent(component);
    sessionStorage.setItem("component", component);
    addNewObject("history", { type: "component", value: component });
    setHistory(getSelectedItems("history"));
  };

  return (
    <div className="web-app-container">
      {isNotPhone ? (
        <>
          <h1 className="page-title">Admin Panel</h1>
          <div className="admin-container">
            <div className="admin-component">
              <h2 className="page-title">Users</h2>
              <UsersAdmin />
            </div>
            <div className="admin-component">
              <h2 className="page-title">Rooms</h2>
              <RoomsAdmin />
            </div>
          </div>
        </>
      ) : (
        <>
          {displayComponent === "users" ? (
            <>
              <h1 className="page-title">Users</h1>
              <UsersAdmin />
            </>
          ) : displayComponent === "rooms" ? (
            <>
              <h1 className="page-title">Rooms</h1>
              <RoomsAdmin />
            </>
          ) : (
            <>
              <h1 className="page-title">Admin Panel</h1>
              <div className="admin-menu">
                <button
                  className="admin-action-button"
                  onClick={() => navigateToComponent("users")}
                >
                  Users
                </button>
                <button
                  className="admin-action-button"
                  onClick={() => navigateToComponent("rooms")}
                >
                  Rooms
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

export default AdminPage;
