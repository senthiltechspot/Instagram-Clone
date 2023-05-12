import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const HeaderPost = ({ handlePostSubmit }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={3}
      height={"20%"}
      sx={{ padding: "25px" }}
    >
      <Grid item>
        <Typography variant="h5">Create Post</Typography>
      </Grid>
      <Grid item>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handlePostSubmit()}
        >
          Post
        </Button>
      </Grid>
    </Grid>
  );
};
HeaderPost.prototype={
  handlePostSubmit: PropTypes.func.isRequired
}

export default HeaderPost;
