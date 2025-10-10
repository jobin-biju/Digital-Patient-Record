import React, { useEffect, useState } from 'react';
import HospitalSidebar from './HospitalSidebar';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, User, Mail, Phone, Stethoscope, Building, Users, Activity, TrendingUp, UserCheck, Plus, ArrowRightLeft, Send } from 'lucide-react';

function PatientDetails() {
  const [patientview, setPatientView] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [auth] = useState(JSON.parse(localStorage.getItem('yourstorage')));

  useEffect(() => {
    setLoading(true);
    const payload = { hospitalId: auth.loginId };
    fetch('http://localhost:4000/DPR/hospitalpatientview', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        setPatientView(result || []);
        setLoading(false);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [auth.loginId]);

  // Filter patients based on search term
  const filteredPatients = patientview.filter(patient =>
    patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientPhone?.includes(searchTerm) ||
    patient.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.doctorId?.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get patient statistics
  const getPatientStats = () => {
    const total = patientview.length;
    const departments = new Set(patientview.map(p => p.department)).size;
    const doctors = new Set(patientview.map(p => p.doctorId?.name)).size;
    const specializations = new Set(patientview.map(p => p.doctorId?.specialization)).size;
    
    return { total, departments, doctors, specializations };
  };

  const stats = getPatientStats();

  // Handle patient transfer
  const handleTransferPatient = (patientId, patientName) => {
    if (window.confirm(`Are you sure you want to transfer patient ${patientName}?`)) {
      // Add your transfer logic here
      console.log('Transferring patient:', patientId);
      alert(`Transfer initiated for patient: ${patientName}`);
    }
  };

  // Professional Hospital Patient Theme Styles
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
    padding: '2.5rem 3rem',
    color: 'white',
    boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
  };

  const headerContentStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const headerLeftStyles = {
    flex: 1
  };

  const pageTitleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const pageSubtitleStyles = {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: 0
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Changed to 5 columns
    gap: '1.5rem',
    padding: '2rem 3rem',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0'
  };

  const statCardStyles = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '2px solid #f1f5f9',
    transition: 'all 0.3s ease'
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
    color: '#1e293b',
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

  const toolbarStyles = {
    padding: '2rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0'
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
    color: '#1e40af'
  };

  const actionButtonStyles = {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
    textDecoration: 'none'
  };

  const filterButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: 'white',
    color: '#1e40af',
    border: '2px solid #e2e8f0'
  };

  const exportButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#f8fafc',
    color: '#475569',
    border: '2px solid #e2e8f0'
  };

  const tableContainerStyles = {
    margin: '0 3rem 3rem 3rem',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  };

  const tableHeaderStyles = {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
    padding: '1.5rem 2rem'
  };

  const tableHeaderTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const tableWrapperStyles = {
    overflowX: 'auto'
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0
  };

  const thStyles = {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#f1f5f9',
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap'
  };

  const tdStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle'
  };

  const patientRowStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const patientCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const patientAvatarStyles = {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: '#1e40af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '700',
    flexShrink: 0
  };

  const patientInfoStyles = {
    flex: 1
  };

  const patientNameStyles = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 4px 0'
  };

  const patientSubtextStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0
  };

  const contactInfoStyles = {
    fontSize: '0.875rem',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const doctorInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const doctorNameStyles = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const specializationStyles = {
    fontSize: '0.8rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const departmentBadgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize'
  };

  // Transfer button styles
  const transferButtonStyles = {
    padding: '8px 16px',
    backgroundColor: '#f97316',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const loadingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  };

  const spinnerStyles = {
    width: '60px',
    height: '60px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #1e40af',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#64748b'
  };

  const keyframesStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .search-input:focus {
      border-color: #1e40af !important;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
    }
    
    .filter-btn:hover {
      background-color: #f8fafc !important;
      border-color: #1e40af !important;
    }
    
    .export-btn:hover {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
    
    .stat-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
      border-color: #1e40af !important;
    }
    
    .transfer-btn:hover {
      background-color: #ea580c !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4) !important;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <HospitalSidebar />
          <div style={mainContentStyles}>
            <div style={loadingContainerStyles}>
              <div style={spinnerStyles}></div>
              <p style={{ fontSize: '1.1rem', color: '#1e40af', fontWeight: '500' }}>
                Loading patient directory...
              </p>
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
        <HospitalSidebar />
        <div style={mainContentStyles}>
          {/* Modern Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <div style={headerLeftStyles}>
                <h1 style={pageTitleStyles}>
                  <Users size={36} />
                  Patient Management
                </h1>
                <p style={pageSubtitleStyles}>
                  Comprehensive patient information system and healthcare records management
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics Grid - Now with 5 cards */}
          <div style={statsGridStyles}>
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#eff6ff')}>
                <Users size={24} style={{ color: '#1e40af' }} />
              </div>
              <div style={statNumberStyles}>{stats.total}</div>
              <div style={statLabelStyles}>Total Patients</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#ecfdf5')}>
                <Stethoscope size={24} style={{ color: '#059669' }} />
              </div>
              <div style={statNumberStyles}>{stats.doctors}</div>
              <div style={statLabelStyles}>Assigned Doctors</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#fef3e2')}>
                <Activity size={24} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>{stats.specializations}</div>
              <div style={statLabelStyles}>Specializations</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#f3e8ff')}>
                <Building size={24} style={{ color: '#7c3aed' }} />
              </div>
              <div style={statNumberStyles}>{stats.departments}</div>
              <div style={statLabelStyles}>Departments</div>
            </div>

            {/* Transfer Data Card */}
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#fef2f2')}>
                <ArrowRightLeft size={24} style={{ color: '#dc2626' }} />
              </div>
              <div style={statNumberStyles}>1</div>
              <div style={statLabelStyles}>Transfer Data</div>
            </div>
          </div>

          {/* Enhanced Toolbar */}
          <div style={toolbarStyles}>
            <div style={searchContainerStyles}>
              <div style={searchIconStyles}>
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search patients, doctors, departments, contact info..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
                className="search-input"
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
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="filter-btn"
                style={filterButtonStyles}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.borderColor = '#1e40af';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#e2e8f0';
                }}
              >
                <Filter size={16} />
                Filter
              </button>

              <button 
                className="export-btn"
                style={exportButtonStyles}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.borderColor = '#cbd5e1';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.borderColor = '#e2e8f0';
                }}
              >
                <Download size={16} />
                Export Records
              </button>
            </div>
          </div>

          {/* Modern Table Container */}
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <h3 style={tableHeaderTitleStyles}>
                <UserCheck size={20} />
                Patient Directory ({filteredPatients.length} patients)
              </h3>
            </div>

            {filteredPatients.length === 0 ? (
              <div style={emptyStateStyles}>
                <Users size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  {searchTerm ? 'No patients found' : 'No patients registered'}
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  {searchTerm 
                    ? `Try adjusting your search for "${searchTerm}"` 
                    : 'Patient records will appear here once registered'
                  }
                </p>
              </div>
            ) : (
              <div style={tableWrapperStyles}>
                <table style={tableStyles}>
                  <thead>
                    <tr>
                      <th style={thStyles}>Patient Information</th>
                      <th style={thStyles}>Contact Details</th>
                      <th style={thStyles}>Assigned Doctor</th>
                      <th style={thStyles}>Medical Specialization</th>
                      <th style={thStyles}>Department</th>
                      <th style={thStyles}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr
                        key={patient._id || index}
                        style={patientRowStyles}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0px)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <td style={tdStyles}>
                          <div style={patientCardStyles}>
                            <div style={patientAvatarStyles}>
                              {patient.patientName?.charAt(0)?.toUpperCase() || 'P'}
                            </div>
                            <div style={patientInfoStyles}>
                              <h4 style={patientNameStyles}>{patient.patientName || 'Unknown Patient'}</h4>
                              <p style={patientSubtextStyles}>Patient Record</p>
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={contactInfoStyles}>
                              <Mail size={14} />
                              {patient.patientEmail || 'No email'}
                            </div>
                            <div style={contactInfoStyles}>
                              <Phone size={14} />
                              {patient.patientPhone || 'No phone'}
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={doctorInfoStyles}>
                            <div style={doctorNameStyles}>
                              <Stethoscope size={14} style={{ color: '#1e40af' }} />
                              Dr. {patient.doctorId?.name || 'Unassigned'}
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={specializationStyles}>
                            <Activity size={12} style={{ color: '#6b7280' }} />
                            {patient.doctorId?.specialization || 'General'}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={departmentBadgeStyles}>
                            <Building size={12} />
                            {patient.department || 'General'}
                          </div>
                        </td>

                        {/* Transfer Action Column */}
                        <td style={tdStyles}>
                          <Link to='/transferdata' state={{ patientId: patient._id, appointmentId: patient._id }}>
                          <button
                            className="transfer-btn"
                            style={transferButtonStyles}
                            onClick={() => handleTransferPatient(patient._id, patient.patientName)}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#ea580c';
                              e.target.style.transform = 'translateY(-1px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.4)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#f97316';
                              e.target.style.transform = 'translateY(0px)';
                              e.target.style.boxShadow = 'none';
                            }}
                            title={`Transfer ${patient.patientName || 'patient'}`}
                          >
                            <Send size={14} />
                            Transfer
                          </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetails;
