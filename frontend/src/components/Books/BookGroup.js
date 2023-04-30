import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { useBook } from "../../hooks/useBook";
import { useNote } from "../../hooks/useNote";
import { BookCreator } from "./BookCreator";

export const BookGroup = () => {
  const [showMore, setShowMore] = useState(false);
  const { book, createBook, selectOne } = useBook();
  const { filterByBook } = useNote();

  return (
    <ul>
      <div className="mb-3">
        <BookCreator createBook={createBook} />
      </div>
      <p>Books list</p>
      <hr />
      {book.bookList.map((book, idx) => {
        return (
          <>
            {(idx <= 3 || (idx > 3 && showMore)) && (
              <li key={book.id}>
                <button
                  type="button"
                  onClick={() => {
                    filterByBook(book.id);
                    selectOne(book);
                  }}
                >
                  <p className="underline md-text">{book.title}</p>
                </button>
                <Badge bg="secondary">{book.notes}</Badge>
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