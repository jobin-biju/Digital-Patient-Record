// import React, { useEffect, useState } from 'react';
// import DoctorSideBar from './DoctorSideBar';

// function ViewTransferPatients() {
//   const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
//   const [viewTransferData, setViewTransferData] = useState([]);
//   const [error, setError] = useState('');

//   console.log(viewTransferData);
  

//   useEffect(() => {
//     const fetchTransferData = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/DPR/patienttransferdataview', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ doctorId: auth.loginId })
//         });

//         if (!response.ok) throw new Error(`${response.status}`);
//         const data = await response.json();
//         setViewTransferData(data);
//       } catch (err) {
//         console.error("Fetch transfer data error:", err);
//         setError('Failed to fetch transfer data');
//       }
//     };

//     if (auth.loginId) fetchTransferData();
//   }, [auth.loginId]);

//   if (error) return <p>{error}</p>;
//   if (viewTransferData.length === 0) return <p>No transfer data found.</p>;

//   return (
//     <>
//     <DoctorSideBar/>
//     <div>
//    {viewTransferData.map((item) => (
//   <div key={item._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
//     <h3>Patient: {item.appointmentId?.patientName || 'N/A'}</h3>
//     <p>Phone: {item.appointmentId?.patientPhone || 'N/A'}</p>
//     <p>Appointment Date: {new Date(item.appointmentId?.appointmentDate).toLocaleDateString()}</p>
//     <p>Appointment Time: {item.appointmentId?.appointmentTime}</p>

//     {/* Lab Reports */}
//     <h4>Lab Reports:</h4>
//     {item.labReportsId?.map((lab) => (
//       <div key={lab._id} style={{ marginLeft: "1rem" }}>
//         <p><b>Findings:</b> {lab.labfindings}</p>
//         <p><b>Details:</b> {lab.reportDetails}</p>
//         <p><b>File:</b> {lab.reportfile}</p>
//       </div>
//     ))}

//     {/* Prescriptions */}
//     <h4>Prescriptions:</h4>
//     {item.prescriptionsId?.map((pres) => (
//       <div key={pres._id} style={{ marginLeft: "1rem" }}>
//         {pres.medicines?.map((med, i) => (
//           <p key={i}>
//             {med.name} — {med.quantity} qty — {med.days} days
//           </p>
//         ))}
//         <p>Admitted: {pres.admitted ? "Yes" : "No"}</p>
//       </div>
//     ))}

//     <p><b>From Doctor:</b> {item.formdoctorId.name}</p>
//     <p><b>To Doctor:</b> {item.newDoctorId.name}</p>
//     <p><b>Transfer Date:</b> {new Date(item.transferredAt).toLocaleString()}</p>
//   </div>
// ))}

//     </div>
//     </>
//   );
// }
 
// export default ViewTransferPatients;


import React, { useEffect, useState } from 'react';
import DoctorSideBar from './DoctorSideBar';
import url from '../Admin/imageUrl';

