import { Box, ImageList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Mediafiles from "../AllPost/Mediafiles";

const UserProfilePosts = ({ userid }) => {
  const [posts, setPosts] = useState([]);

  // let token = localStorage.getItem("Token");
  useEffect(() => {
    // setLoading(true);

    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/posts`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      setPosts(
        response.data.filter((item) => item.userId === userid).reverse()
      );
    };
    fetchPosts();
    // setLoading(false);
  }, [userid]);
  //   console.log(posts ? posts : "No filer received");
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
