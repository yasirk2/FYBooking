import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();

  const navigateToUserPage = () => {
    navigate("/user");
  };

  return (
    <footer className="page-footer">
      <p className="user-button" onClick={navigateToUserPage}>
        UserButton
      </p>
    </footer>
  );
};

export default UserButton;
