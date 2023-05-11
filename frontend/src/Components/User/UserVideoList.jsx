import { ImageListItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Waypoint } from "react-waypoint";

const UserVideoList = ({ image, title }) => {
  const [videoFile, setVideoFile] = useState(false);

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
    <ImageListItem key={image}>
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

export default UserVideoList;
