import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  USER_API_URI,
  BASE_URL,
  AddUserBackground,
  GetUserBackgrounds,
  UpdateUserBackground,
} from "../../assets/js/serverapi";
import Nav from "../Nav/Nav";
import {
  ArrowCircleRightIcon,
  CaretDownIcon,
  CaretUpIcon,
  CircleNotchIcon,
  EnvelopeIcon,
  GlobeHemisphereEastIcon,
  PencilSimpleIcon,
  PhoneIcon,
  PlusIcon,
  ScanSmileyIcon,
  VideoIcon,
  XIcon,
} from "@phosphor-icons/react";

import "../../styles/profilestyles.css";
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

const ProfileCards = ({ userData }) => {
  return (
    <div className="profile-cards-container__wrapper">
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <EnvelopeIcon size={18} />
          <span style={{ fontSize: "12px" }}>{userData?.email}</span>
        </div>
        <div className="profile-cards-icon-texts__wrapper">
          <PhoneIcon size={18} />
          <span style={{ fontSize: "12px" }}>{userData?.mobileNumber}</span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <ScanSmileyIcon size={18} />
          <span style={{ fontSize: "12px" }}>Appearance</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Height</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.height}cm
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Weight</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.weight}kg
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Hair Color</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.hairColor}
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Eye Color</p>
          <span style={{ fontSize: "12px" }}>
            {userData.appearance?.eyeColor}
          </span>
        </div>
      </div>
      <div className="profile-cards__wrapper">
        <div className="profile-cards-icon-texts__wrapper">
          <GlobeHemisphereEastIcon size={18} />
          <span style={{ fontSize: "12px" }}>Personal Background</span>
        </div>

        <div className="profile-cards-appearance-details__wrapper">
          <p>Ethnicity</p>
          <span style={{ fontSize: "12px" }}>
            {userData.personalBackground?.ethnicity}
          </span>
        </div>
        <div className="profile-cards-appearance-details__wrapper">
          <p>Natural Accent</p>
          <span style={{ fontSize: "12px" }}>
            {userData.personalBackground?.naturalAccent}
          </span>
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
  const navigate = useNavigate();

  const [editBackgroundClicked, setEditBackgroundClicked] = useState(false);

  const EditBackgroundContainer = () => {
    const [userBackgroundData, setUserBackgroundData] = useState([]);
    const [newUserData, setNewUserData] = useState({
      Id: 0,
      Title: "",
      Production: "",
      Role: "",
      Director: "",
      Year: "",
    });
    const [openExistingContainer, setOpenExistingContainer] = useState(0);
    const [isLoading, setIsLoading] = useState(false); //loading for updating
    const [mainLoading, setMainLoading] = useState(false); //main page loading

    useEffect(() => {
      setMainLoading(true);
      handleFetchBackgrounds();
    }, []);

    const handleFetchBackgrounds = async (retry = true) => {
      try {
        const ID = sessionStorage.getItem("id");
        const response = await fetch(`${GetUserBackgrounds}?userId=${ID}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401 && retry === false) {
          console.warn("Unauthorize. Rerouting...");
          navigate("/");
          return;
        }

        if (response.status === 301) {
          console.warn("301 detected. Redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleFetchBackgrounds();
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        setUserBackgroundData(data);

        setTimeout(() => {
          setMainLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleOpenContainers = (index) => {
      if (openExistingContainer === index + 1) {
        setOpenExistingContainer(0);
      } else {
        setOpenExistingContainer(index + 1);
      }
    };

    const handleOnChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setNewUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleUpdateBackground = async (retry = true, id) => {
      try {
        const response = await fetch(UpdateUserBackground, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: id,
            Title: newUserData.Title,
            Production: newUserData.Production,
            Role: newUserData.Role,
            Director: newUserData.Director,
            Year: newUserData.Year,
          }),
        });

        if (response.status === 401 && retry === false) {
          console.warn("Unauthorized. Rerouting...");
          navigate("/");
          return;
        }

        if (response.status === 301) {
          console.warn("301 detected. Redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected. Retrying request...");
          return handleUpdateBackground(false, id);
        }

        if (!response.ok) {
          console.warn(response.status);
          return;
        }

        const data = await response.json();
        console.log(data);

        setNewUserData({
          Id: 0,
          Title: "",
          Production: "",
          Role: "",
          Director: "",
          Year: "",
        });
        setTimeout(() => {
          handleFetchBackgrounds();
          setOpenExistingContainer(0);
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.warn(err);
      }
    };

    const handleBtnClicked = async (e, id) => {
      e.preventDefault();
      setIsLoading(true);
      console.log(id);
      await handleUpdateBackground(true, id);
    };

    const AddBackgroundContainer = ({ handleFetchBackgrounds }) => {
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = useState(false);
      const [openAddBackground, setOpenAddBackground] = useState(false);
      const [addNewdata, setAddNewData] = useState({
        UserId: sessionStorage.getItem("id"),
        Title: "",
        Production: "",
        Role: "",
        Director: "",
        Year: "",
      });

      const handleOnChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setAddNewData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleAddData = async (retry = true) => {
        try {
          const response = await fetch(AddUserBackground, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(addNewdata),
          });

          if (response.status === 401 && retry === false) {
            console.warn("Unauthorized. Rerouting...");
            navigate("/");
            return;
          }

          if (response.status === 301) {
            console.warn("301 detected. Redirecting...");
            navigate("/");
            return;
          }

          if (response.status === 401 && retry) {
            console.warn("401 detected. Retrying request...");
            return handleAddData(false);
          }

          if (!response.ok) {
            console.warn(response.status);
            return;
          }

          const data = await response.json();
          console.log(data);

          setAddNewData({
            Title: "",
            Production: "",
            Role: "",
            Director: "",
            Year: "",
          });

          setTimeout(() => {
            handleFetchBackgrounds();
            setIsLoading(false);
            setOpenAddBackground(false);
          }, 2000);
        } catch (err) {
          console.warn(err);
        }
      };

      const handleBtnSubmitClicked = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handleAddData();
      };
      return (
        <div>
          <div
            className="add-background-container__wrapper"
            onClick={() => setOpenAddBackground(!openAddBackground)}
          >
            <div className="-display-flex-aligned-center -gap-10">
              <PlusIcon size={20} />
              <h3>Add a new one</h3>
            </div>
          </div>

          <div
            className={`add-background-open__wrapper ${
              openAddBackground === true ? "slideopen-container" : ""
            }`}
          >
            {isLoading ? (
              <div className="-loading-icon__wrapper">
                <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
              </div>
            ) : (
              <form
                className="add-background-form__wrapper"
                onSubmit={handleBtnSubmitClicked}
              >
                <>
                  <div className="-form-input__wrapper">
                    <p>Title</p>
                    <input
                      type="text"
                      name="Title"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>

                  <div className="-display-flex-justified-spaceevenly -gap-10">
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Production</p>
                      <input
                        type="text"
                        name="Production"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Director/Company</p>
                      <input
                        type="text"
                        name="Director"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="-display-flex-justified-spaceevenly -gap-10">
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Role</p>
                      <input
                        type="text"
                        name="Role"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className="-form-input__wrapper -width-50percent">
                      <p>Year</p>
                      <input
                        type="text"
                        name="Year"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                </>
                <button type="submit" className="-form-submit__btn">
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      );
    };
    // -----------------------------------------------------------------------------------------

    return (
      <div className="edit-background-container__wrapper">
        <button
          className="-btn-invisible"
          onClick={() => setEditBackgroundClicked(false)}
        >
          <XIcon size={20} />
        </button>
        <h4 style={{ marginTop: "10px" }}>
          Add or Update an existing background
        </h4>
        <br />
        <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
          This page allows you to update or add your acting background. Here,
          you can showcase your experience by listing the projects you’ve worked
          on, the roles you played, the production companies involved, and the
          directors you collaborated with. Adding this information helps
          highlight your skills and achievements, making it easier for others to
          understand your experience and see the range of your work as an actor.
        </p>

        {mainLoading ? (
          <div className="-loading-icon__wrapper">
            <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
          </div>
        ) : (
          <>
            <AddBackgroundContainer
              handleFetchBackgrounds={handleFetchBackgrounds}
            />
            <br />
            <br />

            {userBackgroundData.map((items, index) => (
              <div key={index}>
                <div
                  className="edit-background-existing-close__wrapper -margin-top-10"
                  onClick={() => handleOpenContainers(index)}
                >
                  <div>
                    <h3>{items.title}</h3>
                    <p>{items.production}</p>
                  </div>
                  <div>
                    {openExistingContainer === true ? (
                      <CaretUpIcon size={20} color={"#eaf2ff"} />
                    ) : (
                      <CaretDownIcon size={20} color={"#eaf2ff"} />
                    )}
                  </div>
                </div>
                <div
                  className={`edit-background-existing-open__wrapper ${
                    openExistingContainer === index + 1
                      ? "slideopen-container"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="-loading-icon__wrapper">
                      <CircleNotchIcon
                        size={35}
                        className={"-btn-loading__icon"}
                      />
                    </div>
                  ) : (
                    <form
                      className="edit-background-form__wrapper"
                      onSubmit={(e) => handleBtnClicked(e, items.id)}
                    >
                      <>
                        <div className="-form-input__wrapper">
                          <p>Title</p>
                          <input
                            type="text"
                            placeholder={items.title}
                            name="Title"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </div>

                        <div className="-display-flex-justified-spaceevenly -gap-10">
                          <div className="-form-input__wrapper -width-50percent">
                            <p>Production</p>
                            <input
                              type="text"
                              placeholder={items.production}
                              name="Production"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                          <div className="-form-input__wrapper -width-50percent">
                            <p>Director/Company</p>
                            <input
                              type="text"
                              placeholder={items.director}
                              name="Director"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                        <div className="-display-flex-justified-spaceevenly -gap-10">
                          <div className="-form-input__wrapper -width-50percent">
                            <p>Role</p>
                            <input
                              type="text"
                              placeholder={items.role}
                              name="Role"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                          <div className="-form-input__wrapper -width-50percent">
                            <p>Year</p>
                            <input
                              type="text"
                              placeholder={items.year}
                              name="Year"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                      </>
                      <button type="submit" className="-form-submit__btn">
                        Save
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className="profile-background__wrapper">
      {editBackgroundClicked === true && (
        <>
          <div className="overlay"></div>
          <EditBackgroundContainer />
        </>
      )}
      <div className="-display-flex-justified-spacebetween">
        <button className="profile-background-viewall__btn">View all</button>
        <button
          className="-btn-invisible"
          onClick={() => setEditBackgroundClicked(true)}
        >
          <PencilSimpleIcon size={15} />
        </button>
      </div>
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

const ProfileDetails = ({ navigate, userData }) => {
  return (
    <div>
      <div className="profile-deatils__wrapper">
        <img
          className="profile-details-profilepicture__img"
          src={`${BASE_URL}${userData.profilePictureUrl}`}
          alt="profile-picture"
        />

        <div className="profile-details-details__wrapper">
          <h2>{userData.fullName}</h2>
          <p style={{ marginBottom: "5px", color: "rgba(0,0,0,0.6)" }}>
            {userData.userName}
          </p>
          <div className="profile-details-followers__wrapper">
            <p>Followers: 200</p>
            <p>Following: 200</p>
          </div>
          <p className="profile-details-bio__text">
            {userData.bio?.length > 250
              ? userData.bio?.substring(0, 250) + "..."
              : userData.bio}
          </p>
        </div>

        <button
          className="profile-details-profilepicture-edit__btn"
          onClick={() => navigate("/settings-page?load=profile")}
        >
          <PencilSimpleIcon size={15} />
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserData();
  }, []);

  const handleGetUserData = async (retry = true) => {
    setIsLoading(true);
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

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className="-main-container__wrapper">
      <Nav />

      {isLoading ? (
        <div className="profile-loading-icon__wrapper">
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <div className="profile-container__wrapper">
          <div>
            <ProfileDetails navigate={navigate} userData={userData} />
            <ProfileBackground />
            <ProfileShowreel />
          </div>
          <div>
            <ProfileCards userData={userData} />
            <ProfileReels />
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
