// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import Navbar from './Navbar';
// import './DepartmentDoctors.css';

// function DepartmentDoctors() {
//   const { hospitalId, departmentName } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [department, setDepartment] = useState("");
//   const { hospital } = location.state || {};

//   useEffect(() => {
//     if (hospitalId && departmentName) {
//       setDepartment(decodeURIComponent(departmentName));
//       fetchDoctorsByDepartment();
//     }
//   }, [hospitalId, departmentName]);

//   const fetchDoctorsByDepartment = async () => {
//     try {
//       const cleanDepartmentName = decodeURIComponent(departmentName)
//         .replace(/[\[\]"]/g, "")
//         .trim();

//       const response = await fetch(
//         "http://localhost:4000/DPR/department-doctors",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             hospitalId,
//             department: cleanDepartmentName,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch doctors");
//       }

//       const data = await response.json();
//       const doctorsArray = Array.isArray(data) ? data : [];
//       setDoctors(doctorsArray);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleBookAppointment = (doctor) => {
//     navigate(`/book-appointment/${doctor._id}`, {
//       state: { doctor, hospital, department: departmentName },
//     });
//   };

//   const goBack = () => {
//     navigate(-1);
//   };

//   const cleanDepartmentName = department.replace(/["\[\]]/g, "").trim();

//   return (
//     <>
//       <Navbar />
//       <div className="department-doctors-page">
//         <div className="page-header">
//           <div className="header-content">
//             <button className="back-button" onClick={goBack}>
//               &larr; Back
//             </button>
//             <h1>{cleanDepartmentName} Department</h1>
//             <p>at {hospital?.hospitalName}</p>
//           </div>
//         </div>

//         <div className="content-container">
//           <div className="doctors-section">
//             <div className="section-header">
//               <h2>Available Doctors</h2>
//               <p className="doctors-count">
//                 {doctors?.length || 0} doctor{doctors?.length !== 1 ? "s" : ""} available
//               </p>
//             </div>

//             {loading ? (
//               <div className="loading-state">
//                 <div className="loading-spinner"></div>
//                 <p>Loading doctors...</p>
//               </div>
//             ) : error ? (
//               <div className="error-state">
//                 <div className="error-icon">⚠️</div>
//                 <h3>Something went wrong</h3>
//                 <p>{error}</p>
//                 <button
//                   className="retry-button"
//                   onClick={fetchDoctorsByDepartment}
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : doctors?.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-icon">👨‍⚕️</div>
//                 <h3>No doctors available</h3>
//                 <p>No doctors currently available in the {cleanDepartmentName} department.</p>
//                 <p>Please check back later or contact the hospital directly.</p>
//                 <p className="hospital-contact">Hospital Phone: {hospital?.Phone}</p>
//               </div>
//             ) : (
//               <div className="doctors-list">
//                 {doctors.map((doctor) => (
//                   <div 
//                     key={doctor._id} 
//                     className={`doctor-item ${doctor.availabilityStatus === "Offline" ? "offline" : ""}`}
//                   >
//                     <div className="doctor-main">
//                       <div className="doctor-image">
//                         <img
//                           src={`http://localhost:4000/${doctor.profileImage}`}
//                           alt={doctor.name}
//                           onError={(e) => {
//                             e.target.src = "/assets/images/default-doctor.png";
//                           }}
//                         />
//                         <div className={`status-indicator ${doctor.availabilityStatus.toLowerCase()}`}>
//                           {doctor.availabilityStatus}
//                         </div>
//                       </div>
                      
//                       <div className="doctor-info">
//                         <h3>{doctor.name}</h3>
//                         <p className="specialization">{doctor.specialization}</p>
//                         <p className="qualification">{doctor.qualification}</p>
                        
//                         <div className="doctor-details">
//                           <div className="detail">
//                             <span className="label">Experience:</span>
//                             <span className="value">{doctor.yearsOfExperience} years</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="doctor-actions">
//                       <button
//                         className={`appointment-button ${doctor.availabilityStatus === "Offline" ? "disabled" : ""}`}
//                         onClick={() => handleBookAppointment(doctor)}
//                         disabled={doctor.availabilityStatus === "Offline"}
//                       >
//                         {doctor.availabilityStatus === "Offline"
//                           ? "Currently Unavailable"
//                           : "Book Appointment"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DepartmentDoctors;



import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import './DepartmentDoctors.css';

