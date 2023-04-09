import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const MyPost = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  // const [imageFile, setImageFile] = useState(false);
  // const [videoFile, setVideoFile] = useState(false);

  useEffect(() => {
    setLoading(true);

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
    setLoading(false);
  }, [isRefresh]);

  console.log(posts ? posts : "not found");
  // function getFileExtension(filename) {
  //   var ext = /^.+\.([^.]+)$/.exec(filename);
  //   return ext == null ? "" : ext[1];
  // }
  // const extension = getFileExtension(image);
  // if (extension === "jpg" || extension === "png" || extension === "gif") {
  //   setImageFile(true);
  // }
  // if (extension === "wepm" || extension === "mp4") {
  //   setVideoFile(true);
  // }

  return (
    <Box>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {loading ? (
          <Stack spacing={1}>
            {/* <Skeleton variant="text" height={20} /> */}
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rectangular" height={300} />
            <Skeleton variant="text" height={50} />
          </Stack>
        ) : (
          <>
            {posts ? (
              posts.map((post, i) => (
                <Post
                  image={post.image}
                  title={post.title}
                  likes={post.likes}
                  comments={post.comments}
                  id={post._id}
                  createdAt={post.createdAt}
                  userId={post.userId}
                  setRefresh={setRefresh}
                  isRefresh={isRefresh}
                  key={i}
                  // imageFile={imageFile}
                  // videoFile={videoFile}
                />
              ))
            ) : (
              <Stack spacing={1}>
                <Skeleton variant="text" height={100} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={300} />
              </Stack>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyPost;
