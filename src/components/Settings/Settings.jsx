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
import Appearance from "./Sub-Settings/Appearance";
import PersonalBackground from "./Sub-Settings/PersonalBackground";

import "../../styles/settingsstyles.css";
import AdvanceSecurity from "./Sub-Settings/AdvanceSecurity";

const ProfileSettings = ({ navigate, userData, handleGetUserData }) => {
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
  const [isUserNameValid, setIsUserNameValid] = useState(null);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [newUserData, setNewUserData] = useState({
    userName: "",
    bio: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (newUserData.userName.length > 0) {
      const validate = USERNAME_REGEX.test(newUserData.userName);
      if (!validate) {
        setIsUserNameValid(false);
      } else {
        setIsUserNameValid(true);
      }
    }
  }, [newUserData.userName]);

  const handleFormOnChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        console.warn("302 detected, redirecting...");
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
          UserName: newUserData.userName,
          Bio: newUserData.bio,
          Appearance: null,
          PersonalBackground: null,
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

      if (response.status === 409) {
        const res = await response.json();
        setUsernameErrorMsg(res.message);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        console.warn(response.status);
        setIsLoading(false);
      }

      const data = await response.json();
      console.log(data);

      setSelectedFile(null);
      setPreview(null);
      setUsernameErrorMsg(""); //setting to empty string when the request/update is successful
      handleGetUserData();

      setTimeout(() => {
        setIsLoading(false);
        const isFormUsed =
          newUserData.bio.length > 0 || newUserData.userName.length > 0;
        if (isFormUsed === true) {
          setIsUpdated(true);
        }
        setNewUserData({
          userName: "",
          bio: "",
        });
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
              {isUpdated === true && (
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

            {usernameErrorMsg ? (
              <p className="-error-form-p">{usernameErrorMsg}</p>
            ) : (
              ""
            )}

            {isUserNameValid === false ? (
              <p className="-error-form-p">
                Invalid username: 3 to 16 characters. Must start with a letter
                and can include letters, numbers, underscores, or dots.
              </p>
            ) : (
              ""
            )}
            <div className="-form-input__wrapper">
              <p>Username</p>
              <input
                type="text"
                name="userName"
                placeholder={userData.userName}
                onChange={(e) => handleFormOnChange(e)}
              />
            </div>
            <div className="-form-input__wrapper">
              <p>Bio</p>
              <textarea
                maxLength="250"
                name="bio"
                value={newUserData.bio}
                placeholder={userData.bio}
                onChange={(e) => handleFormOnChange(e)}
                className="settings-profile-form-bio__textarea"
              ></textarea>
              <span className="settings-textarea-counter__span">
                {newUserData.bio.length} / 250
              </span>
            </div>

            {newUserData.bio.length > 0 || newUserData.userName.length > 0 ? (
              <button
                type="submit"
                className="settings-profile-form-submit__btn"
              >
                Update
              </button>
            ) : (
              ""
            )}
          </form>
        </>
      )}
    </div>
  );
};

const Account = ({ userData, handleGetUserData }) => {
  const NUM_REGEX = /^\d*$/;
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [newUserData, setNewUserData] = useState({
    mobileNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const validate = NUM_REGEX.test(newUserData.mobileNumber);

    if (!validate) {
      setIsNumberValid(false);
    } else {
      setIsNumberValid(true);
    }
  }, [newUserData.mobileNumber]);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateData = async (retry = true) => {
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
          ProfilePictureUrl: "",
          MobileNumber: newUserData.mobileNumber,
          Appearance: null,
          PersonalBackground: null,
        }),
      });

      if (response.status === 302) {
        console.warn("Detected a 302. rerouting...");
        navigate("/");
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
      }

      if (response.status === 401 && retry) {
        console.warn("Detected a 402. Retrying request");
        await handleUpdateData(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        setIsLoading(false);
      }

      const data = await response.json();
      console.log(data);

      setNewUserData({
        mobileNumber: "",
      });

      setIsUpdated(true);
      handleGetUserData();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleBtnClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleUpdateData();
  };

  return (
    <div>
      {isLoading === true ? (
        <div className="settings-loading-icon__wrapper">
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <form className="account-form__wrapper">
          <div className="-display-flex-aligned-center -gap-10">
            <h5>Update your contact details</h5>
            {isUpdated === true && (
              <>
                <CheckCircleIcon size={16} weight="fill" color={"limegreen"} />
                <label className="update__text">updated</label>
              </>
            )}
          </div>

          {isNumberValid === false ? (
            <p className="-error-form-p">Mobile number is not valid</p>
          ) : (
            ""
          )}
          <div className="-form-input__wrapper">
            <p>Mobile Number</p>
            <input
              type="text"
              value={newUserData.mobileNumber}
              name="mobileNumber"
              placeholder={
                userData.mobileNumber === null
                  ? "64XXXXXXXX"
                  : userData.mobileNumber
              }
              onChange={(e) => handleOnInputChange(e)}
            />
          </div>

          {newUserData.mobileNumber !== "" && (
            <button
              disabled={isNumberValid === true ? false : true}
              onClick={(e) => handleBtnClicked(e)}
            >
              Save
            </button>
          )}
        </form>
      )}
    </div>
  );
};

