import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import UserProfileHeader from "../Components/User/UserProfileHeader";
import UserProfilePosts from "../Components/User/UserProfilePosts";
import UserProfileContents from "../Components/User/UserProfileContents";

const User = () => {
  const params = useParams();
  return (
    <Box>
      <UserProfileHeader />
      <UserProfileContents userid={params.userid} />
      <UserProfilePosts userid={params.userid} />
    </Box>
  );
};

export default User;
