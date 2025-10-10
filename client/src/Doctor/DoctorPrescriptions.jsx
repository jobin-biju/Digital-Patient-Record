// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import DoctorSideBar from "./DoctorSideBar";

// function DoctorPrescriptions() {
//   const [scheduledPatients, setScheduledPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   useEffect(() => {
//     fetchScheduledPatients();
//   }, []);

//   const fetchScheduledPatients = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/DPR/scheduled-patients");
//       if (!response.ok) {
//         throw new Error("Failed to fetch scheduled patients");
//       }
//       const data = await response.json();
//       setScheduledPatients(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching scheduled patients:", err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Enhanced filtering and searching
//   const filteredPatients = scheduledPatients.filter(patient => {
//     const matchesSearch = patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          patient.symptoms?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (filterStatus === "all") return matchesSearch;
    
//     const today = new Date().toDateString();
//     const appointmentDate = new Date(patient.appointmentDate).toDateString();
    
//     if (filterStatus === "today") return matchesSearch && appointmentDate === today;
//     if (filterStatus === "upcoming") return matchesSearch && new Date(patient.appointmentDate) > new Date();
    
//     return matchesSearch;
//   });

//   // Sorting functionality
//   const sortedPatients = [...filteredPatients].sort((a, b) => {
//     if (!sortConfig.key) return 0;
    
//     let aValue = a[sortConfig.key];
//     let bValue = b[sortConfig.key];
    
//     if (sortConfig.key === 'appointmentDate') {
//       aValue = new Date(aValue);
//       bValue = new Date(bValue);
//     }
    
//     if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (key) => {
//     setSortConfig(prevConfig => ({
//       key,
//       direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   const getAppointmentStatus = (appointmentDate) => {
//     const today = new Date();
//     const appointment = new Date(appointmentDate);
//     const timeDiff = appointment - today;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
//     if (daysDiff === 0) return { status: "Today", color: "#059669", bg: "#dcfce7" };
//     if (daysDiff === 1) return { status: "Tomorrow", color: "#0891b2", bg: "#cffafe" };
//     if (daysDiff > 1) return { status: "Upcoming", color: "#7c3aed", bg: "#ede9fe" };
//     return { status: "Past", color: "#dc2626", bg: "#fee2e2" };
//   };

