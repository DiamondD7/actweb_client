import React, { useState } from "react";
import { CircleNotchIcon, MonitorArrowUpIcon } from "@phosphor-icons/react";
import {
  AddPost,
  UploadVideo,
  ValidateToken,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";

const AddReels = ({ setIsAddReelClicked, handleGetReels }) => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(null);
  const [videoNotAllowed, setVideoNotAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newReel, setNewReel] = useState({
    Type: 1, //1 is reel, 0 is post
    Caption: "",
    File: null,
    Preview: null,
  });

  const handleOnFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeMB = 600;
    const maxDuration = 90;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setVideoError("File is too large. Max size is 600MB");
      setVideoNotAllowed(true);
      return;
    }

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > maxDuration) {
        setVideoError(
          "Video is too long. Your video will be trimmed after uploading, to 1 minute and 30 seconds."
        );
      }
    };

    video.src = url;

    setNewReel((prev) => ({
      ...prev,
      File: file,
      Preview: URL.createObjectURL(file),
    }));

    setVideoNotAllowed(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewReel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidate = async (retry = true) => {
    try {
      const response = await fetch(ValidateToken, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. redirecting...");
        navigate("/", { replace: true });
        return false;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. rerouting...");
        navigate("/", { replace: true });
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
      handleUploadVideo(false);
      return true;
    } catch (err) {
      console.warn(err);
    }
  };
  const handleAddPost = async (retry = true, postUrl) => {
    try {
      const response = await fetch(AddPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Type: newReel.Type,
          UserId: sessionStorage.getItem("id"),
          Caption: newReel.Caption,
          PostUrl: postUrl,
        }),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleValidate();
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      handleGetReels();
      setIsAddReelClicked(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUploadVideo = async (retry = true) => {
    try {
      const formData = new FormData();
      formData.append("File", newReel.File);
      formData.append("isreelorpost", "reels");

      const response = await fetch(UploadVideo, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleValidate();
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      await handleAddPost(true, data.postUrl);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleUploadVideo();
  };

  console.log(videoError);
  return (
    <div>
      <div className="reel-upload-container__wrapper">
        {isLoading === true ? (
          <div className="-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <div className="-display-flex">
            <div className="reel-upload__wrapper">
              {newReel.Preview === null ? (
                <>
                  <label style={{ fontSize: "12px" }} htmlFor="actual-btn">
                    Upload Media <br />
                    <MonitorArrowUpIcon
                      size={32}
                      color={"rgba(0,0,0,0.5)"}
                      weight="fill"
                      className={"upload-icon"}
                    />
                  </label>
                  <input
                    accept="video/*"
                    id="actual-btn"
                    type="file"
                    onChange={(e) => handleOnFileChange(e)}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <video
                  className="video-thumbnail"
                  src={newReel.Preview}
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay={true}
                  controls
                  controlsList="nodownload noremoteplayback noplaybackrate"
                  loop={true}
                  alt="video-thumbnail"
                  height="700px"
                  width="100%"
                />
              )}
            </div>
            <div className="reel-details__wrapper">
              {videoError !== null && (
                <p className="-error-form-p">{videoError}</p>
              )}
              <h4>Make a Reel</h4>
              <p>Make a caption</p>
              <textarea
                className="reel-caption__textarea"
                name="Caption"
                onChange={(e) => handleOnChange(e)}
              ></textarea>

              <div className="add-post-btns__wrapper">
                <button
                  className="-btn-invisible"
                  onClick={() => setIsAddReelClicked(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`-form-submit__btn ${
                    videoNotAllowed === true ? "-btn-disabled" : ""
                  }`}
                  onClick={(e) => handleAddClick(e)}
                  disabled={videoNotAllowed === true ? true : false}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReels;
