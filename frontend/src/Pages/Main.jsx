import React from "react";
import Home from "./Home";
import Auth from "./Auth";
const Main = () => {
  const token = localStorage.getItem("Token");
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
