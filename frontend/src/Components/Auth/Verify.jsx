import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import OtpInput from "react-otp-input";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Verify.css";
const cookies = new Cookies();

const Verify = ({ email, setErrorOTP, setSucessOTP, setBackDropOpen }) => {
  const [otp, setOtp] = useState("");

  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}/api/verifyOTP`,
    data: {
      email: email,
      OTP: parseInt(otp),
    },
  };

  const handleSubmit = (e) => {
    setBackDropOpen(true);
    axios(configuration)
      .then((result) => {
        console.log(result.data);
        if (!result.data.token) {
        } else {
          cookies.set("Token", result.data.token, {
            path: "/",
          });
          let decoded = jwt_decode(result.data.token)
          cookies.set("userId", decoded.userId, {
            path: "/",
          });
          window.location.href = "/";
        }
        setBackDropOpen(false);
      })
      .catch((error) => {
        setErrorOTP(true);
        console.log(error);
        setBackDropOpen(false);
      });
  };

  const configurationsend = {
    method: "post",
    url: `${process.env.REACT_APP_API}/api/sendOTP`,
    data: {
      email: email,
    },
  };

  const handleSendOTP = (e) => {
    setBackDropOpen(true);

    axios(configurationsend)
      .then((result) => {
        console.log(result);
        setSucessOTP(true);
        setBackDropOpen(false);
      })
      .catch((error) => {
        // handleLoginError();
        console.log(error);
        setBackDropOpen(false);
      });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
      spacing={3}
    >
      <Grid item>
        <CardMedia
          component="img"
          height={"40px"}
          width={"40px"}
          image={require("../../Asserts/logo.png")}
          alt="Paella dish"
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">Enter OTP Send To</Typography>
        <Typography variant="h7">{email}</Typography>
      </Grid>
      <Grid
        item
        sx={{
          width: "70%",
        }}
        className="otp-container"
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input className="otp-container-input" {...props} type="number" />
          )}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Verify
        </Button>
      </Grid>
      <Grid item>
        <Button variant="h8" onClick={() => handleSendOTP()}>
          Resend OTP
        </Button>
      </Grid>
    </Grid>
  );
};

export default Verify;
