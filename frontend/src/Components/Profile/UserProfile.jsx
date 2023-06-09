import {
  DialogContentText,
  Avatar,
  Badge,
  Box,
  Button,
  DialogContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  Modal,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import UploadDp from "./UploadDp";
import axios from "axios";
import UpdateData from "./UpdateData";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };
  let token = cookies.get("Token");
  let decoded = jwt_decode(token);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${decoded.userId}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);
      document.title = `Profile - ${response.data.name}`;
    };
    fetchPosts();
  }, [decoded.userId, open, openModal]);
  if (user) {
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
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={"+"}
              color="primary"
              overlap="circular"
              onClick={() => setOpen(true)}
            >
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
                src={user ? (user.dpURL ? user.dpURL : "") : ""}
              >
                {user ? (user.name ? user.name[0] : "A") : "A"}
              </Avatar>
            </Badge>
            <Typography
              variant="h9"
              onClick={() => navigate(`/Followers/${user ? user.userid : ""}`)}
            >
              <Typography variant="h4">
                {user && user.followers.length}
              </Typography>
              Followers
            </Typography>
            <Typography
              variant="h9"
              onClick={() => navigate(`/Following/${user && user.userid}`)}
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
          <Button variant="outlined" onClick={() => setOpenModal(true)}>
            Edit Profile
          </Button>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <UploadDp handleClose={handleClose} />
          </DialogContent>
        </Dialog>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              onClick={handleClose}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Close
            </Typography>

            <UpdateData handleClose={handleClose} />
          </Box>
        </Modal>
      </Grid>
    );
  } else {
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
            <Skeleton variant="circular" width={70} height={70} />
            <Box width={"30vh"}>
              <Skeleton variant="rectangular" height={50} />
            </Box>
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
          width={"100vw"}
        >
          <Skeleton variant="rectangular" width={"90vw"} height={40} />
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
          <Skeleton variant="rectangular" width={"20vw"} height={20} />
        </Grid>
      </Grid>
    );
  }
};

export default UserProfile;
