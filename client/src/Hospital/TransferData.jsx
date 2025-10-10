import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HospitalSidebar from './HospitalSidebar';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowRightLeft, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  User, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  RefreshCw, 
  ArrowLeft,
  Stethoscope,
  Activity,
  Shield
} from 'lucide-react';

function TransferData() {
  const [viewhospital, setViewHospital] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { patientId, appointmentId, patientName } = location.state || {};
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = () => {
    setLoading(true);
    fetch("http://localhost:4000/DPR/allhospitals", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Filter out current hospital
        const otherHospitals = result.filter(hospital => hospital._id !== auth.loginId);
        setViewHospital(otherHospitals);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setLoading(false);
      });
  };

  // Handle patient transfer
  const handleTransfer = async (hospitalId, hospitalName) => {
    if (window.confirm(`Are you sure you want to transfer ${patientName || 'this patient'} to ${hospitalName}?`)) {
      setTransferring(hospitalId);
      
      try {
        const response = await fetch("http://localhost:4000/DPR/transferPatient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            appointmentId,
            hospitalId,
            fromHospitalId: auth.loginId
          }),
        });
        
        const data = await response.json();
        alert(data.message || "Patient transferred successfully!");
        navigate('/patientdetails'); // Navigate back to patient details
        
      } catch (err) {
        console.error("Error transferring patient:", err);
        alert("Error occurred during transfer. Please try again.");
      } finally {
        setTransferring(null);
      }
    }
  };

  // Filter hospitals based on search term
  const filteredHospitals = viewhospital.filter(hospital =>
    hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.registerationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.adminPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Parse departments safely
  const parseDepartments = (departments) => {
    if (Array.isArray(departments)) {
      return departments.join(", ");
    }
    try {
      return JSON.parse(departments).join(", ");
    } catch {
      return departments || "N/A";
    }
  };

  // Professional Hospital Transfer Theme Styles
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

  const backButtonStyles = {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    textDecoration: 'none'
  };

  const patientInfoStyles = {
    padding: '2rem 3rem',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0'
  };

  const patientCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid #f1f5f9'
  };

  const patientAvatarStyles = {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    backgroundColor: '#1e40af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2rem',
    fontWeight: '700',
    flexShrink: 0
  };

  const patientDetailsStyles = {
    flex: 1
  };

  const patientNameStyles = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0'
  };

  const patientMetaStyles = {
    fontSize: '1rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
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

  const hospitalGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '2rem',
    padding: '3rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const hospitalCardStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const hospitalHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem'
  };

  const hospitalIconStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #bfdbfe'
  };

  const hospitalNameStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
    lineHeight: 1.2
  };

  const hospitalRegNoStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0 0 1.5rem 0',
    fontFamily: 'monospace',
    backgroundColor: '#f8fafc',
    padding: '0.5rem 1rem',
    borderRadius: '8px'
  };

  const hospitalInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const infoItemStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #f1f5f9'
  };

  const infoIconStyles = {
    width: '20px',
    height: '20px',
    color: '#1e40af',
    flexShrink: 0,
    marginTop: '2px'
  };

  const infoTextStyles = {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    lineHeight: 1.4
  };

  const transferButtonStyles = (isTransferring) => ({
    width: '100%',
    padding: '1rem 2rem',
    backgroundColor: isTransferring ? '#94a3b8' : '#f97316',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: isTransferring ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  });

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
    
    .back-btn:hover {
      background-color: rgba(255, 255, 255, 0.25) !important;
      transform: scale(1.05) !important;
    }
    
    .stat-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
      border-color: #1e40af !important;
    }
    
    .hospital-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
      border-color: #1e40af !important;
    }
    
    .transfer-btn:hover {
      background-color: #ea580c !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4) !important;
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
                Loading available hospitals...
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
          {/* Transfer Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <div style={headerLeftStyles}>
                <h1 style={pageTitleStyles}>
                  <ArrowRightLeft size={36} />
                  Patient Transfer Center
                </h1>
                <p style={pageSubtitleStyles}>
                  Secure inter-hospital patient transfer system with comprehensive facility selection
                </p>
              </div>
              <button 
                className="back-btn"
                style={backButtonStyles}
                onClick={() => navigate('/patientdetails')}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <ArrowLeft size={16} />
                Back to Patients
              </button>
            </div>
          </div>

          {/* Patient Information Card */}
          <div style={patientInfoStyles}>
            <div style={patientCardStyles}>
              <div style={patientAvatarStyles}>
                {patientName?.charAt(0)?.toUpperCase() || 'P'}
              </div>
              <div style={patientDetailsStyles}>
                <h2 style={patientNameStyles}>{patientName || 'Unknown Patient'}</h2>
                <div style={patientMetaStyles}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} />
                    Patient ID: {patientId?.slice(-8) || 'N/A'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={16} />
                    Appointment ID: {appointmentId?.slice(-8) || 'N/A'}
                  </div>
                </div>
              </div>
              <div style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                <AlertCircle size={20} style={{ marginBottom: '0.5rem' }} />
                Transfer in Progress
              </div>
            </div>
          </div>

          {/* Transfer Statistics */}
          <div style={statsGridStyles}>
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#eff6ff')}>
                <Building size={24} style={{ color: '#1e40af' }} />
              </div>
              <div style={statNumberStyles}>{viewhospital.length}</div>
              <div style={statLabelStyles}>Available Hospitals</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#f0fdf4')}>
                <Shield size={24} style={{ color: '#059669' }} />
              </div>
              <div style={statNumberStyles}>{filteredHospitals.length}</div>
              <div style={statLabelStyles}>Matching Facilities</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#fef3e2')}>
                <ArrowRightLeft size={24} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>24/7</div>
              <div style={statLabelStyles}>Transfer Service</div>
            </div>
          </div>

          {/* Search Toolbar */}
          <div style={toolbarStyles}>
            <div style={searchContainerStyles}>
              <div style={searchIconStyles}>
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search hospitals by name, registration, location, or administrator..."
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
            
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
              {filteredHospitals.length} hospital{filteredHospitals.length !== 1 ? 's' : ''} available for transfer
            </div>
          </div>

          {/* Hospital Selection Grid */}
          {filteredHospitals.length === 0 ? (
            <div style={emptyStateStyles}>
              <Building size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
              <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                {searchTerm ? 'No hospitals found' : 'No hospitals available'}
              </h3>
              <p style={{ color: '#94a3b8' }}>
                {searchTerm 
                  ? `Try adjusting your search for "${searchTerm}"` 
                  : 'No transfer destinations are currently available'
                }
              </p>
            </div>
          ) : (
            <div style={hospitalGridStyles}>
              {filteredHospitals.map((hospital) => (
                <div 
                  key={hospital._id} 
                  className="hospital-card"
                  style={hospitalCardStyles}
                >
                  {/* Hospital Header */}
                  <div style={hospitalHeaderStyles}>
                    <div style={hospitalIconStyles}>
                      <Building size={28} style={{ color: '#1e40af' }} />
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      Available
                    </div>
                  </div>
                  
                  {/* Hospital Information */}
                  <h3 style={hospitalNameStyles}>
                    {hospital.hospitalName || 'Unknown Hospital'}
                  </h3>
                  <div style={hospitalRegNoStyles}>
                    Registration: {hospital.registerationNumber || 'N/A'}
                  </div>
                  
                  <div style={hospitalInfoStyles}>
                    <div style={infoItemStyles}>
                      <Phone style={infoIconStyles} />
                      <span style={infoTextStyles}>
                        {hospital.Phone || 'No phone number'}
                      </span>
                    </div>
                    
                    <div style={infoItemStyles}>
                      <MapPin style={infoIconStyles} />
                      <span style={infoTextStyles}>
                        {hospital.address || 'No address provided'}
                      </span>
                    </div>
                    
                    <div style={infoItemStyles}>
                      <Stethoscope style={infoIconStyles} />
                      <span style={infoTextStyles}>
                        Departments: {parseDepartments(hospital.department)}
                      </span>
                    </div>
                    
                    <div style={infoItemStyles}>
                      <Users style={infoIconStyles} />
                      <div style={infoTextStyles}>
                        <div style={{ fontWeight: '600' }}>{hospital.adminPerson || 'N/A'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {hospital.adminEmail || 'No email'} • {hospital.adminPhone || 'No phone'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transfer Button */}
                  <button
                    className="transfer-btn"
                    style={transferButtonStyles(transferring === hospital._id)}
                    onClick={() => handleTransfer(hospital._id, hospital.hospitalName)}
                    disabled={transferring === hospital._id}
                    onMouseOver={(e) => {
                      if (transferring !== hospital._id) {
                        e.target.style.backgroundColor = '#ea580c';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (transferring !== hospital._id) {
                        e.target.style.backgroundColor = '#f97316';
                        e.target.style.transform = 'translateY(0px)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {transferring === hospital._id ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid white',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Transferring...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Transfer Patient Here
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TransferData;
