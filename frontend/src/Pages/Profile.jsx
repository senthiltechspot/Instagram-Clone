import React from "react";
import UserProfile from "../Components/Profile/UserProfile";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfilePosts from "../Components/Profile/ProfilePosts";

const Profile = () => {
  return (
    <div>
      <ProfileHeader />
      <UserProfile />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
