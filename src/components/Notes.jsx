import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./Notes.scss";

const Notes = ({ notes, onDelete, onToggle, onSave }) => {
  const [columns, setColumns] = useState(3); // Default to 3 columns

  const calculateGridColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      // Small devices: 1 column
      return 1;
    } else if (screenWidth < 992) {
      // Medium devices: 2 columns
      return 2;
    } else {
      // Large devices: 3 columns
      return 3;
    }
  };

  useEffect(() => {
    const updateColumns = () => {
      const numColumns = calculateGridColumns();
      setColumns(numColumns);
    };

    // Add event listener to update columns on window resize
    window.addEventListener("resize", updateColumns);
    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <section
      className="notes"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note}
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
        />
      ))}
    </section>
  );
};

export default Notes;
