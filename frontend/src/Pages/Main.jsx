import React from "react";
import Home from "./Home";
import Auth from "./Auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Main = () => {
  const token = cookies.get("Token");
  if (token) {
    return (
      <>
        <Home />
      </>
    );
  } else {
    return (
      <>
        <Auth />
      </>
    );
  }
};

export default Main;
