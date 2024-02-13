"use client";
import { useEffect, useState } from "react";

function NotesTable (patientId, nurseryId, month ) {
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let url;

        if (patientId && nurseryId && month) {
          // If all parameters are provided, call the getDetailsByMonthAndYear endpoint
          url = "http://localhost:8080/notes/${patientId}/${nurseryId}/${month}";
        } else if (patientId && nurseryId) {
          // If patientId and nurseryId are provided, call the getDetailsByPatientIdAndNurseryId endpoint
          url = "http://localhost:8080/notes/${patientId}/${nurseryId}";
        } else {
          // If no specific parameters are provided, fetch all notes using the getAllNotes endpoint
          url = "http://localhost:8080/notes";
        }

        const response = await fetch(url);
        const data = await response.json();

        setNotesData(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [patientId, nurseryId, month]);

  return (
    <>
      <div className="flex flex-wrap">
        {notesData &&
          notesData.map((note) => (
            <NotesCard key={note.notesId} note={note} />
          ))}
      </div>
    </>
  );
};

export default NotesTable;
