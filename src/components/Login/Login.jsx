import React, { useState } from "react";
import { CheckLogin, ValidateTokens } from "../../assets/js/serverapi";
import { CircleNotchIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../../styles/loginstyles.css";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isJoinNowClicked, setIsJoinNowClicked] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const handleJoinNowClicked = (e) => {
    e.preventDefault();
    setIsJoinNowClicked(true);
    setTimeout(() => {
      setIsJoinNowClicked(false);
      navigate("/signup");
    }, 2000);
  };

  const handleLogin = async (email) => {
    setIsLoginClicked(true);
    try {
      const response = await fetch(CheckLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          email === undefined || email === "" ? userCred : { email }
        ),
      });

      if (response.status === 401) {
        console.error(response.status);
        setShowError(true);
        setIsLoginClicked(false);
        return;
      }

      if (!response.ok) {
        console.log(response.status);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (response.ok) {
        handleTokenValidation(data.data);
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Handle error appropriately, e.g., show a notification
    }
  };

  const handleTokenValidation = async (userData) => {
    try {
      const response = await fetch(ValidateTokens, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Include credentials for CORS requests
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Token validation data:", data);

      setTimeout(() => {
        setIsLoginClicked(false);
        // Navigate to the dashboard or home page after successful login
        navigate("/profile-page");
      }, 2000);
    } catch (e) {
      console.error("Error validating tokens:", e);
    }
  };

  const handleLoginClicked = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCred((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleLoginSuccess = (google) => {
    const { email } = jwtDecode(google.credential);
    handleLogin(email);
  };

  return (
    <div>
      {isLoginClicked === true ? (
        <CircleNotchIcon
          size={40}
          color={"#202020"}
          className={"login-page-loading -btn-loading__icon"}
        />
      ) : (
        <div className="login-container__wrapper">
          <div className="login-leftSide__wrapper">
            <h1>
              Your Story, Your Stage <br /> Enter your world of opportunities
              and creativity
            </h1>

            <p>
              Talent brought you here, passion keeps you going. Sign in to
              continue your journey, share your artistry, and unlock
              opportunities that are waiting for you
            </p>

            <div className="login-subContainer-leftSide__wrapper">
              <p>
                Don’t have an account? Join our community of storytellers and
                make your mark.
              </p>
              <button onClick={(e) => handleJoinNowClicked(e)}>
                {isJoinNowClicked === false ? (
                  "Join now"
                ) : (
                  <CircleNotchIcon
                    size={13}
                    color={"#eaf2ff"}
                    className={"-btn-loading__icon"}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="login-rightSide__wrapper">
            <h1>Login</h1>
            <p>Welcome! Please enter your details below to login</p>
            {showError && (
              <p>
                <strong className="-error-form-p">
                  Error: Invalid email or password
                </strong>
              </p>
            )}
            <form className="form__wrapper" onSubmit={handleLoginClicked}>
              <div className="-form-input__wrapper">
                <p>Email</p>
                <input
                  required
                  type="text"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="-form-password-input__wrapper">
                <div style={{ width: "100%" }}>
                  <p>Password</p>
                  <input
                    required
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <button
                  className="-password-seeIcon-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword === false ? (
                    <EyeSlashIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>

              <button type="submit" className="form-submit__btn -btn-dark-">
                Submit
              </button>

              <br />
              <br />
              <p>Or</p>

              <div className="signin-google__wrapper">
                <GoogleLogin
                  onSuccess={(google) => handleGoogleLoginSuccess(google)}
                  onError={(err) => console.log(err)}
                  text="signin_with"
                  width="330px"
                  shape="pill"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