function DepartmentDoctors() {
  const { hospitalId, departmentName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Remove unused state variables
  // const [department, setDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const { hospital } = location.state || {};

  // Wrap fetchDoctorsByDepartment in useCallback
  const fetchDoctorsByDepartment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:4000/DPR/department-doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalId,
          department: departmentName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [hospitalId, departmentName]);

  // Add fetchDoctorsByDepartment to dependency array
  useEffect(() => {
    fetchDoctorsByDepartment();
  }, [fetchDoctorsByDepartment]);

  const handleBookAppointment = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, {
      state: { doctor, hospital, department: departmentName },
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Filter and sort doctors
  const filteredAndSortedDoctors = doctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return parseInt(b.yearsOfExperience) - parseInt(a.yearsOfExperience);
        case 'specialization':
          return a.specialization.localeCompare(b.specialization);
        default:
          return 0;
      }
    });

  const clearSearch = () => {
    setSearchTerm('');
  };

  const cleanDepartmentName = (name) => {
    return name.replace(/[[\]]/g, '').trim(); // Fixed escape characters
  };

  return (
    <>
      <Navbar /><br /><br /><br /><br />
      <div className="department-doctors">
        <div className="department-doctors__container">
          <div className="department-doctors__header">
            <div className="department-doctors__header-content">
              <button 
                className="department-doctors__back-button" 
                onClick={goBack}
                aria-label="Go back to previous page"
              >
                ← Back
              </button>
              <div className="department-doctors__title-section">
                <h1 className="department-doctors__title">{cleanDepartmentName(departmentName)} Department</h1>
                <p className="department-doctors__subtitle">at {hospital?.hospitalName}</p>
              </div>
            </div>
          </div>

          <div className="department-doctors__content">
            <div className="department-doctors__controls">
              <div className="department-doctors__controls-header">
                <h2 className="department-doctors__section-title">Available Doctors</h2>
                <div className="department-doctors__controls-wrapper">
                  {/* Search Bar */}
                  <div className="department-doctors__search-container">
                    <div className="department-doctors__search-box">
                      <span className="department-doctors__search-icon">🔍</span>
                      <input
                        type="text"
                        className="department-doctors__search-input"
                        placeholder="Search doctors by name, specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button 
                          className="department-doctors__search-clear"
                          onClick={clearSearch}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="department-doctors__sort-container">
                    <label className="department-doctors__sort-label">Sort by:</label>
                    <select 
                      className="department-doctors__sort-select"
                      value={sortOption} 
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="experience">Experience (High to Low)</option>
                      <option value="specialization">Specialization</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="department-doctors__results-info">
                <span className="department-doctors__results-count">
                  {filteredAndSortedDoctors.length} of {doctors.length} doctors found
                </span>
              </div>
            </div>

            <div className="department-doctors__doctors-section">
              {loading ? (
                <div className="department-doctors__loading">
                  <div className="department-doctors__loading-spinner"></div>
                  <p>Loading doctors...</p>
                </div>
              ) : error ? (
                <div className="department-doctors__error">
                  <div className="department-doctors__error-icon">⚠️</div>
                  <h3>Something went wrong</h3>
                  <p>{error}</p>
                  <button
                    className="department-doctors__retry-button"
                    onClick={fetchDoctorsByDepartment}
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredAndSortedDoctors.length === 0 ? (
                <div className="department-doctors__empty">
                  <div className="department-doctors__empty-icon">
                    {searchTerm ? "🔍" : "👨‍⚕️"}
                  </div>
                  <h3>
                    {searchTerm ? "No doctors found" : "No doctors available"}
                  </h3>
                  <p>
                    {searchTerm 
                      ? `No doctors match "${searchTerm}" in the ${cleanDepartmentName(departmentName)} department.`
                      : `No doctors currently available in the ${cleanDepartmentName(departmentName)} department.`
                    }
                  </p>
                  {searchTerm ? (
                    <button 
                      className="department-doctors__clear-search-btn"
                      onClick={clearSearch}
                    >
                      Clear Search
                    </button>
                  ) : (
                    <>
                      <p>Please check back later or contact the hospital directly.</p>
                      <p className="department-doctors__hospital-contact">
                        Hospital Phone: {hospital?.Phone}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="department-doctors__list">
                  {filteredAndSortedDoctors.map((doctor) => (
                    <div 
                      key={doctor._id} 
                      className={`department-doctors__item ${doctor.availabilityStatus === "Offline" ? "department-doctors__item--offline" : ""}`}
                    >
                      <div className="department-doctors__doctor-main">
                        <div className="department-doctors__doctor-image-container">
                          <img
                            src={`http://localhost:4000/${doctor.profileImage}`}
                            alt={doctor.name}
                            className="department-doctors__doctor-image"
                            onError={(e) => {
                              e.target.src = "/assets/images/default-doctor.png";
                            }}
                          />
                          <div className={`department-doctors__status-indicator department-doctors__status-indicator--${doctor.availabilityStatus.toLowerCase()}`}>
                            <div className="department-doctors__status-dot"></div>
                            <span className="department-doctors__status-text">{doctor.availabilityStatus}</span>
                          </div>
                        </div>
                        
                        <div className="department-doctors__doctor-info">
                          <h3 className="department-doctors__doctor-name">Dr. {doctor.name}</h3>
                          <p className="department-doctors__doctor-specialization">{doctor.specialization}</p>
                          <p className="department-doctors__doctor-qualification">{doctor.qualification}</p>
                          
                          <div className="department-doctors__doctor-details">
                            <div className="department-doctors__detail-item">
                              <span className="department-doctors__detail-label">Experience:</span>
                              <span className="department-doctors__detail-value">{doctor.yearsOfExperience} years</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="department-doctors__doctor-actions">
                        <button
                          className="department-doctors__appointment-button"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentDoctors;
