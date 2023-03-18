import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Filter } from "../Filter";
import { onUpdateSelected } from "../../store/noteSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNote } from "../../hooks/useNote";

export const NoteGroup = () => {
  const dispatch = useDispatch();
  const { note } = useNote();
  
  const handleNoteSelected = (note) => {
    dispatch(onUpdateSelected(note));
  };

  useEffect(() => {
    if (note.notesList.length > 0) {
      dispatch(onUpdateSelected(note.notesList[0]));
    }
  }, [note.notesList]);

  return (
    <section>
      <Filter />
      <div className="mt-4">
        <p className="md-text">Count: {note.notesList.length}</p>
      </div>
      <ListGroup style={{ height: "20em", overflowY: "auto" }}>
        {note.notesList.map((item) => {
          return (
            <ListGroup.Item
              key={item.id}
              as={Link}
              className="note-overview"
              onClick={() => handleNoteSelected(item)}
            >
              <header>
                <div className="d-block">
                  <div className="mb-2">
                    <p className="sm-text">{item?.createdAt}</p>
                  </div>
                  <div className="title-container">
                    <p className="md-text">{item?.title}</p>
                  </div>
                </div>
              </header>
              <hr className="title-separator" />
              <div className="text-container">
                <p className="sm-text">{item?.content}</p>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </section>
  );
};
