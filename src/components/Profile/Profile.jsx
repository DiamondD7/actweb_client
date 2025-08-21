import React, { useEffect } from "react";
import { GetTestData } from "../../assets/js/serverapi";

const Profile = () => {
  useEffect(() => {
    fetchTestData();
  }, []);

  const fetchTestData = async () => {
    try {
      const response = await fetch(GetTestData, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Include credentials for CORS requests
      });

      const data = await response.json();
      console.log("Profile data:", data);
    } catch (e) {
      console.error("Error in Profile component:", e);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};
export default Profile;
