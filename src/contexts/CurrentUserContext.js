import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Step 1: Creating Contexts:
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // We’ll use it to persist the state of the  currently logged in user.

  // Step 2: Initializing State with useState
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      // The response from the Axios request is destructured to extract the data property directly. This is a JavaScript ES6 feature known as object destructuring, which allows you to unpack values from objects into distinct variables. Here, instead of getting the whole response object and accessing the data with response.data, you directly get the data property, making the code cleaner and more direct.
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
      console.log("Current User:", data); // Log the current user data to the console
    } catch (err) {
      console.log(err);
    }
  };

  // Upon mounting the App component, you use the useEffect hook to execute handleMount, which makes an HTTP GET request to "/dj-rest-auth/user/" to fetch the current user data. If successful, it updates the currentUser state.

  // Step 3: Fetching Current User Data
  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
