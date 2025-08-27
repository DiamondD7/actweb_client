import React from "react";

import "../../styles/notificationsstyles.css";
const Notifications = () => {
  return (
    <div className="notifications-container__wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className="notifications-details__wrapper">
          <img
            className="notifications-thumbnail__img"
            src="https://randomuser.me/api/portraits/men/37.jpg"
            alt="profile-message-thumbnail-picture"
          />
          <div className="notification-message__wrapper">
            <p>Henry Vlahd</p>
            <span>Henry Vlad wants to follow you.</span>
          </div>
        </div>

        <p style={{ fontSize: "10px" }}>3 mins ago</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className="notifications-details__wrapper">
          <img
            className="notifications-thumbnail__img"
            src="https://randomuser.me/api/portraits/men/17.jpg"
            alt="profile-message-thumbnail-picture"
          />
          <div className="notification-message__wrapper">
            <p>Jeremy Stan</p>
            <span>Henry Vlad wants to follow you.</span>
          </div>
        </div>

        <p style={{ fontSize: "10px" }}>53 mins ago</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className="notifications-details__wrapper">
          <img
            className="notifications-thumbnail__img"
            src="https://randomuser.me/api/portraits/women/27.jpg"
            alt="profile-message-thumbnail-picture"
          />
          <div className="notification-message__wrapper">
            <p>Julan Huwawei</p>
            <span>Henry Vlad wants to follow you.</span>
          </div>
        </div>

        <p style={{ fontSize: "10px" }}>1 day ago</p>
      </div>

      <div className="notifications-sellAll__wrapper">
        <button className="notifications-sellAll__btn">
          See all notifications
        </button>
      </div>
    </div>
  );
};
export default Notifications;
