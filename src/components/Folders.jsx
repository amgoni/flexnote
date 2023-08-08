import React, { useState } from "react";
import "./Folders.scss";
import { FaFolderPlus, FaPlus, FaXmark } from "react-icons/fa6";
import Folder from "./Folder";

const Folders = ({
  folders,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleCreateFolder = () => {
    onCreateFolder(newFolderName);
    setNewFolderName("");
    setIsAddingFolder(false); // After creating the folder, close the "add folder" div
  };

  const handleAddFolder = () => {
    setIsAddingFolder(!isAddingFolder); // Toggle the state to show/hide the "add folder" div
    setNewFolderName(""); // Clear the input field when showing the "add folder" div
  };

  return (
    <div className="folders-container">
      <div className="folders-header">
        <h3>Folders</h3>
        {isAddingFolder ? (
          <FaXmark onClick={handleAddFolder} /> // Show cancel icon when in "add folder" process
        ) : (
          <FaPlus onClick={handleAddFolder} /> // Show plus icon when not in "add folder" process
        )}
      </div>
      {isAddingFolder && ( // Conditionally render the "add folder" div based on the state
        <div className="add-folder">
          <input
            type="text"
            placeholder="Folder Name..."
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
          <FaFolderPlus size={30} onClick={handleCreateFolder} />
        </div>
      )}

      {folders.length > 0 && ( // Conditionally render the folders div if there are folders available
        <div className="folders">
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onRenameFolder={onRenameFolder}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folders;
