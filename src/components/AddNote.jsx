import React, { useState } from "react";
import "./AddNote.scss";
import { FaFloppyDisk, FaXmark } from "react-icons/fa6";

const AddNote = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleCancel = (e) => {
    setTitle("");
    setText("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please write a note");
      return;
    }

    onAdd({ title, text });

    setTitle("");
    setText("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const calculateTextAreaRows = (text) => {
    // Split the text by line breaks and calculate the number of rows required
    const lines = text.split("\n");
    return lines.length;
  };

  return (
    <form className="addnote-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input
          className="text-input title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="form-control">
        <textarea
          className="text-input note-input"
          type="text"
          placeholder="Take a note..."
          value={text}
          onChange={handleTextChange}
          rows={calculateTextAreaRows(text)} // Set the rows dynamically based on text content
        />
      </div>
      {(title || text) && (
        <div className="addnote-form-icons">
          <FaXmark onClick={handleCancel} />
          <button type="submit">
            <FaFloppyDisk />
          </button>
        </div>
      )}
    </form>
  );
};

export default AddNote;
