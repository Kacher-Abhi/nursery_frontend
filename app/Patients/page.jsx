"use client";
import { PatientsTable } from "@/components/Tables/PatientsTable";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./globals.css";
import { CaretakerTable } from "@/components/Tables/CaretakersTable";
import ProtectedPage from "@/components/application/protectedPage";

function PatientsPage() {
  const [caretakersData, setCaretakersData] = useState([]);
  const [nurseryIds, setNurseryIds] = useState([]);
  const [selectedNurseryId, setSelectedNurseryId] = useState("All");
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    fetchNurseryIds();
    fetchCaretakersData();
  }, []);

  useEffect(() => {
    setErrorShown(false);
  }, [selectedNurseryId]);

  const fetchNurseryIds = () => {
    fetch(`${process.env.API_HOST}/nurseries`)
      .then((response) => response.json())
      .then((data) => {
        const ids = data.map((nursery) => nursery.nurseryId);
        setNurseryIds(ids);
      })
      .catch((error) => {
        console.error("Error fetching nursery IDs:", error);
      });
  };

  const fetchCaretakersData = () => {
    fetch(`${process.env.API_HOST}/patients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCaretakersData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching caretakers:", error);
        if (!errorShown) {
          toast.error("Failed to fetch caretakers data.");
          setErrorShown(true);
        }
      });
  };

  const handleNurserySelect = (event) => {
    setSelectedNurseryId(event.target.value);
    setErrorShown(false); // Reset errorShown when a new nursery is selected
  };

  const displayCaretakersByNursery = (nurseryId) => {
    if (isLoading) {
      return [];
    }

    let filteredCaretakers = [];
    if (nurseryId === "All") {
      filteredCaretakers = caretakersData;
    } else {
      filteredCaretakers = caretakersData.filter(
        (caretaker) => caretaker.nursery.nurseryId === nurseryId
      );
    }

    // Check if there are no caretakers and the error hasn't been shown yet
    if (filteredCaretakers.length === 0 && !errorShown) {
      toast.error(`No caretakers found for nursery ID: ${nurseryId}`);
      setErrorShown(true); // Set errorShown to true to prevent showing the error again
    }

    return filteredCaretakers;
  };

  const handleCaretakerClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
  };

  const handleClosePopup = () => {
    setSelectedCaretaker(null);
  };

  return (
    <ProtectedPage allowedRoles={['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_CARETAKER']}>
    <div className="caretakers-page-container">
      <ToastContainer />
      <div className="dropdown-container">
        <select
          className="nursery-dropdown"
          value={selectedNurseryId}
          onChange={handleNurserySelect}
        >
          <option value="All"> All </option>{" "}
          {nurseryIds.map((nurseryId) => (
            <option key={nurseryId} value={nurseryId}>
              {" "}
              {nurseryId}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>{" "}
      <div className="caretakers-grid">
        {" "}
        <PatientsTable  nursery={displayCaretakersByNursery(selectedNurseryId)}/>

        {displayCaretakersByNursery(selectedNurseryId).map((caretaker) => (
          <>
          </>
        ))}{" "}
      </div>{" "}
    </div>
    </ProtectedPage>
  );
}

export default PatientsPage;
