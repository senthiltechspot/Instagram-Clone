import { Box, ImageList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Mediafiles from "../AllPost/Mediafiles";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let token = localStorage.getItem("Token");
  let decoded = jwt_decode(token);
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
      setPosts(
        response.data.filter((item) => item.userId === decoded.userId).reverse()
      );
    };
    fetchPosts();
  }, [refresh, decoded.userId]);
  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Typography>My Posts</Typography>
      <ImageList variant="masonry" cols={2} gap={8}>
        {posts
          ? posts.map((item) => (
              <Mediafiles
                image={item.image}
                title={item.title}
                id={item._id}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))
          : "No Post Found"}
      </ImageList>
    </Box>
  );
};

export default ProfilePosts;
