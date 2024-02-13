"use client";
import { useEffect, useState } from "react";

export const NotesCard = ({ note }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{note.notes}</div>
        <p className="text-gray-700 text-base">{note.date}</p>
        <p className="text-gray-700 text-base">{note.time}</p>
      </div>
    </div>
  );
};

export const NotesTable = ({ notes }) => {
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    setNotesData(notes);
  }, [notes]);

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
