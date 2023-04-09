import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const token = localStorage.getItem("Token");
  if (token) {
    return (
      <Box>
        <BottomNavigation
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "white",
            zIndex: 7,
          }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            onClick={() => navigate("/")}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            onClick={() => navigate("/Search")}
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label="Add"
            value="Add"
            onClick={() => navigate("/CreatePost")}
            icon={<AddCircleRoundedIcon />}
          />
          <BottomNavigationAction
            label="Feeds"
            value="Feeds"
            onClick={() => navigate("/AllPost")}
            icon={<AutoAwesomeMosaicIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            onClick={() => navigate("/Profile")}
            icon={<AccountBoxIcon />}
          />
        </BottomNavigation>
      </Box>
    );
  } else {
    <></>;
  }
};

export default NavBar;
