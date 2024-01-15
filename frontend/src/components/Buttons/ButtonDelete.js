import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { useNote } from "../../hooks/useNote";
import { useBook } from "../../hooks/useBook";

export const ButtonDelete = ({ onDeleteNote = true }) => {
  const [toggle, setToggle] = useState(false);
  const { deleteSelectedNote } = useNote();
  const { deleteSelectedBook } = useBook();
  const handleModal = () => {
    setToggle(true);
  };
  const handleDelete = () => {
    if (onDeleteNote) {
      deleteSelectedNote();
    } else {
      deleteSelectedBook();
    }
    setToggle(false);
  };
  return (
    <>
      <Modal show={toggle} onHide={() => setToggle(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {onDeleteNote ? "Note" : "Book"}
          ?. Changes cannot be reverted.
          <br />
          {!onDeleteNote &&
            "Deleting this book will also delete related notes."}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-submit bg-main animation-u-blind"
            onClick={() => setToggle(false)}
          >
            Close
          </button>
          <button
            className="button-cancel bg-main animation-u-blind"
            onClick={handleDelete}
          >
            Accept
          </button>
        </Modal.Footer>
      </Modal>
      <button
        type="button"
        onClick={handleModal}
        className="button-cancel bg-main animation-u-blind m-2"
      >
        <BsTrash className="icon-md" />
      </button>
    </>
  );
};
