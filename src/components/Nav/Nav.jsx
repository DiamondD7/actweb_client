import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ArticleIcon,
  UsersFourIcon,
  ChatCircleTextIcon,
  BellIcon,
  SignOutIcon,
  UserIcon,
  GearSixIcon,
} from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../assets/js/serverapi";
import Notifications from "../Notifications/Notifications";

import "../../styles/navstyles.css";
const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.warn(response.status);
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("id", null);
      navigate("/", { replace: true });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="-main-container__wrapper">
      <div className="nav-container__wrapper">
        <div className="nav-searchbar__wrapper">
          <div className="nav-searchbar__icon">
            <MagnifyingGlassIcon size={18} color={"#202020"} />
          </div>
          <input
            className="nav-searchbar__input"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="nav-navigations__wrapper">
          <ul className="nav-navigations__list">
            <li
              onClick={() => navigate("/feed-page")}
              className={currentPath === "/feed-page" ? "active-nav" : ""}
            >
              <ArticleIcon
                size={20}
                weight={currentPath === "/feed-page" ? "fill" : "regular"}
                color={currentPath === "/feed-page" ? "#4495c7" : ""}
              />
              Feed
            </li>
            <li
              onClick={() => navigate("/profile-page")}
              className={currentPath === "/profile-page" ? "active-nav" : ""}
            >
              <UserIcon
                size={20}
                weight={currentPath === "/profile-page" ? "fill" : "regular"}
                color={currentPath === "/profile-page" ? "#4495c7" : ""}
              />
              Profile
            </li>
            <li
              onClick={() => navigate("/connect-page")}
              className={currentPath === "/connect-page" ? "active-nav" : ""}
            >
              <UsersFourIcon
                size={20}
                weight={currentPath === "/connect-page" ? "fill" : "regular"}
                color={currentPath === "/connect-page" ? "#4495c7" : ""}
              />
              Connect
            </li>
            <li
              onClick={() => navigate("/messages-page")}
              className={currentPath === "/messages-page" ? "active-nav" : ""}
            >
              <ChatCircleTextIcon
                size={20}
                weight={currentPath === "/messages-page" ? "fill" : "regular"}
                color={currentPath === "/messages-page" ? "#4495c7" : ""}
              />
              Message
            </li>
            <li
              onClick={() => setNotificationOpen(!notificationOpen)}
              className={notificationOpen ? "active-nav" : ""}
            >
              <BellIcon
                size={20}
                weight={notificationOpen ? "fill" : "regular"}
                color={notificationOpen ? "#4495c7" : ""}
              />
              Notifications
            </li>
            <li
              onClick={() => navigate("/settings-page")}
              className={currentPath === "/settings-page" ? "active-nav" : ""}
            >
              <GearSixIcon
                size={20}
                weight={currentPath === "/settings-page" ? "fill" : "regular"}
                color={currentPath === "/settings-page" ? "#4495c7" : ""}
              />
              Settings
            </li>
            <li onClick={(e) => handleLogout(e)}>
              <SignOutIcon size={20} />
              Logout
            </li>
          </ul>
        </div>
      </div>

      {notificationOpen && <Notifications />}
    </div>
  );
};

export default Nav;
