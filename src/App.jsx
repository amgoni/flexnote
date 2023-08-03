import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import About from "./components/About";
import Button from "./components/Button";

const firebaseURL =
  "https://flexnote-6cb48-default-rtdb.europe-west1.firebasedatabase.app/";

const App = () => {
  // const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };

    getNotes();
  }, []);

  // Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch(`${firebaseURL}notes.json`);
    const data = await res.json();

    if (data) {
      const notesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return notesArray;
    }

    return [];
  };

  // Fetch Note
  const fetchNote = async (id) => {
    const res = await fetch(`${firebaseURL}notes/${id}.json`);
    const data = await res.json();

    return { id, ...data };
  };

  // Add Note
  const addNote = async (note) => {
    const res = await fetch(`${firebaseURL}notes.json`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();

    setNotes([...notes, { id: data.name, ...note }]);
  };

  // Delete Note
  const deleteNote = async (id) => {
    const res = await fetch(`${firebaseURL}notes/${id}.json`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setNotes(notes.filter((note) => note.id !== id));
    } else {
      alert("Error Deleting This Note");
    }
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const noteToToggle = await fetchNote(id);
    const updatedNote = { ...noteToToggle, reminder: !noteToToggle.reminder };

    const res = await fetch(`${firebaseURL}notes/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    const data = await res.json();

    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, reminder: data.reminder } : note
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header title="flexnote" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* {location.pathname === "/" && (
                  <Button
                    color={showAddNote ? "#F06449" : "#5BC3EB"}
                    text={showAddNote ? "Close" : "Add"}
                    onClick={() => setShowAddNote(!showAddNote)}
                  />
                )} */}
                <AddNote onAdd={addNote} />
                {notes.length > 0 ? (
                  <Notes
                    notes={notes}
                    onDelete={deleteNote}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Notes To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
