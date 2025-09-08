import React, { useEffect, useState } from "react";
import { EthnicityOptions } from "../../../assets/js/ethnicity";
import { AccentOptions } from "../../../assets/js/accents";
import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { UpdateData } from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";

const PersonalBackground = ({ userData, handleGetUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [newUserData, setNewUserData] = useState({
    ethnicity: "",
    otherEthnicity: null,
    naturalAccent: "",
    otherNaturalAccent: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (newUserData.ethnicity !== "" || newUserData.naturalAccent !== "") {
      setShowUpdateBtn(true);
    } else {
      setShowUpdateBtn(false);
    }
  }, [newUserData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateData = async (retry = true) => {
    try {
      const response = await fetch(UpdateData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: sessionStorage.getItem("id"),
          ProfilePictureUrl: "",
          Appearance: null,
          PersonalBackground: {
            //if the user chose "others", then use that but if they chose something else (not others), then use that.
            Ethnicity:
              newUserData.otherEthnicity === null
                ? newUserData.ethnicity
                : newUserData.otherEthnicity,
            NaturalAccent:
              newUserData.otherNaturalAccent === null
                ? newUserData.naturalAccent
                : newUserData.otherNaturalAccent,
          },
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
        return handleUpdateData(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      handleGetUserData();
      setNewUserData({
        ethnicity: "",
        otherEthnicity: null,
        naturalAccent: "",
        otherNaturalAccent: null,
      });

      setTimeout(() => {
        setIsUpdated(true);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleBtnClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleUpdateData();
  };

  console.log(newUserData);
  return (
    <div>
      <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
        In this page gives you the opportunity to share details that highlight
        your unique identity as a performer. By adding information such as your
        ethnicity and natural accent, you can present a more complete profile to
        casting directors, agents, and collaborators. These details help ensure
        you’re matched with the right opportunities and roles while celebrating
        the diversity and authenticity you bring to your craft. All information
        is optional and can be updated at any time to reflect your journey as an
        actor.
      </p>

      {isLoading === true ? (
        <div className="settings-loading-icon__wrapper">
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <form
          className="personal-background-form__wrapper"
          onSubmit={handleBtnClicked}
        >
          <div className="-display-flex-aligned-center">
            <h5>Personal Background</h5>
            {isUpdated === true && (
              <>
                <CheckCircleIcon size={16} weight="fill" color={"limegreen"} />
                <label className="update__text">updated</label>
              </>
            )}
          </div>
          <div className="-form-input__wrapper">
            <p>Ethnicity</p>
            <select name="ethnicity" onChange={(e) => handleOnChange(e)}>
              <option style={{ fontWeight: "bold" }} value="">
                Current: {userData.personalBackground?.ethnicity}
              </option>
              <option value=""></option>
              {EthnicityOptions.map((items, index) => (
                <option value={items.label} key={index}>
                  {items.label}
                </option>
              ))}
            </select>
          </div>
          {newUserData.ethnicity === "Other" && (
            <div className="-form-input__wrapper">
              <p>Other Ethnicity</p>
              <input
                type="text"
                name="otherEthnicity"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          )}

          <br />
          <div className="-form-input__wrapper">
            <p>Natural Accent</p>
            <select name="naturalAccent" onChange={(e) => handleOnChange(e)}>
              <option value="" style={{ fontWeight: "bold" }}>
                Current: {userData.personalBackground?.naturalAccent}
              </option>
              <option value=""></option>
              {AccentOptions.map((items, index) => (
                <option value={items.label} key={index}>
                  {items.label}
                </option>
              ))}
            </select>
          </div>

          {newUserData.naturalAccent === "Other" && (
            <div className="-form-input__wrapper">
              <p>Other Natural Accent</p>
              <input
                type="text"
                name="otherNaturalAccent"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          )}

          {showUpdateBtn && (
            <button className="personal-background-form__btn">Update</button>
          )}
        </form>
      )}
    </div>
  );
};

export default PersonalBackground;
