import React, { useEffect } from "react";
import { GetTestData } from "../../assets/js/serverapi";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchTestData();
  }, []);

  const fetchTestData = async (retry = true) => {
    try {
      const response = await fetch(GetTestData, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Include credentials for CORS requests
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return fetchTestData(false);
      }

      const data = await response.json();
      console.log("Profile data:", data);
    } catch (e) {
      console.error("Error in Profile component:", e);
    }
  };

  return (
    <div className="-main-container__wrapper">
      <Nav />
      <h1>Profile Page</h1>
    </div>
  );
};
export default Profile;
