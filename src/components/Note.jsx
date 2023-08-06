import React, { useState } from "react";
import { FaFloppyDisk, FaPen, FaXmark, FaTrashCan } from "react-icons/fa6";
import "./Note.scss";

const Note = ({ note, onDelete, onSave }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isModalEditable, setIsModalEditable] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedModalTitle, setEditedModalTitle] = useState(note.title);
  const [editedText, setEditedText] = useState(note.text);
  const [editedModalText, setEditedModalText] = useState(note.text);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleModalEdit = () => {
    setIsModalEditable(true);
  };

  const handleSave = () => {
    onSave(note.id, editedTitle, editedText);
    setIsEditable(false);
  };

  const handleModalSave = () => {
    onSave(note.id, editedModalTitle, editedModalText);
    setIsModalEditable(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(note.title);
    setEditedText(note.text);
    setIsEditable(false);
  };

  const handleModalCancelEdit = () => {
    setEditedModalTitle(note.title);
    setEditedModalText(note.text);
    setIsModalEditable(false);
  };

  const handleNoteClick = () => {
    setIsClicked(true);
  };

  const handleCloseModal = () => {
    setIsClicked(false);
  };

  const calculateTextAreaRows = (text) => {
    // Split the text by line breaks and calculate the number of rows required
    const lines = text.split("\n");
    return lines.length;
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the note container
    handleEdit();
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the note container
    onDelete(note.id);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the note container
  };

  return (
    <div className={`note ${isEditable ? "editing" : ""}`}>
      {isEditable ? (
        <div className="edit-container">
          <div className="edit-content">
            <input
              className="edit-title"
              placeholder="Title..."
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="edit-text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={calculateTextAreaRows(editedText)}
            />
          </div>

          <div className="edit-icons">
            <FaFloppyDisk className="edit-save" onClick={handleSave} />
            <FaXmark className="edit-cancel" onClick={handleCancelEdit} />
          </div>
        </div>
      ) : (
        <div className="note-container" onClick={handleNoteClick}>
          <div className="note-content">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-text">{note.text}</p>
          </div>

          <div className="note-icons">
            <FaPen onClick={handleEditButtonClick} />

            <FaTrashCan onClick={handleDeleteButtonClick} />
          </div>
        </div>
      )}

      {/* Modal content */}
      {isClicked && (
        <div className="note-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalClick}>
            <FaXmark className="modal-close" onClick={handleCloseModal} />
            {isModalEditable ? (
              <div className="edit-container">
                <div className="edit-content">
                  <input
                    className="edit-title"
                    placeholder="Title..."
                    type="text"
                    value={editedModalTitle}
                    onChange={(event) =>
                      setEditedModalTitle(event.target.value)
                    }
                  />
                  <textarea
                    className="edit-text"
                    value={editedModalText}
                    onChange={(event) => setEditedModalText(event.target.value)}
                    rows={calculateTextAreaRows(editedModalText)}
                  />
                </div>

                <div className="edit-icons">
                  <FaFloppyDisk
                    className="edit-save"
                    onClick={handleModalSave}
                  />
                  <FaXmark
                    className="edit-cancel"
                    onClick={handleModalCancelEdit}
                  />
                </div>
              </div>
            ) : (
              <div className="note-container">
                <div className="note-content">
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-text" style={{ whiteSpace: "pre-wrap" }}>
                    {note.text}
                  </p>
                </div>

                <div className="note-icons">
                  <FaPen onClick={handleModalEdit} />
                  <FaTrashCan onClick={() => onDelete(note.id)} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
