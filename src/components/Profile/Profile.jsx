import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

import "../../styles/profilestyles.css";
import { ArrowCircleRightIcon } from "@phosphor-icons/react";
const ProfileShowreel = () => {
  return (
    <div className="profile-background__wrapper">
      <h1>Hello</h1>
    </div>
  );
};

const ProfileBackground = () => {
  return (
    <div className="profile-background__wrapper">
      <button className="profile-background-viewall__btn">View all</button>
      <div className="profile-background-lists__wrapper">
        <div>
          <p style={{ fontSize: "10px" }}>2024</p>
          <h4>Feature Film</h4>
          <ul className="profile-background__list">
            <li>
              Production:{" "}
              <strong className="profile-background-list__li-strong">
                Bean
              </strong>
            </li>
            <li>
              Role:{" "}
              <strong className="profile-background-list__li-strong">
                Tree
              </strong>
            </li>
            <li>
              Director/Company:{" "}
              <strong className="profile-background-list__li-strong">
                Lusty
              </strong>
            </li>
          </ul>
        </div>

        <div className="profile-background-lists-view__wrapper">
          <span>View</span>
          <ArrowCircleRightIcon size={23} weight="fill" color={"#4495c7"} />
        </div>
      </div>

      <div className="profile-background-lists__wrapper">
        <div>
          <p style={{ fontSize: "10px" }}>2023</p>
          <h4>Commercial</h4>
          <ul className="profile-background__list">
            <li>
              Production:{" "}
              <strong className="profile-background-list__li-strong">
                Briscoes
              </strong>
            </li>
            <li>
              Role:{" "}
              <strong className="profile-background-list__li-strong">
                Featured
              </strong>
            </li>
            <li>
              Director/Company:{" "}
              <strong className="profile-background-list__li-strong">
                Stanley
              </strong>
            </li>
          </ul>
        </div>
        <div className="profile-background-lists-view__wrapper">
          <span>View</span>
          <ArrowCircleRightIcon size={23} weight="fill" color={"#4495c7"} />
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = () => {
  return (
    <div>
      <div className="profile-deatils__wrapper">
        <img
          className="profile-details-profilepicture__img"
          src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile-picture"
        />

        <div className="profile-details-details__wrapper">
          <h2>Aaron Sierra</h2>
          <div className="profile-details-followers__wrapper">
            <p>Followers: 200</p>
            <p>Following: 200</p>
          </div>
          <p className="profile-details-bio__text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
            deserunt necessitatibus, cupiditate quisquam mollitia nobis at
            perspiciatis ex velit rem quaerat sapiente temporibus harum,
            tenetur, officia ratione unde quibusdam hic!
          </p>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <ProfileDetails />
      <ProfileBackground />
      <ProfileShowreel />
    </div>
  );
};
export default Profile;
