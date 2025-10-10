// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import HospitalSidebar from './HospitalSidebar';
// import url from '../Admin/imageUrl';
// import './doctorDetails.css';

// function DoctorDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { doctor } = location.state || {};

//   const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

//   const [daysOfWeek, setDaysOfWeek] = useState([]);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [schedules, setSchedules] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (doctor && doctor._id) {
//       setLoading(true);
//       fetch(`http://localhost:4000/DPR/getSchedules/${doctor._id}`)
//         .then(res => res.json())
//         .then(result => {
//           if (result.success) {
//             setSchedules(result.schedules || []);
//           }
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error(err);
//           setLoading(false);
//         });
//     } else {
//       navigate('/hospitaldoctorview');
//     }
//   }, [doctor, navigate]);

//   if (!doctor) {
//     return null;
//   }

//   const handleCheckboxChange = (day) => {
//     if (daysOfWeek.includes(day)) {
//       setDaysOfWeek(daysOfWeek.filter(d => d !== day));
//     } else {
//       setDaysOfWeek([...daysOfWeek, day]);
//     }
//   };

//   const handleAddOrUpdateSchedule = async () => {
//     if (daysOfWeek.length === 0 || !startTime || !endTime) {
//       alert('Please fill all fields');
//       return;
//     }

//     if (startTime >= endTime) {
//       alert('End time must be after start time');
//       return;
//     }

//     setSubmitting(true);
//     const payload = { daysOfWeek, startTime, endTime };
    
//     try {
//       if (editingId) {
//         payload.scheduleId = editingId;
//         const response = await fetch("http://localhost:4000/DPR/updateSchedule", {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         });
        
//         const result = await response.json();
        
//         if (result.success) {
//           setSchedules(schedules.map(sch => 
//             sch._id === editingId 
//               ? { ...sch, daysOfWeek, startTime, endTime }
//               : sch
//           ));
//           resetForm();
//           alert('Schedule updated successfully!');
//         }
//       } else {
//         payload.doctorId = doctor._id;
//         const response = await fetch("http://localhost:4000/DPR/addSchedule", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         });
        
//         const result = await response.json();
        
//         if (result.success) {
//           const newSchedule = {
//             _id: result.schedule._id || Date.now(),
//             daysOfWeek,
//             startTime,
//             endTime,
//             doctorId: doctor._id
//           };
          
//           setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
//           resetForm();
//           alert('Schedule added successfully!');
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Network error occurred');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEdit = (schedule) => {
//     setEditingId(schedule._id);
//     setDaysOfWeek([...schedule.daysOfWeek]);
//     setStartTime(schedule.startTime);
//     setEndTime(schedule.endTime);
//   };

//   const handleDelete = async (scheduleId) => {
//     let id = {
//         scheduleId: scheduleId
//     }
//     fetch("http://localhost:4000/DPR/deleteSchedule", {
//         method: 'POST',
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json"
//         }, body: JSON.stringify(id)
//     }).then((res)=> res.json())
//     .then((result)=>{
//         console.log(result)
//         window.location.reload();
//     })
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setDaysOfWeek([]);
//     setStartTime('');
//     setEndTime('');
//   };

//   const formatTime = (time) => {
//     return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="doctor-schedule-page">
//       <HospitalSidebar />
      
//       <div className="doctor-schedule-content">
//         {/* Header */}
//         <div className="page-header">
//           <button className="back-button" onClick={() => navigate('/hospitaldoctorview')}>
//             ← Back
//           </button>
//           <h1 className="page-title">Doctor Schedule</h1>
//         </div>

//         <div className="main-layout">
//           {/* Doctor Profile Card */}
//           <div className="doctor-profile">
//             <div className="profile-image">
//               <img 
//                 src={doctor.profileImage ? url + doctor.profileImage : '/default-doctor.png'} 
//                 alt="Doctor Profile"
//                 onError={(e) => {
//                   e.target.src = '/default-doctor.png';
//                 }}
//               />
//               <div className="status-dot"></div>
//             </div>
            
//             <h2 className="doctor-name">Dr. {doctor.name}</h2>
//             <p className="doctor-specialty">{doctor.specialization}</p>
            
