import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateUserTwoFactorAuth } from "../../../assets/js/serverapi.js";
import { LockSimpleIcon, LockSimpleOpenIcon } from "@phosphor-icons/react";

const AdvanceSecurity = ({ userData, handleGetUserData }) => {
  const navigate = useNavigate();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    userData.isTwoFactorAuthenticationOn
  );

  const handleTwoFactorAuthClicked = async (e) => {
    e.preventDefault();
    await handleTwoFactorToggle();
  };

  const handleTwoFactorToggle = async (retry = true) => {
    try {
      const response = await fetch(UpdateUserTwoFactorAuth, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: sessionStorage.getItem("id"),
          IsTwoFactorAuthenticationOn: !isTwoFactorEnabled,
        }),
      });

      if (response.status === 302) {
        console.error("Redirecting request...");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && !retry) {
        console.error("Unauthorized. Please log in again.");
        sessionStorage.clear();
        navigate("/", { replace: true });
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("Unauthorized. Retrying once...");
        return handleTwoFactorToggle(false);
      }

      if (!response.ok) {
        throw new Error("Failed to update two factor authentication setting");
      }

      const data = await response.json();
      console.log("Successful updating two factor authentication:");
      setIsTwoFactorEnabled(!isTwoFactorEnabled);
      await handleGetUserData(true);
    } catch (err) {
      console.error("Error updating two factor authentication:", err);
      throw err;
    }
  };

  return (
    <div>
      <div className="-display-flex-aligned-center -gap-20">
        <h5>Two Factor Authentication</h5>
        <button
          onClick={(e) => handleTwoFactorAuthClicked(e)}
          className={`${
            isTwoFactorEnabled
              ? "advance-security-radio-enabled__btn"
              : "advance-security-radio-disabled__btn"
          }`}
        >
          {isTwoFactorEnabled ? (
            <>
              Enabled
              <LockSimpleIcon size={18} color="#f3f3f3" weight="fill" />
            </>
          ) : (
            <>
              Disabled <LockSimpleOpenIcon size={18} color="gray" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdvanceSecurity;
