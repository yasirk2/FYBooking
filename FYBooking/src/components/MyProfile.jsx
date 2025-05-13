import { useState } from "react";
import { getSelectedItems } from "../data/db";

const MyProfile = () => {
  const [user] = useState(getSelectedItems("loggedInUser"));

  return (
    <dl className="user-profile-container">
      <dt className="user-profile-label">Username</dt>
      <dd className="user-profile-value">{user.username}</dd>
      <dt className="user-profile-label">Password</dt>
      <dd className="user-profile-value">{user.password}</dd>
      <dt className="user-profile-label">Role</dt>
      <dd className="user-profile-value">{user.role}</dd>
      <dt className="user-profile-label">Organization</dt>
      <dd className="user-profile-value">{user.organization}</dd>
      <dt className="user-profile-label">User ID</dt>
      <dd className="user-profile-value">{user.user_id}</dd>
    </dl>
  );
};

export default MyProfile;
