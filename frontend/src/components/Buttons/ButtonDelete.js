import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { useNote } from "../../hooks/useNote";

export const ButtonDelete = () => {
  const [toggle, setToggle] = useState(false);
  const { deleteSelectedNote } = useNote();
  const handleModal = () => {
    setToggle(true);
  };
  const handleDelete = () => {
    deleteSelectedNote();
    setToggle(false);
  };
  return (
    <>
      <Modal show={toggle} onHide={() => setToggle(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note?. Changes cannot be
          reverted.
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
        className="button-cancel bg-main animation-u-blind"
      >
        <BsTrash className="icon-md" />
      </button>
    </>
  );
};
