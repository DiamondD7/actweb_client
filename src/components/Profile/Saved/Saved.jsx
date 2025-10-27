import React, { useEffect, useState } from "react";

import "../../../styles/savedstyles.css";
import { BASE_POST_API } from "../../../assets/js/serverapi";
const Saved = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {}, []);

  // const handleGetSavedPosts = async (retry = true) => {
  //   try {
  //     const response = await fetch()
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // };

  return (
    <div className="saved-posts-container__wrapper">
      <div className="profile-reels-reels-content-thumbnail__wrapper">
        <video
          className="profile-reels-reels-thumbnail__video"
          alt="video-thumbnail"
        />
      </div>
    </div>
  );
};

export default Saved;
