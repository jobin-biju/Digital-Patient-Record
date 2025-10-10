import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";

function AddPrescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scheduledPatients } = location.state || {};
  const appointmentId = scheduledPatients?._id;
  const hospitalId = scheduledPatients?.hospitalId;
 


  const [medicines, setMedicines] = useState([{ name: "", quantity: "", days: "" }]);
  const [admitted, setAdmitted] = useState(false);
  const [labReport, setLabReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Medicine handlers
  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...medicines];
    updated[index][name] = value;
    setMedicines(updated);
  };

  const addMedicineRow = () => setMedicines([...medicines, { name: "", quantity: "", days: "" }]);
  const removeMedicineRow = (index) => setMedicines(medicines.filter((_, i) => i !== index));

  // Prescription submit
  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prescriptionData = { appointmentId, medicines, admitted };

    try {
      const res = await fetch("http://localhost:4000/DPR/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prescriptionData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Prescription added successfully!");
        setMedicines([{ name: "", quantity: "", days: "" }]);
        setAdmitted(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting prescription:", err);
      alert("Error submitting prescription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Lab report submit
  const handleLabReportSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reportData = { appointmentId,hospitalId, reportDetails: labReport };

    try {
      const res = await fetch("http://localhost:4000/DPR/add-labreport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Lab Report saved successfully!");
        setLabReport("");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting lab report:", err);
      alert("Error submitting lab report. Please try again.");
    } finally {
      setLoading(false);
    }
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
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '0.5rem',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
      fontWeight: '400'
    },
    patientInfo: {
      backgroundColor: '#dcfce7',
      padding: '1.5rem',
      borderRadius: '16px',
      marginBottom: '2rem',
      border: '1px solid #059669'
    },
    patientName: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#166534',
      marginBottom: '0.25rem'
    },
    patientDetails: {
      fontSize: '0.9rem',
      color: '#166534',
      opacity: 0.8
    },
    formsContainer: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: '1fr',
      maxWidth: '800px'
    },
    formCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    formHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2rem'
    },
    formTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    formIcon: {
      fontSize: '1.5rem'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      fontWeight: '500',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      accentColor: '#059669'
    },
    checkboxLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      cursor: 'pointer'
    },
    medicineSection: {
      marginBottom: '2rem'
    },
    medicineHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.5rem'
    },
    medicineTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    medicineRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr auto',
      gap: '1rem',
      alignItems: 'end',
      marginBottom: '1rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    medicineInput: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff'
    },
    actionButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    removeButton: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    submitButton: {
      width: '100%',
      padding: '16px 24px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    secondaryButton: {
      width: '100%',
      padding: '16px 24px',
      backgroundColor: '#0891b2',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    successMessage: {
      backgroundColor: '#dcfce7',
      color: '#166534',
      padding: '1rem',
      borderRadius: '12px',
      marginBottom: '1rem',
      border: '1px solid #059669',
      fontWeight: '600',
      textAlign: 'center'
    },
    backButton: {
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
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem'
    }
  };

  const cssRules = `
    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0 !important;
        padding: 1.5rem !important;
      }
    }
    
    @media (max-width: 768px) {
      .medicine-row {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
      }
      .forms-container {
        gap: 1.5rem !important;
      }
    }
    
    .input:focus, .textarea:focus, .medicine-input:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .checkbox-container:has(input:checked) {
      background-color: #dcfce7 !important;
      border-color: #059669 !important;
    }
    
    .submit-button:hover {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .secondary-button:hover {
      background-color: #0e7490 !important;
      transform: translateY(-1px) !important;
    }
    
    .add-button:hover {
      background-color: #047857 !important;
      transform: scale(1.1) !important;
    }
    
    .remove-button:hover {
      background-color: #b91c1c !important;
      transform: scale(1.1) !important;
    }
    
    .back-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-1px) !important;
    }
    
    .loading {
      opacity: 0.7 !important;
      pointer-events: none !important;
    }
  `;

  return (
    <>
      <style>{cssRules}</style>
      <div style={styles.pageContainer}>
        <DoctorSideBar />
        <div style={styles.mainContent} className="main-content">
          {/* Header Section */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>Add Prescription & Lab Report</h1>
            <p style={styles.subtitle}>
              Complete patient treatment plan and diagnostic requirements
            </p>
          </div>

          {/* Back Button */}
          <button
            style={styles.backButton}
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <span>←</span>
            Back to Consultations
          </button>

          {/* Patient Information */}
          {scheduledPatients && (
            <div style={styles.patientInfo}>
              <div style={styles.patientName}>
                👤 {scheduledPatients.patientName}
              </div>
              <div style={styles.patientDetails}>
                📅 {new Date(scheduledPatients.appointmentDate).toLocaleDateString()} • 
                ⏰ {scheduledPatients.appointmentTime} • 
                🩺 {scheduledPatients.symptoms}
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div style={styles.successMessage}>
              ✅ {successMessage}
            </div>
          )}

          {/* Forms Container */}
          <div style={styles.formsContainer} className="forms-container">
            {/* Prescription Form */}
            <div style={styles.formCard} className={loading ? 'loading' : ''}>
              <div style={styles.formHeader}>
                <span style={styles.formIcon}>💊</span>
                <h2 style={styles.formTitle}>Prescription Details</h2>
              </div>

              <form onSubmit={handlePrescriptionSubmit}>
                {/* Patient ID (Hidden/Display only) */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>📋 Patient ID</label>
                  <input
                    type="text"
                    style={{...styles.input, backgroundColor: '#f8fafc', color: '#6b7280'}}
                    value={appointmentId || "No ID available"}
                    disabled
                  />
                </div>

                {/* Admission Checkbox */}
                <div style={styles.checkboxContainer} className="checkbox-container">
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    id="admitCheck"
                    checked={admitted}
                    onChange={(e) => setAdmitted(e.target.checked)}
                  />
                  <label style={styles.checkboxLabel} htmlFor="admitCheck">
                    🏥 Admit Patient for Treatment
                  </label>
                </div>

                {/* Medicines Section */}
                <div style={styles.medicineSection}>
                  <div style={styles.medicineHeader}>
                    <h3 style={styles.medicineTitle}>💊 Prescribed Medicines</h3>
                  </div>

                  {medicines.map((medicine, index) => (
                    <div key={index} style={styles.medicineRow} className="medicine-row">
                      <div>
                        <label style={{...styles.label, fontSize: '0.75rem'}}>Medicine Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g., Paracetamol 500mg"
                          style={styles.medicineInput}
                          className="medicine-input"
                          value={medicine.name}
                          onChange={(e) => handleMedicineChange(index, e)}
                          required
                        />
                      </div>
                      <div>
                        <label style={{...styles.label, fontSize: '0.75rem'}}>Quantity</label>
                        <input
                          type="text"
                          name="quantity"
                          placeholder="e.g., 2 tablets"
                          style={styles.medicineInput}
                          className="medicine-input"
                          value={medicine.quantity}
                          onChange={(e) => handleMedicineChange(index, e)}
                          required
                        />
                      </div>
                      <div>
                        <label style={{...styles.label, fontSize: '0.75rem'}}>Duration</label>
                        <input
                          type="text"
                          name="days"
                          placeholder="e.g., 7 days"
                          style={styles.medicineInput}
                          className="medicine-input"
                          value={medicine.days}
                          onChange={(e) => handleMedicineChange(index, e)}
                          required
                        />
                      </div>
                      <div>
                        {index === medicines.length - 1 ? (
                          <button
                            type="button"
                            style={{...styles.actionButton, ...styles.addButton}}
                            className="add-button"
                            onClick={addMedicineRow}
                          >
                            ➕
                          </button>
                        ) : (
                          <button
                            type="button"
                            style={{...styles.actionButton, ...styles.removeButton}}
                            className="remove-button"
                            onClick={() => removeMedicineRow(index)}
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  style={styles.submitButton}
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span>⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>💊</span>
                      Submit Prescription
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Lab Report Form */}
            <div style={styles.formCard} className={loading ? 'loading' : ''}>
              <div style={styles.formHeader}>
                <span style={styles.formIcon}>🔬</span>
                <h2 style={styles.formTitle}>Laboratory Tests</h2>
              </div>

              <form onSubmit={handleLabReportSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>🧪 Lab Test Requirements</label>
                  <textarea
                    style={styles.textarea}
                    className="textarea"
                    placeholder="Enter detailed lab test requirements, instructions, or findings here...&#10;&#10;Examples:&#10;• Complete Blood Count (CBC)&#10;• Liver Function Test&#10;• Blood Sugar Level&#10;• X-Ray Chest PA View"
                    value={labReport}
                    onChange={(e) => setLabReport(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={styles.secondaryButton}
                  className="secondary-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span>⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>🔬</span>
                      Submit Lab Tests
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPrescription;
