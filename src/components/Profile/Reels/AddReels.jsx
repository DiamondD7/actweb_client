import React, { useState } from "react";
import { MonitorArrowUpIcon } from "@phosphor-icons/react";
import {
  AddPost,
  UploadVideo,
  ValidateToken,
} from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";

const AddReels = ({ setIsAddReelClicked, handleGetReels }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [newReel, setNewReel] = useState({
    Type: "Reel",
    Caption: "",
    File: null,
    Preview: null,
  });

  const handleOnFileChange = (e) => {
    const file = e.target.files[0];
    setNewReel((prev) => ({
      ...prev,
      File: file,
      Preview: URL.createObjectURL(file),
    }));
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

  return (
    <div>
      <div className="post-open-modal__wrapper"></div>
    </div>
  );
};

export default AddReels;
