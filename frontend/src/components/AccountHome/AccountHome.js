import React from "react";
import { MessageNotification } from "../MessageNotification";
import { ContentSideNavbar } from "./ContentSideNavbar";
import { NoteEditor } from "../Notes/NoteEditor";

export const AccountHome = () => {
  return (
    <>
      <main className="d-flex">
        <ContentSideNavbar largeDisplay={true} />
        <NoteEditor />
      </main>
      <MessageNotification />
    </>
  );
};
