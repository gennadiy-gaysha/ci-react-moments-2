import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  // Step 5: Consuming Contexts
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  // distructuring assignment for an object:
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  // distructuring assignment for an array:
  const { username, password } = signInData;
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // This line suggests that the response (data) from the server includes a user object, which contains information about the currently logged-in user. You then set this user object as the value of currentUser by calling setCurrentUser(data.user).
      // You can use setCurrentUser(data.user); because you've "consumed" the SetCurrentUserContext higher up in the component using the useContext hook. By doing this, you gain access to the setCurrentUser function, which was provided via the SetCurrentUserContext.Provider in your App.js component.
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      // history.push("/");
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                value={username}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, i) => {
              return (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              );
            })}

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={password}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, i) => {
              return (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              );
            })}

            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, i) => {
              return (
                <Alert variant="warning" key={i} className="mt-3">
                  {message}
                </Alert>
              );
            })}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
