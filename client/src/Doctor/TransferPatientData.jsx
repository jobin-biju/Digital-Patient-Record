// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import url from '../Admin/imageUrl';
// import axios from "axios";
// import DoctorSideBar from "./DoctorSideBar";

// function TransferPatientData() {
//   const location = useLocation();
//   const { appointmentId } = location.state || {};

//   const [appointment, setAppointment] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [labReports, setLabReports] = useState([]);
//   const [hospitalDoctors, setHospitalDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [loading, setLoading] = useState(true);

//   const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
//   const loginId = auth.loginId; // ✅ Logged-in doctor ID

//   // Fetch appointment, prescriptions, lab reports
//   useEffect(() => {
//     if (!appointmentId) return;

//     const fetchAppointment = axios.get(`http://localhost:4000/DPR/appointment/${appointmentId}`);
//     const fetchPrescriptions = axios.get(`http://localhost:4000/DPR/prescriptions/${appointmentId}`);
//     const fetchLabReports = axios.get(`http://localhost:4000/DPR/labreports/${appointmentId}`);

//     Promise.all([fetchAppointment, fetchPrescriptions, fetchLabReports])
//       .then(([appointmentRes, prescriptionsRes, labReportsRes]) => {
//         setAppointment(appointmentRes.data);
//         setPrescriptions(Array.isArray(prescriptionsRes.data) ? prescriptionsRes.data : []);
//         setLabReports(Array.isArray(labReportsRes.data) ? labReportsRes.data : []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       });
//   }, [appointmentId]);

//   // Fetch doctors in the same hospital as the logged-in doctor
//   useEffect(() => {
//     if (!loginId) return;

//     axios.get(`http://localhost:4000/DPR/hospital-doctors-by-login/${loginId}`)
//       .then(res => setHospitalDoctors(Array.isArray(res.data) ? res.data : []))
//       .catch(err => console.error("Error fetching doctors:", err));
//   }, [loginId]);

//   // ✅ Single transfer function
//   const handleSubmit = () => {
//     if (!selectedDoctor) return alert("Select a doctor to transfer the patient");

//     const data = {
//       appointmentId: appointmentId,
//       newDoctorId: selectedDoctor,
//       prescriptionsId: prescriptions.map(p => p._id),
//       labReportsId: labReports.map(l => l._id),
//       formdoctorId: loginId
//     };

//     axios.post("http://localhost:4000/DPR/doctortransferPatient", data)
//       .then(res => {
//         alert("Patient Transferred Successfully");
//         console.log(res.data);
//       })
//       .catch(err => {
//         console.error("Error transferring patient:", err);
//         alert("Error transferring patient");
//       });
//   };

//   if (loading) return <p>Loading appointment, prescriptions, lab reports, and doctors...</p>;
//   if (!appointment) return <p>No appointment data found.</p>;

//   return (
//     <>
//     <DoctorSideBar/>
//     <div>
//       <h2>Transfer Patient</h2>

//       <h3>Appointment Details</h3>
//       <p><strong>Appointment ID:</strong> {appointment._id}</p>
//       <p><strong>Patient Name:</strong> {appointment.patientName}</p>
//       <p><strong>Email:</strong> {appointment.patientEmail}</p>
//       <p><strong>Phone:</strong> {appointment.patientPhone}</p>
//       <p><strong>Department:</strong> {appointment.department}</p>
//       <p><strong>Symptoms:</strong> {appointment.symptoms}</p>

//       <h3>Prescriptions</h3>
//       {prescriptions.length === 0 ? (
//         <p>No prescriptions found for this appointment.</p>
//       ) : (
//         prescriptions.map((prescription) => (
//           <div key={prescription._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
//             <p><strong>Prescription ID:</strong> {prescription._id}</p>
//             <p><strong>Admitted:</strong> {prescription.admitted ? "Yes" : "No"}</p>
//             <h4>Medicines:</h4>
//             <ul>
//               {prescription.medicines.map((med, index) => (
//                 <li key={index}>{med.name} — Quantity: {med.quantity}, Days: {med.days}</li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}

//       <h3>Lab Reports</h3>
//       {labReports.length === 0 ? (
//         <p>No lab reports found for this appointment.</p>
//       ) : (
//         labReports.map((report) => (
//           <div key={report._id} style={{ border: '1px solid #90cdf4', margin: '1rem 0', padding: '1rem', borderRadius: '8px', backgroundColor: '#ebf8ff' }}>
//             <p><strong>Lab Report ID:</strong> {report._id}</p>
//             <p><strong>Status:</strong> {report.status}</p>
//             <p><strong>Lab Findings:</strong> {report.labfindings}</p>
//             <p><strong>Report Details:</strong> {report.reportDetails}</p>
//             {report.reportfile && (
//               <img
//                 src={`${url}/${report.reportfile}`}
//                 alt="Lab Report File"
//                 style={{ maxWidth: '300px', marginTop: '0.5rem', borderRadius: '6px' }}
//               />
//             )}
//           </div>
//         ))
//       )}

