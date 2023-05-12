import {
  Box,
  Button,
  Input,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const UploadDp = ({ handleClose }) => {
  const [file, setFile] = useState("");
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
    const files = e.target.files[0];
    setFile(files);
  }

  let token = cookies.get("Token");
  const UploadApi = (base64img) => {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/user/dp`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        dpUrl: base64img,
      },
    };
    axios(configuration)
      .then((res) => {
        setSucessPost(true);
        setFile("");
        setBackDropOpen(false);
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      UploadApi(reader.result);
    };
  };
  return (
    <>
      <Box>
        <Box sx={{ padding: "10px" }}>
          <Input type="file" variant={"outlined"} onChange={handleChange} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          onClick={() => handlePostSubmit()}
        >
          Upload
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
    </>
  );
};

export default UploadDp;
