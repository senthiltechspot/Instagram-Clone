import { Box, ImageList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Mediafiles from "../AllPost/Mediafiles";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserProfilePosts = ({ userid }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/posts`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setPosts(
        response.data.filter((item) => item.userId === userid).reverse()
      );
    };
    fetchPosts();
  }, [userid]);
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Typography>My Posts</Typography>
      <ImageList variant="masonry" cols={2} gap={8}>
        {posts
          ? posts.map((item) => (
              <Mediafiles image={item.image} title={item.title} id={item._id} />
            ))
          : ""}
      </ImageList>
    </Box>
  );
};

export default UserProfilePosts;
