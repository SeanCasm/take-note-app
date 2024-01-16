import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ButtonSave } from "../Buttons/ButtonSave";
import { ButtonDelete } from "../Buttons/ButtonDelete";
import { BooksDropdown } from "../Books/BooksDropdown";
import { useNote } from "../../hooks/useNote";
import { ButtonDownloadNote } from "../Buttons/ButtonDownloadNote";
import { useSelector } from "react-redux";
import { useBook } from "../../hooks/useBook";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Note must have a title")
      .max(35, "Note title must have less than 35 characters"),
    content: yup.string().required("Note must have content"),
    book: yup.string().required("You have to select one book"),
  })
  .required();
export const NoteEditor = () => {
  const [edition, setEdition] = useState(false);
  const create = useSelector((state) => state.create);
  const { book } = useBook();
  const { note, saveNote, createNote } = useNote();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleBookSelected = ({ id, title }) => {
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
    if (create.isNewNote) {
      createNote({
        title,
        content,
        book,
      });
    } else {
      saveNote({
        title,
        content,
        book,
        id: note.selected.id,
      });
    }
    setEdition(false);
  };

  useEffect(() => {
    if (note.selected) {
      const { content, title } = note.selected;
      setValue("book", book.selected?.id);
      setValue("content", content);
      setValue("title", title);
    }
  }, [note.selected]);

  return (
    <div className="flex-fill ms-5 me-5">
      <section className="note-editor">
        <div className="d-flex mt-5">
          <div className="mb-3">
            <p className="sm-text">Created at:</p>
            <p className="sm-text"> {note.selected?.createdAt}</p>
          </div>
          <div className="justify-self-end mx-auto">
            <p className="sm-text">Last edition:</p>
            <p className="sm-text"> {note.selected?.lastEdit}</p>
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
                <BooksDropdown handleSelected={handleBookSelected} />
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
            <ButtonDownloadNote disabled={note.selected === undefined} />
          </div>
        </form>
      </section>
    </div>
  );
};
