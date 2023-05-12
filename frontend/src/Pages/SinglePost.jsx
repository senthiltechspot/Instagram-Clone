import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Components/Post/Post";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const SinglePost = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();
  const [isRefresh, setRefresh] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/posts/${params.postId}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setPosts(response.data);
      document.title = response.data.title;
      setLoading(false);
    };
    fetchPosts();
  }, [isRefresh, params]);

  return (
    <Box>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={70} />
            <Skeleton variant="rectangular" height={300} />
            <Skeleton variant="text" height={100} />
          </Stack>
        ) : (
          <>
            {posts ? (
              <Post
                image={posts.image}
                title={posts.title}
                likes={posts.likes}
                comments={posts.comments}
                id={posts._id}
                createdAt={posts.createdAt}
                userId={posts.userId}
                setRefresh={setRefresh}
                isRefresh={isRefresh}
                key={0}
              />
            ) : (
              <Stack spacing={1}>
                <Skeleton variant="text" height={70} />
                <Skeleton variant="rectangular" height={300} />
                <Skeleton variant="text" height={100} />
              </Stack>
            )}
          </>
        )}
      </Box>
      <Box height={"7vh"}></Box>
    </Box>
  );
};

export default SinglePost;
