import axios from "axios";
import { useEffect } from "react";

export default function useUserActivityNotification() {
  let tabSwitchCount = 0; // Local variable to track tab switches

  const handleUserActivity = async () => {
    const auth = JSON.parse(localStorage.getItem("auth")); // Parse the stored object
    const token = auth?.access_token;

    if (!token) {
      console.error("Access token not found. User might not be authenticated.");
      return;
    }

    try {
      // Send the user activity notification with the access token
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user-activity/",
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "User activity notification sent successfully:",
        response.data
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized. Attempting to refresh token...");

        // Refresh the token logic
        try {
          const refreshToken = auth?.refresh_token;
          if (!refreshToken) {
            console.error(
              "Refresh token not found. User needs to log in again."
            );
            return;
          }

          const refreshResponse = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );

          // Update the tokens in localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              access_token: refreshResponse.data.access,
              refresh_token,
            })
          );

          // Retry the original request with the new token
          return handleUserActivity();
        } catch (refreshError) {
          console.error("Token refresh failed. User needs to log in again.");
        }
      } else {
        console.error("Error sending user activity notification:", error);
      }
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        tabSwitchCount += 1; // Increment the local tab switch count
        handleUserActivity();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return handleUserActivity;
}
