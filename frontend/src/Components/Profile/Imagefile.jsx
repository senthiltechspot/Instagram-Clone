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
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Waypoint } from "react-waypoint";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const Imagefile = ({ image, title, id, refresh, setRefresh }) => {
  const [imageFile, setImageFile] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBackDrop, setopenBackDrop] = useState(false);
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
      setImageFile(true);
    }
    if (extension === "webm" || extension === "mp4") {
      setImageFile(false);
    }
  }, [image]);

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
        setRefresh(!refresh);
        setSucess(!sucess)
      })
      .catch((error) => {
        console.log(error);
        setopenBackDrop(false);
      });
  };

  return (
    <ImageListItem key={image}>
      {imageFile && (
        <img
          src={`${image}?w=248&fit=crop&auto=format`}
          srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={title}
          loading="lazy"
          onClick={handleClickOpen}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You want to Delete this Post.
          </DialogContentText>
          <img
            src={`${image}?w=248&fit=crop&auto=format`}
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={title}
            loading="lazy"
            width={"100vw"}
          ></img>
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

export default Imagefile;
