import React, { useEffect, useState } from "react";
import { MessageNotification } from "../MessageNotification";
import { ContentSideNavbar } from "./ContentSideNavbar";
import { NoteEditor } from "../Notes/NoteEditor";
import { useNote } from "../../hooks/useNote";
import { useBook } from "../../hooks/useBook";

export const AccountHome = () => {
  const { note, getNotes } = useNote();
  const { book, getAllBooks } = useBook();
  const [selectedByDefault, setSelectedByDefault] = useState(true);

  useEffect(() => {
    getAllBooks();
  }, []);
  useEffect(() => {
    if (book.bookList.length > 0 && selectedByDefault) {
      const bookId = book.bookList[0].id;
      getNotes(0, 1, { book: bookId });
      setSelectedByDefault(false);
    }
  }, [book.bookList]);
  return (
    <>
      <main className="d-flex">
        <ContentSideNavbar largeDisplay={true} />
        <section className="flex-fill ms-5 me-5">
          {note.selected !== undefined && <NoteEditor note={note.selected} />}
        </section>
      </main>
      <MessageNotification />
    </>
  );
};
