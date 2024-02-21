import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // The async function first attempts to refresh the authentication token by making a POST request to /dj-rest-auth/token/refresh using axios. This is likely a step to verify if the current user's session or token is still valid.
        // If the token refresh is successful (i.e., the user is considered logged in), and the userAuthStatus is "loggedIn", the user is redirected to the homepage ("/"). This is done by using the history.push("/") method.
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user below is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        // If an error occurs (e.g., token is invalid or expired), it proceeds to check the userAuthStatus. If the status is "loggedOut", it redirects to the homepage.
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
