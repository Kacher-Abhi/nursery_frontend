"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./globals.css";
import { CaretakerTable } from "@/components/Tables/CaretakersTable";
import ProtectedPage from "@/components/application/protectedPage";

function CaretakersPage() {
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
    fetch(`${process.env.API_HOST}/caretakers`)
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
    <ProtectedPage allowedRoles={['ROLE_SUPER_ADMIN','ROLE_ADMIN']}>
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
        <CaretakerTable  nursery={displayCaretakersByNursery(selectedNurseryId)}/>

        {displayCaretakersByNursery(selectedNurseryId).map((caretaker) => (
          <>
          </>
        ))}{" "}
      </div>{" "}
      {selectedCaretaker && (
        <>
          <div className="backdrop" onClick={handleClosePopup}>
            {" "}
          </div>{" "}
          <div className="popup-container">
            <div className="popup-content">
              <span className="close-button" onClick={handleClosePopup}>
                {" "}
                X{" "}
              </span>{" "}
              <p> Caretaker ID: {selectedCaretaker.caretakerId} </p>{" "}
              <p> Name: {selectedCaretaker.name} </p>{" "}
              <p> Age: {selectedCaretaker.age} </p>{" "}
              <p> Phone Number: {selectedCaretaker.phoneNumber} </p>{" "}
              <p> Email: {selectedCaretaker.email} </p>{" "}
              <p> Sex: {selectedCaretaker.sex} </p>{" "}
              <p>
                {" "}
                Years of Experience: {selectedCaretaker.yearsOfExperience}{" "}
              </p>{" "}
              <p> Designation: {selectedCaretaker.designation} </p>{" "}
              <p> Average Rating: {selectedCaretaker.averageRating} </p>{" "}
              <p> Nursery ID: {selectedCaretaker.nursery.nurseryId} </p>{" "}
            </div>{" "}
          </div>{" "}
        </>
      )}{" "}
    </div>
    </ProtectedPage>
  );
}

export default CaretakersPage;
