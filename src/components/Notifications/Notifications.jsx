import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  GetNotificationIds,
  GetUsersByIds,
} from "../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../assets/js/timeago";

import "../../styles/notificationsstyles.css";
const Notifications = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationUsers, setNotificationUsers] = useState([]);

  useEffect(() => {
    handleFetchNotifIds();
  }, []);

  const handleFetchNotifIds = async () => {
    try {
      const response = await fetch(`${GetNotificationIds}/${USER_ID}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Error: ", response.status);
      }

      const data = await response.json();
      setNotifications(data.notifs);
      await handleFetchUsers(true, data.userIds);
    } catch (err) {
      console.err("Error: ", err);
      throw err;
    }
  };

  const handleFetchUsers = async (retry = true, ids) => {
    try {
      const response = await fetch(GetUsersByIds, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ids),
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        return;
      }

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying request...");
        return handleFetchUsers(false, ids);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      setNotificationUsers(data);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      {notificationUsers.map((user) => (
        <div key={user.id}>
          {notifications.map(
            (items) =>
              user.id === items.senderId && (
                <div
                  className="notifications-container__wrapper"
                  key={items.id}
                >
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
                        src={`${BASE_URL}/${user.profilePictureUrl}`}
                        alt="profile-message-thumbnail-picture"
                      />
                      <div className="notification-message__wrapper">
                        <p>{user.fullName}</p>
                        <span>
                          {user.fullName} {items.message}.
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "10px" }}>
                      {TimeAgo(items.createdAt)}
                    </p>
                  </div>

                  <div className="notifications-sellAll__wrapper">
                    <button className="notifications-sellAll__btn">
                      See all notifications
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      ))}
    </>
  );
};
export default Notifications;
