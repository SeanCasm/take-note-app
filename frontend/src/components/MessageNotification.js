import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { onClear } from "../store/messageSlice";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useDispatch, useSelector } from "react-redux";

export const MessageNotification = () => {
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [hidden, setHidden] = useState(true);

  const hideMessage = () => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
      dispatch(onClear());
    }, 8000);
  };
  useEffect(() => {
    if (hidden && message.text !== "") {
      hideMessage();
    }
  }, [message]);

  return (
    <ToastContainer position="bottom-start" hidden={hidden}>
      <Toast className="mb-5 ms-3 message-container">
        <Toast.Header
          className={`${
            message.failure ? "failure-header" : "success-header"
          }  `}
        >
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto md-text">TakeNote</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          <p className="md-text">{message.text}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
