import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorSideBar from "./DoctorSideBar";
import { RefreshCw } from "lucide-react";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  User, 
  Mail, 
  Calendar, 
  Stethoscope,
  FileText,
  Eye,
  ArrowRightLeft,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';

function DoctorPatients() {
  const [scheduledPatients, setScheduledPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'patientName', direction: 'asc' });
  
  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const doctorId = auth.loginId;

  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:4000/DPR/scheduled-patients/${doctorId}`)
        .then((res) => res.json())
        .then((data) => {
          setScheduledPatients(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching scheduled patients:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Doctor ID not found. Please login again.");
      setLoading(false);
    }
  }, [doctorId]);

  // Enhanced filtering
  const filteredPatients = scheduledPatients.filter(patient =>
    patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId?.toString().includes(searchTerm)
  );

  // Get today's patients count
  const getTodaysPatients = () => {
    const today = new Date().toDateString();
    return scheduledPatients.filter(patient => {
      const appointmentDate = patient.appointmentDate ? new Date(patient.appointmentDate).toDateString() : null;
      return appointmentDate === today;
    }).length;
  };

  // Sorting functionality
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue = a[sortConfig.key] || '';
    let bValue = b[sortConfig.key] || '';
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
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

  const getPatientInitials = (name) => {
    if (!name) return 'P';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Professional Doctor Portal Green Theme Styles
  const layoutContainerStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContentStyles = {
    marginLeft: '280px',
    width: 'calc(100% - 280px)',
    minHeight: '100vh',
    padding: '0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  };

  const contentPaddingStyles = {
    padding: '2rem 3rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  // Statistics Cards Styles
  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const statCardStyles = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '2px solid #f1f5f9',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const statIconContainerStyles = (bgColor) => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  });

  const statNumberStyles = {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#059669',
    marginBottom: '0.25rem',
    lineHeight: 1
  };

  const statLabelStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  // Controls Section Styles
  const controlsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  };

  const searchContainerStyles = {
    position: 'relative',
    flex: '1',
    maxWidth: '400px',
    minWidth: '200px'
  };

  const searchInputStyles = {
    width: '100%',
    padding: '12px 16px 12px 48px',
    fontSize: '0.95rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const searchIconStyles = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#059669'
  };

  const sortButtonStyles = {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#059669',
    border: '2px solid #059669',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  // Patient Cards Grid Styles
  const patientsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '1.5rem'
  };

  const patientCardStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '2px solid #f1f5f9',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const patientHeaderStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  };

  const patientAvatarStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'white',
    fontWeight: '700',
    marginRight: '1rem',
    flexShrink: 0
  };

  const patientInfoStyles = {
    flex: 1,
    minWidth: 0
  };

  const patientNameStyles = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.25rem',
    lineHeight: 1.2
  };

  const patientIdStyles = {
    fontSize: '0.8rem',
    color: '#64748b',
    fontWeight: '500',
    marginBottom: '0.5rem',
    fontFamily: 'monospace',
    backgroundColor: '#f8fafc',
    padding: '2px 8px',
    borderRadius: '6px',
    display: 'inline-block'
  };

  const patientEmailStyles = {
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const statusBadgeStyles = {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0'
  };

  const detailsGridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #f1f5f9'
  };

  const detailItemStyles = {
    display: 'flex',
    flexDirection: 'column'
  };

  const detailLabelStyles = {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
    letterSpacing: '0.5px'
  };

  const detailValueStyles = {
    fontSize: '0.85rem',
    color: '#1e293b',
    fontWeight: '600'
  };

  const actionButtonsStyles = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  };

  const primaryButtonStyles = {
    flex: 1,
    minWidth: '120px',
    padding: '12px 16px',
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const secondaryButtonStyles = {
    flex: 1,
    minWidth: '120px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    color: '#059669',
    border: '2px solid #059669',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const transferButtonStyles = {
    ...secondaryButtonStyles,
    borderColor: '#f97316',
    color: '#f97316'
  };

  const loadingContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  };

  const spinnerStyles = {
    width: '48px',
    height: '48px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #059669',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    color: '#64748b'
  };

  const keyframesStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .search-input:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .patient-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15) !important;
      border-color: #059669 !important;
    }
    
    .primary-button:hover {
      background-color: #047857 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4) !important;
    }
    
    .secondary-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-2px) !important;
    }
    
    .transfer-button:hover {
      background-color: #f97316 !important;
      color: white !important;
      transform: translateY(-2px) !important;
    }
    
    .sort-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-2px) !important;
    }
    
    .stat-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
      border-color: #059669 !important;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <DoctorSideBar />
          <div style={mainContentStyles}>
            <div style={contentPaddingStyles}>
              <div style={loadingContainerStyles}>
                <div style={spinnerStyles}></div>
                <div style={{ color: '#64748b', fontSize: '1rem', fontWeight: '500' }}>
                  Loading scheduled patients...
                </div>
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
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <DoctorSideBar />
          <div style={mainContentStyles}>
            <div style={contentPaddingStyles}>
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #fecaca'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>⚠️ Error Loading Patients</h3>
                <p style={{ marginBottom: '1rem' }}>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  style={primaryButtonStyles}
                >
                  <RefreshCw size={16} />
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{keyframesStyles}</style>
      <div style={layoutContainerStyles}>
        <DoctorSideBar />
        <div style={mainContentStyles}>
          <div style={contentPaddingStyles}>
            {/* Statistics Cards */}
            <div style={statsGridStyles}>
              <div className="stat-card" style={statCardStyles}>
                <div style={statIconContainerStyles('#eff6ff')}>
                  <User size={24} style={{ color: '#1e40af' }} />
                </div>
                <div style={statNumberStyles}>{scheduledPatients.length}</div>
                <div style={statLabelStyles}>Total Patients</div>
              </div>
              
              <div className="stat-card" style={statCardStyles}>
                <div style={statIconContainerStyles('#f0fdf4')}>
                  <Filter size={24} style={{ color: '#059669' }} />
                </div>
                <div style={statNumberStyles}>{filteredPatients.length}</div>
                <div style={statLabelStyles}>Filtered Results</div>
              </div>
              
              <div className="stat-card" style={statCardStyles}>
                <div style={statIconContainerStyles('#fef3e2')}>
                  <Clock size={24} style={{ color: '#d97706' }} />
                </div>
                <div style={statNumberStyles}>{getTodaysPatients()}</div>
                <div style={statLabelStyles}>Today's Patients</div>
              </div>
            </div>

            {/* Search and Sort Controls */}
            <div style={controlsStyles}>
              <div style={searchContainerStyles}>
                <div style={searchIconStyles}>
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search patients by name, email, or ID..."
                  style={searchInputStyles}
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#059669';
                    e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                style={sortButtonStyles}
                className="sort-button"
                onClick={() => handleSort('patientName')}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#059669';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#059669';
                  e.target.style.transform = 'translateY(0px)';
                }}
              >
                <ArrowUpDown size={16} />
                Sort by Name
              </button>
            </div>

            {/* Patients Grid */}
            {sortedPatients.length === 0 ? (
              <div style={emptyStateStyles}>
                <User size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                <h3 style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  {searchTerm ? 'No matching patients found' : 'No scheduled patients'}
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  {searchTerm ? 
                    `Try adjusting your search for "${searchTerm}"` : 
                    'Scheduled patients will appear here when appointments are made'
                  }
                </p>
              </div>
            ) : (
              <div style={patientsGridStyles}>
                {sortedPatients.map((patient, index) => (
                  <div
                    key={patient.patientId || index}
                    style={patientCardStyles}
                    className="patient-card"
                  >
                    <div style={patientHeaderStyles}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                        <div style={patientAvatarStyles}>
                          {getPatientInitials(patient.patientName)}
                        </div>
                        <div style={patientInfoStyles}>
                          <h3 style={patientNameStyles}>{patient.patientName || 'Unknown Patient'}</h3>
                          <div style={patientIdStyles}>
                            ID: {patient.patientId || 'N/A'}
                          </div>
                          <div style={patientEmailStyles}>
                            <Mail size={14} />
                            {patient.patientEmail || 'No email provided'}
                          </div>
                        </div>
                      </div>
                      <div style={statusBadgeStyles}>
                        Scheduled
                      </div>
                    </div>

                    <div style={detailsGridStyles}>
                      <div style={detailItemStyles}>
                        <span style={detailLabelStyles}>📅 Last Visit</span>
                        <span style={detailValueStyles}>
                          {patient.lastVisit || 'First Visit'}
                        </span>
                      </div>
                      <div style={detailItemStyles}>
                        <span style={detailLabelStyles}>🩺 Condition</span>
                        <span style={detailValueStyles}>
                          {patient.condition || 'General Checkup'}
                        </span>
                      </div>
                      <div style={detailItemStyles}>
                        <span style={detailLabelStyles}>🏥 Department</span>
                        <span style={detailValueStyles}>
                          {patient.department || 'General Medicine'}
                        </span>
                      </div>
                      <div style={detailItemStyles}>
                        <span style={detailLabelStyles}>⭐ Priority</span>
                        <span style={detailValueStyles}>
                          {patient.priority || 'Normal'}
                        </span>
                      </div>
                    </div>

                    <div style={actionButtonsStyles}>
                      <Link
                        to="/addprescription"
                        state={{ scheduledPatients: patient }}
                        style={primaryButtonStyles}
                        className="primary-button"
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#047857';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#059669';
                          e.target.style.transform = 'translateY(0px)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <FileText size={16} />
                        Add Prescription
                      </Link>
                      
                      <Link
                        to="/viewprescriptions"
                        state={{ scheduledPatients: patient }}
                        style={secondaryButtonStyles}
                        className="secondary-button"
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#059669';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#059669';
                          e.target.style.transform = 'translateY(0px)';
                        }}
                      >
                        <Eye size={16} />
                        View Records
                      </Link>
                      
                      <Link
                        to="/transferpatient"
                        state={{ appointmentId: patient._id }}
                        style={transferButtonStyles}
                        className="transfer-button"
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#f97316';
                          e.target.style.color = 'white';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#f97316';
                          e.target.style.transform = 'translateY(0px)';
                        }}
                      >
                        <ArrowRightLeft size={16} />
                        Transfer
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorPatients;
