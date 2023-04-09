import {
  Avatar,
  Box,
  Button,
  Input,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import HeaderPost from "./HeaderPost";
const UploadImage = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [sucessPost, setSucessPost] = useState(false);
  const [error, setError] = useState(false);
  const [BackDropOpen, setBackDropOpen] = useState(false);

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSucessPost(false);
  };
  function handleChange(e) {
    console.log(e.target.files);
    const files = e.target.files[0];
    previewFile(files);
    setFile(files);
  }

  const previewFile = (files) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  let token = localStorage.getItem("Token");
  let decoded = jwt_decode(token);
  const UploadApi = (base64img) => {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/posts`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        title: title,
        imageUrl: base64img,
      },
    };
    axios(configuration)
      .then((res) => {
        setSucessPost(true);
        setTitle("");
        setFile("");
        setPreviewSource("");
        setBackDropOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setBackDropOpen(false);
        setError(true);
      });
  };
  const handlePostSubmit = async (event) => {
    setBackDropOpen(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      UploadApi(reader.result);
    };
  };
  return (
    <Box>
      <HeaderPost handlePostSubmit={handlePostSubmit} />
      <Box sx={{ padding: "10px" }}>
        <Input type="file" variant={"outlined"} onChange={handleChange} />
        <TextField
          sx={{ width: "80%" }}
          id="standard-multiline-static"
          multiline
          rows={3}
          placeholder="What's on your mind?"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      {previewSource && (
        <Card sx={{ marginBottom: 5 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {decoded ? (decoded.username ? decoded.username[0] : "A") : "A"}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={
              decoded
                ? decoded.username
                  ? decoded.username
                  : "UserName Not Found"
                : "User Not Found"
            }
          />
          <CardMedia
            component="img"
            height="20%"
            image={previewSource}
            alt="Image Not Found"
          />
          <CardContent>
            <Typography display="flex" variant="h6">
              {title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>

            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      )}
      <Button
        type="submit"
        variant="contained"
        onClick={() => handlePostSubmit()}
      >
        Post
      </Button>
      <Box sx={{ height: "20px" }}></Box>
      <Snackbar
        open={sucessPost}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Post Created Sucessfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something Went Wrong Try again Later!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={BackDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default UploadImage;
