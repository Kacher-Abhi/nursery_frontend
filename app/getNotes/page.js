"use client";
import ProtectedPage from "@/components/application/protectedPage";
import { useEffect, useState } from "react";

function NotesTable (patientId, nurseryId, month ) {
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let url;

        if (patientId && nurseryId && month) {
          // If all parameters are provided, call the getDetailsByMonthAndYear endpoint
          url = `${process.env.API_HOST}/notes/${patientId}/${nurseryId}/${month}`;
        } else if (patientId && nurseryId) {
          // If patientId and nurseryId are provided, call the getDetailsByPatientIdAndNurseryId endpoint
          url = `${process.env.API_HOST}/notes/${patientId}/${nurseryId}`;
        } else {
          // If no specific parameters are provided, fetch all notes using the getAllNotes endpoint
          url = `${process.env.API_HOST}/notes`;
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
    <ProtectedPage allowedRoles={['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_PATIENT']}>
      <div className="flex flex-wrap">
        {notesData &&
          notesData.map((note) => (
            <NotesCard key={note.notesId} note={note} />
          ))}
      </div>
      </ProtectedPage>
    </>
  );
};

export default NotesTable;
