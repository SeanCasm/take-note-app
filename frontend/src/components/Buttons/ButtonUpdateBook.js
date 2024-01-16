import React from "react";
import { BiBookAdd } from "react-icons/bi";

export const ButtonUpdateBook = ({ onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button-create bg-main animation-u-blind`}
    >
      <BiBookAdd className="icon-sm" />
    </button>
  );
};
