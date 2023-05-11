import { Box, ImageList, Skeleton, Typography, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Imagefile from "./Imagefile";
import VideoFile from "./VideoFile";
const cookies = new Cookies();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let token = cookies.get("Token");
  let decoded = jwt_decode(token);
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
        response.data.filter((item) => item.userId === decoded.userId).reverse()
      );
    };
    fetchPosts();
  }, [refresh, decoded.userId]);
  if (posts) {
    return (
      <Box sx={{ overflowY: "scroll" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ width: "100%" }}
            >
              <Tab label="All Posts" {...a11yProps(0)} sx={{ width: "50%" }} />
              <Tab label="Videos" {...a11yProps(1)} sx={{ width: "50%" }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ImageList variant="masonry" cols={2} gap={4}>
              {posts
                ? posts.map((item, i) => (
                    <Imagefile
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  ))
                : "No Post Found"}
            </ImageList>
            <Box height={"5vh"}></Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {posts
                ? posts.map((item, i) => (
                    <VideoFile
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                    />
                  ))
                : ""}
            </ImageList>
            <Box height={"5vh"}></Box>
          </TabPanel>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ overflowY: "scroll" }}>
        <Typography> All Posts </Typography>
        <ImageList variant="masonry" cols={2} gap={8}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
        </ImageList>
      </Box>
    );
  }
};

export default ProfilePosts;
