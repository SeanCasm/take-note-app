import React from "react";
import { NoteEditor } from "../Notes/NoteEditor";
import { ContentSideNavbar } from "./ContentSideNavbar";

export const Editor = () => {
  return (
    <>
      <ContentSideNavbar largeDisplay={true} />
      <NoteEditor />
    </>
  );
};
