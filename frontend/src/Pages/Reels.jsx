import React, { useEffect, useState } from "react";
import ReelItem from "../Components/Reels/ReelItem";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Mousewheel } from "swiper/modules";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Reels = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/posts`,
        {
          headers: {
            Authorization: `${cookies.get("Token")}`,
          },
        }
      );
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);
  const filteredData = posts.filter(
    (item) => item.image.endsWith(".mp4") || item.image.endsWith(".webm")
  );

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel]}
        className="mySwiper"
        style={{ zIndex: 100 }}
      >
        {filteredData.map((item, i) => (
          <SwiperSlide>
            {({ isActive }) => (
              <ReelItem
                key={i}
                userName={item.title}
                likeCount={item.likes.length}
                videoSrc={item.image}
                isActive={isActive ? true : false}
              />
            )}
          </SwiperSlide>
        ))}
        <SwiperSlide>Loading ...</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Reels;
