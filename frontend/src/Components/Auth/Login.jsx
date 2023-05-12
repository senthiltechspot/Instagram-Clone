import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

const Login = ({
  email,
  setEmail,
  setSucessOTP,
  setBackDropOpen,
  setErrorLogin,
}) => {
  const [data, setData] = useState("");
  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}/api/sendOTP`,
    data: {
      email: data,
    },
  };

  const handleSendOTP = (e) => {
    setBackDropOpen(true);
    axios(configuration)
      .then((result) => {
        setEmail(data);
        setSucessOTP(true);
        setBackDropOpen(false);
      })
      .catch((error) => {
        // handleLoginError();
        console.log(error);
        setBackDropOpen(false);
        setErrorLogin(false);
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
        <Typography variant="h5">LOGIN</Typography>
      </Grid>
      <Grid item>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setData(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => handleSendOTP()}>
          Send OTP
        </Button>
      </Grid>
    </Grid>
  );
};

Login.prototype = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setSucessOTP: PropTypes.func.isRequired,
  setBackDropOpen: PropTypes.func.isRequired,
  setErrorLogin: PropTypes.func.isRequired,
};

export default Login;