//             <div className="doctor-details">
//               <div className="detail-row">
//                 <span className="label">Qualification:</span>
//                 <span className="value">{doctor.qualification}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">Experience:</span>
//                 <span className="value">{doctor.yearsOfExperience} years</span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">Department:</span>
//                 <span className="value">{doctor.department}</span>
//               </div>
//             </div>
//           </div>

//           {/* Schedule Management */}
//           <div className="schedule-management">
//             {/* Show form only if no schedules exist OR if editing */}
//             {(schedules.length === 0 || editingId) && (
//               <div className="schedule-form">
//                 <h3>{editingId ? "Update Working Hours" : "Add Working Hours"}</h3>

//                 <div className="form-section">
//                   <label>Working Days:</label>
//                   <div className="days-selector">
//                     {weekDays.map(day => (
//                       <label key={day} className={`day-option ${daysOfWeek.includes(day) ? 'selected' : ''}`}>
//                         <input
//                           type="checkbox"
//                           checked={daysOfWeek.includes(day)}
//                           onChange={() => handleCheckboxChange(day)}
//                         />
//                         <span>{day.slice(0, 3)}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="time-section">
//                   <div className="time-field">
//                     <label>Start Time:</label>
//                     <input 
//                       type="time" 
//                       value={startTime} 
//                       onChange={e => setStartTime(e.target.value)} 
//                       disabled={submitting}
//                     />
//                   </div>
                  
//                   <div className="time-field">
//                     <label>End Time:</label>
//                     <input 
//                       type="time" 
//                       value={endTime} 
//                       onChange={e => setEndTime(e.target.value)} 
//                       disabled={submitting}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-buttons">
//                   {editingId && (
//                     <button 
//                       onClick={resetForm} 
//                       className="cancel-button"
//                       disabled={submitting}
//                     >
//                       Cancel
//                     </button>
//                   )}
//                   <button 
//                     onClick={handleAddOrUpdateSchedule} 
//                     className="save-button"
//                     disabled={submitting}
//                   >
//                     {submitting 
//                       ? (editingId ? "Updating..." : "Saving...") 
//                       : (editingId ? "Update Schedule" : "Save Schedule")
//                     }
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Current Schedule */}
//             <div className="current-schedule">
//               <div className="schedule-header">
//                 <h3>Current Schedule</h3>
//                 <span className="schedule-badge">{schedules.length}</span>
//               </div>

//               {loading ? (
//                 <div className="loading-state">Loading...</div>
//               ) : schedules.length === 0 ? (
//                 <div className="empty-schedule">
//                   <p>No schedule set yet</p>
//                 </div>
//               ) : (
//                 <div className="schedule-list">
//                   {schedules.map(schedule => (
//                     <div key={schedule._id} className="schedule-item">
//                       <div className="schedule-info">
//                         <div className="days-tags">
//                           {schedule.daysOfWeek.map(day => (
//                             <span key={day} className="day-tag">{day.toUpperCase()}</span>
//                           ))}
//                         </div>
//                         <div className="time-display">
//                           {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
//                         </div>
//                       </div>
//                       <div className="schedule-buttons">
//                         <button 
//                           onClick={() => handleEdit(schedule)} 
//                           className="edit-button"
//                           disabled={submitting}
//                         >
//                           EDIT
//                         </button>
//                         <button 
//                           onClick={() => handleDelete(schedule._id)} 
//                           className="delete-button"
//                           disabled={submitting}
//                         >
//                           DELETE
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorDetails;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, GraduationCap, Award, Building, Stethoscope, Phone, Mail, Edit, Trash2, Save, X, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import HospitalSidebar from './HospitalSidebar';
import url from '../Admin/imageUrl';

function DoctorDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor } = location.state || {};

  const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (doctor && doctor._id) {
      setLoading(true);
      fetch(`http://localhost:4000/DPR/getSchedules/${doctor._id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            setSchedules(result.schedules || []);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      navigate('/hospitaldoctorview');
    }
  }, [doctor, navigate]);

  if (!doctor) {
    return null;
  }

  // Fixed day selection handler
  const handleCheckboxChange = (day) => {
    setDaysOfWeek(prevDays => {
      if (prevDays.includes(day)) {
        return prevDays.filter(d => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  const handleAddOrUpdateSchedule = async () => {
    if (daysOfWeek.length === 0 || !startTime || !endTime) {
      alert('Please fill all fields');
      return;
    }

    if (startTime >= endTime) {
      alert('End time must be after start time');
      return;
    }

    setSubmitting(true);
    const payload = { daysOfWeek, startTime, endTime };
    
    try {
      if (editingId) {
        payload.scheduleId = editingId;
        const response = await fetch("http://localhost:4000/DPR/updateSchedule", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
          setSchedules(schedules.map(sch => 
            sch._id === editingId 
              ? { ...sch, daysOfWeek, startTime, endTime }
              : sch
          ));
          resetForm();
          alert('Schedule updated successfully!');
        }
      } else {
        payload.doctorId = doctor._id;
        const response = await fetch("http://localhost:4000/DPR/addSchedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
          const newSchedule = {
            _id: result.schedule._id || Date.now(),
            daysOfWeek,
            startTime,
            endTime,
            doctorId: doctor._id
          };
          
          setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
          resetForm();
          alert('Schedule added successfully!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);
    setDaysOfWeek([...schedule.daysOfWeek]);
    setStartTime(schedule.startTime);
    setEndTime(schedule.endTime);
  };

  const handleDelete = async (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      let id = {
          scheduleId: scheduleId
      }
      fetch("http://localhost:4000/DPR/deleteSchedule", {
          method: 'POST',
          headers: {
              Accept: "application/json",
              'Content-Type': "application/json"
          }, body: JSON.stringify(id)
      }).then((res)=> res.json())
      .then((result)=>{
          console.log(result)
          setSchedules(schedules.filter(sch => sch._id !== scheduleId));
      })
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setDaysOfWeek([]);
    setStartTime('');
    setEndTime('');
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Professional Hospital Theme Styles
  const layoutContainerStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContentStyles = {
    marginLeft: '280px',
    width: 'calc(100% - 280px)',
    minHeight: '100vh',
    padding: '0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  };

  const headerStyles = {
    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    padding: '2rem 3rem',
    color: 'white',
    boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
  };

  const headerContentStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const backButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const headerTitleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const contentContainerStyles = {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '3rem',
    padding: '3rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const doctorProfileStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    height: 'fit-content',
    position: 'sticky',
    top: '2rem'
  };

  const profileImageContainerStyles = {
    position: 'relative',
    width: '120px',
    height: '120px',
    margin: '0 auto 1.5rem auto'
  };

  const profileImageStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    objectFit: 'cover',
    border: '4px solid #e2e8f0'
  };

  const statusDotStyles = {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
  };

  const doctorNameStyles = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    margin: '0 0 0.5rem 0'
  };

  const doctorSpecialtyStyles = {
    fontSize: '1.1rem',
    color: '#1e40af',
    textAlign: 'center',
    margin: '0 0 2rem 0',
    fontWeight: '600'
  };

  const detailRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #f1f5f9'
  };

  const detailIconStyles = {
    width: '20px',
    height: '20px',
    color: '#1e40af',
    flexShrink: 0
  };

  const detailLabelStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    minWidth: '80px'
  };

  const detailValueStyles = {
    fontSize: '0.95rem',
    color: '#1e293b',
    fontWeight: '600',
    flex: 1
  };

  const scheduleManagementStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const scheduleFormStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0'
  };

  const formTitleStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 2rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const formSectionStyles = {
    marginBottom: '2rem'
  };

  const sectionLabelStyles = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const daysSelectorStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem'
  };

  // Fixed day option styles - removed the function wrapper
  const getDayOptionStyles = (isSelected) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    borderRadius: '12px',
    border: '2px solid',
    borderColor: isSelected ? '#1e40af' : '#e2e8f0',
    backgroundColor: isSelected ? '#eff6ff' : 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: isSelected ? '#1e40af' : '#64748b',
    userSelect: 'none',
    minHeight: '60px'
  });

  const timeGridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  };

  const timeFieldStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const inputStyles = {
    padding: '0.875rem 1rem',
    fontSize: '0.95rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: 'white',
    fontFamily: 'inherit'
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem'
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    minWidth: '120px',
    justifyContent: 'center'
  };

  const cancelButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'white',
    color: '#6b7280',
    border: '2px solid #e2e8f0'
  };

  const saveButtonStyles = {
    ...buttonStyles,
    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
  };

  const scheduleListStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0'
  };

  const scheduleHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const scheduleBadgeStyles = {
    padding: '0.5rem 1rem',
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600'
  };

  const scheduleItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0'
  };

  const daysTagsStyles = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem'
  };

  const dayTagStyles = {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#1e40af',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600'
  };

  const timeDisplayStyles = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const actionButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const editActionStyles = {
    ...actionButtonStyles,
    backgroundColor: '#f0fdf4',
    color: '#166534'
  };

  const deleteActionStyles = {
    ...actionButtonStyles,
    backgroundColor: '#fef2f2',
    color: '#dc2626'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '3rem',
    color: '#64748b'
  };

  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    fontSize: '1.1rem',
    color: '#1e40af'
  };

  const keyframesStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframesStyles}</style>
      <div style={layoutContainerStyles}>
        <HospitalSidebar />
        
        <div style={mainContentStyles}>
          {/* Professional Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <button 
                style={backButtonStyles}
                onClick={() => navigate('/hospitaldoctorview')}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <ArrowLeft size={16} />
                Back to Directory
              </button>
              <h1 style={headerTitleStyles}>
                <Calendar size={32} />
                Doctor Schedule Management
              </h1>
            </div>
          </div>

          <div style={contentContainerStyles}>
            {/* Doctor Profile Card */}
            <div style={doctorProfileStyles}>
              <div style={profileImageContainerStyles}>
                <img 
                  src={doctor.profileImage ? url + doctor.profileImage : 'https://via.placeholder.com/120x120/1e40af/ffffff?text=DR'} 
                  alt="Doctor Profile"
                  style={profileImageStyles}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/120x120/1e40af/ffffff?text=DR';
                  }}
                />
                <div style={statusDotStyles}></div>
              </div>
              
              <h2 style={doctorNameStyles}>Dr. {doctor.name}</h2>
              <p style={doctorSpecialtyStyles}>{doctor.specialization}</p>
              
              <div>
                <div style={detailRowStyles}>
                  <GraduationCap style={detailIconStyles} />
                  <span style={detailLabelStyles}>Qualification:</span>
                  <span style={detailValueStyles}>{doctor.qualification}</span>
                </div>
                <div style={detailRowStyles}>
                  <Clock style={detailIconStyles} />
                  <span style={detailLabelStyles}>Experience:</span>
                  <span style={detailValueStyles}>{doctor.yearsOfExperience} years</span>
                </div>
                <div style={detailRowStyles}>
                  <Building style={detailIconStyles} />
                  <span style={detailLabelStyles}>Department:</span>
                  <span style={detailValueStyles}>{doctor.department}</span>
                </div>
                <div style={detailRowStyles}>
                  <Award style={detailIconStyles} />
                  <span style={detailLabelStyles}>License:</span>
                  <span style={detailValueStyles}>{doctor.licenseNumber}</span>
                </div>
                <div style={detailRowStyles}>
                  <Phone style={detailIconStyles} />
                  <span style={detailLabelStyles}>Phone:</span>
                  <span style={detailValueStyles}>{doctor.phone}</span>
                </div>
                <div style={{ ...detailRowStyles, borderBottom: 'none' }}>
                  <Mail style={detailIconStyles} />
                  <span style={detailLabelStyles}>Email:</span>
                  <span style={detailValueStyles}>{doctor.email}</span>
                </div>
              </div>
            </div>

            {/* Schedule Management */}
            <div style={scheduleManagementStyles}>
              {/* Schedule Form */}
              {(schedules.length === 0 || editingId) && (
                <div style={scheduleFormStyles}>
                  <h3 style={formTitleStyles}>
                    <Plus size={20} />
                    {editingId ? "Update Working Hours" : "Add Working Hours"}
                  </h3>

                  <div style={formSectionStyles}>
                    <label style={sectionLabelStyles}>
                      <Calendar size={16} />
                      Working Days:
                    </label>
                    <div style={daysSelectorStyles}>
                      {weekDays.map(day => {
                        const isSelected = daysOfWeek.includes(day);
                        return (
                          <div
                            key={day} 
                            style={getDayOptionStyles(isSelected)}
                            onClick={() => handleCheckboxChange(day)}
                            onMouseOver={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#1e40af';
                                e.target.style.backgroundColor = '#f8fafc';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isSelected) {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.backgroundColor = 'white';
                              }
                            }}
                          >
                            <span>{day.slice(0, 3)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={formSectionStyles}>
                    <label style={sectionLabelStyles}>
                      <Clock size={16} />
                      Working Hours:
                    </label>
                    <div style={timeGridStyles}>
                      <div style={timeFieldStyles}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>Start Time:</label>
                        <input 
                          type="time" 
                          value={startTime} 
                          onChange={e => setStartTime(e.target.value)} 
                          style={inputStyles}
                          disabled={submitting}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1e40af';
                            e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      
                      <div style={timeFieldStyles}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#64748b' }}>End Time:</label>
                        <input 
                          type="time" 
                          value={endTime} 
                          onChange={e => setEndTime(e.target.value)} 
                          style={inputStyles}
                          disabled={submitting}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1e40af';
                            e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={buttonGroupStyles}>
                    {editingId && (
                      <button 
                        onClick={resetForm} 
                        style={cancelButtonStyles}
                        disabled={submitting}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#cbd5e1';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = '#e2e8f0';
                        }}
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    )}
                    <button 
                      onClick={handleAddOrUpdateSchedule} 
                      style={saveButtonStyles}
                      disabled={submitting}
                      onMouseOver={(e) => {
                        if (!submitting) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.4)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!submitting) {
                          e.target.style.transform = 'translateY(0px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3)';
                        }
                      }}
                    >
                      {submitting ? (
                        <>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid white',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          {editingId ? "Updating..." : "Saving..."}
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          {editingId ? "Update Schedule" : "Save Schedule"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Current Schedule */}
              <div style={scheduleListStyles}>
                <div style={scheduleHeaderStyles}>
                  <h3 style={formTitleStyles}>
                    <CheckCircle size={20} />
                    Current Schedule
                  </h3>
                  <span style={scheduleBadgeStyles}>{schedules.length} schedule{schedules.length !== 1 ? 's' : ''}</span>
                </div>

                {loading ? (
                  <div style={loadingStyles}>
                    <Clock size={20} style={{ marginRight: '0.5rem' }} />
                    Loading schedules...
                  </div>
                ) : schedules.length === 0 ? (
                  <div style={emptyStateStyles}>
                    <Calendar size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                    <h4 style={{ color: '#64748b', marginBottom: '0.5rem' }}>No schedule set yet</h4>
                    <p style={{ color: '#94a3b8' }}>Add working hours to manage doctor availability</p>
                  </div>
                ) : (
                  <div>
                    {schedules.map(schedule => (
                      <div key={schedule._id} style={scheduleItemStyles}>
                        <div style={{ flex: 1 }}>
                          <div style={daysTagsStyles}>
                            {schedule.daysOfWeek.map(day => (
                              <span key={day} style={dayTagStyles}>{day.slice(0, 3).toUpperCase()}</span>
                            ))}
                          </div>
                          <div style={timeDisplayStyles}>
                            <Clock size={16} />
                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleEdit(schedule)} 
                            style={editActionStyles}
                            disabled={submitting}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#dcfce7'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#f0fdf4'}
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(schedule._id)} 
                            style={deleteActionStyles}
                            disabled={submitting}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#fee2e2'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#fef2f2'}
                          >
                            <Trash2 size={14} />
                            Delete
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
      </div>
    </>
  );
}

export default DoctorDetails;

