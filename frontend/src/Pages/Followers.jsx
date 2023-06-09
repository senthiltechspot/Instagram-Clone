import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import UserList from "../Components/FollowComps/UserList";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Followers = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPosts();
  });
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
            <Typography variant="h5">Followers Page</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        {user
          ? user.followers.map((item, i) => <UserList key={i} id={item} />)
          : "No Followers"}
      </Box>
    );
  }
};

export default Followers;
