import React from "react";
import PropTypes from "prop-types";
import { AiOutlineFileAdd } from "react-icons/ai";

export const ButtonCreateNote = ({ onClick }) => {
  return (
    <button
      type="button"
      className={`button-create bg-main animation-u-blind text-white`}
      onClick={onClick}
    >
      <div className="d-flex">
        <AiOutlineFileAdd className="icon-sm" />
        <p>New</p>
      </div>
    </button>
  );
};
ButtonCreateNote.propTypes = {
  onClick: PropTypes.func,
};
