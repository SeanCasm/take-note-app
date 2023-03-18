import React from "react";
import { BiBookAdd } from "react-icons/bi";

export const ButtonCreateBook = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`button-create bg-main animation-u-blind`}
    >
      <BiBookAdd className="icon-sm" />
    </button>
  );
};
