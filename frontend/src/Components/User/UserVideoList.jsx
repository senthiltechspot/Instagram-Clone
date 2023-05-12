import { ImageListItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Waypoint } from "react-waypoint";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserVideoList = ({ image, title, id }) => {
  const [videoFile, setVideoFile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function getFileExtension(filename) {
      var ext = /^.+\.([^.]+)$/.exec(filename);
      return ext == null ? "" : ext[1];
    }
    const extension = getFileExtension(image);
    if (extension === "jpg" || extension === "png" || extension === "gif") {
      setVideoFile(false);
    }
    if (extension === "webm" || extension === "mp4") {
      setVideoFile(true);
    }
  }, [image]);

  // Image/Video File
  const videoRef = useRef();
  const [stop, setStop] = useState(false);
  const handleVideo = () => {
    setStop(!stop);
    if (stop === true) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  const handleStopVideo = () => {
    videoRef.current.pause();
  };
  return (
    <ImageListItem key={image} onClick={() => navigate(`/Post/${id}`)}>
      {videoFile && (
        <Waypoint onLeave={handleStopVideo}>
          <video ref={videoRef} width={"100%"} onClick={handleVideo}>
            <source src={image} type="video/mp4" />
          </video>
        </Waypoint>
      )}
    </ImageListItem>
  );
};

UserVideoList.prototype = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default UserVideoList;
