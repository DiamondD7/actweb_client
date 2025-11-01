import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ArticleIcon,
  UsersFourIcon,
  ChatCircleTextIcon,
  CircleNotchIcon,
  BellIcon,
  SignOutIcon,
  UserIcon,
  GearSixIcon,
} from "@phosphor-icons/react";
import { BASE_URL, GetFollowing } from "../../assets/js/serverapi";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../assets/js/serverapi";
import Notifications from "../Notifications/Notifications";

import "../../styles/navstyles.css";
const NavSearchBar = ({ searchText, setSearchText, userFollowing }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searchText) return;
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const filterSearch = userFollowing.filter((user) =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="nav-searchbar-container__wrapper">
      {isLoading === true ? (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <CircleNotchIcon size={20} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <div>
          {filterSearch.map((user) => (
            <div
              className="nav-filtered-search__wrapper"
              key={user.id}
              onClick={() => {
                navigate(`/profile-page?id=${user.id}`);
                setSearchText("");
              }}
            >
              <MagnifyingGlassIcon size={17} color={"#202020ac"} />

              <img
                className="nav-search-picture-thumbnail__img"
                src={`${BASE_URL}/${user.profilePictureUrl}`}
                alt="profile-picture-thumbnail"
              />
              <p style={{ fontSize: "12px" }}>{user.fullName}</p>
            </div>
          ))}
        </div>
      )}

      <div className="search-for-click-text__wrapper">
        <p>
          See all results for <strong>"{searchText}"</strong>
        </p>
      </div>
    </div>
  );
};

const Nav = () => {
  const USER_ID = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    handleGetFollowing();
  }, []);

  const handleGetFollowing = async (retry = true) => {
    try {
      const response = await fetch(`${GetFollowing}/${USER_ID}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/", { replace: true });
        sessionStorage.clear();
        return;
      }

      if (response.status === 401 && !retry) {
        navigate("/", { replace: true });
        sessionStorage.clear();
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return await handleGetFollowing(false);
      }

      if (!response.ok) {
        console.error(response.status);
      }

      const data = await response.json();
      //console.log(data);
      setUserFollowing(data);
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  };

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
    <>
      {searchText && (
        <NavSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          userFollowing={userFollowing}
        />
      )}
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
    </>
  );
};

export default Nav;
