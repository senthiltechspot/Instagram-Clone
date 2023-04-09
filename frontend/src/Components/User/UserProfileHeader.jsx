import { Grid, Typography } from "@mui/material";
import React from "react";
const UserProfileHeader = () => {
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
        <Typography variant="h5">Profile Page</Typography>
      </Grid>
    </Grid>
  );
};

export default UserProfileHeader;
