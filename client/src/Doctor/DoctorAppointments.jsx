// import React, { useState, useEffect, useCallback } from "react";
// import DoctorSideBar from "./DoctorSideBar";

// function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isScheduling, setIsScheduling] = useState(false);
//   const [showDateTimePicker, setShowDateTimePicker] = useState(false);
//   const [newSchedule, setNewSchedule] = useState({
//     date: '',
//     time: ''
//   });

//   // Move filterAppointments before its usage in useEffect
//   const filterAppointments = useCallback(() => {
//     let filtered = [...appointments];

//     // Status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(apt => apt.status === statusFilter);
//     }

//     // Date filter
//     const today = new Date();
//     if (dateFilter === 'today') {
//       filtered = filtered.filter(apt => {
//         const aptDate = new Date(apt.appointmentDate);
//         return aptDate.toDateString() === today.toDateString();
//       });
//     } else if (dateFilter === 'upcoming') {
//       filtered = filtered.filter(apt => new Date(apt.appointmentDate) >= today);
//     } else if (dateFilter === 'past') {
//       filtered = filtered.filter(apt => new Date(apt.appointmentDate) < today);
//     }

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(apt =>
//         apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         apt.patientPhone?.includes(searchTerm) ||
//         apt.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredAppointments(filtered);
//   }, [appointments, statusFilter, dateFilter, searchTerm]);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     filterAppointments();
//   }, [filterAppointments]);

//   const fetchAppointments = async () => {
//     try {
//       const doctorData = JSON.parse(localStorage.getItem('yourstorage'));
//       const doctorId = doctorData?.loginId;

//       if (!doctorId) {
//         throw new Error('Doctor ID not found. Please login again.');
//       }

//       const response = await fetch('http://localhost:4000/DPR/doctor-appointments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ doctorId })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch appointments');
//       }

//       const data = await response.json();
//       setAppointments(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (appointmentId, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:4000/DPR/appointment-status/${appointmentId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update appointment status');
//       }

//       setAppointments(prevAppointments =>
//         prevAppointments.map(appointment =>
//           appointment._id === appointmentId
//             ? { ...appointment, status: newStatus }
//             : appointment
//         )
//       );
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleScheduleConsultation = async (appointmentId) => {
//     try {
//       setIsScheduling(true);

//       const scheduleData = {
//         isConsultationScheduled: true,
//         ...(showDateTimePicker && newSchedule.date && newSchedule.time && {
//           appointmentDate: newSchedule.date,
//           appointmentTime: newSchedule.time
//         })
//       };

//       const response = await fetch(`http://localhost:4000/DPR/schedule-consultation/${appointmentId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(scheduleData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to schedule consultation');
//       }

//       setAppointments(prevAppointments =>
//         prevAppointments.map(apt =>
//           apt._id === appointmentId
//             ? {
//                 ...apt,
//                 isConsultationScheduled: true,
//                 ...(showDateTimePicker && newSchedule.date && newSchedule.time && {
//                   appointmentDate: newSchedule.date,
//                   appointmentTime: newSchedule.time
//                 })
//               }
//             : apt
//         )
//       );

//       alert('Consultation scheduled successfully');
//       setTimeout(() => {
//         closeModal();
//       }, 2000);

//     } catch (err) {
//       console.error('Scheduling error:', err);
//       alert('Failed to schedule consultation: ' + err.message);
//     } finally {
//       setIsScheduling(false);
//     }
//   };

//   const openModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedAppointment(null);
//     setShowDateTimePicker(false);
//     setNewSchedule({ date: '', time: '' });
//   };

//   const getStatusConfig = (status) => {
//     const configs = {
//       'scheduled': { color: '#059669', bg: '#dcfce7', text: 'Scheduled' },
//       'completed': { color: '#059669', bg: '#dcfce7', text: 'Completed' },
//       'cancelled': { color: '#dc2626', bg: '#fee2e2', text: 'Cancelled' },
//       'in-progress': { color: '#f59e0b', bg: '#fef3c7', text: 'In Progress' }
//     };
//     return configs[status] || configs['scheduled'];
//   };

//   const getPriorityLevel = (appointment) => {
//     const symptoms = appointment.symptoms?.toLowerCase() || '';
//     if (symptoms.includes('emergency') || symptoms.includes('urgent') || symptoms.includes('severe')) {
//       return { level: 'High', color: '#dc2626' };
//     } else if (symptoms.includes('pain') || symptoms.includes('fever')) {
//       return { level: 'Medium', color: '#f59e0b' };
//     }
//     return { level: 'Normal', color: '#059669' };
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
//     filtersContainer: {
//       backgroundColor: '#ffffff',
//       borderRadius: '20px',
//       padding: '2rem',
//       marginBottom: '2.5rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e5e7eb'
//     },
//     filtersGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//       gap: '1.5rem',
//       alignItems: 'end'
//     },
//     filterGroup: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     filterLabel: {
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       color: '#374151',
//       marginBottom: '0.5rem',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     filterSelect: {
//       padding: '12px 16px',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '16px',
//       backgroundColor: '#ffffff',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontWeight: '500'
//     },
//     searchInput: {
//       padding: '12px 16px',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '16px',
//       backgroundColor: '#ffffff',
//       transition: 'all 0.3s ease',
//       fontWeight: '500'
//     },
//     appointmentsGrid: {
//       display: 'grid',
//       gap: '1.5rem',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))'
//     },
//     appointmentCard: {
//       backgroundColor: '#ffffff',
//       borderRadius: '20px',
//       padding: '2rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e5e7eb',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     cardHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '1.5rem'
//     },
//     patientInfo: {
//       flex: 1
//     },
//     patientName: {
//       fontSize: '1.5rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '0.5rem'
//     },
//     patientDetails: {
//       fontSize: '0.9rem',
//       color: '#6b7280',
//       marginBottom: '0.25rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem'
//     },
//     badgesContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.5rem',
//       alignItems: 'flex-end'
//     },
//     statusBadge: {
//       padding: '6px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em'
//     },
//     priorityBadge: {
//       padding: '4px 10px',
//       borderRadius: '15px',
//       fontSize: '11px',
//       fontWeight: '600',
//       textTransform: 'uppercase'
//     },
//     appointmentMeta: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
//       gap: '1rem',
//       marginBottom: '1.5rem',
//       padding: '1rem',
//       backgroundColor: '#f8fafc',
//       borderRadius: '12px',
//       border: '1px solid #e5e7eb'
//     },
//     metaItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       textAlign: 'center'
//     },
//     metaLabel: {
//       fontSize: '11px',
//       color: '#6b7280',
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       marginBottom: '0.25rem',
//       letterSpacing: '0.05em'
//     },
//     metaValue: {
//       fontSize: '14px',
//       color: '#1f2937',
//       fontWeight: '600'
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '0.75rem',
//       marginTop: '1.5rem',
//       flexWrap: 'wrap'
//     },
//     actionButton: {
//       flex: 1,
//       minWidth: '120px',
//       padding: '10px 16px',
//       borderRadius: '10px',
//       border: 'none',
//       fontSize: '13px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem'
//     },
//     viewButton: {
//       backgroundColor: '#6b7280',
//       color: 'white'
//     },
//     completeButton: {
//       backgroundColor: '#059669',
//       color: 'white'
//     },
//     cancelButton: {
//       backgroundColor: '#dc2626',
//       color: 'white'
//     },
//     scheduleButton: {
//       backgroundColor: '#0891b2',
//       color: 'white'
//     },
//     // Modal Styles
//     modalOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       animation: 'fadeIn 0.3s ease'
//     },
//     modal: {
//       backgroundColor: 'white',
//       borderRadius: '24px',
//       maxWidth: '900px',
//       width: '90%',
//       maxHeight: '90vh',
//       overflow: 'auto',
//       position: 'relative',
//       animation: 'slideIn 0.3s ease'
//     },
//     modalHeader: {
//       padding: '2rem 2.5rem 1.5rem',
//       borderBottom: '2px solid #f8fafc',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
//       color: 'white',
//       borderRadius: '24px 24px 0 0'
//     },
//     modalTitle: {
//       fontSize: '1.75rem',
//       fontWeight: '700',
//       margin: 0
//     },
//     closeButton: {
//       background: 'rgba(255, 255, 255, 0.2)',
//       border: 'none',
//       fontSize: '24px',
//       cursor: 'pointer',
//       color: 'white',
//       padding: '8px',
//       borderRadius: '50%',
//       transition: 'all 0.3s ease',
//       width: '40px',
//       height: '40px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     modalBody: {
//       padding: '2rem 2.5rem'
//     },
//     modalGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '2rem'
//     },
//     modalSection: {
//       backgroundColor: '#f8fafc',
//       padding: '1.5rem',
//       borderRadius: '16px',
//       border: '1px solid #e5e7eb'
//     },
//     modalSectionTitle: {
//       fontSize: '1.1rem',
//       fontWeight: '700',
//       color: '#1f2937',
//       marginBottom: '1rem',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem'
//     },
//     modalField: {
//       marginBottom: '1rem'
//     },
//     modalFieldLabel: {
//       fontSize: '12px',
//       fontWeight: '600',
//       color: '#6b7280',
//       textTransform: 'uppercase',
//       marginBottom: '0.25rem',
//       display: 'block',
//       letterSpacing: '0.05em'
//     },
//     modalFieldValue: {
//       fontSize: '15px',
//       color: '#1f2937',
//       fontWeight: '600'
//     },
//     symptomsSection: {
//       gridColumn: '1 / -1',
//       backgroundColor: '#fef3c7',
//       border: '1px solid #f59e0b'
//     },
//     dateTimePickerSection: {
//       gridColumn: '1 / -1',
//       backgroundColor: '#dcfce7',
//       border: '1px solid #059669'
//     },
//     checkboxContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginBottom: '1rem'
//     },
//     checkbox: {
//       width: '18px',
//       height: '18px',
//       accentColor: '#059669'
//     },
//     checkboxLabel: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#1f2937',
//       cursor: 'pointer'
//     },
//     dateTimeGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '1rem',
//       marginTop: '1rem'
//     },
//     dateTimeInput: {
//       padding: '12px 16px',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '14px',
//       backgroundColor: '#ffffff',
//       fontWeight: '500',
//       width: '100%'
//     },
//     modalActions: {
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '2rem',
//       justifyContent: 'center',
//       flexWrap: 'wrap'
//     },
//     primaryModalButton: {
//       padding: '12px 24px',
//       backgroundColor: '#059669',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       minWidth: '150px'
//     },
//     secondaryModalButton: {
//       padding: '12px 24px',
//       backgroundColor: '#0891b2',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       minWidth: '150px'
//     },
//     disabledButton: {
//       backgroundColor: '#9ca3af',
//       cursor: 'not-allowed'
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
//     errorContainer: {
//       backgroundColor: '#fee2e2',
//       color: '#991b1b',
//       padding: '2rem',
//       borderRadius: '20px',
//       margin: '2rem 0',
//       border: '1px solid #fecaca',
//       textAlign: 'center'
//     },
//     noResults: {
//       textAlign: 'center',
//       padding: '4rem 2rem',
//       backgroundColor: '#ffffff',
//       borderRadius: '24px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e5e7eb',
//       color: '#6b7280'
//     },
//     noResultsIcon: {
//       fontSize: '4rem',
//       marginBottom: '1rem',
//       opacity: 0.3
//     }
//   };

//   const cssRules = `
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
    
//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to { opacity: 1; }
//     }
    
//     @keyframes slideIn {
//       from { 
//         opacity: 0; 
//         transform: scale(0.95) translateY(-20px); 
//       }
//       to { 
//         opacity: 1; 
//         transform: scale(1) translateY(0); 
//       }
//     }
    
//     @media (max-width: 1024px) {
//       .main-content {
//         margin-left: 0 !important;
//         padding: 1.5rem !important;
//       }
//       .appointments-grid {
//         grid-template-columns: 1fr !important;
//       }
//     }
    
//     @media (max-width: 768px) {
//       .filters-grid {
//         grid-template-columns: 1fr !important;
//         gap: 1rem !important;
//       }
//       .stats-grid {
//         grid-template-columns: 1fr 1fr !important;
//         gap: 1rem !important;
//       }
//       .modal-grid {
//         grid-template-columns: 1fr !important;
//       }
//       .date-time-grid {
//         grid-template-columns: 1fr !important;
//       }
//     }
    
//     .filter-select:focus, .search-input:focus, .date-time-input:focus {
//       border-color: #059669 !important;
//       box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
//     }
    
//     .appointment-card:hover {
//       transform: translateY(-4px) !important;
//       box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
//       border-color: #059669 !important;
//     }
    
//     .view-button:hover {
//       background-color: #4b5563 !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .complete-button:hover {
//       background-color: #047857 !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .cancel-button:hover {
//       background-color: #b91c1c !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .schedule-button:hover {
//       background-color: #0e7490 !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .close-button:hover {
//       background-color: rgba(255, 255, 255, 0.3) !important;
//       transform: scale(1.1) !important;
//     }
    
//     .primary-modal-button:hover {
//       background-color: #047857 !important;
//       transform: translateY(-1px) !important;
//     }
    
//     .secondary-modal-button:hover {
//       background-color: #0e7490 !important;
//       transform: translateY(-1px) !important;
//     }
//   `;

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
//                 Loading appointments...
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
//             <div style={styles.errorContainer}>
//               <h3>⚠️ Error Loading Appointments</h3>
//               <p>{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 style={{
//                   ...styles.primaryModalButton,
//                   marginTop: '1rem'
//                 }}
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Calculate stats
//   const stats = {
//     total: appointments.length,
//     scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
//     completed: appointments.filter(apt => apt.status === 'completed').length,
//     cancelled: appointments.filter(apt => apt.status === 'cancelled').length
//   };

//   return (
//     <>
//       <style>{cssRules}</style>
//       <div style={styles.pageContainer}>
//         <DoctorSideBar />
//         <div style={styles.mainContent} className="main-content">
//           {/* Enhanced Header */}
//           <div style={styles.headerSection}>
//             <h1 style={styles.title}>Appointment Management</h1>
//             <p style={styles.subtitle}>
//               Manage and track your patient appointments efficiently
//             </p>
//           </div>

//           {/* Statistics Cards */}
//           <div style={styles.statsGrid} className="stats-grid">
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>📅</div>
//               <div style={styles.statNumber}>{stats.total}</div>
//               <div style={styles.statLabel}>Total Appointments</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>⏰</div>
//               <div style={styles.statNumber}>{stats.scheduled}</div>
//               <div style={styles.statLabel}>Scheduled</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>✅</div>
//               <div style={styles.statNumber}>{stats.completed}</div>
//               <div style={styles.statLabel}>Completed</div>
//             </div>
//             <div style={styles.statCard}>
//               <div style={styles.statIcon}>❌</div>
//               <div style={styles.statNumber}>{stats.cancelled}</div>
//               <div style={styles.statLabel}>Cancelled</div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div style={styles.filtersContainer}>
//             <div style={styles.filtersGrid} className="filters-grid">
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>📊 Status Filter</label>
//                 <select
//                   style={styles.filterSelect}
//                   className="filter-select"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="scheduled">Scheduled</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="in-progress">In Progress</option>
//                 </select>
//               </div>
              
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>📅 Date Filter</label>
//                 <select
//                   style={styles.filterSelect}
//                   className="filter-select"
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                 >
//                   <option value="all">All Dates</option>
//                   <option value="today">Today</option>
//                   <option value="upcoming">Upcoming</option>
//                   <option value="past">Past</option>
//                 </select>
//               </div>
              
//               <div style={styles.filterGroup}>
//                 <label style={styles.filterLabel}>🔍 Search Patient</label>
//                 <input
//                   type="text"
//                   placeholder="Search by name, phone, or email..."
//                   style={styles.searchInput}
//                   className="search-input"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Appointments List */}
//           {filteredAppointments.length === 0 ? (
//             <div style={styles.noResults}>
//               <div style={styles.noResultsIcon}>📋</div>
//               <h3>No appointments found</h3>
//               <p>No appointments match your current filters.</p>
//             </div>
//           ) : (
//             <div style={styles.appointmentsGrid} className="appointments-grid">
//               {filteredAppointments.map((appointment) => {
//                 const statusConfig = getStatusConfig(appointment.status);
//                 const priority = getPriorityLevel(appointment);
                
//                 return (
//                   <div
//                     key={appointment._id}
//                     style={styles.appointmentCard}
//                     className="appointment-card"
//                   >
//                     <div style={styles.cardHeader}>
//                       <div style={styles.patientInfo}>
//                         <h3 style={styles.patientName}>👤 {appointment.patientName}</h3>
//                         <p style={styles.patientDetails}>📞 {appointment.patientPhone}</p>
//                         <p style={styles.patientDetails}>✉️ {appointment.patientEmail}</p>
//                       </div>
//                       <div style={styles.badgesContainer}>
//                         <span
//                           style={{
//                             ...styles.statusBadge,
//                             backgroundColor: statusConfig.bg,
//                             color: statusConfig.color
//                           }}
//                         >
//                           {statusConfig.text}
//                         </span>
//                         <span
//                           style={{
//                             ...styles.priorityBadge,
//                             backgroundColor: priority.color + '20',
//                             color: priority.color
//                           }}
//                         >
//                           {priority.level}
//                         </span>
//                       </div>
//                     </div>

//                     <div style={styles.appointmentMeta}>
//                       <div style={styles.metaItem}>
//                         <span style={styles.metaLabel}>📅 Date</span>
//                         <span style={styles.metaValue}>
//                           {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </span>
//                       </div>
//                       <div style={styles.metaItem}>
//                         <span style={styles.metaLabel}>⏰ Time</span>
//                         <span style={styles.metaValue}>{appointment.appointmentTime}</span>
//                       </div>
//                       <div style={styles.metaItem}>
//                         <span style={styles.metaLabel}>👥 Visit</span>
//                         <span style={styles.metaValue}>
//                           {appointment.previousVisit === 'yes' ? 'Return' : 'New'}
//                         </span>
//                       </div>
//                     </div>

//                     <div style={styles.actionButtons}>
//                       <button
//                         style={{...styles.actionButton, ...styles.viewButton}}
//                         className="view-button"
//                         onClick={() => openModal(appointment)}
//                       >
//                         👁️ Details
//                       </button>
                      
//                       {appointment.status === 'scheduled' && (
//                         <>
//                           <button
//                             style={{...styles.actionButton, ...styles.completeButton}}
//                             className="complete-button"
//                             onClick={() => handleStatusUpdate(appointment._id, 'completed')}
//                           >
//                             ✅ Complete
//                           </button>
//                           <button
//                             style={{...styles.actionButton, ...styles.cancelButton}}
//                             className="cancel-button"
//                             onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
//                           >
//                             ❌ Cancel
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Enhanced Modal */}
//           {showModal && selectedAppointment && (
//             <div style={styles.modalOverlay} onClick={closeModal}>
//               <div
//                 style={styles.modal}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div style={styles.modalHeader}>
//                   <h2 style={styles.modalTitle}>📋 Appointment Details</h2>
//                   <button
//                     style={styles.closeButton}
//                     className="close-button"
//                     onClick={closeModal}
//                   >
//                     ×
//                   </button>
//                 </div>
                
//                 <div style={styles.modalBody}>
//                   <div style={styles.modalGrid} className="modal-grid">
//                     {/* Patient Information */}
//                     <div style={styles.modalSection}>
//                       <h3 style={styles.modalSectionTitle}>👤 Patient Information</h3>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Full Name</label>
//                         <div style={styles.modalFieldValue}>{selectedAppointment.patientName}</div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Phone Number</label>
//                         <div style={styles.modalFieldValue}>{selectedAppointment.patientPhone}</div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Email Address</label>
//                         <div style={styles.modalFieldValue}>{selectedAppointment.patientEmail}</div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Blood Group</label>
//                         <div style={styles.modalFieldValue}>{selectedAppointment.bloodGroup || 'Not specified'}</div>
//                       </div>
//                     </div>

//                     {/* Appointment Details */}
//                     <div style={styles.modalSection}>
//                       <h3 style={styles.modalSectionTitle}>📅 Appointment Details</h3>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Date</label>
//                         <div style={styles.modalFieldValue}>
//                           {new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', {
//                             weekday: 'long',
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                           })}
//                         </div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Time</label>
//                         <div style={styles.modalFieldValue}>{selectedAppointment.appointmentTime}</div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Status</label>
//                         <div style={styles.modalFieldValue}>
//                           <span
//                             style={{
//                               ...styles.statusBadge,
//                               backgroundColor: getStatusConfig(selectedAppointment.status).bg,
//                               color: getStatusConfig(selectedAppointment.status).color
//                             }}
//                           >
//                             {getStatusConfig(selectedAppointment.status).text}
//                           </span>
//                         </div>
//                       </div>
//                       <div style={styles.modalField}>
//                         <label style={styles.modalFieldLabel}>Previous Visit</label>
//                         <div style={styles.modalFieldValue}>
//                           {selectedAppointment.previousVisit === 'yes' ? 'Previous Patient' : 'First Time Visit'}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Symptoms Section */}
//                     {selectedAppointment.symptoms && (
//                       <div style={{...styles.modalSection, ...styles.symptomsSection}}>
//                         <h3 style={styles.modalSectionTitle}>🩺 Symptoms & Medical History</h3>
//                         <div style={styles.modalField}>
//                           <label style={styles.modalFieldLabel}>Reported Symptoms</label>
//                           <div style={styles.modalFieldValue}>{selectedAppointment.symptoms}</div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Date/Time modification section */}
//                     {!selectedAppointment.isConsultationScheduled && selectedAppointment.status !== 'cancelled' && (
//                       <div style={{...styles.modalSection, ...styles.dateTimePickerSection}}>
//                         <h3 style={styles.modalSectionTitle}>⏰ Schedule Options</h3>
//                         <div style={styles.checkboxContainer}>
//                           <input
//                             type="checkbox"
//                             style={styles.checkbox}
//                             checked={showDateTimePicker}
//                             onChange={(e) => setShowDateTimePicker(e.target.checked)}
//                           />
//                           <label style={styles.checkboxLabel}>
//                             Modify appointment date/time
//                           </label>
//                         </div>

