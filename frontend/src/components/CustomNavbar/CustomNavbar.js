import React, { useState } from "react";
import { Logo } from "../Logo";
import { FeatureQuickPanel } from "../Features/FeatureQuickPanel";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useProfile } from "../../hooks/useProfile";
import { NotLoggedOptions } from "./NotLoggedOptions";
import { Profile } from "./Profile";
import { useWindows } from "../../hooks/useWindows";
import { ContentSideNavbar } from "../AccountHome/ContentSideNavbar";

export const CustomNavbar = () => {
  const { status } = useProfile();
  const [displayFeatures, setDisplayFeatures] = useState(false);

  const { windowSize } = useWindows();
  const handleFeatures = () => {
    setDisplayFeatures(true);
  };
  const handleFeaturesLeave = () => {
    setDisplayFeatures(false);
  };

  return (
    <>
      <Navbar className="navbar-custom px-5" key="lg" expand="lg">
        <Navbar.Brand
          href={status === "not-logged" ? "/home" : "/account-home"}
        >
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
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
              {status === "logged" ? (
                <>
                  <Profile />
                  <section>
                    {windowSize.width <= 992 && <ContentSideNavbar />}
                  </section>
                </>
              ) : (
                <NotLoggedOptions
                  setFeaturesEnter={handleFeatures}
                  setFeaturesLeave={handleFeaturesLeave}
                />
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      {displayFeatures && <FeatureQuickPanel />}
    </>
  );
};
