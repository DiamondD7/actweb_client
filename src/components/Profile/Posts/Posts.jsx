import React from "react";
import { BASE_POST_API } from "../../../assets/js/serverapi";

const Posts = ({ usersPosts, handlePostClicked }) => {
  return (
    <div>
      <div className="profile-reels-container__wrapper">
        {usersPosts.map((post, index) => (
          <div
            className="profile-reels-content-thumbnail__wrapper"
            onClick={(e) => handlePostClicked(e, post)}
            key={index}
          >
            <video
              className="profile-reels-thumbnail__video"
              src={`${BASE_POST_API}/${post.postUrl}`}
              alt="video-thumbnail"
            />
            <p className="profile-reels-thumbnail__text">
              {post.caption.length > 250
                ? post.caption.substring(0, 250) + "...."
                : post.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
