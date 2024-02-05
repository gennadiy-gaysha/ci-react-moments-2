import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
// By importing ./api/axiosDefaults in your App.js file, you are configuring Axios defaults at the top level of your React application. This import statement executes the code in axiosDefaults.js, which sets the global default settings for Axios. These settings include the base URL for requests, default headers for post requests, and whether credentials should be included with requests. Once set, these defaults apply to all Axios requests made anywhere in your application.
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  return (
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
  );
}

export default App;
