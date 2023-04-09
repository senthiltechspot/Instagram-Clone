import { Button, Grid, Typography } from "@mui/material";
import React from "react";
const ProfileHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("Token");
    window.location.href = "/";
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      height={"10%"}
      sx={{ padding: "25px" }}
    >
      <Grid item>
        <Typography variant="h5">My Profile</Typography>
      </Grid>
      <Grid item>
        <Button onClick={() => handleLogout()}>LogOut</Button>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
