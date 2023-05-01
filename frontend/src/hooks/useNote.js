import { notesAPi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { onSuccessUpdate, onFailureUpdate } from "../store/messageSlice";
import { onUpdateItem } from "../store/bookSlice";
import {
  onUpdateSelected,
  onUpdateNotesList,
  onDeleteNote,
  onAddNote,
  onUpdateNoteItem,
} from "../store/noteSlice";

export const useNote = () => {
  const dispatch = useDispatch();
  const note = useSelector((state) => state.note);

  const filterByBook = (bookId = "") => {
    if (bookId === "all") {
      dispatch(onUpdateNotesList(note.notesList));
      return;
    }
    getNotes(0, 1, { book: bookId });
  };
  const createDefault = () => {
    return {
      id: "",
      title: "New one",
      content: "...",
      lastEdit: "",
      createdAt: "",
    };
  };
  const getNotes = async (limit = 0, sort = 1, fields = {}) => {
    await notesAPi
      .get("/list", { params: { limit, sort, ...fields } })
      .then(({ data }) => {
        const defaultNote = createDefault();
        dispatch(onUpdateSelected(data[0] ?? defaultNote));
        dispatch(onUpdateNotesList(data));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };

  const saveNote = async (note = {}) => {
    await notesAPi
      .patch("/", note)
      .then(({ data }) => {
        const { note, msg, newBook, oldBook } = data;
        dispatch(onUpdateSelected(note));
        dispatch(onSuccessUpdate(msg));
        dispatch(onUpdateNoteItem(note));
        if (newBook?.title !== oldBook?.title) {
          dispatch(onDeleteNote(note));
          dispatch(onUpdateItem(newBook));
          dispatch(onUpdateItem(oldBook));
        }
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };

  const deleteSelectedNote = async () => {
    const { id, book } = note.selected;
    await notesAPi
      .delete(`/${id}`, { params: { book } })
      .then(({ data }) => {
        const { msg, note, bookDoc } = data;
        dispatch(onSuccessUpdate(msg));
        dispatch(onDeleteNote(note));
        dispatch(onUpdateItem(bookDoc));
      })
      .catch((response) => {
        console.log(response);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };

  const createNote = async (note = {}) => {
    await notesAPi
      .post("", note)
      .then(({ data }) => {
        const { note, msg, bookDoc } = data;
        dispatch(onUpdateSelected(note));
        dispatch(onSuccessUpdate(msg));
        dispatch(onAddNote(note));
        dispatch(onUpdateItem(bookDoc));
      })
      .catch(({ response }) => {
        console.log(response.data.errors[0].msg);
        dispatch(onFailureUpdate(response.data.errors[0].msg));
      });
  };
  const orderByNewest = () => {
    dispatch(
      onUpdateNotesList(
        note.notesList
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    );
  };
  const orderByOldest = () => {
    dispatch(
      onUpdateNotesList(
        note.notesList
          .slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      )
    );
  };
  const orderByLastEdition = () => {
    dispatch(
      onUpdateNotesList(
        note.notesList
          .slice()
          .sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit))
      )
    );
  };
  return {
    note,
    getNotes,
    saveNote,
    deleteSelectedNote,
    createNote,
    filterByBook,
    orderByNewest,
    orderByOldest,
    orderByLastEdition,
  };
};
