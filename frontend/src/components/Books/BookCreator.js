import React, { useState } from "react";
import { ButtonCreateBook } from "../Buttons/ButtonCreateBook";

export const BookCreator = ({ createBook }) => {
  const [bookTitle, setBookTitle] = useState("");

  const handleCreate = () => {
    if (bookTitle !== "") {
      createBook(bookTitle);
      setBookTitle("");
    }
  };

  const handleBookName = (e) => {
    setBookTitle(e.target.value);
  };

  return (
    <>
      <div className="input-group mt-3">
        <input
          className="form-control"
          placeholder="New book"
          onChange={handleBookName}
        />
        <div className="me-3">
          <ButtonCreateBook onClick={handleCreate} />
        </div>
      </div>
    </>
  );
};