function ViewTransferPatients() {
  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const [viewTransferData, setViewTransferData] = useState([]);
  const [error, setError] = useState('');

  console.log(viewTransferData);

  useEffect(() => {
    const fetchTransferData = async () => {
      try {
        const response = await fetch('http://localhost:4000/DPR/patienttransferdataview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId: auth.loginId })
        });

        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        setViewTransferData(data);
      } catch (err) {
        console.error("Fetch transfer data error:", err);
        setError('Failed to fetch transfer data');
      }
    };

    if (auth.loginId) fetchTransferData();
  }, [auth.loginId]);

  const layoutStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContentStyles = {
    marginLeft: '280px',
    width: 'calc(100% - 280px)',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  };

  const headerStyles = {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    padding: '2.5rem 3rem',
    color: 'white',
    boxShadow: '0 4px 20px rgba(5, 150, 105, 0.2)'
  };

  const titleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const subtitleStyles = {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: 0
  };

  const containerStyles = {
    padding: '2rem 3rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const errorStyles = {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid #fecaca',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    margin: '2rem 0'
  };

  const noDataStyles = {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: '1px solid #e5e7eb'
  };

  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    margin: '2rem 0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  };

  const patientHeaderStyles = {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '15px',
    marginBottom: '1.5rem',
    border: '1px solid #e2e8f0'
  };

  const patientNameStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const patientDetailsStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  };

  const detailItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.95rem'
  };

  const sectionHeaderStyles = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#059669',
    margin: '1.5rem 0 1rem 0',
    padding: '0.75rem 1rem',
    backgroundColor: '#dcfce7',
    borderRadius: '10px',
    border: '1px solid #bbf7d0'
  };

  const labReportStyles = {
    backgroundColor: '#eff6ff',
    padding: '1rem',
    borderRadius: '12px',
    margin: '0.75rem 0',
    border: '1px solid #dbeafe'
  };

  const prescriptionStyles = {
    backgroundColor: '#fef3c7',
    padding: '1rem',
    borderRadius: '12px',
    margin: '0.75rem 0',
    border: '1px solid #fde68a'
  };

  const medicineItemStyles = {
    backgroundColor: 'white',
    padding: '0.75rem',
    borderRadius: '8px',
    margin: '0.5rem 0',
    border: '1px solid #e5e7eb',
    fontSize: '0.9rem'
  };

  const transferInfoStyles = {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '15px',
    marginTop: '1.5rem',
    border: '1px solid #bfdbfe'
  };

  const doctorInfoStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const doctorCardStyles = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  };

  const badgeStyles = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    margin: '0.25rem'
  };

  const admittedBadgeStyles = (admitted) => ({
    ...badgeStyles,
    backgroundColor: admitted ? '#dcfce7' : '#fee2e2',
    color: admitted ? '#166534' : '#dc2626'
  });

  if (error) {
    return (
      <div style={layoutStyles}>
        <DoctorSideBar />
        <div style={mainContentStyles}>
          <div style={headerStyles}>
            <h1 style={titleStyles}>
              🏥 Patient Transfer Records
            </h1>
            <p style={subtitleStyles}>View transferred patient data and medical records</p>
          </div>
          <div style={containerStyles}>
            <div style={errorStyles}>
              ⚠️ {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewTransferData.length === 0) {
    return (
      <div style={layoutStyles}>
        <DoctorSideBar />
        <div style={mainContentStyles}>
          <div style={headerStyles}>
            <h1 style={titleStyles}>
              🏥 Patient Transfer Records
            </h1>
            <p style={subtitleStyles}>View transferred patient data and medical records</p>
          </div>
          <div style={containerStyles}>
            <div style={noDataStyles}>
              📋 No transfer data found.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={layoutStyles}>
      <DoctorSideBar />
      <div style={mainContentStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>
            🏥 Patient Transfer Records
          </h1>
          <p style={subtitleStyles}>
            View transferred patient data and medical records ({viewTransferData.length} records)
          </p>
        </div>
        
        <div style={containerStyles}>
          {viewTransferData.map((item, index) => (
            <div 
              key={item._id} 
              style={{
                ...cardStyles,
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
                }
              }}
            >
              {/* Patient Header */}
              <div style={patientHeaderStyles}>
                <h3 style={patientNameStyles}>
                  👤 Patient: {item.appointmentId?.patientName || 'N/A'}
                </h3>
                <div style={patientDetailsStyles}>
                  <div style={detailItemStyles}>
                    📞 <strong>Phone:</strong> {item.appointmentId?.patientPhone || 'N/A'}
                  </div>
                  <div style={detailItemStyles}>
                    📅 <strong>Appointment Date:</strong> {new Date(item.appointmentId?.appointmentDate).toLocaleDateString()}
                  </div>
                  <div style={detailItemStyles}>
                    🕐 <strong>Appointment Time:</strong> {item.appointmentId?.appointmentTime}
                  </div>
                </div>
              </div>

              {/* Lab Reports Section */}
              <h4 style={sectionHeaderStyles}>
                🧪 Lab Reports
              </h4>
              {item.labReportsId?.length > 0 ? (
                item.labReportsId.map((lab) => (
                  <div key={lab._id} style={labReportStyles}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#1e40af' }}>🔬 Findings:</strong> {lab.labfindings}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#1e40af' }}>📝 Details:</strong> {lab.reportDetails}
                    </div>
                    <div>
                      <strong style={{ color: '#1e40af' }}>📄 File:</strong> 
                      {lab.reportfile ? (
                            <a 
                              href={`${url}${lab.reportfile}`}
                             
                              className="file-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 View Report
                            </a>
                          ) : (
                            <span>
                              No file attached
                            </span>
                          )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ ...labReportStyles, textAlign: 'center', color: '#6b7280' }}>
                  No lab reports available
                </div>
              )}

              {/* Prescriptions Section */}
              <h4 style={sectionHeaderStyles}>
                💊 Prescriptions
              </h4>
              {item.prescriptionsId?.length > 0 ? (
                item.prescriptionsId.map((pres) => (
                  <div key={pres._id} style={prescriptionStyles}>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: '#92400e' }}>📋 Medicines:</strong>
                    </div>
                    {pres.medicines?.map((med, i) => (
                      <div key={i} style={medicineItemStyles}>
                        <strong>{med.name}</strong> — 
                        <span style={{ color: '#059669', fontWeight: '600', margin: '0 0.5rem' }}>
                          {med.quantity} qty
                        </span> — 
                        <span style={{ color: '#dc2626', fontWeight: '600', marginLeft: '0.5rem' }}>
                          {med.days} days
                        </span>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem' }}>
                      <span style={admittedBadgeStyles(pres.admitted)}>
                        {pres.admitted ? '🏥 Admitted' : '🏠 Not Admitted'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ ...prescriptionStyles, textAlign: 'center', color: '#6b7280' }}>
                  No prescriptions available
                </div>
              )}

              {/* Transfer Information */}
              <div style={transferInfoStyles}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: '#1e40af', 
                  margin: '0 0 1rem 0' 
                }}>
                  🔄 Transfer Information
                </h4>
                
                <div style={doctorInfoStyles}>
                  <div style={doctorCardStyles}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      FROM DOCTOR
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#dc2626' }}>
                      👨‍⚕️ Dr. {item.formdoctorId?.name || 'N/A'}
                    </div>
                  </div>
                  
                  <div style={doctorCardStyles}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      TO DOCTOR
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#059669' }}>
                      👨‍⚕️ Dr. {item.newDoctorId?.name || 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <strong style={{ color: '#1e40af' }}>📅 Transfer Date:</strong>
                  <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#059669', marginTop: '0.25rem' }}>
                    {new Date(item.transferredAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTransferPatients;

