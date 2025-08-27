import React from "react";
import Nav from "../Nav/Nav";

import "../../styles/feedstyles.css";
const Feed = () => {
  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="feed-container__wrapper">
        <div className="-display-flex-justified-center">
          <div className="feed-asksomething__wrapper">
            <img
              className="feed-picture-thumbnail__img"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="profile-picture-thumbnail"
            />
            <textarea
              className="feed-asksomething-message__textarea"
              placeholder="Ask something..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