//       <h3>Transfer To Another Doctor</h3>
//       <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
//         <option value="">Select Doctor</option>
//         {hospitalDoctors.map(doc => (
//           <option key={doc._id} value={doc._id}>{doc.name}</option>
//         ))}
//       </select>
//       <button onClick={handleSubmit} style={{ marginLeft: '1rem' }}>Transfer Patient</button>
//     </div>
//     </>
//   );
// }

// export default TransferPatientData;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import url from '../Admin/imageUrl';
import axios from "axios";
import DoctorSideBar from "./DoctorSideBar";

function TransferPatientData() {
  const location = useLocation();
  const { appointmentId } = location.state || {};

  const [appointment, setAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [hospitalDoctors, setHospitalDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const loginId = auth.loginId;

  // Styles object for better organization
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    mainContent: {
      flex: 1,
      padding: '2rem',
      marginLeft: '250px', // Adjust based on sidebar width
      maxWidth: '1200px'
    },
    header: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
      marginBottom: '2rem',
      borderLeft: '4px solid #3b82f6'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0 0 0.5rem 0',
      display: 'flex',
      alignItems: 'center'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#64748b',
      margin: 0
    },
    section: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '2px solid #e2e8f0'
    },
    patientInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    infoItem: {
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    label: {
      fontWeight: '600',
      color: '#475569',
      fontSize: '0.875rem',
      marginBottom: '0.25rem'
    },
    value: {
      color: '#1e293b',
      fontSize: '1rem'
    },
    prescriptionCard: {
      border: '2px solid #10b981',
      margin: '1rem 0',
      padding: '1.5rem',
      borderRadius: '12px',
      backgroundColor: '#ecfdf5',
      transition: 'transform 0.2s ease, boxShadow 0.2s ease'
    },
    labReportCard: {
      border: '2px solid #3b82f6',
      margin: '1rem 0',
      padding: '1.5rem',
      borderRadius: '12px',
      backgroundColor: '#eff6ff',
      transition: 'transform 0.2s ease, boxShadow 0.2s ease'
    },
    cardTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem'
    },
    medicineList: {
      listStyle: 'none',
      padding: 0,
      margin: '0.5rem 0'
    },
    medicineItem: {
      padding: '0.75rem',
      backgroundColor: '#ffffff',
      margin: '0.5rem 0',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '0.95rem'
    },
    transferSection: {
      backgroundColor: '#fef3c7',
      border: '2px solid #f59e0b',
      padding: '2rem',
      borderRadius: '12px',
      marginTop: '2rem'
    },
    transferTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    selectContainer: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    select: {
      padding: '0.875rem 1rem',
      fontSize: '1rem',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      minWidth: '250px',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    selectFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    button: {
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#dc2626',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.1s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    buttonHover: {
      backgroundColor: '#b91c1c',
      transform: 'translateY(-1px)'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '1.2rem',
      color: '#64748b'
    },
    noData: {
      textAlign: 'center',
      padding: '2rem',
      color: '#64748b',
      fontSize: '1.1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '2px dashed #cbd5e1'
    },
    reportImage: {
      maxWidth: '100%',
      height: 'auto',
      marginTop: '1rem',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'transform 0.2s ease'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '9999px',
      backgroundColor: '#10b981',
      color: '#ffffff'
    },
    icon: {
      width: '1.25rem',
      height: '1.25rem',
      marginRight: '0.5rem'
    }
  };

  // Fetch appointment, prescriptions, lab reports
  useEffect(() => {
    if (!appointmentId) return;

    const fetchAppointment = axios.get(`http://localhost:4000/DPR/appointment/${appointmentId}`);
    const fetchPrescriptions = axios.get(`http://localhost:4000/DPR/prescriptions/${appointmentId}`);
    const fetchLabReports = axios.get(`http://localhost:4000/DPR/labreports/${appointmentId}`);

    Promise.all([fetchAppointment, fetchPrescriptions, fetchLabReports])
      .then(([appointmentRes, prescriptionsRes, labReportsRes]) => {
        setAppointment(appointmentRes.data);
        setPrescriptions(Array.isArray(prescriptionsRes.data) ? prescriptionsRes.data : []);
        setLabReports(Array.isArray(labReportsRes.data) ? labReportsRes.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [appointmentId]);

  // Fetch doctors in the same hospital
  useEffect(() => {
    if (!loginId) return;

    axios.get(`http://localhost:4000/DPR/hospital-doctors-by-login/${loginId}`)
      .then(res => setHospitalDoctors(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error fetching doctors:", err));
  }, [loginId]);

  const handleSubmit = () => {
    if (!selectedDoctor) return alert("Please select a doctor to transfer the patient");

    const data = {
      appointmentId: appointmentId,
      newDoctorId: selectedDoctor,
      prescriptionsId: prescriptions.map(p => p._id),
      labReportsId: labReports.map(l => l._id),
      formdoctorId: loginId
    };

    axios.post("http://localhost:4000/DPR/doctortransferPatient", data)
      .then(res => {
        alert("Patient Transferred Successfully");
        console.log(res.data);
      })
      .catch(err => {
        console.error("Error transferring patient:", err);
        alert("Error transferring patient");
      });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <DoctorSideBar/>
        <div style={styles.loading}>
          🔄 Loading patient data...
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div style={styles.container}>
        <DoctorSideBar/>
        <div style={styles.mainContent}>
          <div style={styles.noData}>
            ⚠️ No appointment data found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <DoctorSideBar/>
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            🏥 Patient Transfer Dashboard
          </h1>
          <p style={styles.subtitle}>
            Transfer patient data and medical records to another healthcare professional
          </p>
        </div>

        {/* Patient Information */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👤 Patient Information</h2>
          <div style={styles.patientInfo}>
            <div style={styles.infoItem}>
              <div style={styles.label}>Appointment ID</div>
              <div style={styles.value}>{appointment._id}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.label}>Patient Name</div>
              <div style={styles.value}>{appointment.patientName}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.label}>Email Address</div>
              <div style={styles.value}>{appointment.patientEmail}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.label}>Phone Number</div>
              <div style={styles.value}>{appointment.patientPhone}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.label}>Department</div>
              <div style={styles.value}>{appointment.department}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.label}>Presenting Symptoms</div>
              <div style={styles.value}>{appointment.symptoms}</div>
            </div>
          </div>
        </div>

        {/* Prescriptions */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>💊 Prescriptions & Medications</h2>
          {prescriptions.length === 0 ? (
            <div style={styles.noData}>
              📋 No prescriptions found for this appointment
            </div>
          ) : (
            prescriptions.map((prescription) => (
              <div key={prescription._id} style={styles.prescriptionCard}>
                <div style={styles.cardTitle}>
                  📄 Prescription ID: {prescription._id}
                </div>
                <div style={{marginBottom: '1rem'}}>
                  <strong>Patient Status:</strong> 
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: prescription.admitted ? '#10b981' : '#f59e0b',
                    marginLeft: '0.5rem'
                  }}>
                    {prescription.admitted ? "Admitted" : "Outpatient"}
                  </span>
                </div>
                <div>
                  <strong style={{fontSize: '1.1rem', color: '#059669'}}>Prescribed Medications:</strong>
                  <ul style={styles.medicineList}>
                    {prescription.medicines.map((med, index) => (
                      <li key={index} style={styles.medicineItem}>
                        <strong>{med.name}</strong> — Quantity: {med.quantity}, Duration: {med.days} days
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Lab Reports */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔬 Laboratory Reports</h2>
          {labReports.length === 0 ? (
            <div style={styles.noData}>
              🧪 No laboratory reports found for this appointment
            </div>
          ) : (
            labReports.map((report) => (
              <div key={report._id} style={styles.labReportCard}>
                <div style={styles.cardTitle}>
                  🧪 Lab Report ID: {report._id}
                </div>
                <div style={styles.patientInfo}>
                  <div style={styles.infoItem}>
                    <div style={styles.label}>Report Status</div>
                    <div style={styles.value}>{report.status}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.label}>Lab Findings</div>
                    <div style={styles.value}>{report.labfindings}</div>
                  </div>
                  <div style={styles.infoItem}>
                    <div style={styles.label}>Report Details</div>
                    <div style={styles.value}>{report.reportDetails}</div>
                  </div>
                </div>
                {report.reportfile && (
                  <img
                    src={`${url}/${report.reportfile}`}
                    alt="Laboratory Report"
                    style={styles.reportImage}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                )}
              </div>
            ))
          )}
        </div>

        {/* Transfer Section */}
        <div style={styles.transferSection}>
          <h2 style={styles.transferTitle}>
            ↗️ Transfer Patient to Colleague
          </h2>
          <div style={styles.selectContainer}>
            <select 
              value={selectedDoctor} 
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={styles.select}
              onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select Receiving Doctor</option>
              {hospitalDoctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name}
                </option>
              ))}
            </select>
            <button 
              onClick={handleSubmit} 
              style={styles.button}
              onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dc2626';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Transfer Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferPatientData;
