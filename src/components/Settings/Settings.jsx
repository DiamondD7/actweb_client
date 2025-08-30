import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { GearSixIcon, PencilSimpleIcon } from "@phosphor-icons/react";

import "../../styles/settingsstyles.css";
const ProfileSettings = () => {
  const [bio, setBio] = useState("");
  return (
    <div>
      <div className="settings-profile-info__wrapper">
        <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
          This is your profile settings page. From here, you can update your
          personal details to make sure your information is always accurate and
          up to date. You can also upload or change your profile picture to
          personalize your account. Keeping your profile current helps us
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
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="profile-picture"
            />
          </div>
          <button
            style={{
              alignSelf: "flex-end",
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <PencilSimpleIcon size={20} />
          </button>
        </div>
      </div>

      <form className="settings-profile-form__wrapper -margin-top-50">
        <br />
        <br />
        <p
          style={{ fontSize: "12px", fontWeight: "bold" }}
          className="-margin-top-50"
        >
          Update Your Details
        </p>
        <div className="-form-input__wrapper">
          <p>Username</p>
          <input required type="text" name="username" />
        </div>
        <div className="-form-input__wrapper">
          <p>Bio</p>
          <textarea
            maxlength="250"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="settings-profile-form-bio__textarea"
          ></textarea>
          <span className="settings-textarea-counter__span">
            {bio.length} / 250
          </span>
        </div>
      </form>
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
  const [navDisplay, setNavDisplay] = useState("Account");

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
            <ProfileSettings />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
