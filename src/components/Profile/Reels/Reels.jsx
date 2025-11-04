import React, { useEffect, useState } from "react";
import ReelsModal from "./ReelsModal";
import AddReels from "./AddReels";
import { BASE_POST_API } from "../../../assets/js/serverapi";

import "../../../styles/reelsstyles.css";
const Reels = ({
  USER_ID,
  userData,
  userReels,
  handleGetReels,
  isAddReelClicked,
  setIsAddReelClicked,
}) => {
  const [isReelOpened, setIsReelOpened] = useState(false);
  const [chosenReel, setChosenReel] = useState([]);

  const handleReelClicked = (e, data) => {
    e.preventDefault();
    setChosenReel(data);
    setIsReelOpened(true);
  };

  return (
    <div>
      {isReelOpened === true || isAddReelClicked === true ? (
        <div className="overlay"></div>
      ) : (
        ""
      )}
      {isReelOpened === true ? (
        <ReelsModal
          USER_ID={USER_ID}
          userData={userData}
          setIsReelOpened={setIsReelOpened}
          chosenReel={chosenReel}
          handleGetReels={handleGetReels}
        />
      ) : (
        ""
      )}

      {isAddReelClicked === true && (
        <AddReels
          setIsAddReelClicked={setIsAddReelClicked}
          handleGetReels={handleGetReels}
        />
      )}

      <div className="profile-reels-reels-container__wrapper">
        {userReels.map((reel) => (
          <div
            className="profile-reels-reels-content-thumbnail__wrapper"
            onClick={(e) => handleReelClicked(e, reel)}
            key={reel.id}
          >
            <video
              className="profile-reels-reels-thumbnail__video"
              alt="video-thumbnail"
              src={`${BASE_POST_API}/${reel.postUrl}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
