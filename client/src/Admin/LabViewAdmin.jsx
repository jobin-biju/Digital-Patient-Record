import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Search, Filter, Download, Eye, Mail, Phone, MapPin, FlaskConical, Building, TrendingUp, Activity, BarChart3 } from 'lucide-react';

function LabView() {
  const [labview, setLabView] = useState([])
  const [hoveredRow, setHoveredRow] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:4000/DPR/adminviewlab', {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLabView(result)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching labs:', error)
        setLoading(false)
      })
  }, [])

  // Enhanced filtering with proper null checks
  const filteredLabs = labview.filter(lab => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    const nameMatch = lab.labname?.toString().toLowerCase().includes(searchLower);
    const typeMatch = lab.labtype?.toString().toLowerCase().includes(searchLower);
    const emailMatch = lab.contactemail?.toString().toLowerCase().includes(searchLower);
    const phoneMatch = lab.phone?.toString().includes(searchTerm);
    const addressMatch = lab.address?.toString().toLowerCase().includes(searchLower);
    const hospitalMatch = lab.hospitalId?.hospitalName?.toString().toLowerCase().includes(searchLower);
    
    return nameMatch || typeMatch || emailMatch || phoneMatch || addressMatch || hospitalMatch;
  })

  // Sorting functionality
  const sortedLabs = [...filteredLabs].sort((a, b) => {
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

  const labRowStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const labCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const labIconStyles = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#e8f5e8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const labInfoStyles = {
    flex: 1
  };

  const labNameStyles = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2d5730',
    margin: '0 0 4px 0'
  };

  const labSubtextStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  };

  const typeBadgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: '#e8f5e8',
    color: '#2d5730',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
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
    transition: 'all 0.2s ease'
  };

  const addressTextStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: 1.4,
    maxWidth: '200px'
  };

  const hospitalInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#4a5568'
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
      padding: 4px 8px !important;
      border-radius: 8px !important;
      margin: -4px -8px !important;
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

  const getLabTypeStats = () => {
    const types = labview.reduce((acc, lab) => {
      const type = lab.labtype || 'Unknown'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
    return Object.keys(types).length
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
              Loading laboratory data...
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
                  <FlaskConical style={{ marginRight: '16px', width: '40px', height: '40px' }} />
                  Laboratory Management
                </h1>
                <p style={headerSubtitleStyles}>
                  Comprehensive laboratory database with advanced analytics and monitoring
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
                placeholder="Search laboratories, types, contacts, locations..."
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
                <FlaskConical size={28} style={{ color: '#6ba46c' }} />
              </div>
              <div style={statNumberStyles}>{labview.length}</div>
              <div style={statLabelStyles}>Total Laboratories</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#fef3e2'}}>
                <Activity size={28} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>{getLabTypeStats()}</div>
              <div style={statLabelStyles}>Laboratory Types</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#e0f2fe'}}>
                <Building size={28} style={{ color: '#0369a1' }} />
              </div>
              <div style={statNumberStyles}>
                {new Set(labview.filter(l => l.hospitalId?.hospitalName).map(l => l.hospitalId.hospitalName)).size}
              </div>
              <div style={statLabelStyles}>Connected Hospitals</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={{...statIconContainerStyles, backgroundColor: '#f3e8ff'}}>
                <TrendingUp size={28} style={{ color: '#7c3aed' }} />
              </div>
              <div style={statNumberStyles}>{filteredLabs.length}</div>
              <div style={statLabelStyles}>Search Results</div>
            </div>
          </div>

          {/* Modern Table Container */}
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <h3 style={tableHeaderTitleStyles}>
                <FlaskConical size={20} />
                Laboratory Directory ({filteredLabs.length} laboratories)
              </h3>
            </div>

            {filteredLabs.length === 0 ? (
              <div style={emptyStateStyles}>
                <FlaskConical size={64} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                  {searchTerm ? 'No laboratories found' : 'No laboratories registered yet'}
                </h3>
                <p style={{ color: '#9ca3af' }}>
                  {searchTerm 
                    ? `Try adjusting your search for "${searchTerm}"` 
                    : 'Laboratory facilities will appear here once they register'
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
                        onClick={() => handleSort('labname')}
                      >
                        Laboratory Details {getSortIcon('labname')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('labtype')}
                      >
                        Type & Specialty {getSortIcon('labtype')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('contactemail')}
                      >
                        Contact Information {getSortIcon('contactemail')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('address')}
                      >
                        Location {getSortIcon('address')}
                      </th>
                      <th 
                        className="table-header"
                        style={thStyles}
                        onClick={() => handleSort('hospitalId')}
                      >
                        Hospital Affiliation {getSortIcon('hospitalId')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLabs.map((lab, index) => (
                      <tr
                        key={index}
                        style={labRowStyles}
                        onMouseEnter={() => {
                          setHoveredRow(index);
                        }}
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
                          <div style={labCardStyles}>
                            <div style={labIconStyles}>
                              <FlaskConical size={20} style={{ color: '#6ba46c' }} />
                            </div>
                            <div style={labInfoStyles}>
                              <h4 style={labNameStyles}>{lab.labname || 'Unnamed Laboratory'}</h4>
                              <p style={labSubtextStyles}>Lab ID: {lab._id?.slice(-8) || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={typeBadgeStyles}>
                            <Activity size={12} />
                            {lab.labtype || 'General'}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={contactInfoStyles}>
                            <a 
                              href={`mailto:${lab.contactemail || ''}`} 
                              style={contactItemStyles}
                              className="contact-link"
                            >
                              <Mail size={14} style={{ color: '#6ba46c' }} />
                              {lab.contactemail || 'No email'}
                            </a>
                            <a 
                              href={`tel:${lab.phone || ''}`} 
                              style={contactItemStyles}
                              className="contact-link"
                            >
                              <Phone size={14} style={{ color: '#6ba46c' }} />
                              {lab.phone || 'No phone'}
                            </a>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={addressTextStyles}>
                            <MapPin size={14} style={{ color: '#6ba46c', display: 'inline', marginRight: '6px' }} />
                            {lab.address || 'Address not provided'}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={hospitalInfoStyles}>
                            <Building size={14} style={{ color: '#6ba46c' }} />
                            {lab.hospitalId?.hospitalName || 'Independent Lab'}
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

export default LabView
