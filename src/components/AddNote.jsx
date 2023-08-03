import { useState } from "react";

const AddNote = ({ onAdd }) => {
  const [text, setText] = useState("");
  // const [day, setDay] = useState("");
  // const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please write a note first");
      return;
    }

    onAdd({ text });

    setText("");
    // setDay("");
    // setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        {/* <label>Task</label> */}
        <input
          type="text"
          placeholder="Take a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {/* <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div> */}
      {/* <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div> */}

      <input type="submit" value="Add Note" className="btn btn-block" />
    </form>
  );
};

export default AddNote;
