import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const UpDownArrowIcon = ({ clicked = false }) => {
  return (
    <>
      {clicked ? (
        <RiArrowUpSLine className="icon-sm" />
      ) : (
        <RiArrowDownSLine className="icon-sm" />
      )}
    </>
  );
};
