import React from "react";
import { BookGroup } from "../Books/BookGroup";
import PropTypes from "prop-types";
import { NoteGroup } from "../Notes/NoteGroup";
import { useWindows } from "../../hooks/useWindows";

export const ContentSideNavbar = ({ largeDisplay = false }) => {
  const { windowSize } = useWindows();

  const isLargeDisplay = () => largeDisplay && windowSize.width >= 992;
  const isSmallDisplay = () => !largeDisplay && windowSize.width < 992;

  return (
    <>
      {(isLargeDisplay() || isSmallDisplay()) && (
        <div className="mb-2 d-flex flex-md-row flex-column ">
          <section className="sidenav">
            <BookGroup />
            <hr />
            <NoteGroup />
          </section>
        </div>
      )}
    </>
  );
};
ContentSideNavbar.propTypes = {
  largeDisplay: PropTypes.bool,
};
