import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import UserList from "../Components/FollowComps/UserList";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Following = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${params.userid}`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setUser(response.data);
    };
    fetchPosts();
  }, [params.userid]);
  if (user) {
    return (
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          height={"10%"}
          sx={{ padding: "25px" }}
        >
          <Grid item>
            <Typography variant="h5">Following Page</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        {user
          ? user.following.map((item, i) => <UserList id={item} key={i} />)
          : "No Followers"}
      </Box>
    );
  }
};

export default Following;
