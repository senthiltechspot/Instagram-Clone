import { Avatar, Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Comments = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${comment.userId}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);
    };
    fetchPosts();
  });
  if (user) {
    return (
      <Grid item display="flex" sx={{ padding: "10px", gap: "5px" }}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          aria-label="recipe"
          src={user ? (user.dpURL ? user.dpURL : "") : ""}
        >
          {user ? (user.name ? user.name[0] : "A") : "A"}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h8" sx={{ fontWeight: "bold" }}>
            {user ? (user.name ? user.name : "No Username") : "No Username"}
          </Typography>
          <Typography variant="h9">- {comment.text}</Typography>
          <Typography variant="h11">
            Commented On: {comment.Date.slice(0, 21)}
          </Typography>
        </Box>
      </Grid>
    );
  } else {
    return (
      <Grid item display="flex" sx={{ padding: "10px", gap: "5px" }}>
        <Skeleton variant="circular" width={50} height={50} />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Skeleton variant="rectangular" width={"80vw"} height={50} />
        </Box>
      </Grid>
    );
  }
};
Comments.prototype = {
  comment: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Comments;
