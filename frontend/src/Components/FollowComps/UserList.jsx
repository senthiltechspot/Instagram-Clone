import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";

const cookies = new Cookies();

const UserList = ({ id }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${id}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);
    };
    fetchPosts();
  }, [id]);
  if (user) {
    return (
      <Grid
        item
        display="flex"
        sx={{ padding: "10px", gap: "5px" }}
        onClick={() => navigate(`/user/${id}`)}
      >
        <Avatar
          sx={{ width: 56, height: 56 }}
          aria-label="recipe"
          src={user ? (user.dpURL ? user.dpURL : "") : ""}
        >
          {user ? (user.name ? user.name[0] : "A") : "A"}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {user ? (user.name ? user.name : "No Username") : "No Username"}
          </Typography>
        </Box>
        <Divider />
      </Grid>
    );
  } else {
    return (
      <Grid item display="flex" sx={{ padding: "10px", gap: "5px" }}>
        <Skeleton variant="circular" width={50} height={50} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" width={"80vw"} height={50} />
        </Box>
        <Divider />
      </Grid>
    );
  }
};

UserList.prototype = {
  id: PropTypes.string.isRequired,
};

export default UserList;
