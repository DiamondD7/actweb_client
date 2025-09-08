import React, { useEffect, useState } from "react";
import { UpdateData } from "../../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import PersonalBackground from "./PersonalBackground";

const Appearance = ({ userData, handleGetUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const HEIGHT_REGEX = /^(?:[5-9]\d|1\d{2}|2\d{2}|300)$/;
  const WEIGHT_REGEX = /^(?:[2-9]|[1-9]\d|[1-4]\d{2}|500)$/;
  const [error, setError] = useState(false);
  const [showErrorHeightMsg, setShowErrorHeightMsg] = useState(null);
  const [showErrorWeightMsg, setShowErrorWeightMsg] = useState(null);
  const [showBtnUpdate, setShowBtnUpdate] = useState(false);
  const [newUserData, setNewUserData] = useState({
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
  });
  const navigate = useNavigate();

  //this useEffect is helping with REGEX validations
  useEffect(() => {
    if (newUserData.height !== "") {
      const heightValidate = HEIGHT_REGEX.test(newUserData.height);

      if (!heightValidate) {
        setShowErrorHeightMsg(true);
        setError(true);
      } else if (heightValidate) {
        setShowErrorHeightMsg(false);
        setError(false);
      }
    }

    if (newUserData.weight !== "") {
      const weightValidate = WEIGHT_REGEX.test(newUserData.weight);

      if (!weightValidate) {
        setShowErrorWeightMsg(true);
        setError(true);
      } else if (weightValidate) {
        setShowErrorWeightMsg(false);
        setError(false);
      }
    }
  }, [newUserData.height, newUserData.weight]);

  //this useEffect is for showing the update button
  useEffect(() => {
    const { height, weight, hairColor, eyeColor } = newUserData;

    if (height !== "" || weight !== "" || hairColor !== "" || eyeColor !== "") {
      setShowBtnUpdate(true);
    } else {
      setShowBtnUpdate(false);
    }
  }, [newUserData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClicked = async (retry = true) => {
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
          Appearance: {
            Height: newUserData.height,
            Weight: newUserData.weight,
            HairColor: newUserData.hairColor,
            EyeColor: newUserData.eyeColor,
          },
          PersonalBackground: null,
        }),
      });

      if (response.status === 401 && retry === false) {
        console.warn("Unauthorized. Rerouting...");
        navigate("/");
        return;
      }

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. retrying request...");
        return handleUpdateClicked(false);
      }

      if (!response.ok) {
        console.warn(response.status);
        return;
      }

      const data = await response.json();
      console.log(data);

      handleGetUserData();
      setNewUserData({
        height: "",
        weight: "",
        hairColor: "",
        eyeColor: "",
      });

      setTimeout(() => {
        setIsUpdated(true);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleBtnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleUpdateClicked();
  };

  return (
    <div>
      <p style={{ fontSize: "12px", lineHeight: "1.5" }}>
        Your appearance details are an important part of your profile. By
        updating attributes such as hair color, eye color, or other
        distinguishing features, you help casting directors, scouts, and
        industry professionals get an accurate impression of you at first
        glance. Since this platform is designed for actors and actresses to
        showcase their talent and background, having clear and up-to-date
        appearance information increases your chances of being discovered for
        the right opportunities. Think of it as giving your profile a
        professional touch that highlights who you are and helps others see your
        potential.
      </p>

      <br />
      <br />
      <div className="-display-flex-aligned-center">
        <h5>Update your appearance</h5>
        {isUpdated === true && (
          <>
            <CheckCircleIcon size={16} weight="fill" color={"limegreen"} />
            <label className="update__text">updated</label>
          </>
        )}
      </div>
      {isLoading === true ? (
        <div className="settings-loading-icon__wrapper">
          <CircleNotchIcon size={35} className={"-btn-loading__icon"} />
        </div>
      ) : (
        <form className="form-appearance__wrapper" onSubmit={handleBtnSubmit}>
          {showErrorHeightMsg === true ? (
            <p className="-error-form-p">
              Height (must be a number and ranging from 50-300cm)
            </p>
          ) : (
            ""
          )}

          {showErrorWeightMsg === true ? (
            <p className="-error-form-p">
              Weight must be valid (must be a number and ranging from 2 - 500kg)
            </p>
          ) : (
            ""
          )}
          <div className="-display-flex-aligned-center -gap-10">
            <div className="-form-half-input__wrapper">
              <p>Height in cm</p>
              <input
                type="text"
                name="height"
                placeholder={userData.appearance?.height}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="-form-half-input__wrapper">
              <p>Weight in kg</p>
              <input
                type="text"
                name="weight"
                placeholder={userData.appearance?.weight}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
          <div className="-form-input__wrapper">
            <p>Eye color</p>
            <input
              type="text"
              name="hairColor"
              placeholder={userData.appearance.hairColor}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="-form-input__wrapper">
            <p>Hair color</p>
            <input
              type="text"
              name="eyeColor"
              placeholder={userData.appearance.eyeColor}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          {showBtnUpdate === true && (
            <button
              type="submit"
              className={`form-appearance-submit__btn ${
                error ? "btn-disabled" : ""
              }`}
              disabled={error ? true : false}
            >
              Update
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Appearance;
