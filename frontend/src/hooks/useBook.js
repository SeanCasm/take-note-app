import { useSelector, useDispatch } from "react-redux";
import { bookApi } from "../api";
import { onUpdateList, onUpdateItem, onAddItem } from "../store/bookSlice";
import { onSuccessUpdate, onFailureUpdate } from "../store/messageSlice";
import { useNote } from "./useNote";
export const useBook = () => {
  const dispatch = useDispatch();
  const { note } = useNote();
  const book = useSelector((state) => state.book);
  const getSelectedBook = () => {
    return note.book;
  };

  const getBook = async (id = "") => {
    await bookApi
      .get("/list", { params: { id } })
      .then(({ data }) => {
        dispatch(onUpdateItem(data));
      })
      .catch(({ response }) => {
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };
  const createBook = async (title = "") => {
    await bookApi
      .post("", { title })
      .then(({ data }) => {
        dispatch(onAddItem(data));
        dispatch(onSuccessUpdate(`New book has been created: ${data.title}`));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };
  const getAllBooks = async () => {
    await bookApi
      .get(`/all`)
      .then(({ data }) => {
        dispatch(onUpdateList(data));
      })
      .catch(({ response }) => {
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };

  return {
    book,
    getBook,
    getAllBooks,
    createBook,
    getSelectedBook,
  };
};
