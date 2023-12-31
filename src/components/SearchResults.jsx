import React, { useState, useEffect } from "react";
import Note from "../components/Note";
import "./SearchResults.scss";

const SearchResults = ({
  searchResults,
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
      return Math.min(2, searchResults.length); // For medium devices, use at most 2 columns
    } else {
      return Math.min(3, searchResults.length); // For large devices, use at most 3 columns
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
  }, [searchResults]); // Trigger the effect whenever the searchResults array changes
  return searchResults.length > 0 ? (
    <>
      <h4 className="results-heading status-message">Search Results...</h4>
      <div
        className="search-results"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        }}
      >
        {searchResults.map((note, index) => (
          <Note
            key={index}
            note={note}
            onDelete={onDelete}
            onSave={onSave}
            folders={folders}
            onMoveToFolder={onMoveToFolder}
            onRemoveNoteFromFolder={onRemoveNoteFromFolder}
          />
        ))}
      </div>
    </>
  ) : (
    <h3 className="status-message">No notes found.</h3>
  );
};

export default SearchResults;
