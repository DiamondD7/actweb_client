import { useNavigate } from "react-router-dom";
import { ValidateToken } from "../../assets/js/serverapi";

const useValidateUser = () => {
  const navigate = useNavigate();

  const handleValidateToken = async (retry = true, callFunction) => {
    try {
      const response = await fetch(ValidateToken, {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 301) {
        console.warn("301 detected, redirecting...");
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
        console.warn("401 detected, retrying...");
        return handleValidateToken(false, callFunction);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }

      const data = await response.json();
      console.log("xxx", callFunction);
      await callFunction(false);
    } catch (err) {
      console.error("Error validating token:", err);
      throw err;
    }
  };

  return handleValidateToken;
};

export default useValidateUser;
