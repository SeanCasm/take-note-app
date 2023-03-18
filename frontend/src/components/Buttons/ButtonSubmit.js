import React from "react";
import PropTypes from "prop-types";

export const ButtonSubmit = ({
  text = "sample text",
  fullWidth = true,
  disabled = true,
}) => {
  return (
    <button
      disabled={disabled}
      className={`button-submit bg-main animation-u-blind ${
        fullWidth && "container"
      }`}
    >
      <p>{text}</p>
    </button>
  );
};
ButtonSubmit.propTypes = {
  text: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
