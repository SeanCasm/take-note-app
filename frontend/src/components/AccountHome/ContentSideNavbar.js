import React, { useState } from "react";
import { BookGroup } from "../Books/BookGroup";
import PropTypes from "prop-types";
import { ButtonCreateNote } from "../Buttons/ButtonCreateNote";
import { NoteCreator } from "../Notes/NoteCreator";
import { NoteGroup } from "../Notes/NoteGroup";
import { useWindows } from "../../hooks/useWindows";

export const ContentSideNavbar = ({ largeDisplay = false }) => {
  const [onCreate, setOnCreate] = useState(false);
  const { windowSize } = useWindows();

  const handleNoteCreated = () => {
    setOnCreate(false);
  };
  const handleCancel = () => {
    setOnCreate(false);
  };
  const handleNoteCreator = () => {
    setOnCreate(true);
  };
  const isLargeDisplay = () => largeDisplay && windowSize.width >= 992;
  const isSmallDisplay = () => !largeDisplay && windowSize.width < 992;

  return (
    <>
      {(isLargeDisplay() || isSmallDisplay()) && (
        <div className="mb-2 d-flex flex-md-row flex-column ">
          {onCreate && (
            <NoteCreator
              onCancel={handleCancel}
              onCreated={handleNoteCreated}
            />
          )}
          <section className="sidenav">
            <div className="mb-3">
              <ButtonCreateNote onClick={handleNoteCreator} />
            </div>
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
