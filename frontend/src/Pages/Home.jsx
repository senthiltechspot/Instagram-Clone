import React from "react";
import { Box } from "@mui/material";
import Header from "../Components/Home/Header";
import MyPost from "../Components/Post/MyPost";

const Home = () => {
  document.title = "Home";
  return (
    <Box>
      <Header />
      <MyPost />
      Home
    </Box>
  );
};

export default Home;
