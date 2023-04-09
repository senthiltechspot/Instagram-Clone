import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import Verify from "../Components/Auth/Verify";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const Auth = () => {
  const [email, setEmail] = useState(null);
  const [errorOTP, setErrorOTP] = useState(false);
  const [sucessOTP, setSucessOTP] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOTP(false);
    setSucessOTP(false);
    setErrorLogin(false);
  };

  // BackDrop
  const [BackDropOpen, setBackDropOpen] = React.useState(false);

  return (
    <Box sx={{ height: "100%" }}>
      {email ? (
        <Verify
          email={email}
          setErrorOTP={setErrorOTP}
          setSucessOTP={setSucessOTP}
          setBackDropOpen={setBackDropOpen}
        />
      ) : (
        <Login
          setEmail={setEmail}
          email={email}
          setSucessOTP={setSucessOTP}
          setBackDropOpen={setBackDropOpen}
          setErrorLogin={setErrorLogin}
        />
      )}
      <Snackbar
        open={errorOTP}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid OTP
        </Alert>
      </Snackbar>
      <Snackbar
        open={sucessOTP}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          OTP Sent Sucessfully
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={BackDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={errorLogin}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something Went Wrong
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth;
