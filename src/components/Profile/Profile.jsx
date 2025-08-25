import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

import "../../styles/profilestyles.css";
import {
  ArrowCircleRightIcon,
  EnvelopeIcon,
  GlobeHemisphereEastIcon,
  PhoneIcon,
  ScanSmileyIcon,
  VideoIcon,
} from "@phosphor-icons/react";
const ProfileReels = () => {
  const testString =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ad adipisci voluptatum non iure, reiciendis beatae sapiente eius unde porro odit expedita error labore fugiat, sint dolor nihil numquam voluptate. lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, natus aspernatur. Soluta, quod? Sint, numquam voluptates doloremque laudantium sapiente cumque, est sed id reiciendis dolor amet quasi, accusamus atque a.";
  return (
    <div className="profile-reels-container__wrapper">
      <div className="profile-reels-content-thumbnail__wrapper">
        <img
          className="profile-reels-thumbnail__img"
          src="https://plus.unsplash.com/premium_photo-1683219368443-cb52cb4bf023?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="video-thumbnail"
        />
        <p className="profile-reels-thumbnail__text">
          {testString.length > 250
            ? testString.substring(0, 250) + "...."
            : testString}
        </p>
      </div>
      <div className="profile-reels-content-thumbnail__wrapper">
        <img
          className="profile-reels-thumbnail__img"
          src="https://images.unsplash.com/photo-1623888557352-442ac9bd4417?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="video-thumbnail"
        />
        <p className="profile-reels-thumbnail__text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ad
          adipisci voluptatum non iure, reiciendis beatae sapiente eius unde
          porro odit expedita error labore fugiat, sint dolor nihil numquam
          voluptate.
        </p>
      </div>
      <div className="profile-reels-content-thumbnail__wrapper">
        <img
          className="profile-reels-thumbnail__img"
          src="https://plus.unsplash.com/premium_photo-1684718741176-56035a6af605?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="video-thumbnail"
        />
        <p className="profile-reels-thumbnail__text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ad
          adipisci voluptatum non iure, reiciendis beatae sapiente eius unde
          porro odit expedita error labore fugiat, sint dolor nihil numquam
          voluptate.
        </p>
      </div>
    </div>
  );
};

const ProfileCards = () => {
  return (
    <div className="profile-cards-container__wrapper">
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <EnvelopeIcon size={18} />
          <span style={{ fontSize: "12px" }}>junro@gmail.com</span>
        </div>
        <div className="profile-cards-icon-texts__wrapper">
          <PhoneIcon size={18} />
          <span style={{ fontSize: "12px" }}>+6421020288765</span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <ScanSmileyIcon size={18} />
          <span style={{ fontSize: "12px" }}>Appearance</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Height</p>
          <span style={{ fontSize: "12px" }}>170cm</span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Weight</p>
          <span style={{ fontSize: "12px" }}>80kg</span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Hair Color</p>
          <span style={{ fontSize: "12px" }}>Brown</span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Eye Color</p>
          <span style={{ fontSize: "12px" }}>Brown</span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <GlobeHemisphereEastIcon size={18} />
          <span style={{ fontSize: "12px" }}>Personal Background</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Ethnicity</p>
          <span style={{ fontSize: "12px" }}>Filipino</span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Natural Accent</p>
          <span style={{ fontSize: "12px" }}>American</span>
        </div>
      </div>
    </div>
  );
};

const ProfileShowreel = () => {
  return (
    <div className="profile-background__wrapper">
      <div className="profile-showreel-lists-container__wrapper">
        <p style={{ fontSize: "10px" }}>1</p>
        <div className="profile-showreel-list__wrapper">
          <h4>Feature Film</h4>
          <p className="profile-showreel-title__text">Bean</p>
        </div>
        <div className="profile-showreel-link__wrapper">
          <VideoIcon size={18} />
          <a href="https://www.youtube.com" target="_blank">
            Bean Season 1, Episode 2
          </a>
        </div>
      </div>
      <div className="profile-showreel-lists-container__wrapper">
        <p style={{ fontSize: "10px" }}>2</p>
        <div className="profile-showreel-list__wrapper">
          <h4>Commercial</h4>
          <p className="profile-showreel-title__text">Briscoes</p>
        </div>
        <div className="profile-showreel-link__wrapper">
          <VideoIcon size={18} />
          <a href="https://www.youtube.com" target="_blank">
            Briscoes Christmas 2024
          </a>
        </div>
      </div>
      <div className="profile-showreel-lists-container__wrapper">
        <p style={{ fontSize: "10px" }}>3</p>
        <div className="profile-showreel-list__wrapper">
          <h4>Commercial</h4>
          <p className="profile-showreel-title__text">PB Tech</p>
        </div>
        <div className="profile-showreel-link__wrapper">
          <VideoIcon size={18} />
          <a href="https://www.youtube.com" target="_blank">
            PB Tech Back to School 2024
          </a>
        </div>
      </div>
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
      <div className="profile-container__wrapper">
        <div>
          <ProfileDetails />
          <ProfileBackground />
          <ProfileShowreel />
        </div>
        <div>
          <ProfileCards />
          <ProfileReels />
        </div>
      </div>
    </div>
  );
};
export default Profile;
