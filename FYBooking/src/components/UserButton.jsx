import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import MainContext from "../providers/contexts/MainContext"

const UserButton = ({ originalPage }) => {
  const { setPreviousPage } = useContext(MainContext)
  const navigate = useNavigate();

  const navigateToUserPage = () => {
    setPreviousPage(originalPage)
    navigate("/user");
  };

  return (
    <footer className="page-footer">
      <button className="user-button" onClick={navigateToUserPage}>
        UserButton
      </button>
    </footer>
  );
};

export default UserButton;
