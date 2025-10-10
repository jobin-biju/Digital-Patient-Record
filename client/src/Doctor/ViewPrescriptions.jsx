import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";

function ViewPrescriptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scheduledPatients } = location.state || {};
  const appointmentId = scheduledPatients?._id;

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    if (appointmentId) {
      fetch(`http://localhost:4000/DPR/prescriptions/${appointmentId}`)
        .then((res) => res.json())
        .then((data) => {
          setPrescriptions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching prescriptions:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Patient information not found. Please go back and try again.");
      setLoading(false);
    }
  }, [appointmentId]);

  // Enhanced filtering
  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.medicines?.some(med => 
      med.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || 
    prescription.createdAt?.includes(searchTerm)
  );

  // Sorting functionality
  const sortedPrescriptions = [...filteredPrescriptions].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'createdAt') {
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
    controlsSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    searchContainer: {
      position: 'relative',
      flex: '1',
      maxWidth: '400px'
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 48px',
      fontSize: '16px',
      border: '2px solid transparent',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '500'
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px',
      color: '#059669'
    },
    sortButton: {
      padding: '12px 16px',
      backgroundColor: 'transparent',
      color: '#059669',
      border: '2px solid #059669',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsContainer: {
      display: 'flex',
      gap: '1.5rem',
      marginBottom: '2.5rem',
      flexWrap: 'wrap'
    },
    statCard: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      minWidth: '180px',
      flex: '1',
      position: 'relative',
      overflow: 'hidden'
    },
    statIcon: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '1.5rem',
      opacity: 0.1,
      color: '#059669'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '0.25rem',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    prescriptionsContainer: {
      display: 'grid',
      gap: '1.5rem'
    },
    prescriptionCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    prescriptionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #f8fafc'
    },
    prescriptionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    prescriptionDate: {
      fontSize: '0.9rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    prescriptionNumber: {
      padding: '6px 12px',
      backgroundColor: '#dcfce7',
      color: '#166534',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    admissionStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      padding: '1rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    admissionIcon: {
      fontSize: '1.2rem'
    },
    admissionLabel: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151'
    },
    admissionValue: {
      fontSize: '0.9rem',
      fontWeight: '700',
      color: '#1f2937'
    },
    medicinesSection: {
      marginTop: '1.5rem'
    },
    medicinesTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    medicinesGrid: {
      display: 'grid',
      gap: '0.75rem'
    },
    medicineItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease'
    },
    medicineInfo: {
      flex: 1
    },
    medicineName: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    medicineDetails: {
      fontSize: '0.85rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    medicineBadge: {
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#3730a3',
      borderRadius: '8px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase'
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
    loadingText: {
      color: '#6b7280',
      fontSize: '16px',
      fontWeight: '500'
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
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
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
    },
    emptyStateSubtext: {
      fontSize: '14px',
      opacity: '0.8'
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
    }
    
    @media (max-width: 768px) {
      .controls-section {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .stats-container {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      .prescription-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 1rem !important;
      }
      .medicine-item {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.5rem !important;
      }
    }
    
    .search-input:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .prescription-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      border-color: #059669 !important;
    }
    
    .medicine-item:hover {
      background-color: #ecfdf5 !important;
      border-color: #059669 !important;
      transform: translateX(4px) !important;
    }
    
    .back-button:hover, .sort-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-1px) !important;
    }
  `;

  const getTotalMedicines = () => {
    return prescriptions.reduce((total, prescription) => 
      total + (prescription.medicines?.length || 0), 0
    );
  };

  const getUniqueNames = () => {
    const allMedicines = prescriptions.flatMap(p => p.medicines || []);
    return new Set(allMedicines.map(med => med.name)).size;
  };

  const getSortIcon = () => {
    return sortConfig.direction === 'asc' ? '↑' : '↓';
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
              <div style={styles.loadingText}>Loading prescription history...</div>
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
              <h3>⚠️ Error Loading Prescriptions</h3>
              <p>{error}</p>
              <button
                onClick={() => navigate(-1)}
                style={{
                  ...styles.backButton,
                  marginTop: '1rem'
                }}
              >
                Go Back
              </button>
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
            <h1 style={styles.title}>Prescription History</h1>
            <p style={styles.subtitle}>
              Complete medical prescription records and treatment history
            </p>
          </div>

          {/* Back Button */}
          <button
            style={styles.backButton}
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <span>←</span>
            Back to Patients
          </button>

          {/* Patient Information */}
          {scheduledPatients && (
            <div style={styles.patientInfo}>
              <div style={styles.patientName}>
                👤 {scheduledPatients.patientName}
              </div>
              <div style={styles.patientDetails}>
                📧 {scheduledPatients.patientEmail} • 
                🆔 {scheduledPatients.patientId}
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div style={styles.statsContainer} className="stats-container">
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📋</div>
              <div style={styles.statNumber}>{prescriptions.length}</div>
              <div style={styles.statLabel}>Total Prescriptions</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💊</div>
              <div style={styles.statNumber}>{getTotalMedicines()}</div>
              <div style={styles.statLabel}>Medicines Prescribed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🧬</div>
              <div style={styles.statNumber}>{getUniqueNames()}</div>
              <div style={styles.statLabel}>Unique Medicines</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{sortedPrescriptions.length}</div>
              <div style={styles.statLabel}>Filtered Results</div>
            </div>
          </div>

          {/* Controls Section */}
          <div style={styles.controlsSection} className="controls-section">
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>🔍</div>
              <input
                type="text"
                placeholder="Search medicines or dates..."
                style={styles.searchInput}
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              style={styles.sortButton}
              className="sort-button"
              onClick={() => handleSort('createdAt')}
            >
              Sort by Date {getSortIcon()}
            </button>
          </div>

          {/* Prescriptions List */}
          {sortedPrescriptions.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>📋</div>
              <div style={styles.emptyStateText}>
                {searchTerm ? 'No matching prescriptions found' : 'No prescriptions found'}
              </div>
              <div style={styles.emptyStateSubtext}>
                {searchTerm ? 
                  `Try adjusting your search for "${searchTerm}"` : 
                  'Prescriptions will appear here when created'
                }
              </div>
            </div>
          ) : (
            <div style={styles.prescriptionsContainer}>
              {sortedPrescriptions.map((prescription, idx) => (
                <div
                  key={prescription._id}
                  style={styles.prescriptionCard}
                  className="prescription-card"
                >
                  <div style={styles.prescriptionHeader} className="prescription-header">
                    <div>
                      <h3 style={styles.prescriptionTitle}>
                        📋 Prescription #{prescriptions.length - idx}
                      </h3>
                      <p style={styles.prescriptionDate}>
                        📅 {new Date(prescription.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div style={styles.prescriptionNumber}>
                      #{String(prescriptions.length - idx).padStart(3, '0')}
                    </div>
                  </div>

                  {/* Admission Status */}
                  <div style={{
                    ...styles.admissionStatus,
                    backgroundColor: prescription.admitted ? '#dcfce7' : '#f8fafc',
                    borderColor: prescription.admitted ? '#059669' : '#e5e7eb'
                  }}>
                    <span style={styles.admissionIcon}>
                      {prescription.admitted ? '🏥' : '🚶'}
                    </span>
                    <span style={styles.admissionLabel}>Admission Status:</span>
                    <span style={{
                      ...styles.admissionValue,
                      color: prescription.admitted ? '#166534' : '#6b7280'
                    }}>
                      {prescription.admitted ? 'Patient Admitted' : 'Outpatient Treatment'}
                    </span>
                  </div>

                  {/* Medicines Section */}
                  <div style={styles.medicinesSection}>
                    <h4 style={styles.medicinesTitle}>
                      💊 Prescribed Medicines ({prescription.medicines?.length || 0})
                    </h4>
                    <div style={styles.medicinesGrid}>
                      {prescription.medicines?.map((medicine, i) => (
                        <div
                          key={i}
                          style={styles.medicineItem}
                          className="medicine-item"
                        >
                          <div style={styles.medicineInfo}>
                            <div style={styles.medicineName}>{medicine.name}</div>
                            <div style={styles.medicineDetails}>
                              📊 Quantity: {medicine.quantity} • 
                              ⏰ Duration: {medicine.days} days
                            </div>
                          </div>
                          <div style={styles.medicineBadge}>
                            {medicine.days}d
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewPrescriptions;
