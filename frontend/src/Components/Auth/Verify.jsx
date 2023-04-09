import React, { useState } from "react";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Verify = ({ email, setErrorOTP, setSucessOTP, setBackDropOpen }) => {
  const [otp, setOtp] = useState();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

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
        if (!result.data.token) {
        } else {
          cookies.set("Token", result.data.token, {
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
    axios(configurationsend)
      .then((result) => {
        console.log(result);
        setSucessOTP(true);
      })
      .catch((error) => {
        // handleLoginError();
        console.log(error);
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
      <Grid item sx={{ width: "70%" }}>
        <MuiOtpInput
          length={6}
          value={otp}
          gap={"3px"}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Verify
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h8" onClick={() => handleSendOTP()}>
          Resend OTP
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Verify;
