import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ButtonSave } from "../Buttons/ButtonSave";
import { ButtonDelete } from "../Buttons/ButtonDelete";
import { BooksDropdown } from "../Books/BooksDropdown";
import { useNote } from "../../hooks/useNote";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Note title is required")
      .max(35, "Note title must have less than 35 characters"),
    content: yup.string().required("Note content is required"),
    book: yup.string().required("Book is required"),
  })
  .required();
export const NoteEditor = ({ note = {} }) => {
  const [edition, setEdition] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { saveNote } = useNote();

  const handleBookSelected = (id) => {
    setValue("book", id);
    setEdition(id !== note.book);
  };

  const handleContentChange = (e) => {
    setValue("content", e.target.value);
    setEdition(e.target.value !== note.content);
  };

  const handleTitleChange = (e) => {
    setValue("title", e.target.value);
    setEdition(e.target.value !== note.title);
  };

  const onSubmit = ({ title, content, book }) => {
    saveNote({
      title,
      content,
      book,
      id: note.id,
    });
    setEdition(false);
  };

  useEffect(() => {
    setValue("book", note.book);
    setValue("content", note.content);
    setValue("title", note.title);
  }, [note]);

  return (
    <div className="note-editor">
      <div className="d-flex mt-5">
        <div className="mb-3">
          <p className="sm-text">Created at:</p>
          <p className="sm-text"> {note?.createdAt}</p>
        </div>
        <div className="justify-self-end mx-auto">
          <p className="sm-text">Last edition:</p>
          <p className="sm-text"> {note?.lastEdit}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex">
          <div className="d-flex flex-column align-items-start">
            <div className="mb-3">
              <input
                className="form-control"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Title"
              />
              {errors.title && (
                <label className="alert-text">{errors.title?.message}</label>
              )}
            </div>
            <div className="mb-3">
              <BooksDropdown setValue={handleBookSelected} />
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
            onChange={handleContentChange}
            placeholder="Content"
          />
          {errors.content && (
            <label className="alert-text">{errors.content?.message}</label>
          )}
        </div>
        <div className="d-flex">
          <div className="me-3">
            <ButtonSave disabled={!edition} />
          </div>
          <ButtonDelete />
        </div>
      </form>
    </div>
  );
};

NoteEditor.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};
