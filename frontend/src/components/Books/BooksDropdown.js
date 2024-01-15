import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { AiOutlineBook } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";
import { UpDownArrowIcon } from "../UpDownArrowIcon";

export const BooksDropdown = ({ handleSelected }) => {
  const [toggle, setToggle] = useState(false);
  const { book } = useBook();
  useEffect(() => {
    if (book.load) {
      handleSelected(book.bookList[0]);
    }
  }, [book.load]);
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
        <p>{book.selected.title}</p>
        <UpDownArrowIcon clicked={toggle} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {book.bookList.length > 0 && (
          <>
            {book.bookList.map((book) => {
              return (
                <Dropdown.Item
                  as={Link}
                  key={book.title}
                  onClick={() => {
                    handleSelected(book);
                  }}
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
};