//                         {showDateTimePicker && (
//                           <div style={styles.dateTimeGrid} className="date-time-grid">
//                             <div>
//                               <label style={styles.modalFieldLabel}>New Date</label>
//                               <input
//                                 type="date"
//                                 style={styles.dateTimeInput}
//                                 className="date-time-input"
//                                 value={newSchedule.date}
//                                 onChange={(e) => setNewSchedule(prev => ({...prev, date: e.target.value}))}
//                                 min={new Date().toISOString().split('T')[0]}
//                               />
//                             </div>
//                             <div>
//                               <label style={styles.modalFieldLabel}>New Time</label>
//                               <select
//                                 style={styles.dateTimeInput}
//                                 className="date-time-input"
//                                 value={newSchedule.time}
//                                 onChange={(e) => setNewSchedule(prev => ({...prev, time: e.target.value}))}
//                               >
//                                 <option value="">Select time</option>
//                                 <option value="09:00">09:00 AM</option>
//                                 <option value="09:30">09:30 AM</option>
//                                 <option value="10:00">10:00 AM</option>
//                                 <option value="10:30">10:30 AM</option>
//                                 <option value="11:00">11:00 AM</option>
//                                 <option value="11:30">11:30 AM</option>
//                                 <option value="14:00">02:00 PM</option>
//                                 <option value="14:30">02:30 PM</option>
//                                 <option value="15:00">03:00 PM</option>
//                                 <option value="15:30">03:30 PM</option>
//                                 <option value="16:00">04:00 PM</option>
//                                 <option value="16:30">04:30 PM</option>
//                               </select>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Action buttons in modal */}
//                   <div style={styles.modalActions}>
//                     {!selectedAppointment.isConsultationScheduled && selectedAppointment.status !== 'cancelled' ? (
//                       <button
//                         style={{
//                           ...styles.primaryModalButton,
//                           ...(isScheduling ? styles.disabledButton : {})
//                         }}
//                         className="primary-modal-button"
//                         onClick={() => handleScheduleConsultation(selectedAppointment._id)}
//                         disabled={isScheduling}
//                       >
//                         {isScheduling ? '⏳ Scheduling...' : '📋 Schedule Consultation'}
//                       </button>
//                     ) : selectedAppointment.isConsultationScheduled ? (
//                       <button
//                         style={{
//                           ...styles.primaryModalButton,
//                           ...styles.disabledButton
//                         }}
//                         disabled={true}
//                       >
//                         ✅ Consultation Scheduled
//                       </button>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default DoctorAppointments;








