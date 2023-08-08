import React, { useState } from "react";
import "./Folder.scss";
import { Link } from "react-router-dom";
import { FaTrashCan, FaPen, FaFloppyDisk, FaXmark } from "react-icons/fa6";

const Folder = ({ folder, onFolderClick, onRenameFolder, onDeleteFolder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const [previousFolderName, setPreviousFolderName] = useState(folder.name);

  const handleFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleRenameFolder = () => {
    if (newFolderName.trim() === "") {
      // Prevent renaming if the new folder name is empty or contains only spaces
      setNewFolderName(previousFolderName);
    } else {
      onRenameFolder(folder.id, newFolderName);
    }
    setIsEditing(false);
  };

  const handleDeleteFolder = (event) => {
    event.stopPropagation();
    onDeleteFolder(folder.id);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setPreviousFolderName(newFolderName);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewFolderName(previousFolderName);
  };

  return (
    <div className="folder">
      {isEditing ? (
        <div className="edit-folder">
          <input
            type="text"
            value={newFolderName}
            onChange={handleFolderNameChange}
            autoFocus
          />
          <div className="edit-folder-icons">
            <FaXmark className="edit-folder-icon" onClick={handleCancelEdit} />
            <FaFloppyDisk
              className="edit-folder-icon"
              onClick={handleRenameFolder}
            />
          </div>
        </div>
      ) : (
        <Link to={`/folder/${folder.id}`}>
          <span className="folder-name">{folder.name}</span>
        </Link>
      )}
      <div className="folder-icons">
        {!isEditing && (
          <>
            <FaPen className="folder-icon" onClick={handleEditButtonClick} />
            <FaTrashCan className="folder-icon" onClick={handleDeleteFolder} />
          </>
        )}
      </div>
    </div>
  );
};

export default Folder;
