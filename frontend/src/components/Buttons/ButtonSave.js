import React from "react";
import PropTypes from "prop-types";
import { FiSave } from "react-icons/fi";
export const ButtonSave = ({ disabled = true }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`button-submit m-2  bg-main ${
        disabled ? "button-disabled" : "animation-u-blind"
      } `}
    >
      <FiSave className="icon-md" />
    </button>
  );
};
ButtonSave.propTypes = {
  disabled: PropTypes.bool,
};
