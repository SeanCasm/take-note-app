import React, { useState } from "react";
import { Logo } from "../Logo";
import { FeatureQuickPanel } from "../Features/FeatureQuickPanel";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useProfile } from "../../hooks/useProfile";
import { Profile } from "./Profile";
import { ContentSideNavbar } from "../AccountHome/ContentSideNavbar";
import { Link } from "react-router-dom";

export const CustomNavbar = () => {
  const { status } = useProfile();
  const [show, setShow] = useState(false);
  const [displayFeatures, setDisplayFeatures] = useState(false);
  const handleToggleOffcanvas = () => {
    setShow(!show);
  };
  const handleOffcanvas = () => {
    setShow(false);
    handleFeaturesLeave();
  };

  const handleFeatures = () => {
    setDisplayFeatures(true);
    setShow(false);
  };
  const handleFeaturesLeave = () => {
    setDisplayFeatures(false);
  };
  return (
    <>
      <Navbar className="navbar-custom px-5" key="lg" expand="lg">
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={handleToggleOffcanvas}
          aria-controls="offcanvasNavbar-expand-lg"
        />
        <Navbar.Offcanvas
          show={show}
          onHide={handleOffcanvas}
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              TakeNote
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link
                onClick={handleOffcanvas}
                as={Link}
                to="/about"
                className="animation-u-blind button-underline"
              >
                <p>About</p>
              </Nav.Link>
              <Nav.Link
                onClick={handleOffcanvas}
                onMouseOver={handleFeatures}
                onMouseLeave={handleFeaturesLeave}
                as={Link}
                to="/features"
                className="animation-u-blind button-underline"
              >
                <p>Features</p>
              </Nav.Link>
              {status === "logged" ? (
                <>
                  <Profile />
                  <ContentSideNavbar largeDisplay={false} />
                </>
              ) : (
                <>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link
                      onClick={handleOffcanvas}
                      as={Link}
                      to="/login"
                      className="animation-u-blind button-underline"
                    >
                      <p>Log in</p>
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleOffcanvas}
                      as={Link}
                      to="/signup"
                      className="animation-u-blind button-underline"
                    >
                      <p>Sign in</p>
                    </Nav.Link>
                  </Nav>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      {displayFeatures && <FeatureQuickPanel />}
    </>
  );
};
