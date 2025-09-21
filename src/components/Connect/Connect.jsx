import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import FindConnection from "./FindConnection/FindConnection";
import FollowersFollowing from "./FollowersFollowing/FollowersFollowing";

import "../../styles/connectstyles.css";

const ConnectNavs = ({ openFindConnections, setOpenFindConnections }) => {
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

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="connect-container__wrapper">
        <ConnectNavs
          openFindConnections={openFindConnections}
          setOpenFindConnections={setOpenFindConnections}
        />

        {openFindConnections === "find-connections" ? (
          <FindConnection />
        ) : (
          <FollowersFollowing />
        )}
      </div>
    </div>
  );
};

export default Connect;
