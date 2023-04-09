import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import UserList from "../Components/FollowComps/UserList";

const Followers = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/user/${params.userid}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Token")}`,
          },
        }
      );
      setUser(response.data);
      console.log(response.data);
    };
    fetchPosts();
  }, [params.userid]);
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
        ? user.followers.map((item) => <UserList id={item} />)
        : "No Followers"}
    </Box>
  );
};

export default Followers;
