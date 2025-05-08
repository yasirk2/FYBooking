import { useContext } from "react";
import "../styles/AdminPageStyle.css";
import { useNavigate } from "react-router-dom";
import MainContext from "../providers/contexts/MainContext";
import UsersAdmin from "../components/UsersAdmin";
import RoomsAdmin from "../components/RoomsAdmin";

const AdminPage = () => {
  const navigate = useNavigate();
  const { adminPageDisplay, setAdminPageDisplay } = useContext(MainContext);

  const backToUserPage = () => {
    navigate("/user");
  };

  return (
    <>
      {adminPageDisplay === "users" ? (
        <>
          <h1 className="page-title">Users</h1>
          <UsersAdmin/>
        </>
      ) : adminPageDisplay === "rooms" ? (
        <>
          <h1 className="page-title">Rooms</h1>
          <RoomsAdmin/>
        </>
      ) : (
        <>
          <h1 className="page-title">Admin Panel</h1>
          <div className="admin-menu">
            <button
              className="admin-action-button"
              onClick={() => setAdminPageDisplay("users")}
            >
              Users
            </button>
            <button
              className="admin-action-button"
              onClick={() => setAdminPageDisplay("rooms")}
            >
              Rooms
            </button>
            <button className="admin-action-button" onClick={backToUserPage}>
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPage;
