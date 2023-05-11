import React from "react";
import { Grid, InputBase, styled } from "@mui/material";
const SearchBox = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "90%",
  display: "flex",
  border: "1px solid black",
}));
const Search = () => {
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
          />
        </SearchBox>
      </Grid>
      <Grid item></Grid>
      Search user and Post Comming Soon...
    </Grid>
  );
};

export default Search;