const SecuritySettings = () => {
  const PasswordChangeContainer = () => {
    return (
      <>
        <h5>Change your password</h5>
        <p style={{ fontSize: "12px", marginBottom: "10px" }}>
          It is important for you to change your password every 6 months to
          protect your account
        </p>
        <div className="password-change__wrapper">
          <form className="account-form__wrapper">
            <>
              <div className="-display-flex-aligned-center -gap-10">
                <h5 style={{ color: "#f3f3f3" }}>
                  Enter your current password
                </h5>
              </div>

              <div
                style={{ backgroundColor: "#f3f3f3" }}
                className="-form-input__wrapper"
              >
                <p>Current password</p>
                <input type="password" name="currentPassword" placeholder="" />
              </div>
            </>

            <>
              <div className="-display-flex-aligned-center -gap-10">
                <h5 style={{ color: "#f3f3f3" }}>Enter your new password</h5>
              </div>

              <div
                style={{ backgroundColor: "#f3f3f3" }}
                className="-form-input__wrapper"
              >
                <p>New password</p>
                <input
                  style={{ backgroundColor: "#f3f3f3" }}
                  type="password"
                  name="newPassword"
                  placeholder=""
                />
              </div>
            </>

            <>
              <div className="-display-flex-aligned-center -gap-10">
                <h5 style={{ color: "#f3f3f3" }}>Confirm your new password</h5>
              </div>

              <div
                style={{ backgroundColor: "#f3f3f3" }}
                className="-form-input__wrapper"
              >
                <p>Confirm password</p>
                <input
                  style={{ backgroundColor: "#f3f3f3" }}
                  type="password"
                  name="confirmPassword"
                  placeholder=""
                />
              </div>
            </>
          </form>
        </div>
      </>
    );
  };

  return (
    <div>
      <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
        This is your security settings page. From here, you can update your
        security details to make sure you are protecting your account. You can
        also add or remove Two Factor Authentication but we recommend to add
        one. Keeping your account safe is our number one priority.
      </p>
      <form className="account-form__wrapper">
        <div className="-display-flex-aligned-center -gap-10">
          <h5>Change your email address</h5>
        </div>

        <div className="-form-input__wrapper">
          <p>Email Address</p>
          <input type="text" name="emailAddress" placeholder="" />
        </div>

        <div className="-display-flex-aligned-center -gap-10">
          <h5>Add a recovery email address</h5>
        </div>
        <p style={{ fontSize: "12px", marginTop: "5px" }}>
          Recovery email address is important for your account security
        </p>
        <div className="-form-input__wrapper">
          <p>Recovery email address</p>
          <input type="text" name="recoveryEmailAddress" placeholder="" />
        </div>
      </form>

      <PasswordChangeContainer />
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
            <GearSixIcon color={"rgba(0,0,0,0.7)"} size={15} weight="fill" />
            <div className="-display-flex-aligned-center -gap-10">
              <h5>{"Settings >"}</h5>
              <h5 style={{ color: "rgba(0,0,0,0.3)" }}>{navDisplay}</h5>
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
              className={
                navDisplay === "Profile" ||
                navDisplay === "Profile > Appearance" ||
                navDisplay === "Profile > Background"
                  ? "setting-nav-active"
                  : ""
              }
              onClick={() => setNavDisplay("Profile")}
            >
              Profile
            </li>
            {/* sub-ul__container */}

            {navDisplay === "Profile" ||
            navDisplay === "Profile > Appearance" ||
            navDisplay === "Profile > Background" ? (
              <>
                <ul className="sub-ul__wrapper">
                  <li
                    className={
                      navDisplay === "Profile > Appearance"
                        ? "setting-nav-active"
                        : ""
                    }
                    onClick={() => setNavDisplay("Profile > Appearance")}
                  >
                    Appearance
                  </li>
                  <li
                    className={
                      navDisplay === "Profile > Background"
                        ? "setting-nav-active"
                        : ""
                    }
                    onClick={() => setNavDisplay("Profile > Background")}
                  >
                    Background
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
            <li
              className={navDisplay === "Security" ? "setting-nav-active" : ""}
              onClick={() => setNavDisplay("Security")}
            >
              Security
            </li>
            {navDisplay === "Security" ||
            navDisplay === "Security > Advance" ? (
              <>
                <ul className="sub-ul__wrapper">
                  <li
                    className={
                      navDisplay === "Security > Advance"
                        ? "setting-nav-active"
                        : ""
                    }
                    onClick={() => setNavDisplay("Security > Advance")}
                  >
                    Advance
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

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
            <Account
              userData={userData}
              handleGetUserData={handleGetUserData}
            />
          ) : navDisplay === "Profile" ? (
            <ProfileSettings
              navigate={navigate}
              userData={userData}
              handleGetUserData={handleGetUserData}
            />
          ) : navDisplay === "Profile > Appearance" ? (
            <Appearance
              userData={userData}
              handleGetUserData={handleGetUserData}
            />
          ) : navDisplay === "Profile > Background" ? (
            <PersonalBackground
              userData={userData}
              handleGetUserData={handleGetUserData}
            />
          ) : navDisplay === "Security" ? (
            <SecuritySettings />
          ) : navDisplay === "Security > Advance" ? (
            <AdvanceSecurity />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
