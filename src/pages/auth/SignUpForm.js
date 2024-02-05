import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
// When your SignUpForm component makes an Axios request, it doesn't need to "know" about the Axios default settings explicitly. If the SignUpForm uses Axios to send an HTTP request, Axios automatically uses the global defaults you've configured. This means:
// The base URL will be prepended to any request URL specified in SignUpForm, so you only need to provide the endpoint path.
// If SignUpForm makes a POST request, Axios will use Content-Type: multipart/form-data unless specified otherwise in the request.
// Credentials will be included with requests, which is important for APIs that require cookies or auth headers for session management.
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  // useHistory hook from react-router-dom programmatically navigates users around the application. The history object provides methods to manipulate the browser history, such as navigating to a new page.
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      // Computed property name JavaScript feature:
      // This line creates a key value  pair, with the key being the input fieldname,
      // and the value being the value entered by the user.
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // prevents the default form submission behavior, which typically causes a page reload
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      // In case of an error (e.g., the username is already taken, or the password doesn't meet the requirements), it catches the exception and uses setErrors to update the errors state with the error messages returned from the API. The err.response?.data is a safe way to access the data property of the error response object, accounting for the possibility that err.response might be undefined.
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="username"
                name="username"
                value={username}
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

            <Form.Group controlId="password1">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, i) => {
              return (
                <Alert variant="warning" key={i}>
                  {message}
                </Alert>
              );
            })}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, i) => {
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
              Sign up
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
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
