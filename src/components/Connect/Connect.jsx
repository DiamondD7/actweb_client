import React, { useState } from "react";
import Nav from "../Nav/Nav";

import "../../styles/connectstyles.css";
const FindConnection = () => {
  return (
    <div className="find-connections__wrapper">
      <div className="connect-followers-profile-thumbnail__wrapper">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            className="connect-followers-profile-thumbnail__img"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile-thumbnail-picture"
          />
          <div>
            <p>John Doe</p>
            <span>Auckland</span>
            <span>200 Following</span>
            <span>10 Followers</span>
          </div>
        </div>

        <div>
          <button className="connect-not-following__btn">Follow</button>
        </div>
      </div>
    </div>
  );
};

const ConnectFollowersFollowing = ({
  followerBtnClicked,
  setFollowerBtnClicked,
}) => {
  return (
    <div className="connect-followers-list__wrapper">
      <div className="connect-followers-header__wrapper">
        <button
          className={`connect-followers__btn ${
            followerBtnClicked === "following" ? "active-follower-btn" : ""
          }`}
          value="following"
          onClick={(e) => setFollowerBtnClicked(e.target.value)}
        >
          Following
        </button>
        <button
          className={`connect-followers__btn ${
            followerBtnClicked === "followers" ? "active-follower-btn" : ""
          }`}
          value="followers"
          onClick={(e) => setFollowerBtnClicked(e.target.value)}
        >
          Followers
        </button>
      </div>
      <div className="connect-followers-display__wrapper">
        <input
          className="connect-followers-search__input"
          type="text"
          placeholder="Search your following"
        />
        <div className="connect-followers-profile-thumbnail__wrapper">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              className="connect-followers-profile-thumbnail__img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile-thumbnail-picture"
            />
            <div>
              <p>John Doe</p>
              <span>200 Following</span>
              <span>10 Followers</span>
            </div>
          </div>

          <div>
            <button className="connect-follower-following__btn">
              Following
            </button>
          </div>
        </div>
        <div className="connect-followers-profile-thumbnail__wrapper">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              className="connect-followers-profile-thumbnail__img"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile-thumbnail-picture"
            />
            <div>
              <p>John Doe</p>
              <span>20 Following</span>
              <span>1,290 Followers</span>
            </div>
          </div>

          <div>
            <button className="connect-follower-following__btn">
              Following
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectFilter = ({ openFindConnections, setOpenFindConnections }) => {
  return (
    <div className="connect-filters__wrapper">
      <button
        className={`connect-filters-find-connections__btn ${
          openFindConnections === "following/followers" ? "active-filter" : ""
        }`}
        value="following/followers"
        onClick={(e) => setOpenFindConnections(e.target.value)}
      >
        Followers/Following
      </button>
      <button
        className={`connect-filters-find-connections__btn ${
          openFindConnections === "find-connections" ? "active-filter" : ""
        }`}
        value="find-connections"
        onClick={(e) => setOpenFindConnections(e.target.value)}
      >
        Find connections
      </button>
    </div>
  );
};

const Connect = () => {
  const [openFindConnections, setOpenFindConnections] = useState(
    "following/followers"
  );
  const [followerBtnClicked, setFollowerBtnClicked] = useState("following");

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="connect-container__wrapper">
        <ConnectFilter
          openFindConnections={openFindConnections}
          setOpenFindConnections={setOpenFindConnections}
        />

        {openFindConnections === "find-connections" ? (
          <FindConnection />
        ) : (
          <ConnectFollowersFollowing
            followerBtnClicked={followerBtnClicked}
            setFollowerBtnClicked={setFollowerBtnClicked}
          />
        )}
      </div>
    </div>
  );
};

export default Connect;
