import { Avatar } from "@mui/material";

import "../../styles/ProfileHeader.css";

const ProfileHeader = ({ user }) => {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <div className="profile-header-card">
      <Avatar src={user.image} alt={fullName} className="profile-avatar">
        {user.firstName?.[0]}
        {user.lastName?.[0]}
      </Avatar>

      <div className="profile-header-info">
        <h2>{fullName || user.username}</h2>

        <p>@{user.username}</p>

        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
