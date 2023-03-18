import React, { useState } from "react";
import { BookGroup } from "../Books/BookGroup";
import { ButtonCreateNote } from "../Buttons/ButtonCreateNote";
import { NoteCreator } from "../Notes/NoteCreator";
import { NoteGroup } from "../Notes/NoteGroup";

export const ContentSideNavbar = () => {
  const [onCreate, setOnCreate] = useState(false);

  const handleNoteCreated = () => {
    setOnCreate(false);
  };
  const handleCancel = () => {
    setOnCreate(false);
  };
  const handleNoteCreator = () => {
    setOnCreate(true);
  };
  return (
    <div className="mb-2 d-flex flex-md-row flex-column ">
      {onCreate && (
        <NoteCreator onCancel={handleCancel} onCreated={handleNoteCreated} />
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
  );
};
