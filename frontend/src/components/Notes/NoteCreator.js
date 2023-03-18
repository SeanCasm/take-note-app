import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import * as yup from "yup";
import { ButtonSave } from "../Buttons/ButtonSave";
import { useForm } from "react-hook-form";
import { BooksDropdown } from "../Books/BooksDropdown";
import { BookCreator } from "../Books/BookCreator";
import { useBook } from "../../hooks/useBook";
import { useNote } from "../../hooks/useNote";
const schema = yup
  .object({
    title: yup
      .string()
      .required("Note title is required")
      .max(35, "Note title must have equal or less than 35 characters"),
    content: yup.string().required("Note content is required"),
    book: yup.string().required("Book is required"),
  })
  .required();

export const NoteCreator = ({ onCancel, onCreated }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { createBook } = useBook();
  const { createNote } = useNote();
  const handleBookSelected = (id) => {
    setValue("book", id);
  };

  const onSubmit = ({ title, content, book }) => {
    onCreated();
    createNote({
      title,
      content,
      book,
    });
  };

  return (
    <Modal
      show={true}
      onHide={onCancel}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <div className="d-flex flex-column align-items-start">
              <div className="mb-3">
                <input
                  className="form-control"
                  {...register("title")}
                  placeholder="Title"
                />
                {errors.title && (
                  <label className="alert-text">{errors.title?.message}</label>
                )}
              </div>
              <div className="mb-3">
                <BooksDropdown setValue={handleBookSelected} bookId={""} />
                <BookCreator setValue={setValue} createBook={createBook} />
              </div>
              {errors.book && (
                <label className="alert-text">{errors.book?.message}</label>
              )}
            </div>
          </div>
          <hr />
          <div className="mb-3">
            <textarea
              rows={12}
              className="form-control"
              {...register("content")}
              placeholder="Content"
            />
            {errors.content && (
              <label className="alert-text">{errors.content?.message}</label>
            )}
          </div>
          <div className="d-flex">
            <div className="me-3">
              <ButtonSave disabled={false} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
NoteCreator.propTypes = {
  onCreated: PropTypes.func,
  onCancel: PropTypes.func,
};
