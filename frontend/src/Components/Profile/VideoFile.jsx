import {
  Dialog,
  DialogActions,
  DialogTitle,
  ImageListItem,
  DialogContent,
  DialogContentText,
  Button,
  CircularProgress,
  Backdrop,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Waypoint } from "react-waypoint";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const VideoFile = ({ image, title, id, refresh, setRefresh }) => {
  const [open, setOpen] = useState(false);
  const [openBackDrop, setopenBackDrop] = useState(false);
  const [videoFile, setVideoFile] = useState(false);
  const [sucess, setSucess] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSucess(false);
    setOpen(false);
    setopenBackDrop(false);
  };

  useEffect(() => {
    function getFileExtension(filename) {
      var ext = /^.+\.([^.]+)$/.exec(filename);
      return ext == null ? "" : ext[1];
    }
    const extension = getFileExtension(image);
    if (extension === "jpg" || extension === "png" || extension === "gif") {
      setVideoFile(false);
    }
    if (extension === "webm" || extension === "mp4") {
      setVideoFile(true);
    }
  }, [image]);

  // Image/Video File
  const videoRef = useRef();
  const [stop, setStop] = useState(false);
  const handleVideo = () => {
    setStop(!stop);
    if (stop === true) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  const handleStopVideo = () => {
    videoRef.current.pause();
  };

  // Handle delete Post
  let token = cookies.get("Token");

  const handleDelete = async (postId) => {
    setopenBackDrop(true);
    const configuration = {
      method: "delete",
      url: `${process.env.REACT_APP_API}/api/posts/${postId}/delete`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios(configuration)
      .then((res) => {
        setopenBackDrop(false);
        handleClose();
        setSucess(!sucess);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        setopenBackDrop(false);
      });
  };

  return (
    <ImageListItem key={image}>
      {videoFile && (
        <Box>
          <Waypoint onLeave={handleStopVideo}>
            <video ref={videoRef} width={"100%"} onClick={handleVideo}>
              <source src={image} type="video/mp4" />
            </video>
          </Waypoint>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography>{title}</Typography>
            <DeleteForeverIcon onClick={handleClickOpen} />
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You want to Delete this Post.
          </DialogContentText>
          <Waypoint onLeave={handleStopVideo}>
            <video ref={videoRef} width={"100%"} onClick={handleVideo}>
              <source src={image} type="video/mp4" />
            </video>
          </Waypoint>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
        </DialogActions>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 5 }}
          open={openBackDrop}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
      <Snackbar open={sucess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Post Deleted Sucessfully
        </Alert>
      </Snackbar>
    </ImageListItem>
  );
};

VideoFile.prototype = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default VideoFile;
