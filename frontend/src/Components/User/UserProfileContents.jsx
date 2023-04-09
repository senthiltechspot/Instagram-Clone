import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserProfileContents = ({ userid }) => {
  const [user, setUser] = useState(null);
  const [BackDropOpen, setBackDropOpen] = useState(false);
  const [opensnack, setOpensnack] = useState(false);
  const [Error, setError] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpensnack(false);
    setError(false);
    setBackDropOpen(false);
  };
  let token = cookies.get("Token");
  let decoded = jwt_decode(token);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${userid}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);

      if (response.data.followers.includes(decoded.userId)) {
        setisFollowing(true);
      }
    };
    fetchPosts();
  }, [userid, opensnack, decoded.userId]);

  const followRequest = () => {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/user/${userid}/follow`,
      headers: {
        Authorization: `${cookies.get("Token")}`,
        "Content-Type": "application/json",
      },
    };
    axios(configuration)
      .then((res) => {
        console.log(res);
        setOpensnack(true);
        setBackDropOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setBackDropOpen(false);
        setError(true);
      });
  };
  return (
    <Grid container width={"100%"}>
      <Grid item width={"100%"} padding={"10px"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            aria-label="recipe"
            src={user ? (user.dpURL ? user.dpURL : "") : ""}
          >
            {user ? (user.name ? user.name[0] : "A") : "A"}
          </Avatar>
          <Typography
            variant="h9"
            onClick={() => navigate(`/Followers/${decoded.userId}`)}
          >
            <Typography variant="h4">
              {user && user.followers.length}
            </Typography>
            Followers
          </Typography>
          <Typography
            variant="h9"
            onClick={() => navigate(`/Following/${decoded.userId}`)}
          >
            <Typography variant="h4">
              {user && user.following.length}
            </Typography>
            Following
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: "20px",
          paddingBottom: "10px",
        }}
        width={"100%"}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user && user.name}
        </Typography>
        <Typography variant="h8">{user && user.about}</Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: "20px",
        }}
        width={"100%"}
      >
        {!isFollowing ? (
          <Button variant="outlined" onClick={() => followRequest()}>
            Follow
          </Button>
        ) : (
          <Button variant="outlined">Following</Button>
        )}
      </Grid>
      <Snackbar open={opensnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Follow request Sucessfull!
        </Alert>
      </Snackbar>
      <Snackbar open={Error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Unsucessfull Follow request!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={BackDropOpen}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default UserProfileContents;
