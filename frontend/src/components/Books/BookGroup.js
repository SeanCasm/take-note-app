import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useBook } from "../../hooks/useBook";
import { useNote } from "../../hooks/useNote";
import { BookCreator } from "./BookCreator";
import { ButtonDownloadBook } from "../Buttons/ButtonDownloadBook";
import { useDispatch } from "react-redux";
import { onUpdateCreationStatus } from "../../store/createNoteSlice";
import { ButtonDelete } from "../Buttons/ButtonDelete";

export const BookGroup = () => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const { book, createBook, selectOne, getAllBooks } = useBook();
  const { filterByBook, selectNone, getNotes } = useNote();

  useEffect(() => {
    getAllBooks();
  }, []);
  useEffect(() => {
    if (book.bookList.length === 0 && book.load) {
      getAllBooks();
    }
  }, [book.bookList]);

  useEffect(() => {
    if (book.load) {
      const bookId = book.bookList[0]?.id;
      if (bookId) getNotes(0, 1, { book: bookId });
    }
  }, [book.load]);

  const handleOnClick = (bookSelected = {}) => {
    selectOne(bookSelected);
    filterByBook(bookSelected.id);
    dispatch(onUpdateCreationStatus(true));
    selectNone();
  };
  return (
    <ul>
      <div className="mb-3">
        <BookCreator createBook={createBook} />
      </div>

      <hr />
      <div className="mb-3">
        <p>My books</p>
      </div>
      {book.bookList.map((b, idx) => {
        return (
          <>
            {(idx <= 3 || (idx > 3 && showMore)) && (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => {
                    handleOnClick(b);
                  }}
                >
                  <p className="underline md-text">{b.title}</p>
                </button>
                <Badge bg="secondary">{b.notes}</Badge>
                {b?.id === book?.selected?.id && (
                  <ButtonDownloadBook bookName={b?.title} />
                )}
                {b?.id === book?.selected?.id && (
                  <ButtonDelete onDeleteNote={false} />
                )}
              </li>
            )}
          </>
        );
      })}
      {book.bookList.length > 4 && !showMore && (
        <button className="mt-2" onClick={() => setShowMore(true)}>
          <p className="sm-text underline">
            <strong>Show more</strong>
          </p>
        </button>
      )}
    </ul>
  );
};
