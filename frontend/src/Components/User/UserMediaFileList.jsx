import { ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserMediaFileList = ({ image, title }) => {
  const [imageFile, setImageFile] = useState(false);

  useEffect(() => {
    function getFileExtension(filename) {
      var ext = /^.+\.([^.]+)$/.exec(filename);
      return ext == null ? "" : ext[1];
    }
    const extension = getFileExtension(image);
    if (extension === "jpg" || extension === "png" || extension === "gif") {
      setImageFile(true);
    }
    if (extension === "webm" || extension === "mp4") {
      setImageFile(false);
    }
  }, [image]);

  return (
    <ImageListItem key={image}>
      {imageFile && (
        <img
          src={`${image}?w=248&fit=crop&auto=format`}
          srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={title}
          loading="lazy"
        />
      )}
    </ImageListItem>
  );
};

UserMediaFileList.prototype = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserMediaFileList;
