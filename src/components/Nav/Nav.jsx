import React from "react";
import {
  MagnifyingGlassIcon,
  ArticleIcon,
  UsersFourIcon,
  ChatCircleTextIcon,
  BellIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import "../../styles/navstyles.css";
const Nav = () => {
  const navigate = useNavigate();
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
            <li>
              <ArticleIcon size={20} />
              Feed
            </li>
            <li onClick={() => navigate("/profile-page")}>
              <UserIcon size={20} />
              Profile
            </li>
            <li>
              <UsersFourIcon size={20} />
              Connect
            </li>
            <li>
              <ChatCircleTextIcon size={20} />
              Message
            </li>
            <li>
              <BellIcon size={20} />
              Notification
            </li>
            <li>
              <SignOutIcon size={20} />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
