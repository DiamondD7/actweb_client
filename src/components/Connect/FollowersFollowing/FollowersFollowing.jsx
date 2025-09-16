import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  GetFollowers,
  GetFollowing,
  UnFollow,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";

const FollowersFollowing = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [followerBtnClicked, setFollowerBtnClicked] = useState("following");
  const [followData, setFollowData] = useState([]);

  useEffect(() => {
    if (followerBtnClicked === "following") {
      fetchFollowing();
    } else {
      fetchFollowers();
    }
  }, [followerBtnClicked]);

  const fetchFollowing = async (retry = true) => {
    try {
      const response = await fetch(`${GetFollowing}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return fetchFollowing(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      setFollowData(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchFollowers = async (retry = true) => {
    try {
      const response = await fetch(`${GetFollowers}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return fetchFollowers(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      setFollowData(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUnfollow = async (retry = true, id) => {
    try {
      const response = await fetch(UnFollow, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          UserId: USER_ID,
          FollowingId: id,
        }),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleUnfollow(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (followerBtnClicked === "following") {
        fetchFollowing();
      } else {
        fetchFollowers();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFollowClicked = async (e, id) => {
    e.preventDefault();
    await handleUnfollow(true, id);
  };

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

        {followData.map((user) => (
          <div className="connect-followers-profile-thumbnail__wrapper">
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                className="connect-followers-profile-thumbnail__img"
                src={`${BASE_URL}/${user.profilePictureUrl}`}
                alt="profile-thumbnail-picture"
              />
              <div>
                <p>{user.fullName}</p>
                <span>200 Following</span>
                <span>10 Followers</span>
              </div>
            </div>

            <div>
              <button
                className="connect-follower-following__btn"
                onClick={(e) => handleFollowClicked(e, user.id)}
              >
                Following
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersFollowing;
