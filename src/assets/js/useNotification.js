import { useCallback } from "react";
import { SaveNotification } from "./serverapi";

const useNotification = () => {
  const handleFetch = useCallback(async (notification) => {
    try {
      const response = await fetch(SaveNotification, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        console.error("Error: ", response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  }, []);

  return handleFetch;
};
export default useNotification;
