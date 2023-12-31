import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./Notes.scss";

const Notes = ({ notes, onDelete, onSave, folders, onMoveToFolder }) => {
  const [gridColumns, setGridColumns] = useState(3);
  const [unfolderedNotes, setUnfolderedNotes] = useState([]);

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

  // Filter unfoldered notes when notes prop changes
  useEffect(() => {
    const unfoldered = notes.filter((note) => !note.folderId);
    setUnfolderedNotes(unfoldered);
  }, [notes]);

  // Add event listener for window resize
  useEffect(() => {
    handleResize(); // Set initial number of columns
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [notes]); // Trigger the effect whenever the notes array changes

  return unfolderedNotes.length > 0 ? (
    <section
      className="notes"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
    >
      {/* Display notes that are not in folders */}
      {unfolderedNotes.map((note, index) => (
        <Note
          key={index}
          note={note}
          onDelete={onDelete}
          onSave={onSave}
          folders={folders}
          onMoveToFolder={onMoveToFolder}
        />
      ))}
    </section>
  ) : (
    <h3 className="status-message">Saved notes will appear hear.</h3>
  );
};

export default Notes;
