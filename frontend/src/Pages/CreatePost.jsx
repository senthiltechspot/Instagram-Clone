import React from "react";
import UploadImage from "../Components/CreatePost/UploadImage";
import { Box } from "@mui/material";

const CreatePost = () => {
  document.title = `Create Post`;

  return (
    <Box>
      <UploadImage />
    </Box>
  );
};

export default CreatePost;
