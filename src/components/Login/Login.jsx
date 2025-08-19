import React, { useState } from "react";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import "../../styles/loginstyles.css";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const navigate = useNavigate();
  const [isJoinNowClicked, setIsJoinNowClicked] = useState(false);

  const handleJoinNowClicked = (e) => {
    e.preventDefault();
    setIsJoinNowClicked(true);
    setTimeout(() => {
      setIsJoinNowClicked(false);
      navigate("/signup");
    }, 2000);
  };

  return (
    <div>
      <div className="login-container__wrapper">
        <div className="login-leftSide__wrapper">
          <h1>
            Your Story, Your Stage <br /> Enter your world of opportunities and
            creativity
          </h1>

          <p>
            Talent brought you here, passion keeps you going. Sign in to
            continue your journey, share your artistry, and unlock opportunities
            that are waiting for you
          </p>

          <div className="login-subContainer-leftSide__wrapper">
            <p>
              Don’t have an account? Join our community of storytellers and make
              your mark.
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
          <p>Welcome back! Please enter your details below to login</p>
          <form className="form__wrapper">
            <div className="-form-input__wrapper">
              <p>Email</p>
              <input type="text" />
            </div>
            <div className="-form-input__wrapper">
              <p>Password</p>
              <input type="password" />
            </div>

            <button className="form-submit__btn -btn-dark-">Submit</button>

            <br />
            <br />
            <p>Or</p>

            <div className="signin-google__wrapper">
              <GoogleLogin
                onSuccess={() => console.log()}
                onError={(err) => console.log(err)}
                text="signin_with"
                width="330px"
                shape="pill"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
