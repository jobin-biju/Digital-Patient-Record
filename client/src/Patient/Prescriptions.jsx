import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));

  const handleDownload = (prescription) => {
    const medicines = prescription.medicines
      .map(med => `- ${med.name}\n  Quantity: ${med.quantity}\n  Duration: ${med.days} days`)
      .join('\n');
    
    const content = `
=== Prescription Details ===
Date: ${new Date(prescription.createdAt).toLocaleDateString()}
Doctor: Dr. ${prescription.doctor.name}
Department: ${prescription.doctor.department}

Symptoms:
${prescription.symptoms}

Medicines:
${medicines}

=====================================
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prescription_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!auth?.loginId) return;

    setLoading(true);
    fetch(`http://localhost:4000/DPR/getpatientprescription?loginId=${auth.loginId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch prescriptions');
        return res.json();
      })
      .then((result) => {
        const prescriptionsWithDetails = result.map(prescription => ({
          ...prescription,
          doctorName: prescription.appointmentId?.doctorId?.name || 'N/A',
          department: prescription.appointmentId?.doctorId?.department || 'N/A',
          specialization: prescription.appointmentId?.doctorId?.specialization || 'N/A'
        }));
        setPrescriptions(prescriptionsWithDetails);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching prescriptions:", err);
        setError("Failed to load prescriptions. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [auth?.loginId]);

  const filteredPrescriptions = prescriptions
    .filter(item => item.appointmentId?.patientId === auth.loginId)
    .filter(item => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        // Search in doctor name
        item.doctor?.name?.toLowerCase().includes(searchLower) ||
        // Search in department
        item.doctor?.department?.toLowerCase().includes(searchLower) ||
        // Search in specialization
        item.doctor?.specialization?.toLowerCase().includes(searchLower) ||
        // Search in medicines
        item.medicines?.some(med => 
          med.name?.toLowerCase().includes(searchLower)
        ) ||
        // Search in symptoms
        item.symptoms?.toLowerCase().includes(searchLower)
      );
    });

  // Styles
  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    paddingTop: "70px",
  };

  const mainContentStyle = {
    marginLeft: "280px",
    flex: 1,
    padding: "32px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    color: "#0b2f05",
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
  };

  const searchContainerStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    marginRight: "12px",
  };

  const downloadAllButtonStyle = {
    background: "#88C250",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "12px",
  };

  const prescriptionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem'
  };

  const prescriptionCardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const cardTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  };

  const dateStyle = {
    color: '#6b7280',
    fontSize: '0.875rem'
  };

  const patientInfoStyle = {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem'
  };

  const medicineListStyle = {
    marginTop: '1rem'
  };

  const medicineTitleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem'
  };

  const medicineItemStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb'
  };

  const medicineNameStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '0.25rem'
  };

  const medicineDetailsStyle = {
    fontSize: '0.875rem',
    color: '#6b7280'
  };

  const messageStyle = {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280'
  };

  const errorMessageStyle = {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '0.5rem',
    marginBottom: '1rem'
  };

  const admittedBadgeStyle = {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.875rem',
    marginLeft: '0.5rem'
  };

  const outpatientBadgeStyle = {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.875rem',
    marginLeft: '0.5rem'
  };

  // New styles
  const doctorNameStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    fontStyle: 'italic'
  };

  const medicineHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  };

  const medicineBadgeStyle = {
    backgroundColor: '#e5e7eb',
    color: '#374151',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    fontSize: '0.75rem'
  };

  const instructionsStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    fontStyle: 'italic'
  };

  const downloadButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    backgroundColor: '#88C250',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#6ba83a'
    }
  };

  const doctorSpecialtyStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginTop: '4px',
    fontStyle: 'normal'
  };

  const doctorInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const departmentStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    margin: '0'
  };

  const symptomsStyle = {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem'
  };

  const sectionTitleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        {/* Reusable Sidebar Component */}
        <Dsidebar activePage="/prescriptions" />

        {/* Main Content */}
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            {/* Header */}
            <div style={cardHeaderStyle}>
              <h1 style={titleStyle}>My Prescriptions</h1>
            </div>

            {/* Search and Actions */}
            <div style={searchContainerStyle}>
              <div style={{display: "flex", alignItems: "center"}}>
                <input 
                  style={searchInputStyle}
                  type="text" 
                  placeholder="Search by doctor, department, medicine name or symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button 
                  style={downloadAllButtonStyle}
                  onClick={() => handleDownload("prescriptions")}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#6ba83a";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#88C250";
                  }}
                >
                  📥 Download All
                </button> */}
              </div>
            </div>

            {loading && (
              <div style={messageStyle}>Loading prescriptions...</div>
            )}

            {error && (
              <div style={errorMessageStyle}>{error}</div>
            )}

            <div style={prescriptionGridStyle}>
              {filteredPrescriptions.map((prescription, index) => (
                <div key={index} style={prescriptionCardStyle}>
                  <div style={cardHeaderStyle}>
                    <div>
                      <div style={doctorInfoStyle}>
                        <h3 style={cardTitleStyle}>
                          Dr. {prescription.doctor.name}
                        </h3>
                        <p style={departmentStyle}>
                          {prescription.doctor.department}
                        </p>
                      </div>
                    </div>
                    <span style={dateStyle}>
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={symptomsStyle}>
                    <h4 style={sectionTitleStyle}>Symptoms</h4>
                    <p>{prescription.symptoms}</p>
                  </div>

                  <div style={medicineListStyle}>
                    <h4 style={sectionTitleStyle}>Prescribed Medicines</h4>
                    {prescription.medicines?.map((medicine, idx) => (
                      <div key={idx} style={medicineItemStyle}>
                        <div style={medicineHeaderStyle}>
                          <p style={medicineNameStyle}>{medicine.name}</p>
                          <span style={medicineBadgeStyle}>
                            {medicine.days} days
                          </span>
                        </div>
                        <div style={medicineDetailsStyle}>
                          <span>Quantity: {medicine.quantity}</span>
                          <span>• Duration: {medicine.days} days</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    style={downloadButtonStyle}
                    onClick={() => handleDownload(prescription)}
                  >
                    📥 Download Prescription
                  </button>
                </div>
              ))}
            </div>

            {!loading && !error && filteredPrescriptions.length === 0 && (
              <div style={messageStyle}>No prescriptions found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescriptions;
