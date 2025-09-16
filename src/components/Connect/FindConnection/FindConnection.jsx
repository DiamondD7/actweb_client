import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  DiscoverUsers,
  AddFollowing,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";

const FindConnection = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [discoverUsers, setDiscoverUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchDiscoverUsers();
  }, []);

  const fetchDiscoverUsers = async (retry = true) => {
    try {
      const response = await fetch(`${DiscoverUsers}/${USER_ID}`, {
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
        return fetchDiscoverUsers(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      setDiscoverUsers(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFollow = async (retry = true, followId) => {
    setIsLoading(true);
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
      fetchDiscoverUsers();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFollowClick = async (e, followId) => {
    e.preventDefault();
    await handleFollow(true, followId);
  };

  return (
    <div className="find-connections__wrapper">
      {discoverUsers.map((user) => (
        <div
          className="connect-followers-profile-thumbnail__wrapper"
          key={user.id}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              className="connect-followers-profile-thumbnail__img"
              src={`${BASE_URL}/${user.profilePictureUrl}`}
              alt="profile-thumbnail-picture"
            />
            <div>
              <p>{user.fullName}</p>
              {/* <span>Auckland</span> */}
              <span>200 Following</span>
              <span>10 Followers</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="connect-not-following__btn"
              onClick={(e) => handleFollowClick(e, user.id)}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FindConnection;
