import "../styles/AdminPageStyle.css";
import UsersAdmin from "../components/UsersAdmin";
import RoomsAdmin from "../components/RoomsAdmin";
import FooterNav from "../components/FooterNav";
import { useContext } from "react";
import MainContext from "../providers/contexts/MainContext";
import { addNewObject, getSelectedItems } from "../data/db";

const AdminPage = () => {
  const { setHistory, displayComponent, setDisplayComponent } =
    useContext(MainContext);

  const navigateToComponent = (component) => {
    setDisplayComponent(component);
    sessionStorage.setItem("component", component);
    addNewObject("history", { type: "component", value: component });
    setHistory(getSelectedItems("history"));
  };

  return (
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
      <FooterNav />
    </>
  );
};

export default AdminPage;