//   const styles = {
//     pageContainer: {
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
//     },
//     mainContent: {
//       flex: 1,
//       padding: '2rem',
//       marginLeft: '280px',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
//     },
//     headerSection: {
//       marginBottom: '2.5rem',
//       background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
//       borderRadius: '24px',
//       padding: '2.5rem',
//       color: 'white',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//     },
//     title: {
//       fontSize: '3rem',
//       fontWeight: '800',
//       marginBottom: '0.75rem',
//       letterSpacing: '-0.025em'
//     },
//     subtitle: {
//       fontSize: '1.25rem',
//       opacity: 0.9,
//       fontWeight: '400'
//     },
//     controlsSection: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '2rem',
//       gap: '1rem',
//       flexWrap: 'wrap'
//     },
//     searchAndFilter: {
//       display: 'flex',
//       gap: '1rem',
//       flex: 1,
//       maxWidth: '600px'
//     },
//     searchContainer: {
//       position: 'relative',
//       flex: 1
//     },
//     searchInput: {
//       width: '100%',
//       padding: '16px 20px 16px 56px',
//       fontSize: '16px',
//       border: '2px solid transparent',
//       borderRadius: '16px',
//       outline: 'none',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       fontWeight: '500'
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '20px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       fontSize: '20px',
//       color: '#059669'
//     },
//     filterSelect: {
//       padding: '16px 20px',
//       fontSize: '16px',
//       border: '2px solid transparent',
//       borderRadius: '16px',
//       outline: 'none',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       fontWeight: '500',
//       minWidth: '150px'
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '1.5rem',
//       marginBottom: '2.5rem'
//     },
//     statCard: {
//       backgroundColor: '#ffffff',
//       padding: '2rem',
//       borderRadius: '20px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e5e7eb',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     statIcon: {
//       position: 'absolute',
//       top: '1.5rem',
//       right: '1.5rem',
//       fontSize: '2rem',
//       opacity: 0.1,
//       color: '#059669'
//     },
//     statNumber: {
//       fontSize: '2.5rem',
//       fontWeight: '800',
//       color: '#1f2937',
//       marginBottom: '0.5rem',
//       background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent'
//     },
//     statLabel: {
//       color: '#6b7280',
//       fontSize: '1rem',
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     consultationsGrid: {
//       display: 'grid',
//       gap: '1.5rem',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
//     },
//     consultationCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '20px',
//       padding: '2rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e5e7eb',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     consultationCardHover: {
//       transform: 'translateY(-4px)',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//       borderColor: '#059669'
//     },
//     cardHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '1.5rem'
//     },
//     patientName: {
//       fontSize: '1.5rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '0.25rem'
//     },
//     statusBadge: {
//       padding: '6px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     appointmentDetails: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '1rem',
//       marginBottom: '1.5rem'
//     },
//     detailItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.25rem'
//     },
//     detailLabel: {
//       fontSize: '12px',
//       fontWeight: '600',
//       color: '#6b7280',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     detailValue: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#374151'
//     },
//     symptomsSection: {
//       marginBottom: '2rem',
//       padding: '1rem',
//       backgroundColor: '#f8fafc',
//       borderRadius: '12px',
//       border: '1px solid #e5e7eb'
//     },
//     symptomsLabel: {
//       fontSize: '12px',
//       fontWeight: '600',
//       color: '#6b7280',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       marginBottom: '0.5rem'
//     },
//     symptomsText: {
//       fontSize: '14px',
//       color: '#374151',
//       lineHeight: '1.5'
//     },
//     actionsContainer: {
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '1.5rem'
//     },
//     primaryButton: {
//       flex: 1,
//       padding: '12px 20px',
//       backgroundColor: '#059669',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textDecoration: 'none',
//       textAlign: 'center',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem'
//     },
//     secondaryButton: {
//       flex: 1,
//       padding: '12px 20px',
//       backgroundColor: 'transparent',
//       color: '#059669',
//       border: '2px solid #059669',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textDecoration: 'none',
//       textAlign: 'center',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem'
//     },
//     loadingContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '500px',
//       backgroundColor: '#ffffff',
//       borderRadius: '24px',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
//     },
//     loadingSpinner: {
//       width: '48px',
//       height: '48px',
//       border: '4px solid #e5e7eb',
//       borderTop: '4px solid #059669',
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite',
//       marginBottom: '1rem'
//     },
//     emptyState: {
//       textAlign: 'center',
//       padding: '4rem 2rem',
//       backgroundColor: '#ffffff',
//       borderRadius: '24px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       color: '#6b7280'
//     },
//     emptyStateIcon: {
//       fontSize: '4rem',
//       marginBottom: '1rem',
//       opacity: 0.3
//     },
//     emptyStateText: {
//       fontSize: '18px',
//       fontWeight: '600',
//       marginBottom: '0.5rem'
//     }
//   };

//   const cssRules = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
    
//     @media (max-width: 1024px) {
//       .main-content {
//         margin-left: 0 !important;
//         padding: 1.5rem !important;
//       }
//       .consultations-grid {
//         grid-template-columns: 1fr !important;
//       }
//     }
    
//     @media (max-width: 768px) {
//       .controls-section {
//         flex-direction: column !important;
//         align-items: stretch !important;
//       }
//       .search-and-filter {
//         flex-direction: column !important;
//       }
//       .stats-grid {
//         grid-template-columns: 1fr 1fr !important;
//         gap: 1rem !important;
//       }
//     }
    
//     .search-input:focus, .filter-select:focus {
//       border-color: #059669 !important;
//       box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1) !important;
//     }
    
//     .primary-button:hover {
//       background-color: #047857 !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .secondary-button:hover {
//       background-color: #059669 !important;
//       color: white !important;
//       transform: translateY(-1px) !important;
//     }
//   `;

//   const getTodayAppointments = () => {
//     const today = new Date().toDateString();
//     return scheduledPatients.filter(p => new Date(p.appointmentDate).toDateString() === today).length;
//   };

//   const getUpcomingAppointments = () => {
//     const today = new Date();
//     return scheduledPatients.filter(p => new Date(p.appointmentDate) > today).length;
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{cssRules}</style>
//         <div style={styles.pageContainer}>
//           <DoctorSideBar />
//           <div style={styles.mainContent} className="main-content">
//             <div style={styles.loadingContainer}>
//               <div style={styles.loadingSpinner}></div>
//               <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
//                 Loading consultations...
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{cssRules}</style>
//         <div style={styles.pageContainer}>
//           <DoctorSideBar />
//           <div style={styles.mainContent} className="main-content">
//             <div style={styles.emptyState}>
//               <div style={styles.emptyStateIcon}>⚠️</div>
//               <div style={styles.emptyStateText}>Error Loading Consultations</div>
//               <div style={{ fontSize: '14px', opacity: 0.8 }}>
//                 {error}
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{cssRules}</style>
//       <div style={styles.pageContainer}>
//         <DoctorSideBar />
//         <div style={styles.mainContent} className="main-content">
//           {/* Enhanced Header */}
//           <div style={styles.headerSection}>
//             <h1 style={styles.title}>Scheduled Consultations</h1>
//             <p style={styles.subtitle}>
//               Manage patient appointments and prescriptions efficiently
//             </p>
//           </div>

//           {/* Controls Section */}
//           <div style={styles.controlsSection} className="controls-section">
//             <div style={styles.searchAndFilter} className="search-and-filter">
//               <div style={styles.searchContainer}>
//                 <div style={styles.searchIcon}>🔍</div>
//                 <input
//                   type="text"
//                   placeholder="Search patients or symptoms..."
//                   style={styles.searchInput}
//                   className="search-input"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <select
//                 style={styles.filterSelect}
//                 className="filter-select"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="all">All Appointments</option>
//                 <option value="today">Today</option>
//                 <option value="upcoming">Upcoming</option>
//               </select>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div style={styles.statsGrid} className="stats-grid">
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>📅</div>
//               <div style={styles.statNumber}>{scheduledPatients.length}</div>
//               <div style={styles.statLabel}>Total Consultations</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>⏰</div>
//               <div style={styles.statNumber}>{getTodayAppointments()}</div>
//               <div style={styles.statLabel}>Today's Appointments</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>📋</div>
//               <div style={styles.statNumber}>{getUpcomingAppointments()}</div>
//               <div style={styles.statLabel}>Upcoming</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>📊</div>
//               <div style={styles.statNumber}>{filteredPatients.length}</div>
//               <div style={styles.statLabel}>Filtered Results</div>
//             </div>
//           </div>

//           {/* Consultations Grid */}
//           {sortedPatients.length === 0 ? (
//             <div style={styles.emptyState}>
//               <div style={styles.emptyStateIcon}>📋</div>
//               <div style={styles.emptyStateText}>
//                 {searchTerm ? 'No matching consultations found' : 'No scheduled consultations'}
//               </div>
//               <div style={{ fontSize: '14px', opacity: 0.8 }}>
//                 {searchTerm ? 
//                   `Try adjusting your search for "${searchTerm}"` : 
//                   'Appointments will appear here when scheduled'
//                 }
//               </div>
//             </div>
//           ) : (
//             <div style={styles.consultationsGrid} className="consultations-grid">
//               {sortedPatients.map((patient) => {
//                 const statusInfo = getAppointmentStatus(patient.appointmentDate);
//                 return (
//                   <div
//                     key={patient._id}
//                     style={styles.consultationCard}
//                     onMouseEnter={(e) => Object.assign(e.target.style, styles.consultationCardHover)}
//                     onMouseLeave={(e) => Object.assign(e.target.style, styles.consultationCard)}
//                   >
//                     <div style={styles.cardHeader}>
//                       <div>
//                         <h3 style={styles.patientName}>{patient.patientName}</h3>
//                       </div>
//                       <span 
//                         style={{
//                           ...styles.statusBadge,
//                           backgroundColor: statusInfo.bg,
//                           color: statusInfo.color
//                         }}
//                       >
//                         {statusInfo.status}
//                       </span>
//                     </div>

//                     <div style={styles.appointmentDetails}>
//                       <div style={styles.detailItem}>
//                         <span style={styles.detailLabel}>📅 Date</span>
//                         <span style={styles.detailValue}>
//                           {new Date(patient.appointmentDate).toLocaleDateString('en-US', {
//                             weekday: 'short',
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </span>
//                       </div>
//                       <div style={styles.detailItem}>
//                         <span style={styles.detailLabel}>⏰ Time</span>
//                         <span style={styles.detailValue}>{patient.appointmentTime}</span>
//                       </div>
//                     </div>

//                     <div style={styles.symptomsSection}>
//                       <div style={styles.symptomsLabel}>🩺 Symptoms</div>
//                       <div style={styles.symptomsText}>
//                         {patient.symptoms || 'No symptoms recorded'}
//                       </div>
//                     </div>

//                     <div style={styles.actionsContainer}>
//                       <Link
//                         to="/viewprescriptions"
//                         state={{ scheduledPatients: patient }}
//                         style={styles.secondaryButton}
//                         className="secondary-button"
//                       >
//                         <span>📄</span>
//                         View Prescriptions
//                       </Link>
//                       <Link
//                         to="/addprescription"
//                         state={{ scheduledPatients: patient }}
//                         style={styles.primaryButton}
//                         className="primary-button"
//                       >
//                         <span>➕</span>
//                         Add Prescription
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DoctorPrescriptions;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";

function DoctorPrescriptions() {
  const [scheduledPatients, setScheduledPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [prescriptionData, setPrescriptionData] = useState({}); // Track prescriptions for each patient

  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const doctorId = auth.loginId;

  useEffect(() => {
    if (doctorId) {
      fetchScheduledPatients();
    } else {
      setError("Doctor ID not found. Please login again.");
      setLoading(false);
    }
  }, [doctorId]);

  console.log(scheduledPatients);
  
  const fetchScheduledPatients = async () => {
    try {
      const response = await fetch(`http://localhost:4000/DPR/scheduled-patients/${doctorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch scheduled patients");
      }
      const data = await response.json();
      setScheduledPatients(data);
      
      // Check prescription status for each patient
      await checkPrescriptionStatus(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching scheduled patients:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const checkPrescriptionStatus = async (patients) => {
    const prescriptionStatus = {};
    
    try {
      // Check each patient's prescription status
      await Promise.all(
        patients.map(async (patient) => {
          try {
            const response = await fetch(`http://localhost:4000/DPR/prescriptions/${patient._id}`);
            if (response.ok) {
              const prescriptions = await response.json();
              prescriptionStatus[patient._id] = prescriptions.length > 0;
            } else {
              prescriptionStatus[patient._id] = false;
            }
          } catch (err) {
            console.error(`Error checking prescription for patient ${patient._id}:`, err);
            prescriptionStatus[patient._id] = false;
          }
        })
      );
      
      setPrescriptionData(prescriptionStatus);
    } catch (error) {
      console.error("Error checking prescription statuses:", error);
    }
  };

  // Enhanced filtering and searching
  const filteredPatients = scheduledPatients.filter(patient => {
    const matchesSearch = patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.symptoms?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    
    const today = new Date().toDateString();
    const appointmentDate = new Date(patient.appointmentDate).toDateString();
    
    if (filterStatus === "today") return matchesSearch && appointmentDate === today;
    if (filterStatus === "upcoming") return matchesSearch && new Date(patient.appointmentDate) > new Date();
    
    return matchesSearch;
  });

  // Sorting functionality
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'appointmentDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getAppointmentStatus = (appointmentDate) => {
    const today = new Date();
    const appointment = new Date(appointmentDate);
    const timeDiff = appointment - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) return { status: "Today", color: "#059669", bg: "#dcfce7" };
    if (daysDiff === 1) return { status: "Tomorrow", color: "#0891b2", bg: "#cffafe" };
    if (daysDiff > 1) return { status: "Upcoming", color: "#7c3aed", bg: "#ede9fe" };
    return { status: "Past", color: "#dc2626", bg: "#fee2e2" };
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    mainContent: {
      flex: 1,
      padding: '2rem',
      marginLeft: '280px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    headerSection: {
      marginBottom: '2.5rem',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      borderRadius: '24px',
      padding: '2.5rem',
      color: 'white',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '0.75rem',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '1.25rem',
      opacity: 0.9,
      fontWeight: '400'
    },
    controlsSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    searchAndFilter: {
      display: 'flex',
      gap: '1rem',
      flex: 1,
      maxWidth: '600px'
    },
    searchContainer: {
      position: 'relative',
      flex: 1
    },
    searchInput: {
      width: '100%',
      padding: '16px 20px 16px 56px',
      fontSize: '16px',
      border: '2px solid transparent',
      borderRadius: '16px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '500'
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: '#059669'
    },
    filterSelect: {
      padding: '16px 20px',
      fontSize: '16px',
      border: '2px solid transparent',
      borderRadius: '16px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '500',
      minWidth: '150px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2.5rem'
    },
    statCard: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    statIcon: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      fontSize: '2rem',
      opacity: 0.1,
      color: '#059669'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '1rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    consultationsGrid: {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
    },
    consultationCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    consultationCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: '#059669'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem'
    },
    patientName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    statusContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'flex-end'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    prescriptionStatus: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    prescriptionExists: {
      backgroundColor: '#fef3c7',
      color: '#f59e0b'
    },
    prescriptionPending: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    appointmentDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    detailLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    detailValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    symptomsSection: {
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    symptomsLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0.5rem'
    },
    symptomsText: {
      fontSize: '14px',
      color: '#374151',
      lineHeight: '1.5'
    },
    actionsContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    primaryButton: {
      flex: 1,
      padding: '12px 20px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    primaryButtonDisabled: {
      flex: 1,
      padding: '12px 20px',
      backgroundColor: '#9ca3af',
      color: '#d1d5db',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'not-allowed',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      opacity: 0.6
    },
    secondaryButton: {
      flex: 1,
      padding: '12px 20px',
      backgroundColor: 'transparent',
      color: '#059669',
      border: '2px solid #059669',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    loadingSpinner: {
      width: '48px',
      height: '48px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #059669',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: '#6b7280'
    },
    emptyStateIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.3
    },
    emptyStateText: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '0.5rem'
    }
  };

  const cssRules = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0 !important;
        padding: 1.5rem !important;
      }
      .consultations-grid {
        grid-template-columns: 1fr !important;
      }
    }
    
    @media (max-width: 768px) {
      .controls-section {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .search-and-filter {
        flex-direction: column !important;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 1rem !important;
      }
    }
    
    .search-input:focus, .filter-select:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1) !important;
    }
    
    .primary-button:hover:not([disabled]) {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .secondary-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-1px) !important;
    }
  `;

  const getTodayAppointments = () => {
    const today = new Date().toDateString();
    return scheduledPatients.filter(p => new Date(p.appointmentDate).toDateString() === today).length;
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    return scheduledPatients.filter(p => new Date(p.appointmentDate) > today).length;
  };

  const getPatientsWithPrescriptions = () => {
    return Object.values(prescriptionData).filter(hasPrescription => hasPrescription).length;
  };

  if (loading) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <DoctorSideBar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
                Loading consultations...
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <DoctorSideBar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>⚠️</div>
              <div style={styles.emptyStateText}>Error Loading Consultations</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                {error}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cssRules}</style>
      <div style={styles.pageContainer}>
        <DoctorSideBar />
        <div style={styles.mainContent} className="main-content">
          {/* Enhanced Header */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>Scheduled Consultations</h1>
            <p style={styles.subtitle}>
              Manage patient appointments and prescriptions efficiently
            </p>
          </div>

          {/* Controls Section */}
          <div style={styles.controlsSection} className="controls-section">
            <div style={styles.searchAndFilter} className="search-and-filter">
              <div style={styles.searchContainer}>
                <div style={styles.searchIcon}>🔍</div>
                <input
                  type="text"
                  placeholder="Search patients or symptoms..."
                  style={styles.searchInput}
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                style={styles.filterSelect}
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Appointments</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div style={styles.statsGrid} className="stats-grid">
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{scheduledPatients.length}</div>
              <div style={styles.statLabel}>Total Consultations</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏰</div>
              <div style={styles.statNumber}>{getTodayAppointments()}</div>
              <div style={styles.statLabel}>Today's Appointments</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💊</div>
              <div style={styles.statNumber}>{getPatientsWithPrescriptions()}</div>
              <div style={styles.statLabel}>With Prescriptions</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{filteredPatients.length}</div>
              <div style={styles.statLabel}>Filtered Results</div>
            </div>
          </div>

          {/* Consultations Grid */}
          {sortedPatients.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>📋</div>
              <div style={styles.emptyStateText}>
                {searchTerm ? 'No matching consultations found' : 'No scheduled consultations'}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                {searchTerm ? 
                  `Try adjusting your search for "${searchTerm}"` : 
                  'Appointments will appear here when scheduled'
                }
              </div>
            </div>
          ) : (
            <div style={styles.consultationsGrid} className="consultations-grid">
              {sortedPatients.map((patient) => {
                const statusInfo = getAppointmentStatus(patient.appointmentDate);
                const hasPrescription = prescriptionData[patient._id] || false;
                
                return (
                  <div
                    key={patient._id}
                    style={styles.consultationCard}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.consultationCardHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.consultationCard)}
                  >
                    <div style={styles.cardHeader}>
                      <div>
                        <h3 style={styles.patientName}>{patient.patientName}</h3>
                      </div>
                      <div style={styles.statusContainer}>
                        <span 
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color
                          }}
                        >
                          {statusInfo.status}
                        </span>
                        <span 
                          style={{
                            ...styles.prescriptionStatus,
                            ...(hasPrescription ? styles.prescriptionExists : styles.prescriptionPending)
                          }}
                        >
                          {hasPrescription ? '💊 Prescribed' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>

                    <div style={styles.appointmentDetails}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>📅 Date</span>
                        <span style={styles.detailValue}>
                          {new Date(patient.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>⏰ Time</span>
                        <span style={styles.detailValue}>{patient.appointmentTime}</span>
                      </div>
                    </div>

                    <div style={styles.symptomsSection}>
                      <div style={styles.symptomsLabel}>🩺 Symptoms</div>
                      <div style={styles.symptomsText}>
                        {patient.symptoms || 'No symptoms recorded'}
                      </div>
                    </div>

                    <div style={styles.actionsContainer}>
                      <Link
                        to="/viewprescriptions"
                        state={{ scheduledPatients: patient }}
                        style={styles.secondaryButton}
                        className="secondary-button"
                      >
                        <span>📄</span>
                        {hasPrescription ? 'View Prescriptions' : 'View History'}
                      </Link>
                      
                      {hasPrescription ? (
                        <div
                          style={styles.primaryButtonDisabled}
                          title="Prescription already exists for this appointment"
                        >
                          <span>✅</span>
                          Prescription Added
                        </div>
                      ) : (
                        <Link
                          to="/addprescription"
                          state={{ scheduledPatients: patient }}
                          style={styles.primaryButton}
                          className="primary-button"
                        >
                          <span>➕</span>
                          Add Prescription
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorPrescriptions;

