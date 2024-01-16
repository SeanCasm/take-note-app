import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonDownloadBook } from "../Buttons/ButtonDownloadBook";
import { ButtonDelete } from "../Buttons/ButtonDelete";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FailureMessage } from "../Form/AuthMessage";
import { ButtonUpdateBook } from "../Buttons/ButtonUpdateBook";
import { useBook } from "../../hooks/useBook";

const schema = yup
  .object({
    title: yup
      .string()
      .max(20, "Title must not have more than 20 characters")
      .min(2, "Title must have more than 2 characters"),
  })
  .required();
export const BookConfig = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { book, updateBook } = useBook();

  const onSubmit = ({ title }) => {
    updateBook(title);
  };

  const { bookTitle } = useParams();
  return (
    <main className="d-flex flex-column mt-1 m-auto">
      <section className="d-flex mt-5">
        <div className="mb-3">
          <p className="sm-text">Created at:</p>
          <p className="sm-text"> {book.selected?.createdAt}</p>
        </div>
        <div className="justify-self-end ms-5 ">
          <p className="sm-text">Last edition:</p>
          <p className="sm-text"> {book.selected?.lastEdit}</p>
        </div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Change title
          </label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder={bookTitle}
              {...register("title")}
            />
            <ButtonUpdateBook type="submit" />
          </div>
          {errors.title && (
            <label className="alert-text">{errors.title?.message}</label>
          )}
        </div>
        <FailureMessage />
      </form>
      <ButtonDownloadBook bookName={bookTitle} />
      <ButtonDelete onDeleteNote={false} />
      {/* <BooksDropdown /> */}
    </main>
  );
};
