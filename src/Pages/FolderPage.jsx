import React from "react";
import { useParams } from "react-router-dom";
import "./FolderPage.scss";
import FolderContents from "../components/FolderContents";

const FolderPage = ({
  notes,
  folders,
  onDelete,
  onToggle,
  onSave,
  onMoveToFolder,
  onRemoveNoteFromFolder,
}) => {
  const { folderId } = useParams(); // Get the folderId from the URL params

  // Get the notes that belong to the selected folder
  const getNotesForSelectedFolder = () => {
    return notes.filter((note) => note.folderId === folderId);
  };

  // Find the selected folder based on folderId
  const selectedFolder = folders.find((folder) => folder.id === folderId);

  if (selectedFolder) {
    return (
      <div className="folder-page">
        <h2>{selectedFolder.name}</h2>

        <FolderContents
          notes={getNotesForSelectedFolder()} // Pass the notes of the selected folder
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
          onMoveToFolder={onMoveToFolder}
          onRemoveNoteFromFolder={onRemoveNoteFromFolder}
        />
      </div>
    );
  } else {
    // Handle case when the selected folder is not found (optional)
    return (
      <div>
        <h2>Folder Not Found</h2>
        <p>The selected folder could not be found.</p>
      </div>
    );
  }
};

export default FolderPage;
