import React, { useEffect, useState } from "react";
import {
  AddFollowing,
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

  const [following, setFollowing] = useState([]);
  const [followData, setFollowData] = useState([]);

  useEffect(() => {
    fetchFollowing();
    fetchFollowers();
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
      if (followerBtnClicked === "following") {
        setFollowData(data);
      }

      setFollowing(data);
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
      if (followerBtnClicked === "followers") {
        setFollowData(data);
      }
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
      //console.log(data);

      fetchFollowing();
      fetchFollowers();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUnFollowClicked = async (e, id) => {
    e.preventDefault();
    await handleUnfollow(true, id);
  };

  const handleFollow = async (retry = true, followId) => {
    try {
      const response = await fetch(AddFollowing, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          UserId: USER_ID,
          FollowingId: followId,
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
        return handleFollow(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      fetchFollowing();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFollowClick = async (e, followId) => {
    e.preventDefault();
    await handleFollow(true, followId);
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
              </div>
            </div>

            <div>
              {followerBtnClicked === "followers" ? (
                <>
                  {following.some((f) => f.id === user.id) ? (
                    <button
                      className="connect-follower-following__btn"
                      onClick={(e) => handleUnFollowClicked(e, user.id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="connect-not-following__btn"
                      onClick={(e) => handleFollowClick(e, user.id)}
                    >
                      Follow
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="connect-follower-following__btn"
                  onClick={(e) => handleUnFollowClicked(e, user.id)}
                >
                  Following
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersFollowing;
