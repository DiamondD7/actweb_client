import React, { useEffect, useRef, useState } from "react";
import {
  BASE_URL,
  GetNotificationIds,
  GetUsersByIds,
} from "../../assets/js/serverapi";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { TimeAgo } from "../../assets/js/timeAgo.js";
import * as signalR from "@microsoft/signalr";

import "../../styles/notificationsstyles.css";
const Notifications = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [seeAllNotifs, setSeeAllNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationUsers, setNotificationUsers] = useState([]);

  //--------------------------------------SIGNALR {START} NOTIFICATION------------------------------------------------------

  const connectionRef = useRef(null);

  useEffect(() => {
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5164/notification-hub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current
      .start()
      .then(() => {
        console.log("Connected SignalR");

        connectionRef.current.on("ReceiveData", (model) => {
          console.log("Notification Recieved", model);
          setNotifications((prev) => [model, ...prev]);
        });
      })
      .catch((err) => console.error(err));

    return () => {
      connectionRef.current.stop();
    };
  }, []);

  //--------------------------------------SIGNALR {END} NOTIFICATION------------------------------------------------------

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
      console.error("Error: ", err);
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

  const displayedNotifications = seeAllNotifs
    ? notifications
    : notifications.slice(0, 3);

  return (
    <>
      <div className="notifications-container__wrapper">
        {notificationUsers.length === 0 ? (
          <div className="notif-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <>
            <div
              className={`notification-data-container__wrapper ${
                seeAllNotifs === true ? "notification-seeAll-overflow" : ""
              }`}
            >
              {displayedNotifications.map((items) =>
                notificationUsers.map(
                  (user) =>
                    items.senderId === user.id && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "20px",
                        }}
                        key={items.id}
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
                    )
                )
              )}
            </div>

            <div className="notifications-seeAll__wrapper">
              <button
                className="notifications-sellAll__btn"
                onClick={() => setSeeAllNotifs(!seeAllNotifs)}
              >
                {seeAllNotifs === true
                  ? "Hide notifications"
                  : "See all notifications"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Notifications;