import React, { useState, useEffect, useCallback } from "react";
import DoctorSideBar from "./DoctorSideBar";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: ''
  });

  // Move filterAppointments before its usage in useEffect
  const filterAppointments = useCallback(() => {
    let filtered = [...appointments];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Date filter
    const today = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate.toDateString() === today.toDateString();
      });
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter(apt => new Date(apt.appointmentDate) >= today);
    } else if (dateFilter === 'past') {
      filtered = filtered.filter(apt => new Date(apt.appointmentDate) < today);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patientPhone?.includes(searchTerm) ||
        apt.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, statusFilter, dateFilter, searchTerm]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [filterAppointments]);

  const fetchAppointments = async () => {
    try {
      const doctorData = JSON.parse(localStorage.getItem('yourstorage'));
      const doctorId = doctorData?.loginId;

      if (!doctorId) {
        throw new Error('Doctor ID not found. Please login again.');
      }

      const response = await fetch('http://localhost:4000/DPR/doctor-appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/DPR/appointment-status/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }

      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // NEW FUNCTION: Handle completing appointment with appointmentstatus update
  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:4000/DPR/complete-appointment/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'completed',
          appointmentstatus: "1"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete appointment');
      }

      // Update local state
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment._id === appointmentId
            ? { 
                ...appointment, 
                status: 'completed',
                appointmentstatus: "1"
              }
            : appointment
        )
      );

      // Show success message
      alert('Appointment marked as completed successfully!');
      
    } catch (err) {
      console.error('Error completing appointment:', err);
      setError(err.message);
      alert('Failed to complete appointment: ' + err.message);
    }
  };

  const handleScheduleConsultation = async (appointmentId) => {
    try {
      setIsScheduling(true);

      const scheduleData = {
        isConsultationScheduled: true,
        ...(showDateTimePicker && newSchedule.date && newSchedule.time && {
          appointmentDate: newSchedule.date,
          appointmentTime: newSchedule.time
        })
      };

      const response = await fetch(`http://localhost:4000/DPR/schedule-consultation/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule consultation');
      }

      setAppointments(prevAppointments =>
        prevAppointments.map(apt =>
          apt._id === appointmentId
            ? {
                ...apt,
                isConsultationScheduled: true,
                ...(showDateTimePicker && newSchedule.date && newSchedule.time && {
                  appointmentDate: newSchedule.date,
                  appointmentTime: newSchedule.time
                })
              }
            : apt
        )
      );

      alert('Consultation scheduled successfully');
      setTimeout(() => {
        closeModal();
      }, 2000);

    } catch (err) {
      console.error('Scheduling error:', err);
      alert('Failed to schedule consultation: ' + err.message);
    } finally {
      setIsScheduling(false);
    }
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setShowDateTimePicker(false);
    setNewSchedule({ date: '', time: '' });
  };

  const getStatusConfig = (status) => {
    const configs = {
      'scheduled': { color: '#059669', bg: '#dcfce7', text: 'Scheduled' },
      'completed': { color: '#059669', bg: '#dcfce7', text: 'Completed' },
      'cancelled': { color: '#dc2626', bg: '#fee2e2', text: 'Cancelled' },
      'in-progress': { color: '#f59e0b', bg: '#fef3c7', text: 'In Progress' }
    };
    return configs[status] || configs['scheduled'];
  };

  const getPriorityLevel = (appointment) => {
    const symptoms = appointment.symptoms?.toLowerCase() || '';
    if (symptoms.includes('emergency') || symptoms.includes('urgent') || symptoms.includes('severe')) {
      return { level: 'High', color: '#dc2626' };
    } else if (symptoms.includes('pain') || symptoms.includes('fever')) {
      return { level: 'Medium', color: '#f59e0b' };
    }
    return { level: 'Normal', color: '#059669' };
  };

  // Helper function to check if appointment is completed
  const isAppointmentCompleted = (appointment) => {
    return appointment.appointmentstatus === "1" || appointment.status === 'completed';
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
    filtersContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      alignItems: 'end'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    filterLabel: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    filterSelect: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    searchInput: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    appointmentsGrid: {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))'
    },
    appointmentCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem'
    },
    patientInfo: {
      flex: 1
    },
    patientName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    patientDetails: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    badgesContainer: {
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
    priorityBadge: {
      padding: '4px 10px',
      borderRadius: '15px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    appointmentMeta: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    metaItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    metaLabel: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '0.25rem',
      letterSpacing: '0.05em'
    },
    metaValue: {
      fontSize: '14px',
      color: '#1f2937',
      fontWeight: '600'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1.5rem',
      flexWrap: 'wrap'
    },
    actionButton: {
      flex: 1,
      minWidth: '120px',
      padding: '10px 16px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    viewButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    completeButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    completedButton: {
      backgroundColor: '#22c55e',
      color: 'white',
      cursor: 'default',
      opacity: 0.8
    },
    cancelButton: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    scheduleButton: {
      backgroundColor: '#0891b2',
      color: 'white'
    },
    // Modal and other styles remain the same...
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '24px',
      maxWidth: '900px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
      animation: 'slideIn 0.3s ease'
    },
    modalHeader: {
      padding: '2rem 2.5rem 1.5rem',
      borderBottom: '2px solid #f8fafc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: 'white',
      borderRadius: '24px 24px 0 0'
    },
    modalTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      margin: 0
    },
    closeButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: 'white',
      padding: '8px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '2rem 2.5rem'
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    modalSection: {
      backgroundColor: '#f8fafc',
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid #e5e7eb'
    },
    modalSectionTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    modalField: {
      marginBottom: '1rem'
    },
    modalFieldLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      marginBottom: '0.25rem',
      display: 'block',
      letterSpacing: '0.05em'
    },
    modalFieldValue: {
      fontSize: '15px',
      color: '#1f2937',
      fontWeight: '600'
    },
    symptomsSection: {
      gridColumn: '1 / -1',
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b'
    },
    dateTimePickerSection: {
      gridColumn: '1 / -1',
      backgroundColor: '#dcfce7',
      border: '1px solid #059669'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#059669'
    },
    checkboxLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      cursor: 'pointer'
    },
    dateTimeGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginTop: '1rem'
    },
    dateTimeInput: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      fontWeight: '500',
      width: '100%'
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryModalButton: {
      padding: '12px 24px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      minWidth: '150px'
    },
    secondaryModalButton: {
      padding: '12px 24px',
      backgroundColor: '#0891b2',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      minWidth: '150px'
    },
    disabledButton: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
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
    errorContainer: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      padding: '2rem',
      borderRadius: '20px',
      margin: '2rem 0',
      border: '1px solid #fecaca',
      textAlign: 'center'
    },
    noResults: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      color: '#6b7280'
    },
    noResultsIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.3
    }
  };

  const cssRules = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0 !important;
        padding: 1.5rem !important;
      }
      .appointments-grid {
        grid-template-columns: 1fr !important;
      }
    }
    
    @media (max-width: 768px) {
      .filters-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 1rem !important;
      }
      .modal-grid {
        grid-template-columns: 1fr !important;
      }
      .date-time-grid {
        grid-template-columns: 1fr !important;
      }
    }
    
    .filter-select:focus, .search-input:focus, .date-time-input:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .appointment-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      border-color: #059669 !important;
    }
    
    .view-button:hover {
      background-color: #4b5563 !important;
      transform: translateY(-1px) !important;
    }
    
    .complete-button:hover {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .cancel-button:hover {
      background-color: #b91c1c !important;
      transform: translateY(-1px) !important;
    }
    
    .schedule-button:hover {
      background-color: #0e7490 !important;
      transform: translateY(-1px) !important;
    }
    
    .close-button:hover {
      background-color: rgba(255, 255, 255, 0.3) !important;
      transform: scale(1.1) !important;
    }
    
    .primary-modal-button:hover {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .secondary-modal-button:hover {
      background-color: #0e7490 !important;
      transform: translateY(-1px) !important;
    }
  `;

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
                Loading appointments...
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
            <div style={styles.errorContainer}>
              <h3>⚠️ Error Loading Appointments</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  ...styles.primaryModalButton,
                  marginTop: '1rem'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Calculate stats - Updated to use appointmentstatus
  const stats = {
    total: appointments.length,
    scheduled: appointments.filter(apt => apt.status === 'scheduled' && apt.appointmentstatus !== "1").length,
    completed: appointments.filter(apt => apt.appointmentstatus === "1" || apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length
  };

  return (
    <>
      <style>{cssRules}</style>
      <div style={styles.pageContainer}>
        <DoctorSideBar />
        <div style={styles.mainContent} className="main-content">
          {/* Enhanced Header */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>Appointment Management</h1>
            <p style={styles.subtitle}>
              Manage and track your patient appointments efficiently
            </p>
          </div>

          {/* Statistics Cards */}
          <div style={styles.statsGrid} className="stats-grid">
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Total Appointments</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⏰</div>
              <div style={styles.statNumber}>{stats.scheduled}</div>
              <div style={styles.statLabel}>Scheduled</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>✅</div>
              <div style={styles.statNumber}>{stats.completed}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>❌</div>
              <div style={styles.statNumber}>{stats.cancelled}</div>
              <div style={styles.statLabel}>Cancelled</div>
            </div>
          </div>

          {/* Filters */}
          <div style={styles.filtersContainer}>
            <div style={styles.filtersGrid} className="filters-grid">
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>📊 Status Filter</label>
                <select
                  style={styles.filterSelect}
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>📅 Date Filter</label>
                <select
                  style={styles.filterSelect}
                  className="filter-select"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
              
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>🔍 Search Patient</label>
                <input
                  type="text"
                  placeholder="Search by name, phone, or email..."
                  style={styles.searchInput}
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div style={styles.noResults}>
              <div style={styles.noResultsIcon}>📋</div>
              <h3>No appointments found</h3>
              <p>No appointments match your current filters.</p>
            </div>
          ) : (
            <div style={styles.appointmentsGrid} className="appointments-grid">
              {filteredAppointments.map((appointment) => {
                const statusConfig = getStatusConfig(appointment.status);
                const priority = getPriorityLevel(appointment);
                const isCompleted = isAppointmentCompleted(appointment);
                
                return (
                  <div
                    key={appointment._id}
                    style={styles.appointmentCard}
                    className="appointment-card"
                  >
                    <div style={styles.cardHeader}>
                      <div style={styles.patientInfo}>
                        <h3 style={styles.patientName}>👤 {appointment.patientName}</h3>
                        <p style={styles.patientDetails}>📞 {appointment.patientPhone}</p>
                        <p style={styles.patientDetails}>✉️ {appointment.patientEmail}</p>
                      </div>
                      <div style={styles.badgesContainer}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: isCompleted ? '#dcfce7' : statusConfig.bg,
                            color: isCompleted ? '#059669' : statusConfig.color
                          }}
                        >
                          {isCompleted ? 'Completed' : statusConfig.text}
                        </span>
                        <span
                          style={{
                            ...styles.priorityBadge,
                            backgroundColor: priority.color + '20',
                            color: priority.color
                          }}
                        >
                          {priority.level}
                        </span>
                      </div>
                    </div>

                    <div style={styles.appointmentMeta}>
                      <div style={styles.metaItem}>
                        <span style={styles.metaLabel}>📅 Date</span>
                        <span style={styles.metaValue}>
                          {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div style={styles.metaItem}>
                        <span style={styles.metaLabel}>⏰ Time</span>
                        <span style={styles.metaValue}>{appointment.appointmentTime}</span>
                      </div>
                      <div style={styles.metaItem}>
                        <span style={styles.metaLabel}>👥 Visit</span>
                        <span style={styles.metaValue}>
                          {appointment.previousVisit === 'yes' ? 'Return' : 'New'}
                        </span>
                      </div>
                    </div>

                    <div style={styles.actionButtons}>
                      <button
                        style={{...styles.actionButton, ...styles.viewButton}}
                        className="view-button"
                        onClick={() => openModal(appointment)}
                      >
                        👁️ Details
                      </button>
                      
                      {appointment.status === 'scheduled' && !isCompleted && (
                        <>
                          <button
                            style={{...styles.actionButton, ...styles.completeButton}}
                            className="complete-button"
                            onClick={() => handleCompleteAppointment(appointment._id)}
                          >
                            ✅ Complete
                          </button>
                          {/* <button
                            style={{...styles.actionButton, ...styles.cancelButton}}
                            className="cancel-button"
                            onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                          >
                            ❌ Cancel
                          </button> */}
                        </>
                      )}
                      
                      {isCompleted && (
                        <button
                          style={{...styles.actionButton, ...styles.completedButton}}
                          disabled
                        >
                          ✅ Completed
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal remains the same as before */}
          {showModal && selectedAppointment && (
            <div style={styles.modalOverlay} onClick={closeModal}>
              <div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>📋 Appointment Details</h2>
                  <button
                    style={styles.closeButton}
                    className="close-button"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
                
                <div style={styles.modalBody}>
                  <div style={styles.modalGrid} className="modal-grid">
                    {/* Patient Information */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.modalSectionTitle}>👤 Patient Information</h3>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Full Name</label>
                        <div style={styles.modalFieldValue}>{selectedAppointment.patientName}</div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Phone Number</label>
                        <div style={styles.modalFieldValue}>{selectedAppointment.patientPhone}</div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Email Address</label>
                        <div style={styles.modalFieldValue}>{selectedAppointment.patientEmail}</div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Blood Group</label>
                        <div style={styles.modalFieldValue}>{selectedAppointment.bloodGroup || 'Not specified'}</div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.modalSectionTitle}>📅 Appointment Details</h3>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Date</label>
                        <div style={styles.modalFieldValue}>
                          {new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Time</label>
                        <div style={styles.modalFieldValue}>{selectedAppointment.appointmentTime}</div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Status</label>
                        <div style={styles.modalFieldValue}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              backgroundColor: isAppointmentCompleted(selectedAppointment) ? '#dcfce7' : getStatusConfig(selectedAppointment.status).bg,
                              color: isAppointmentCompleted(selectedAppointment) ? '#059669' : getStatusConfig(selectedAppointment.status).color
                            }}
                          >
                            {isAppointmentCompleted(selectedAppointment) ? 'Completed' : getStatusConfig(selectedAppointment.status).text}
                          </span>
                        </div>
                      </div>
                      <div style={styles.modalField}>
                        <label style={styles.modalFieldLabel}>Previous Visit</label>
                        <div style={styles.modalFieldValue}>
                          {selectedAppointment.previousVisit === 'yes' ? 'Previous Patient' : 'First Time Visit'}
                        </div>
                      </div>
                    </div>

                    {/* Symptoms Section */}
                    {selectedAppointment.symptoms && (
                      <div style={{...styles.modalSection, ...styles.symptomsSection}}>
                        <h3 style={styles.modalSectionTitle}>🩺 Symptoms & Medical History</h3>
                        <div style={styles.modalField}>
                          <label style={styles.modalFieldLabel}>Reported Symptoms</label>
                          <div style={styles.modalFieldValue}>{selectedAppointment.symptoms}</div>
                        </div>
                      </div>
                    )}

                    {/* Date/Time modification section - only show if not completed */}
                    {!selectedAppointment.isConsultationScheduled && selectedAppointment.status !== 'cancelled' && !isAppointmentCompleted(selectedAppointment) && (
                      <div style={{...styles.modalSection, ...styles.dateTimePickerSection}}>
                        <h3 style={styles.modalSectionTitle}>⏰ Schedule Options</h3>
                        <div style={styles.checkboxContainer}>
                          <input
                            type="checkbox"
                            style={styles.checkbox}
                            checked={showDateTimePicker}
                            onChange={(e) => setShowDateTimePicker(e.target.checked)}
                          />
                          <label style={styles.checkboxLabel}>
                            Modify appointment date/time
                          </label>
                        </div>

                        {showDateTimePicker && (
                          <div style={styles.dateTimeGrid} className="date-time-grid">
                            <div>
                              <label style={styles.modalFieldLabel}>New Date</label>
                              <input
                                type="date"
                                style={styles.dateTimeInput}
                                className="date-time-input"
                                value={newSchedule.date}
                                onChange={(e) => setNewSchedule(prev => ({...prev, date: e.target.value}))}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <label style={styles.modalFieldLabel}>New Time</label>
                              <select
                                style={styles.dateTimeInput}
                                className="date-time-input"
                                value={newSchedule.time}
                                onChange={(e) => setNewSchedule(prev => ({...prev, time: e.target.value}))}
                              >
                                <option value="">Select time</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="09:30">09:30 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="10:30">10:30 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="11:30">11:30 AM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="14:30">02:30 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="15:30">03:30 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="16:30">04:30 PM</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action buttons in modal - only show if not completed */}
                  <div style={styles.modalActions}>
                    {!isAppointmentCompleted(selectedAppointment) && !selectedAppointment.isConsultationScheduled && selectedAppointment.status !== 'cancelled' ? (
                      <button
                        style={{
                          ...styles.primaryModalButton,
                          ...(isScheduling ? styles.disabledButton : {})
                        }}
                        className="primary-modal-button"
                        onClick={() => handleScheduleConsultation(selectedAppointment._id)}
                        disabled={isScheduling}
                      >
                        {isScheduling ? '⏳ Scheduling...' : '📋 Schedule Consultation'}
                      </button>
                    ) : isAppointmentCompleted(selectedAppointment) ? (
                      <button
                        style={{
                          ...styles.primaryModalButton,
                          ...styles.disabledButton
                        }}
                        disabled={true}
                      >
                        ✅ Appointment Completed
                      </button>
                    ) : selectedAppointment.isConsultationScheduled ? (
                      <button
                        style={{
                          ...styles.primaryModalButton,
                          ...styles.disabledButton
                        }}
                        disabled={true}
                      >
                        ✅ Consultation Scheduled
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorAppointments;
