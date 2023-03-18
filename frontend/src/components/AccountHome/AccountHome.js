import React from "react";
import { MessageNotification } from "../MessageNotification";
import { useWindows } from "../../hooks/useWindows";
import { ContentSideNavbar } from "./ContentSideNavbar";
import { NoteEditor } from "../Notes/NoteEditor";
import { useNote } from "../../hooks/useNote";

export const AccountHome = () => {
  const { note } = useNote();
  const { windowSize } = useWindows();
  return (
    <>
      <main className="d-flex">
        <section>{windowSize.width > 992 && <ContentSideNavbar />}</section>
        <section className="flex-fill ms-5 me-5">
          {note.notesList.map((item) => {
            if (note.selected.id === item.id) {
              return (
                <NoteEditor key={item.id} note={item} />
              );
            }
          })}
        </section>
      </main>
      <MessageNotification />
    </>
  );
};
