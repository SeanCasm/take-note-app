import React from "react";
import JSZip from "jszip";
import { ImFolderDownload } from "react-icons/im";
import { useNote } from "../../hooks/useNote";

export const ButtonDownloadBook = ({ bookName = "" }) => {
  const { note } = useNote();
  const handleDownload = () => {
    const zip = new JSZip();
    const folder = zip.folder(bookName);

    note.notesList.forEach((file) => {
      folder.file(`${file.title}.txt`, file.content);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = `${bookName}.zip`;
      document.body.appendChild(element);
      element.click();
    });
  };
  return (
    <button
      type="button"
      className={`button-create bg-main animation-u-blind m-2`}
      onClick={handleDownload}
    >
      <ImFolderDownload className="icon-sm" />
    </button>
  );
};
