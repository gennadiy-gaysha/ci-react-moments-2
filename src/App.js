import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
// By importing ./api/axiosDefaults in your App.js file, you are configuring Axios defaults at the top level of your React application. This import statement executes the code in axiosDefaults.js, which sets the global default settings for Axios. These settings include the base URL for requests, default headers for post requests, and whether credentials should be included with requests. Once set, these defaults apply to all Axios requests made anywhere in your application.
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// You first need to create a context using React.createContext(). This returns a context object with two components: a Provider and a Consumer. In most cases with hooks, you will only use the Provider and the useContext hook itself.

//When you define a context with createContext(), you're setting up the infrastructure to share values across components, but initially, the Provider component doesn't have a value to provide until you explicitly define it.

// Step 1: Creating Contexts:
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  // We’ll use it to persist the state of the  currently logged in user.

  // Step 2: Initializing State with useState
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]); // This useEffect will run every time currentUser changes

  return (
    // Step 4: Providing Contexts:
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
