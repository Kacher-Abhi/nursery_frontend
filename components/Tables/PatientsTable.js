"use client"

import { useEffect, useState } from "react";

export const PatientsTable = ({ nursery }) => {
    const displayNursery = nursery;
    const [caretakersData, setCaretakersData] = useState([]);
    useEffect(() => {
      setCaretakersData(nursery);
    
 
    },[])
    
console.log(nursery);
  return (
    <>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Patient Name</th>
                <th className="px-4 py-3">Patient Id</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Age</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {nursery &&
                nursery.map((selectedCaretaker) => {
                  return (
                    <tr  key = {selectedCaretaker.caretakerId} className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold text-black">{selectedCaretaker.firstName}</p>
                            <p className="text-xs text-gray-600">{selectedCaretaker.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                      {selectedCaretaker.patientId}
                      </td>
                      <td className="px-4 py-3 text-xs border">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {selectedCaretaker.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm border">{selectedCaretaker.age}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
