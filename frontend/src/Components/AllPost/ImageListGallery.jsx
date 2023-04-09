import { Box, ImageList } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Mediafiles from "./Mediafiles";

const ImageListGallery = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/posts`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);

  return (
    <Box sx={{ overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {posts
          ? posts.map((item) => (
              <Mediafiles image={item.image} title={item.title} />
            ))
          : ""}
      </ImageList>
    </Box>
  );
};

export default ImageListGallery;
