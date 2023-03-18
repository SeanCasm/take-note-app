import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useBook } from "../../hooks/useBook";
import { useNote } from "../../hooks/useNote";
import { BookCreator } from "./BookCreator";

export const BookGroup = () => {
  const [showMore, setShowMore] = useState(false);
  const { book, createBook, getAllBooks } = useBook();
  const { filterByBook, getNotes } = useNote();
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
    <ul>
      <div className="mb-3">
        <BookCreator createBook={createBook} />
      </div>
      <p>Books list</p>
      <hr />
      {book.bookList.map((item, idx) => {
        if (idx <= 3 || (idx > 3 && showMore)) {
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  filterByBook(item.id);
                }}
              >
                <p className="underline md-text">{item.title}</p>
              </button>
              <Badge bg="secondary">{item.notes}</Badge>
            </li>
          );
        }
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
