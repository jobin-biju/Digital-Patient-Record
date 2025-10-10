import React, { useEffect, useState } from "react";
import url from "../Admin/imageUrl";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Download, Eye, FileText, MapPin, Phone, Mail, User, Building } from 'lucide-react';

function AdminHospitalView() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/DPR/hospitalview")
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
        setFilteredHospitals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = hospitals.filter((hospital) =>
      hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.adminPerson?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchTerm, hospitals]);

  // Fixed layout styles - CORRECTED VERSION
  const layoutContainerStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fffe',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  };

  const sidebarContainerStyles = {
    width: '250px',
    minWidth: '250px', // Prevent shrinking
    height: '100vh',
    position: 'fixed', // Fixed positioning for sidebar
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: '#2d5730'
  };

  const mainContentStyles = {
    marginLeft: '250px', // CRITICAL: Account for sidebar width
    width: 'calc(100% - 250px)', // Ensure proper width calculation
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f1 100%)',
    overflowX: 'hidden' // Prevent horizontal overflow
  };

  const headerSectionStyles = {
    background: 'linear-gradient(135deg, #6ba46c 0%, #2d5730 100%)',
    borderRadius: '20px',
    padding: '2.5rem',
    marginBottom: '2rem',
    color: 'white',
    boxShadow: '0 20px 40px rgba(107, 164, 108, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const headerDecorativeStyles = {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite'
  };

  const headerContentStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const headerTitleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  };

  const headerSubtitleStyles = {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: 0
  };

  const statsCardStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minWidth: '120px'
  };

  const statsNumberStyles = {
    fontSize: '3rem',
    fontWeight: '800',
    display: 'block',
    lineHeight: 1
  };

  const statsLabelStyles = {
    fontSize: '0.875rem',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '0.5rem'
  };

  const toolbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1rem',
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
    fontSize: '1rem',
    border: '2px solid #e5f3e7',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  };

  const searchIconStyles = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6ba46c'
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
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  const addButtonStyles = {
    ...actionButtonStyles,
    background: 'linear-gradient(135deg, #6ba46c 0%, #2d5730 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(107, 164, 108, 0.3)'
  };

  const filterButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: 'white',
    color: '#6ba46c',
    border: '2px solid #e5f3e7'
  };

  const tableContainerStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid #e5f3e7'
  };

  const tableHeaderStyles = {
    backgroundColor: '#f8fffe',
    borderBottom: '2px solid #e5f3e7',
    padding: '1.5rem 2rem'
  };

  const tableHeaderTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2d5730',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const tableWrapperStyles = {
    overflowX: 'auto', // Allow horizontal scroll on small screens
    maxWidth: '100%'
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    minWidth: '800px' // Ensure minimum width for table
  };

  const thStyles = {
    padding: '1rem 1.5rem',
    backgroundColor: '#f0f9f1',
    color: '#2d5730',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e5f3e7',
    whiteSpace: 'nowrap'
  };

  const tdStyles = {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #f0f9f1',
    verticalAlign: 'top'
  };

  const hospitalRowStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const hospitalCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '250px'
  };

  const hospitalLogoStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    objectFit: 'cover',
    border: '2px solid #e5f3e7',
    flexShrink: 0
  };

  const hospitalInfoStyles = {
    flex: 1,
    minWidth: '150px'
  };

  const hospitalNameStyles = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2d5730',
    margin: '0 0 4px 0'
  };

  const departmentBadgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: '#e8f5e8',
    color: '#2d5730',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500'
  };

  const contactInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '200px'
  };

  const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#4a5568'
  };

  const actionButtonGroupStyles = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  };

  const smallButtonStyles = {
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  const viewButtonStyles = {
    ...smallButtonStyles,
    backgroundColor: '#e3f2fd',
    color: '#1976d2'
  };

  const documentButtonStyles = {
    ...smallButtonStyles,
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6b7280'
  };

  const loadingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    gap: '1rem',
    marginLeft: '250px', // Account for sidebar
    width: 'calc(100% - 250px)'
  };

  const spinnerStyles = {
    width: '60px',
    height: '60px',
    border: '4px solid #e5f3e7',
    borderTop: '4px solid #6ba46c',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const keyframesStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0 !important;
        width: 100% !important;
      }
      .sidebar-container {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      .sidebar-container.open {
        transform: translateX(0);
      }
    }
  `;

  if (loading) {
    return (
      <>
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <div style={sidebarContainerStyles}>
            <AdminSidebar />
          </div>
          <div style={loadingContainerStyles}>
            <div style={spinnerStyles}></div>
            <p style={{ fontSize: '1.1rem', color: '#6ba46c', fontWeight: '500' }}>
              Loading hospital data...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{keyframesStyles}</style>
      <div style={layoutContainerStyles}>
        {/* Fixed Sidebar */}
        <div style={sidebarContainerStyles}>
          <AdminSidebar />
        </div>
        
        {/* Main Content with proper margin */}
        <div style={mainContentStyles}>
          {/* Modern Header Section */}
          <div style={headerSectionStyles}>
            <div style={headerDecorativeStyles}></div>
            <div style={headerContentStyles}>
              <div>
                <h1 style={headerTitleStyles}>
                  <Building style={{ marginRight: '16px', width: '40px', height: '40px' }} />
                  Hospital Management
                </h1>
                <p style={headerSubtitleStyles}>
                  Comprehensive overview of all registered healthcare facilities
                </p>
              </div>
              <div style={statsCardStyles}>
                <span style={statsNumberStyles}>{filteredHospitals.length}</span>
                <span style={statsLabelStyles}>Active Hospitals</span>
              </div>
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
                placeholder="Search hospitals, departments, or administrators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6ba46c';
                  e.target.style.boxShadow = '0 0 0 3px rgba(107, 164, 108, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5f3e7';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                style={filterButtonStyles}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f0f9f1';
                  e.target.style.borderColor = '#6ba46c';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#e5f3e7';
                }}
              >
                <Filter size={16} />
                Filter
              </button>
              
              <Link to='/hospital' style={addButtonStyles}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(107, 164, 108, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(107, 164, 108, 0.3)';
                }}
              >
                <Plus size={16} />
                Add Hospital
              </Link>
            </div>
          </div>

          {/* Modern Table Container */}
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <h3 style={tableHeaderTitleStyles}>
                <Building size={20} />
                Hospital Directory ({filteredHospitals.length})
              </h3>
            </div>

            {filteredHospitals.length === 0 ? (
              <div style={emptyStateStyles}>
                <Building size={64} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  {searchTerm ? 'No hospitals found' : 'No hospitals registered yet'}
                </h3>
                <p style={{ color: '#9ca3af' }}>
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Healthcare facilities will appear here once they register'
                  }
                </p>
              </div>
            ) : (
              <div style={tableWrapperStyles}>
                <table style={tableStyles}>
                  <thead>
                    <tr>
                      <th style={thStyles}>Hospital Details</th>
                      <th style={thStyles}>Registration Info</th>
                      <th style={thStyles}>Contact Information</th>
                      <th style={thStyles}>Administrator</th>
                      <th style={thStyles}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHospitals.map((hosp, index) => (
                      <tr 
                        key={index} 
                        style={hospitalRowStyles}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fffe';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0px)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <td style={tdStyles}>
                          <div style={hospitalCardStyles}>
                            <img
                              src={url + hosp.hospitalLogo}
                              alt="Hospital Logo"
                              style={hospitalLogoStyles}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x60/6ba46c/ffffff?text=H';
                              }}
                            />
                            <div style={hospitalInfoStyles}>
                              <h4 style={hospitalNameStyles}>{hosp.hospitalName}</h4>
                              <div style={departmentBadgeStyles}>
                                <Building size={12} />
                                {hosp.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                            <strong>Reg #:</strong> {hosp.registerationNumber}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={contactInfoStyles}>
                            <div style={contactItemStyles}>
                              <Phone size={14} style={{ color: '#6ba46c' }} />
                              {hosp.Phone}
                            </div>
                            <div style={contactItemStyles}>
                              <MapPin size={14} style={{ color: '#6ba46c' }} />
                              {hosp.address}
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={contactInfoStyles}>
                            <div style={contactItemStyles}>
                              <User size={14} style={{ color: '#6ba46c' }} />
                              <strong>{hosp.adminPerson}</strong>
                            </div>
                            <div style={contactItemStyles}>
                              <Mail size={14} style={{ color: '#6ba46c' }} />
                              {hosp.adminEmail}
                            </div>
                            <div style={contactItemStyles}>
                              <Phone size={14} style={{ color: '#6ba46c' }} />
                              {hosp.adminPhone}
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={actionButtonGroupStyles}>
                            <button 
                              style={viewButtonStyles}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#bbdefb'}
                              onMouseOut={(e) => e.target.style.backgroundColor = '#e3f2fd'}
                            >
                              <Eye size={14} />
                              View
                            </button>
                            {hosp.documentUpload && (
                              <a
                                href={url + hosp.documentUpload}
                                target="_blank"
                                rel="noreferrer"
                                style={documentButtonStyles}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#e1bee7'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#f3e5f5'}
                              >
                                <FileText size={14} />
                                {hosp.documentUpload.endsWith(".pdf") ? "PDF" : "Doc"}
                              </a>
                            )}
                          </div>
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

export default AdminHospitalView;
