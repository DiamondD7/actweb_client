import React, { useEffect, useState } from "react";
import ReelsModal from "./ReelsModal";
import AddReels from "./AddReels";
import { GetReels, ValidateToken } from "../../../assets/js/serverapi";

import "../../../styles/reelsstyles.css";
import { useNavigate } from "react-router-dom";
const Reels = ({ isAddReelClicked, setIsAddReelClicked }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isReelOpened, setIsReelOpened] = useState(false);
  const [userReels, setUserReels] = useState([]);

  useEffect(() => {
    handleGetReels();
  }, []);

  const handleValidate = async (retry = true) => {
    try {
      const response = await fetch(ValidateToken, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/");
        return false;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. rerouting...");
        navigate("/");
        return false;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleValidate(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return false;
      }

      const data = await response.json();
      console.log(data);
      handleGetReels(false);
      return true;
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGetReels = async (retry = true) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${GetReels}/${sessionStorage.getItem("id")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Validating token...");
        return handleValidate();
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      //console.log(data);

      setUserReels(data.reels);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div>
      {isReelOpened === true || isAddReelClicked === true ? (
        <div className="overlay"></div>
      ) : (
        ""
      )}
      {isReelOpened === true ? (
        <ReelsModal setIsReelOpened={setIsReelOpened} />
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
