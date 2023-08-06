import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import About from "./components/About";

const firebaseURL =
  "https://flexnote-6cb48-default-rtdb.europe-west1.firebasedatabase.app/";

const App = () => {
  // const [showAddNote, setShowAddNote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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

  // Save Note (implement saving the edited note to the database)
  const saveNote = async (id, editedTitle, editedText) => {
    try {
      // Make a PUT request to update the note in the database
      const res = await fetch(`${firebaseURL}notes/${id}.json`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: editedTitle, text: editedText }),
      });

      if (res.ok) {
        // If the update is successful, update the note in the state
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id
              ? { ...note, title: editedTitle, text: editedText }
              : note
          )
        );
      } else {
        // Handle error if the update fails
        alert("Failed to update the note.");
      }
    } catch (error) {
      alert("Error occurred while updating the note:", error);
    }
  };

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        const notesFromServer = await fetchNotes();
        setNotes(notesFromServer);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    getNotes();
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddNote onAdd={addNote} />
                {isLoading ? (
                  <h3 className="status-message">Loading...</h3>
                ) : hasError ? (
                  <h3 className="status-message">
                    Error fetching notes. Please try again later.
                  </h3>
                ) : notes.length > 0 ? (
                  <Notes
                    notes={notes}
                    onDelete={deleteNote}
                    onToggle={toggleReminder}
                    onSave={saveNote}
                  />
                ) : (
                  <h3 className="status-message">
                    Saved notes will appear here.
                  </h3>
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
