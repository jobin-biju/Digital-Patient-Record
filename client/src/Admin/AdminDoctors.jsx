import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Search, Filter, Download, Eye, Mail, Phone, MapPin, User, Building, UserCheck, Activity, TrendingUp, Stethoscope } from 'lucide-react';

function AdminDoctors() {
  const [doctorsview, setDoctorsView] = useState([])
  const [hoveredRow, setHoveredRow] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:4000/DPR/getAllDoctors', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDoctorsView(result)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error)
        setLoading(false)
      })
  }, [])

  // Enhanced filtering with proper null checks
  const filteredDoctors = doctorsview.filter(doctor => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    const nameMatch = doctor.name?.toString().toLowerCase().includes(searchLower);
    const departmentMatch = doctor.department?.toString().toLowerCase().includes(searchLower);
    const hospitalMatch = doctor.hospitalId?.hospitalName?.toString().toLowerCase().includes(searchLower);
    const phoneMatch = doctor.phone?.toString().includes(searchTerm);
    
    return nameMatch || departmentMatch || hospitalMatch || phoneMatch;
  })

  // Sorting functionality
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]
    
    if (sortConfig.key === 'hospitalId') {
      aValue = a.hospitalId?.hospitalName || ''
      bValue = b.hospitalId?.hospitalName || ''
    }
    
    aValue = aValue?.toString() || ''
    bValue = bValue?.toString() || ''
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // MediGrids Healthcare Theme Styles
  const layoutContainerStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fffe',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContentStyles = {
    marginLeft: '250px',
    width: 'calc(100% - 250px)',
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f1 100%)',
    overflowX: 'hidden'
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
    margin: 0,
    lineHeight: 1.5
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
    maxWidth: '450px',
    minWidth: '200px'
  };

  const searchInputStyles = {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '1rem',
    border: '2px solid #e5f3e7',
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
    color: '#6ba46c'
  };

  const actionButtonStyles = {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap'
  };

  const filterButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: 'white',
    color: '#6ba46c',
    border: '2px solid #e5f3e7'
  };

  const exportButtonStyles = {
    ...actionButtonStyles,
    background: 'linear-gradient(135deg, #6ba46c 0%, #2d5730 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(107, 164, 108, 0.3)'
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const statCardStyles = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem 1.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e5f3e7',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const statIconContainerStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  };

  const statNumberStyles = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#2d5730',
    marginBottom: '0.5rem',
    lineHeight: 1
  };

  const statLabelStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
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
    overflowX: 'auto',
    maxHeight: '65vh'
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    minWidth: '900px'
  };

  const thStyles = {
    padding: '1.25rem 1.5rem',
    backgroundColor: '#f0f9f1',
    color: '#2d5730',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e5f3e7',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap'
  };

  const tdStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid #f0f9f1',
    verticalAlign: 'top'
  };

  const doctorRowStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const doctorCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const doctorAvatarStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#e8f5e8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '2px solid #d1fae5'
  };

  const doctorInfoStyles = {
    flex: 1
  };

  const doctorNameStyles = {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#2d5730',
    margin: '0 0 6px 0',
    letterSpacing: '-0.025em'
  };

  const doctorSubtextStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  };

  const departmentBadgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: '#e8f5e8',
    color: '#2d5730',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: '0.025em',
    border: '1px solid #d1fae5'
  };

  const contactInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#4a5568',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    padding: '6px 12px',
    borderRadius: '8px'
  };

  const hospitalInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#4a5568',
    padding: '8px 12px',
    backgroundColor: '#f8fffe',
    borderRadius: '10px',
    border: '1px solid #e5f3e7'
  };

  const loadingContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    gap: '1rem',
    marginLeft: '250px',
    width: 'calc(100% - 250px)',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
  };

  const spinnerStyles = {
    width: '60px',
    height: '60px',
    border: '4px solid #e5f3e7',
    borderTop: '4px solid #6ba46c',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6b7280'
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
    
    .search-input:focus {
      border-color: #6ba46c !important;
      box-shadow: 0 0 0 3px rgba(107, 164, 108, 0.1) !important;
    }
    
    .contact-link:hover {
      background-color: #f0f9f1 !important;
      color: #2d5730 !important;
      transform: translateX(4px) !important;
    }
    
    .filter-btn:hover {
      background-color: #f0f9f1 !important;
      border-color: #6ba46c !important;
    }
    
    .export-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 25px rgba(107, 164, 108, 0.4) !important;
    }
    
    .stat-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
      border-color: #6ba46c !important;
    }
    
    .table-header:hover {
      background-color: #e8f5e8 !important;
    }
  `;

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '⇅'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  if (loading) {
    return (
      <>
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <AdminSidebar />
          <div style={loadingContainerStyles}>
            <div style={spinnerStyles}></div>
            <p style={{ fontSize: '1.1rem', color: '#6ba46c', fontWeight: '500' }}>
              Loading doctors data...
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
        <AdminSidebar />
        <div style={mainContentStyles}>
          {/* Modern Header */}
          <div style={headerSectionStyles}>
            <div style={headerDecorativeStyles}></div>
            <div style={headerContentStyles}>
              <div>
                <h1 style={headerTitleStyles}>
                  <Stethoscope style={{ marginRight: '16px', width: '40px', height: '40px' }} />
                  Medical Staff Directory
                </h1>
                <p style={headerSubtitleStyles}>
                  Comprehensive physician management with advanced search and analytics
                </p>
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
                placeholder="Search doctors, departments, hospitals, phone numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
                className="search-input"
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
                className="filter-btn"
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
              
              <button 
                className="export-btn"
                style={exportButtonStyles}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(107, 164, 108, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(107, 164, 108, 0.3)';
                }}
              >
                <Download size={16} />
                Export Data
              </button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div style={statsGridStyles}>
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#e8f5e8'}}>
                <Stethoscope size={28} style={{ color: '#6ba46c' }} />
              </div>
              <div style={statNumberStyles}>{doctorsview.length}</div>
              <div style={statLabelStyles}>Total Doctors</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#fef3e2'}}>
                <Activity size={28} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>
                {new Set(doctorsview.filter(d => d.department).map(d => d.department)).size}
              </div>
              <div style={statLabelStyles}>Medical Departments</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#e0f2fe'}}>
                <Building size={28} style={{ color: '#0369a1' }} />
              </div>
              <div style={statNumberStyles}>
                {new Set(doctorsview.filter(d => d.hospitalId?.hospitalName).map(d => d.hospitalId.hospitalName)).size}
              </div>
              <div style={statLabelStyles}>Healthcare Facilities</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#f3e8ff'}}>
                <TrendingUp size={28} style={{ color: '#7c3aed' }} />
              </div>
              <div style={statNumberStyles}>{filteredDoctors.length}</div>
              <div style={statLabelStyles}>Search Results</div>
            </div>
          </div>

          {/* Modern Table Container */}
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <h3 style={tableHeaderTitleStyles}>
                <Stethoscope size={20} />
                Medical Staff Directory ({filteredDoctors.length} doctors)
              </h3>
            </div>

            {filteredDoctors.length === 0 ? (
              <div style={emptyStateStyles}>
                <Stethoscope size={64} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  {searchTerm ? 'No doctors found' : 'No doctors registered yet'}
                </h3>
                <p style={{ color: '#9ca3af' }}>
                  {searchTerm 
                    ? `Try adjusting your search for "${searchTerm}"` 
                    : 'Medical staff will appear here once they register'
                  }
                </p>
              </div>
            ) : (
              <div style={tableWrapperStyles}>
                <table style={tableStyles}>
                  <thead>
                    <tr>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('name')}
                      >
                        Doctor Profile {getSortIcon('name')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('department')}
                      >
                        Medical Department {getSortIcon('department')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('phone')}
                      >
                        Contact Information {getSortIcon('phone')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('hospitalId')}
                      >
                        Healthcare Facility {getSortIcon('hospitalId')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDoctors.map((doctor, index) => (
                      <tr
                        key={index}
                        style={doctorRowStyles}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fffe';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 164, 108, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0px)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <td style={tdStyles}>
                          <div style={doctorCardStyles}>
                            <div style={doctorAvatarStyles}>
                              <UserCheck size={24} style={{ color: '#6ba46c' }} />
                            </div>
                            <div style={doctorInfoStyles}>
                              <h4 style={doctorNameStyles}>
                                Dr. {doctor.name || 'Unknown Doctor'}
                              </h4>
                              <p style={doctorSubtextStyles}>
                                Medical Professional • ID: {doctor._id?.slice(-8) || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={departmentBadgeStyles}>
                            <Activity size={14} />
                            {doctor.department || 'General Medicine'}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={contactInfoStyles}>
                            <a 
                              href={`tel:${doctor.phone || ''}`} 
                              style={contactItemStyles}
                              className="contact-link"
                            >
                              <Phone size={16} style={{ color: '#6ba46c' }} />
                              {doctor.phone || 'No phone available'}
                            </a>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={hospitalInfoStyles}>
                            <Building size={16} style={{ color: '#6ba46c' }} />
                            {doctor.hospitalId?.hospitalName || 'Independent Practice'}
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
  )
}

export default AdminDoctors
