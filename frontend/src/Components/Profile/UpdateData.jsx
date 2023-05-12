import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UpdateData = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");

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
  let token = cookies.get("Token");
  const UploadApi = () => {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/user`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        name: name,
        about: about,
      },
    };
    axios(configuration)
      .then((res) => {
        setSucessPost(true);
        setBackDropOpen(false);
        setName("");
        setUsername("");
        setAbout("");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setBackDropOpen(false);
        setError(true);
      });
  };
  const handlePostSubmit = async (event) => {
    setBackDropOpen(true);
    UploadApi();
  };
  return (
    <Box>
      Update Form
      <Box>
        <TextField
          label="Username"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="about"
          variant="outlined"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <Button onClick={handlePostSubmit}>Update</Button>
      </Box>
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
          Profile Updated Sucessfully
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

UpdateData.prototype = {
  handleClose: PropTypes.func.isRequired,
};

export default UpdateData;
