import { useContext, useState } from "react";
import MainContext from "../providers/contexts/MainContext";
import { getSelectedItems } from "../data/db";

const MyProfile = () => {
  const { setUserPageDisplay } = useContext(MainContext);
  const [user] = useState(getSelectedItems("loggedInUser"));
  const [loggedInUser] = user;

  const goBack = () => {
    setUserPageDisplay(null);
  };

  return (
    <>
      <dl className="user-profile-container">
        <dt className="user-profile-label">Username</dt>
        <dd className="user-profile-value">{loggedInUser.username}</dd>
        <dt className="user-profile-label">Password</dt>
        <dd className="user-profile-value">{loggedInUser.password}</dd>
        <dt className="user-profile-label">Role</dt>
        <dd className="user-profile-value">{loggedInUser.role}</dd>
        <dt className="user-profile-label">Organization</dt>
        <dd className="user-profile-value">{loggedInUser.organization}</dd>
        <dt className="user-profile-label">User ID</dt>
        <dd className="user-profile-value">{loggedInUser.user_id}</dd>
      </dl>
      <button className="user-action-button my-profile-bookings" onClick={goBack}>Back</button>
    </>
  );
};

export default MyProfile;
