import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

// The `NavLink` component is a special version of the `Link` component from React Router that adds styling attributes to a rendered element when it matches the current URL. You're using `NavLink` in your `NavBar` component instead of `Link` for a key reason: to provide visual feedback to the user indicating which route is currently active.

// Here's how `NavLink` enhances your navigation bar:

// ### activeClassName
// The `activeClassName` prop is used to specify a class that will be added to the element when the route it links to is active. This is useful for highlighting the current page in your navigation bar. In your code, you're using `activeClassName={styles.Active}` to apply specific styles to the active link, making it visually distinct from other links. This helps users understand which page they're viewing.

// ### exact
// The `exact` prop is used to make the matching for the route more specific. When `exact` is used, the `activeClassName` is only applied if the location is matched exactly. This is particularly important for the root path (`to="/"`) to prevent the "Home" link from being highlighted as active when the user navigates to other routes like `/signin` or `/signup`. In your NavBar component, you've applied `exact` to the "Home" link to ensure it behaves correctly.

// ### Styling and Icons
// You're also taking advantage of `NavLink` to include icons and additional styling with your links, using classes like `styles.NavLink` and incorporating FontAwesome icons. This approach allows you to create a more engaging and visually appealing navigation bar.

// ### Why `NavLink` Over `Link`
// While both `Link` and `NavLink` change the URL without reloading the page, `NavLink` is specifically designed for navigation menus. The ability to automatically determine "activeness" and apply styles accordingly makes `NavLink` particularly suited for your use case in the navigation bar. It simplifies the process of highlighting the current page, improving the user experience by providing visual cues about the active route.

// In summary, using `NavLink` in your `NavBar` component allows you to build a more user-friendly and responsive navigation bar that provides immediate feedback on the active route, enhancing the overall navigation experience in your React application.
