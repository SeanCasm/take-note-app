import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineBook } from "react-icons/ai";
import { useNote } from "../hooks/useNote";
import { UpDownArrowIcon } from "./UpDownArrowIcon";

export const Filter = () => {
  const { orderByNewest, orderByOldest, orderByLastEdition } = useNote();
  const handleFilters = (filter = "") => {
    switch (filter.toLowerCase()) {
      case "oldest":
        orderByOldest();
        break;
      case "newest":
        orderByNewest();
        break;
      case "last edited":
        orderByLastEdition();
        break;
      default:
        break;
    }
  };
  return (
    <Dropdown style={{ backgroundColor: "transparent" }}>
      <Dropdown.Toggle id="dropdown-basic" className="dropdown-filter">
        <AiOutlineBook className="icon-sm" />
        {"Order by"}
        <UpDownArrowIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            handleFilters("oldest");
          }}
        >
          Oldest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleFilters("newest");
          }}
        >
          Newest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleFilters("last edited");
          }}
        >
          Last edited
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
