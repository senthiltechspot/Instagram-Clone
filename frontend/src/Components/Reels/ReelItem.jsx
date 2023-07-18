import React, { useRef, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import "./ReelItem.css";
import { Avatar, CircularProgress } from "@mui/material";

const ReelItem = ({ userName, videoSrc, isActive }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useEffect(() => {
    // Pause the video if isActive is false
    if (!isActive) {
      setIsPlaying(false);
      videoRef.current.pause();
    }
    if (isActive) {
      setIsPlaying(true);
      videoRef.current.play();
    }
  }, [isActive]);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleVideoEnter = () => {
    if (isActive && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoLeave = () => {
    if (isActive && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="swiper-slide">
      <Waypoint onEnter={handleVideoEnter} onLeave={handleVideoLeave}>
        <div className="reel-area">
          <video
            ref={videoRef}
            onClick={handleVideoClick}
            onPause={handleVideoLeave}
            onLoadedData={handleVideoLoadedData}
            className="video-player"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {isVideoLoaded ? null : (
            <div className="loading-overlay">
              <CircularProgress size={60} color="primary" />
            </div>
          )}
          <div className="reel-overlay">
            <div
              className="user-profile"
              style={{ display: "flex", gap: 5, alignItems: "center" }}
            >
              <Avatar src="A" />
              <div>
                <span className="username">{userName}</span>
                <br />
                {/* <button className="follow-btn">FOLLOW</button> */}
              </div>
            </div>
            {/* <div className="like-button" onClick={() => console.log("Liked!")}>
              <i className="fa-regular fa-heart"></i>
              <span>{likeCount}</span>
            </div> */}
          </div>
        </div>
      </Waypoint>
    </div>
  );
};

export default ReelItem;
