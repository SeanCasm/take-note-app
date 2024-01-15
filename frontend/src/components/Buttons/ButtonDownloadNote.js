import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { useNote } from "../../hooks/useNote";
export const ButtonDownloadNote = () => {
  const { note } = useNote();
  const handleDownload = () => {
    if (note.selected === undefined) return;

    const { title, content } = note.selected;
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = title;
    document.body.appendChild(element);
    element.click();
  };
  return (
    <button
      type="button"
      className={`button-create bg-main animation-u-blind m-2`}
      onClick={handleDownload}
    >
      <AiOutlineDownload className="icon-md" />
    </button>
  );
};
