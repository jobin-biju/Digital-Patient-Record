import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hospital.css";

function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch real hospitals
  useEffect(() => {
    fetch("http://localhost:4000/DPR/hospitalview")
      .then(res => res.json())
      .then(data => {
        setHospitals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hospitals:", err);
        setLoading(false);
      });
  }, []);

  // Filter hospitals
  const filtered = hospitals.filter(hospital => {
    const matchesSearch =
      hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept =
      selectedDept === "all" ||
      hospital.department?.includes(selectedDept);
    
    return matchesSearch && matchesDept;
  });

  // Handle view details click
  const handleViewDetails = (hospital) => {
    navigate(`/hospital-details/${hospital._id}`, { 
      state: { hospital } 
    });
  };

  return (
    <div className="container">
      <div className="hospital-header">
        <h2>Select Hospital</h2>
        <input
          type="text"
          placeholder="Search hospitals..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="hospitals-grid">
        {loading ? (
          <div className="loading">Loading hospitals...</div>
        ) : filtered.length === 0 ? (
          <div className="no-results">No hospitals found</div>
        ) : (
          filtered.map(hospital => (
            <div key={hospital._id} className="hospital-card">
              <img
                src={`http://localhost:4000/${hospital.hospitalLogo}`}
                alt={hospital.hospitalName}
                className="hospital-image"
                onError={e => {
                  e.target.src = '/default-hospital.jpg';
                }}
              />
              <div className="hospital-info">
                <h3>{hospital.hospitalName}</h3>
                <p>{hospital.address}</p>
                <p>{hospital.Phone}</p>
                <button
                  onClick={() => handleViewDetails(hospital)}
                  className="view-details-btn"
                >
                  View Details & Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Hospital;
