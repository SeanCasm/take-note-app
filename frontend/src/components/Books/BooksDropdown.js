import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { AiOutlineBook } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";
import { UpDownArrowIcon } from "../UpDownArrowIcon";
import { useNote } from "../../hooks/useNote";

export const BooksDropdown = ({ setValue }) => {
  const [toggle, setToggle] = useState(false);
  const { book, selectOne } = useBook();
  const { note } = useNote();
  const handleSelected = ({id, title}) => {
    setValue(id);
    selectOne({ id, title });
  };

  useEffect(() => {
    const bId = note.selected.book ?? book.bookList[0].id;
    setValue(bId);
  }, [note.selected]);

  useEffect(() => {
    if (book.bookList.length > 0 && note.selected.book === "") {
      setValue(book.bookList[0]);
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
        <p>{book.selected.title}</p>
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
};
