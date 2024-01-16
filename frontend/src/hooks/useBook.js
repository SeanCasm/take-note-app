import { useSelector, useDispatch } from "react-redux";
import { bookApi } from "../api";
import {
  onUpdateList,
  onUpdateItem,
  onAddItem,
  onUpdateSelected,
  onDeleteBook,
  onUpdateLoad,
} from "../store/bookSlice";
import { onSuccessUpdate, onFailureUpdate } from "../store/messageSlice";
import { useNote } from "./useNote";
import { onUpdateCreationStatus } from "../store/createNoteSlice";

export const useBook = () => {
  const dispatch = useDispatch();
  const { deleteNotesByBook } = useNote();
  const book = useSelector((state) => state.book);

  const selectOne = (newBook = {}) => {
    dispatch(onUpdateSelected(newBook));
  };
  const getBook = async (id = "") => {
    await bookApi
      .get("/list", { params: { id } })
      .then(({ data }) => {
        dispatch(onUpdateItem(data));
        selectOne(data);
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
        selectOne(data);
        dispatch(onSuccessUpdate(`New book has been created: ${data.title}`));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };
  const updateLoad = (value = false) => {
    dispatch(onUpdateLoad(value));
  };
  const getAllBooks = async () => {
    updateLoad(false);
    await bookApi
      .get(`/all`)
      .then(({ data }) => {
        dispatch(onUpdateList(data));
        selectOne(data[0]);
        updateLoad(true);
      })
      .catch(({ response }) => {
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };
  const deleteSelectedBook = async () => {
    const id = book.selected.id;
    await bookApi
      .delete(`/collection`, { params: { id } })
      .then(({ msg }) => {
        dispatch(onDeleteBook(id));
        deleteNotesByBook(id);
        dispatch(onUpdateCreationStatus(true));
        dispatch(onSuccessUpdate(msg));
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
    selectOne,
    deleteSelectedBook,
  };
};
