import React from "react";
import PropTypes from "prop-types";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNote } from "../../hooks/useNote";

export const ButtonCreateNote = () => {
  const { selectNone } = useNote();
  const handleOnClick = () => {
    selectNone();
  };
  return (
    <button
      type="button"
      className={`button-create bg-main animation-u-blind text-white ms-2`}
      onClick={handleOnClick}
    >
      <AiOutlineFileAdd className="icon-sm" style={{ color: "black" }} />
    </button>
  );
};
ButtonCreateNote.propTypes = {
  onClick: PropTypes.func,
};
