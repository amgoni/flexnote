import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import "./Home.scss";
import Header from "../components/Header";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import About from "../Pages/About";
import Folders from "../components/Folders";
import FolderPage from "../Pages/FolderPage";
import SearchResults from "../components/SearchResults";
import AuthContext from "../store/auth-context";

const firebaseURL =
  "https://flexnote-6cb48-default-rtdb.europe-west1.firebasedatabase.app/";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };

    getNotes();
  }, []);

  const user = authCtx.userId;

  // Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch(`${firebaseURL}notes.json`);
    const data = await res.json();

    if (data) {
      const notesArray = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((note) => note.userId === user);
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
      body: JSON.stringify({ ...note, userId: user }),
    });

    const data = await res.json();

    setNotes([...notes, { id: data.name, ...note, userId: user }]);
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

  useEffect(() => {
    const getFolders = async () => {
      const foldersFromServer = await fetchFolders();
      setFolders(foldersFromServer);
    };

    getFolders();
  }, []);

  // Fetch Folders
  const fetchFolders = async () => {
    const res = await fetch(`${firebaseURL}folders.json`);
    const data = await res.json();

    if (data) {
      const foldersArray = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((folder) => folder.userId === user);
      return foldersArray;
    }

    return [];
  };

  // Create Folder
  const createFolder = async (folderName) => {
    const res = await fetch(`${firebaseURL}folders.json`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: folderName, userId: user }),
    });

    const data = await res.json();

    const newFolder = { id: data.name, name: folderName, userId: user };

    // Update the folder state with the new folder
    setFolders([...folders, newFolder]);

    // Update the notes that belong to this folder with the new folderId
    const updatedNotes = notes.map((note) =>
      note.id === data.name ? { ...note, folderId: data.name } : note
    );

    // Update the notes state with the updated notes
    setNotes(updatedNotes);
  };
  // Rename Folder
  const renameFolder = async (folderId, newFolderName) => {
    const res = await fetch(`${firebaseURL}folders/${folderId}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: newFolderName }),
    });

    if (res.ok) {
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === folderId ? { ...folder, name: newFolderName } : folder
        )
      );
    } else {
      alert("Failed to rename the folder.");
    }
  };

  // Delete Folder
  const deleteFolder = async (folderId) => {
    const res = await fetch(`${firebaseURL}folders/${folderId}.json`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setFolders(folders.filter((folder) => folder.id !== folderId));
    } else {
      alert("Error deleting this folder.");
    }
  };

  // Move to Folder
  const moveToFolder = async (notesToMove, folderId) => {
    const updatedNotes = notesToMove.map((note) => ({
      ...note,
      folderId: folderId,
    }));

    const updatePromises = updatedNotes.map((note) => {
      return fetch(`${firebaseURL}notes/${note.id}.json`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ folderId: folderId }),
      });
    });

    try {
      await Promise.all(updatePromises);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          updatedNotes.find((updatedNote) => updatedNote.id === note.id)
            ? { ...note, folderId: folderId }
            : note
        )
      );
    } catch (error) {
      alert("Error moving notes to the folder.");
    }
  };

  // Handle removing a note from the folder
  const removeNoteFromFolder = async (noteId) => {
    try {
      const res = await fetch(`${firebaseURL}notes/${noteId}.json`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ folderId: null }), // Set the folderId to null to remove it from the folder
      });

      if (res.ok) {
        // Update the notes state to remove the folderId
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? { ...note, folderId: null } : note
          )
        );
      } else {
        alert("Failed to remove the note from the folder.");
      }
    } catch (error) {
      alert("Error occurred while removing the note from the folder:", error);
    }
  };

  // Get the notes that belong to the selected folder
  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    setSelectedNotes([]); // Reset selectedNotes when a folder is clicked
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredNotes);

    // If the search term is empty, reset the search results
    searchTerm === "" && setSearchResults([]);
  };

  return (
    <div className="container">
      <Header onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          onDelete={deleteNote}
          onSave={saveNote}
          folders={folders}
          onMoveToFolder={moveToFolder}
          onRemoveNoteFromFolder={removeNoteFromFolder}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddNote onAdd={addNote} />
              <Folders
                folders={folders}
                selectedNotes={selectedNotes}
                onCreateFolder={createFolder}
                onRenameFolder={renameFolder}
                onDeleteFolder={deleteFolder}
                onFolderClick={handleFolderClick}
              />
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
                  onSave={saveNote}
                  folders={folders}
                  onMoveToFolder={moveToFolder}
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
        <Route
          path="/folder/:folderId"
          element={
            <FolderPage
              notes={notes}
              folders={folders}
              onDelete={deleteNote}
              onSave={saveNote}
              onMoveToFolder={moveToFolder}
              onRemoveNoteFromFolder={removeNoteFromFolder}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
