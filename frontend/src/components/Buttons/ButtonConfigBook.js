import React from "react";
import { GrConfigure } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export const ButtonConfigBook = ({ bookClicked }) => {
  const navigate = useNavigate();
  const handleOnCLick = () => {
    const bookTitle = bookClicked.title.replace(/ /g, "-");
    navigate(`../book-config/${bookTitle}`, { replace: true });
  };
  return (
    <button
      onClick={handleOnCLick}
      type="button"
      className={`button-config-book bg-main animation-u-blind`}
    >
      <GrConfigure className="icon-sm" />
    </button>
  );
};
