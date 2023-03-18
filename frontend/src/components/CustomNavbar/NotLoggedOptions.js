import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NotLoggedOptions = ({ setFeaturesEnter, setFeaturesLeave }) => {
  return (
    <>
      <Nav.Link
        as={Link}
        to="/about"
        className="animation-u-blind button-underline"
      >
        <p>About</p>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/features"
        className="animation-u-blind button-underline"
        onMouseEnter={setFeaturesEnter}
        onMouseLeave={setFeaturesLeave}
      >
        <p>Features</p>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/updates"
        className="animation-u-blind button-underline"
      >
        <p>Updates</p>
      </Nav.Link>
      <Nav className="justify-content-end flex-grow-1 pe-3">
        <Nav.Link
          as={Link}
          to="/login"
          className="animation-u-blind button-underline"
        >
          <p>Log in</p>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/signup"
          className="animation-u-blind button-underline"
        >
          <p>Sign in</p>
        </Nav.Link>
      </Nav>
    </>
  );
};
