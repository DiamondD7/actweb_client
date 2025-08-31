import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  GearSixIcon,
  PencilSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  UpdateData,
  UploadProfilePicture,
  USER_API_URI,
  BASE_URL,
} from "../../assets/js/serverapi";
import Nav from "../Nav/Nav";

import "../../styles/settingsstyles.css";
const ProfileSettings = ({ navigate, userData, handleGetUserData }) => {
  const [bio, setBio] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // show preview before upload
  };

  //handles the upload of the profile picture which returns a imageUrl to be saved in the handleUpdateData (for storing the imageUrl in the db)
  const handleUpload = async (retry = true) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(UploadProfilePicture, {
        method: "POST",
        credentials: "include",
        body: formData,
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
        return handleUpload(false);
      }

      if (!response.ok) {
        console.warn(response.status);
      }

      const data = await response.json();
      console.log(data);
      //this is the moment where it passes the imageUrl to the update data process
      handleUpdateData(data.imageUrl);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUpdateData = async (imageUrl, retry = true) => {
    try {
      const response = await fetch(UpdateData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: sessionStorage.getItem("id"),
          ProfilePictureUrl: imageUrl,
          Bio: bio,
        }),
      });

      if (response.status === 302) {
        console.warn("Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Re-routing...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("Detected 401, retrying request...");
        return handleUpdateData(imageUrl, false);
      }

      if (!response.ok) {
        console.warn(response.status);
        setIsLoading(false);
      }

      const data = await response.json();
      console.log(data);

      setSelectedFile(null);
      setPreview(null);
      handleGetUserData();

      setTimeout(() => {
        setIsLoading(false);
        if (bio.length > 0) {
          setIsUpdated(true);
        }
        setBio("");
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleUpdateData(""); //passing empty string for imageUrl. so that its empty
  };

  return (
    <div>
      {isLoading ? (
        <div className="settings-profile-form-loading-icon__wrapper">
          <CircleNotchIcon size={42} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <>
          <div className="settings-profile-info__wrapper">
            <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
              This is your profile settings page. From here, you can update your
              personal details to make sure your information is always accurate
              and up to date. You can also upload or change your profile picture
              to personalize your account. Keeping your profile current helps us
              provide you with a more seamless and personalized experience.
            </p>

            <p
              style={{ fontSize: "12px", fontWeight: "bold" }}
              className="-margin-top-50"
            >
              Change your Profile Picture
            </p>
            <div className="-display-flex">
              <div>
                <img
                  className="profile-details-profilepicture__img -margin-top-20"
                  src={
                    preview
                      ? preview
                      : `${BASE_URL}${userData.profilePictureUrl}`
                  }
                  alt="profile-picture"
                />
              </div>
              {/* if the user has not selected a file, just show the button edit */}
              {selectedFile === null && (
                <>
                  <input
                    type="file"
                    id="actual-btn"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                  />
                  <label
                    htmlFor="actual-btn"
                    style={{
                      alignSelf: "flex-end",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <PencilSimpleIcon size={20} />
                  </label>
                </>
              )}

              {/* if user selected a file then show X (so that they can cancel it) */}
              {selectedFile !== null && (
                <button
                  style={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  <XIcon size={20} />
                </button>
              )}
            </div>

            <br />
            {selectedFile !== null && (
              <button
                className="settings-profile-updatepicture__btn"
                onClick={() => handleUpload()}
              >
                Update Picture
              </button>
            )}
          </div>

          <form
            className="settings-profile-form__wrapper -margin-top-10"
            onSubmit={handleFormSubmit}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className="-margin-top-50"
            >
              Update Your Details{" "}
              {isUpdated && (
                <>
                  <CheckCircleIcon
                    size={16}
                    weight="fill"
                    color={"limegreen"}
                  />
                  <label className="update__text">updated</label>
                </>
              )}
            </p>
            <div className="-form-input__wrapper">
              <p>Username</p>
              {/* <input required type="text" name="username" /> */}
            </div>
            <div className="-form-input__wrapper">
              <p>Bio</p>
              <textarea
                maxLength="250"
                value={bio}
                placeholder={userData.bio}
                onChange={(e) => setBio(e.target.value)}
                className="settings-profile-form-bio__textarea"
              ></textarea>
              <span className="settings-textarea-counter__span">
                {bio.length} / 250
              </span>
            </div>

            {bio.length > 0 && (
              <button
                type="submit"
                className="settings-profile-form-submit__btn"
              >
                Update
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

const Account = () => {
  return (
    <div>
      <div>Account</div>
    </div>
  );
};

const Settings = () => {
  const [userData, setUserData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const load = searchParams.get("load") === "profile" ? "Profile" : null;
  const [navDisplay, setNavDisplay] = useState(load ? load : "Account"); //this just means that if there is a query "load" to load the profile, then use,
  // if there is no query then just use default which is "Account"

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserData();
  }, []);

  const handleGetUserData = async (retry = true) => {
    try {
      const response = await fetch(
        `${USER_API_URI}/${sessionStorage.getItem("id")}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

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
        return handleGetUserData(false);
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

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <div className="-display-flex -gap-10">
        <div className="settings-nav-container__wrapper">
          <div className="-display-flex-aligned-center -gap-10">
            <GearSixIcon color={"rgba(0,0,0,0.7)"} size={20} weight="fill" />
            <div className="-display-flex-aligned-center -gap-10">
              <h4>{"Settings >"}</h4>
              <h4 style={{ color: "rgba(0,0,0,0.3)" }}>{navDisplay}</h4>
            </div>
          </div>
          <ul className="settings-nav-ul__wrapper">
            <li
              className={navDisplay === "Account" ? "setting-nav-active" : ""}
              onClick={() => setNavDisplay("Account")}
            >
              Account
            </li>
            <li
              className={navDisplay === "Profile" ? "setting-nav-active" : ""}
              onClick={() => setNavDisplay("Profile")}
            >
              Profile
            </li>
            <li
              className={navDisplay === "Security" ? "setting-nav-active" : ""}
              onClick={() => setNavDisplay("Security")}
            >
              Security
            </li>
            <li
              className={navDisplay === "Privacy" ? "setting-nav-active" : ""}
              onClick={() => setNavDisplay("Privacy")}
            >
              Privacy
            </li>
          </ul>
        </div>
        <div className="settings-display-container__wrapper">
          {navDisplay === "Account" ? (
            <Account />
          ) : navDisplay === "Profile" ? (
            <ProfileSettings
              navigate={navigate}
              userData={userData}
              handleGetUserData={handleGetUserData}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
