import React, { useState } from "react";
import ReelsModal from "./ReelsModal";

import "../../../styles/reelsstyles.css";
const Reels = () => {
  const [isReelOpened, setIsReelOpened] = useState(false);
  return (
    <div>
      {isReelOpened === true ? <div className="overlay"></div> : ""}
      {isReelOpened === true ? (
        <ReelsModal setIsReelOpened={setIsReelOpened} />
      ) : (
        ""
      )}

      <div className="profile-reels-reels-container__wrapper">
        <div
          className="profile-reels-reels-content-thumbnail__wrapper"
          onClick={() => setIsReelOpened(true)}
        >
          <img
            className="profile-reels-reels-thumbnail__video"
            alt="video-thumbnail"
            src="https://images.unsplash.com/photo-1754136362561-fd8b431c78e4?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default Reels;
