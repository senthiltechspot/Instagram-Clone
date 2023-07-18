import { Box, ImageList, Skeleton, Typography, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UserMediaFileList from "../User/UserMediaFileList";
import UserVideoList from "../User/UserVideoList";
import { useNavigate } from "react-router-dom";
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
        <Box sx={{ p: 1 }}>
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
const ImageListGallery = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);

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
              <Tab
                label="Videos"
                {...a11yProps(1)}
                sx={{ width: "50%" }}
                onClick={() => navigate("/reels")}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ImageList variant="masonry" cols={2} gap={4}>
              {posts
                ? posts.map((item, i) => (
                    <UserMediaFileList
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                    />
                  ))
                : ""}
            </ImageList>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {posts
                ? posts.map((item, i) => (
                    <UserVideoList
                      key={i}
                      image={item.image}
                      title={item.title}
                      id={item._id}
                    />
                  ))
                : ""}
            </ImageList>
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

export default ImageListGallery;
