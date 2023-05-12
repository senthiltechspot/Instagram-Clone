import { Grid, InputBase, styled } from "@mui/material";
import { Box, ImageList, Skeleton, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UserMediaFileList from "../Components/User/UserMediaFileList";
import UserVideoList from "../Components/User/UserVideoList";
const cookies = new Cookies();
const SearchBox = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "90%",
  display: "flex",
  border: "1px solid black",
}));
const Search = () => {
  const [posts, setPosts] = useState(null);
  const [keyword, setKeyword] = useState("");

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
        response.data
          .filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
          })
          .reverse()
      );
    };
    fetchPosts();
  }, [keyword]);

  const HandleonChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log(keyword);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ width: "100%", padding: "20px" }}>
        <SearchBox>
          <InputBase
            placeholder="search..."
            inputProps={{
              style: { color: "black", width: "100%" },
            }}
            onChange={HandleonChange}
          />
        </SearchBox>
      </Grid>
      <Grid item>
        {keyword ? (
          <Box sx={{ overflowY: "scroll" }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Images</Typography>
              <ImageList variant="masonry" cols={2} gap={4}>
                {posts ? (
                  posts.map((item, i) => (
                    <UserMediaFileList
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                    />
                  ))
                ) : (
                  <Box>
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton variant="rectangular" height={100} />
                  </Box>
                )}
              </ImageList>
              <Typography variant="h5">Videos</Typography>

              <ImageList variant="masonry" cols={2} gap={8}>
                {posts ? (
                  posts.map((item, i) => (
                    <UserVideoList
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                    />
                  ))
                ) : (
                  <Box>
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton variant="rectangular" height={100} />
                  </Box>
                )}
              </ImageList>
            </Box>
          </Box>
        ) : (
          <Box sx={{ overflowY: "scroll" }}>
            <Typography> No Post Found ! </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
export default Search;
