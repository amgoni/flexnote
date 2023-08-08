import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./FolderContents.scss";

const FolderContents = ({
  notes,
  onDelete,
  onSave,
  folders,
  onMoveToFolder,
  onRemoveNoteFromFolder,
}) => {
  const [gridColumns, setGridColumns] = useState(3);

  // Calculate the number of columns based on the screen size
  const calculateGridColumns = () => {
    if (window.innerWidth < 769) {
      return 1; // For small devices, use a single column
    } else if (window.innerWidth >= 769 && window.innerWidth < 1025) {
      return Math.min(2, notes.length); // For medium devices, use at most 2 columns
    } else {
      return Math.min(3, notes.length); // For large devices, use at most 3 columns
    }
  };

  // Update the number of columns on window resize
  const handleResize = () => {
    const columns = calculateGridColumns();
    setGridColumns(columns);
  };

  // Add event listener for window resize
  useEffect(() => {
    handleResize(); // Set initial number of columns
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [notes]); // Trigger the effect whenever the notes array changes

  const handleRemoveNoteFromFolder = (noteId) => {
    // Call the onRemoveFromFolder function passed from App component
    onRemoveNoteFromFolder(noteId);
  };

  return (
    <div
      className="folder-contents"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
    >
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note}
          onDelete={onDelete}
          onSave={onSave}
          folders={folders}
          onMoveToFolder={onMoveToFolder}
          onRemoveNoteFromFolder={handleRemoveNoteFromFolder}
        />
      ))}
    </div>
  );
};

export default FolderContents;
