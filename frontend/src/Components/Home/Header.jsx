import { Badge, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      height={"20%"}
      sx={{ padding: "25px" }}
    >
      <Grid item>
        <Badge color="secondary" badgeContent={"Clone"} max={999}>
          <Typography variant="h5">Instagram</Typography>
        </Badge>
      </Grid>
      <Grid item>
        <IconButton aria-label="add to favorites" onClick={() => navigate("/CreatePost")}>
          <PostAddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
