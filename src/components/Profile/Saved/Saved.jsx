import React, { useEffect, useState } from "react";
import {
  BASE_POST_API,
  GetPostsByIds,
  GetSavedPostIds,
  USER_API_URI,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import ReelsModal from "../Reels/ReelsModal";

import "../../../styles/savedstyles.css";
const Saved = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [chosenPost, setChosenPost] = useState(null);
  const [isPostOpened, setIsPostOpened] = useState(false);

  useEffect(() => {
    handleGetIds();
  }, []);

  const handleGetIds = async (retry = true) => {
    try {
      const response = await fetch(`${GetSavedPostIds}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying...");
        return await handleGetIds(false);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch saved post IDs");
      }

      const data = await response.json();
      const postIds = data.ids;
      await handleGetSavedPosts(postIds, true);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleGetSavedPosts = async (postIds, retry = true) => {
    try {
      const response = await fetch(GetPostsByIds, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postIds),
      });

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying...");
        return await handleGetIds(false);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch saved post IDs");
      }

      const data = await response.json();
      setSavedPosts(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleGetUserData = async (chosenPostUserId, retry = true) => {
    try {
      const response = await fetch(`${USER_API_URI}/${chosenPostUserId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("401 detected, rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleGetUserData(chosenPostUserId, false);
      }

      if (!response.ok) {
        console.warn(response.status);
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePostClicked = async (e, data) => {
    e.preventDefault();
    await handleGetUserData(data.userId);
    setChosenPost(data);
    setIsPostOpened(true);
  };

  return (
    <div>
      {isPostOpened === true ? <div className="overlay"></div> : ""}
      {isPostOpened === true ? (
        <ReelsModal
          userData={userData}
          setIsReelOpened={setIsPostOpened}
          chosenReel={chosenPost}
          handleGetReels={null}
        />
      ) : (
        ""
      )}

      <div className="saved-posts-container__wrapper">
        {savedPosts.map((post) => (
          <div
            className="profile-reels-reels-content-thumbnail__wrapper"
            onClick={(e) => handlePostClicked(e, post)}
            key={post.id}
          >
            <video
              className="profile-reels-reels-thumbnail__video"
              alt="video-thumbnail"
              src={`${BASE_POST_API}/${post.postUrl}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
