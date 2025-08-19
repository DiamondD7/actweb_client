import React, { useEffect, useState } from "react";
import { UserCreation } from "../../assets/js/serverapi";
import {
  CircleNotchIcon,
  CheckCircleIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "../../styles/signupstyles.css";
const SignUpSuccess = () => {
  const navigate = useNavigate();
  const [loginBtnLoad, setLoginBtnLoad] = useState(false);

  const handleLoginBtnClicked = (e) => {
    e.preventDefault();
    setLoginBtnLoad(true);

    setTimeout(() => {
      setLoginBtnLoad(false);
      navigate("/");
    }, 2000);
  };
  return (
    <div className="signup-success__wrapper">
      <CheckCircleIcon size={60} color={"#4495c7"} weight="fill" />
      <h1>Your account has been created</h1>
      <p>Click below to go back to the login page</p>

      <button
        className="signup-success__btn"
        onClick={(e) => handleLoginBtnClicked(e)}
      >
        {loginBtnLoad === false ? (
          "Login Page"
        ) : (
          <CircleNotchIcon
            size={13}
            color={"#eaf2ff"}
            className={"-btn-loading__icon"}
          />
        )}
      </button>
    </div>
  );
};

const Signup = () => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [validPW, setValidPW] = useState(null);
  const [matchedPW, setMatchedPW] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    providerId: "", //googleId if sign up from google
    authProvider: "local",
  });

  //CHECK IF PW IS VALID OR IT MATCH
  useEffect(() => {
    const match = PWD_REGEX.test(userData.password);
    if (userData.password !== confirmPassword) {
      setMatchedPW(false);
    } else {
      setMatchedPW(true);
    }

    if (match === false) {
      setValidPW(false);
    } else if (match === true) {
      setValidPW(true);
    }
  }, [userData.password, confirmPassword]);

  const handleOnChangeInputs = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(UserCreation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 409) {
        setResponseError(true);
        return;
      }

      if (!response.ok) {
        //maybe i need a return here? or no.
        console.warn(response.status);
      }

      const data = await response.json();
      handleSignupClicked();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignup = async (google) => {
    const { given_name, family_name, email, sub } = jwtDecode(
      google.credential
    );

    try {
      const response = await fetch(UserCreation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          FirstName: given_name,
          LastName: family_name,
          Email: email,
          Password: "",
          ProviderId: sub,
          AuthProvider: "google",
        }),
      });

      if (response.status === 409) {
        setResponseError(true);
        return;
      }

      if (!response.ok) {
        //maybe i need a return here? or no.
        console.warn(response.status);
      }

      const data = await response.json();
      handleSignupClicked();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignupClicked = () => {
    setIsSignupClicked(true);
    setTimeout(() => {
      setIsSignupClicked(false);
      setSuccessfulSignup(true);

      //refresh values back to default (empty string)
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        providerId: "",
        accountLocality: "local",
      });

      setConfirmPassword("");
    }, 2000);
  };

  return (
    <div>
      <div className="signup-statements__wrapper">
        <h1>Step Into the Spotlight</h1>
        <p>
          Sign up today and become part of a platform built for you. Showcase
          your talent, connect with industry professionals, and discover
          exciting opportunities that could be your next big break. Your journey
          starts here.
        </p>
      </div>

      <form className="signup-form__wrapper" onSubmit={handleCreateUser}>
        {successfulSignup === true ? (
          <SignUpSuccess />
        ) : (
          <>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              Create Your Free Account
            </h1>
            {responseError === true ? (
              <p>
                <strong className="-error-form-p">
                  Error: Email is already registered
                </strong>
              </p>
            ) : (
              ""
            )}
            <div className="signup-form-userDetails__wrapper">
              <div className="-form-half-input__wrapper">
                <p>First name</p>
                <input
                  required
                  type="text"
                  name="firstName"
                  onChange={(e) => handleOnChangeInputs(e)}
                />
              </div>
              <div className="-form-half-input__wrapper">
                <p>Last name</p>
                <input
                  required
                  type="text"
                  name="lastName"
                  onChange={(e) => handleOnChangeInputs(e)}
                />
              </div>
            </div>
            <div className="-form-input__wrapper">
              <p>Email</p>
              <input
                required
                type="text"
                name="email"
                onChange={(e) => handleOnChangeInputs(e)}
              />
            </div>

            {matchedPW === false ? (
              <p className="-error-form-p">Password do not match</p>
            ) : (
              ""
            )}

            {validPW === false ? (
              <p className="-error-form-p">
                {" "}
                8 to 24 characters. Must include uppercase and lowercase
                letters, a number and a special character. <br />
                Allowed special characters: ! @ # $ %
              </p>
            ) : (
              ""
            )}

            <div
              className={
                matchedPW === false || validPW === false
                  ? "-form-password-input__wrapper -input-border-error"
                  : "-form-password-input__wrapper"
              }
            >
              <div style={{ width: "100%" }}>
                <p>Password</p>

                <input
                  required
                  type={showPassword === true ? "text" : "password"}
                  name="password"
                  onChange={(e) => handleOnChangeInputs(e)}
                />
              </div>

              <div>
                <button
                  className="-password-seeIcon-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword === false ? (
                    <EyeSlashIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
            </div>
            <div
              className={
                matchedPW === false
                  ? "-form-input__wrapper -input-border-error"
                  : "-form-input__wrapper"
              }
            >
              <p>Confirm password</p>
              <input
                required
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-checkbox-terms__wrapper">
              <input
                type="checkbox"
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />{" "}
              <label style={{ fontSize: "12px" }}>
                * I accept the Terms & Conditions
              </label>
            </div>
            <button
              type="submit"
              className="form-signup__btn"
              disabled={
                isTermsChecked === false ||
                matchedPW === false ||
                validPW === false
                  ? true
                  : false
              }
            >
              {isSignupClicked === false ? (
                "Sign up"
              ) : (
                <CircleNotchIcon
                  size={13}
                  color={"#eaf2ff"}
                  className={"-btn-loading__icon"}
                />
              )}
            </button>
            <div className="signup-google__wrapper">
              <div>
                <p style={{ textAlign: "center" }}>or</p>
                <GoogleLogin
                  onSuccess={(e, google) => handleGoogleSignup(e, google)}
                  onError={(err) => console.log(err)}
                  text="signup_with"
                  width="330px"
                  shape="pill"
                />
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
export default Signup;
