import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { AiOutlineBook } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";
import { UpDownArrowIcon } from "../UpDownArrowIcon";

export const BooksDropdown = ({ setValue, bookId = "" }) => {
  const [toggle, setToggle] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const { book } = useBook();
  const handleSelected = ({ title, id }) => {
    setValue(id);
    setBookTitle(title);
  };

  useEffect(() => {
    const bId = bookId || book.bookList[0].id;
    setValue(bId);
  }, [bookId]);

  useEffect(() => {
    if (book.bookList.length > 0 && bookId !== "") {
      const b = book.bookList.find((book) => book.id === bookId);
      setBookTitle(b.title);
    } else if (book.bookList.length > 0 && bookId === "") {
      handleSelected(book.bookList[0]);
    }
  }, [book.bookList]);

  return (
    <Dropdown
      size="sm"
      style={{ backgroundColor: "transparent" }}
      onToggle={() => {
        setToggle(!toggle);
      }}
    >
      <Dropdown.Toggle className="dropdown-create" id="dropdown-basic">
        <AiOutlineBook className="icon-sm" />
        <p>{bookTitle}</p>
        <UpDownArrowIcon clicked={toggle} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {book.bookList?.length > 0 && (
          <>
            {book.bookList.map((book) => {
              return (
                <Dropdown.Item
                  as={Link}
                  key={book.title}
                  onClick={() => handleSelected(book)}
                >
                  {book.title}
                </Dropdown.Item>
              );
            })}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

BooksDropdown.propTypes = {
  setValue: PropTypes.func,
  bookId: PropTypes.string,
};
