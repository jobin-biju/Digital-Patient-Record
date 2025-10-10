
import React, { useEffect, useState } from 'react'
import url from "../Admin/imageUrl"
import DoctorSideBar from './DoctorSideBar'

function DoctorReports() {
  const [reportview, setReportView] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })

  
  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const doctorId = auth.loginId;
console.log(reportview);

  useEffect(() => {
    if (doctorId) {
      fetchReports();
    } else {
      setError("Doctor ID not found. Please login again.");
      setLoading(false);
    }
  }, [doctorId]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/DPR/getlabreports", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch lab reports");
      }

      const result = await response.json();
      setReportView(result);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filtering
  const filteredReports = reportview.filter(report => {
    const matchesSearch = report.appointmentId?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.appointmentId?.patientPhone?.includes(searchTerm) ||
                         report.reportDetails?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (dateFilter === 'all') return matchesSearch
    
    const today = new Date()
    const reportDate = new Date(report.createdAt)
    
    if (dateFilter === 'today') {
      return matchesSearch && reportDate.toDateString() === today.toDateString()
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return matchesSearch && reportDate >= weekAgo
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
      return matchesSearch && reportDate >= monthAgo
    }
    
    return matchesSearch
  })

  // Sorting functionality
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    let aValue = a[sortConfig.key]
    let bValue = b[sortConfig.key]
    
    if (sortConfig.key === 'patientName') {
      aValue = a.appointmentId?.patientName || ''
      bValue = b.appointmentId?.patientName || ''
    }
    
    if (sortConfig.key === 'createdAt') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
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
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '0.75rem',
      letterSpacing: '-0.025em'
    },
    subtitle: {
      fontSize: '1.25rem',
      opacity: 0.9,
      fontWeight: '400'
    },
    controlsSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    searchAndFilter: {
      display: 'flex',
      gap: '1rem',
      flex: 1,
      maxWidth: '600px'
    },
    searchContainer: {
      position: 'relative',
      flex: 1
    },
    searchInput: {
      width: '100%',
      padding: '16px 20px 16px 56px',
      fontSize: '16px',
      border: '2px solid transparent',
      borderRadius: '16px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '500'
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: '#059669'
    },
    filterSelect: {
      padding: '16px 20px',
      fontSize: '16px',
      border: '2px solid transparent',
      borderRadius: '16px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '500',
      minWidth: '150px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2.5rem'
    },
    statCard: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    statIcon: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      fontSize: '2rem',
      opacity: 0.1,
      color: '#059669'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '1rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    tableWrapper: {
      overflowX: 'auto',
      maxHeight: '70vh'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    headerRow: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    },
    headerCell: {
      padding: '24px 20px',
      textAlign: 'left',
      fontWeight: '700',
      fontSize: '14px',
      letterSpacing: '0.1em',
      color: '#ffffff',
      textTransform: 'uppercase',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      position: 'relative'
    },
    sortIcon: {
      marginLeft: '8px',
      fontSize: '12px',
      opacity: 0.7
    },
    dataRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer'
    },
    dataRowHover: {
      backgroundColor: '#ecfdf5',
      transform: 'scale(1.001)',
      boxShadow: '0 4px 12px rgba(5, 150, 105, 0.1)'
    },
    dataCell: {
      padding: '20px',
      color: '#374151',
      verticalAlign: 'middle',
      fontSize: '14px',
      fontWeight: '500'
    },
    patientInfo: {
      display: 'flex',
      flexDirection: 'column'
    },
    patientName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px'
    },
    patientPhone: {
      fontSize: '13px',
      color: '#6b7280',
      fontWeight: '500'
    },
    dateCell: {
      fontSize: '14px',
      color: '#374151',
      fontWeight: '500'
    },
    reportDetails: {
      maxWidth: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: '#374151'
    },
    findings: {
      maxWidth: '180px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: '#374151'
    },
    fileLink: {
      display: 'inline-flex',
      align: 'center',
      gap: '0.5rem',
      padding: '8px 16px',
      backgroundColor: '#059669',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    noFileText: {
      color: '#9ca3af',
      fontSize: '13px',
      fontWeight: '500',
      fontStyle: 'italic'
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
      opacity: 0.8
    }
  }

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
      .search-and-filter {
        flex-direction: column !important;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 1rem !important;
      }
      .responsive-hide {
        display: none !important;
      }
    }
    
    .search-input:focus, .filter-select:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1) !important;
    }
    
    .data-row:hover {
      background-color: #ecfdf5 !important;
      transform: scale(1.001) !important;
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1) !important;
    }
    
    .file-link:hover {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .header-cell:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  `

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕️'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const getTodayReports = () => {
    const today = new Date().toDateString()
    return reportview.filter(r => new Date(r.createdAt).toDateString() === today).length
  }

  const getReportsWithFiles = () => {
    return reportview.filter(r => r.reportfile).length
  }

  if (loading) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <DoctorSideBar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={styles.loadingText}>Loading lab reports...</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <DoctorSideBar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.errorContainer}>
              <h3>⚠️ Error Loading Lab Reports</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{cssRules}</style>
      <div style={styles.pageContainer}>
        <DoctorSideBar />
        <div style={styles.mainContent} className="main-content">
          {/* Enhanced Header */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>Laboratory Reports</h1>
            <p style={styles.subtitle}>
              Comprehensive lab test results and diagnostic reports
            </p>
          </div>

          {/* Statistics Grid */}
          <div style={styles.statsGrid} className="stats-grid">
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🧪</div>
              <div style={styles.statNumber}>{reportview.length}</div>
              <div style={styles.statLabel}>Total Reports</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{getTodayReports()}</div>
              <div style={styles.statLabel}>Today's Reports</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📄</div>
              <div style={styles.statNumber}>{getReportsWithFiles()}</div>
              <div style={styles.statLabel}>Reports with Files</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{sortedReports.length}</div>
              <div style={styles.statLabel}>Filtered Results</div>
            </div>
          </div>

          {/* Controls Section */}
          <div style={styles.controlsSection} className="controls-section">
            <div style={styles.searchAndFilter} className="search-and-filter">
              <div style={styles.searchContainer}>
                <div style={styles.searchIcon}>🔬</div>
                <input
                  type="text"
                  placeholder="Search reports, patients, or findings..."
                  style={styles.searchInput}
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                style={styles.filterSelect}
                className="filter-select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Enhanced Table */}
          <div style={styles.tableContainer}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.headerRow}>
                    <th 
                      style={styles.headerCell}
                      onClick={() => handleSort('patientName')}
                      className="header-cell"
                    >
                      👤 Patient Info
                      <span style={styles.sortIcon}>{getSortIcon('patientName')}</span>
                    </th>
                    <th 
                      style={styles.headerCell}
                      onClick={() => handleSort('createdAt')}
                      className="header-cell"
                    >
                      📅 Report Date
                      <span style={styles.sortIcon}>{getSortIcon('createdAt')}</span>
                    </th>
                    <th 
                      style={styles.headerCell}
                      className="header-cell"
                    >
                      📋 Test Details
                    </th>
                    <th 
                      style={styles.headerCell}
                      className="header-cell responsive-hide"
                    >
                      🔬 Findings
                    </th>
                    <th 
                      style={styles.headerCell}
                      className="header-cell"
                    >
                      📄 Report File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReports.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={styles.emptyState}>
                        <div style={styles.emptyStateIcon}>🧪</div>
                        <div style={styles.emptyStateText}>
                          {searchTerm ? 'No matching reports found' : 'No lab reports available'}
                        </div>
                        <div style={styles.emptyStateSubtext}>
                          {searchTerm ? 
                            `Try adjusting your search for "${searchTerm}"` : 
                            'Lab reports will appear here when available'
                          }
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedReports.map((items, index) => (
                      <tr
                        key={index}
                        style={styles.dataRow}
                        className="data-row"
                      >
                        <td style={styles.dataCell}>
                          <div style={styles.patientInfo}>
                            <div style={styles.patientName}>
                              {items.appointmentId?.patientName || 'N/A'}
                            </div>
                            <div style={styles.patientPhone}>
                              📞 {items.appointmentId?.patientPhone || 'No phone'}
                            </div>
                          </div>
                        </td>
                        <td style={styles.dataCell}>
                          <div style={styles.dateCell}>
                            {new Date(items.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td style={styles.dataCell}>
                          <div style={styles.reportDetails} title={items.reportDetails}>
                            {items.reportDetails || 'No details provided'}
                          </div>
                        </td>
                        <td style={styles.dataCell} className="responsive-hide">
                          <div style={styles.findings} title={items.labfindings}>
                            {items.labfindings || 'No findings recorded'}
                          </div>
                        </td>
                        <td style={styles.dataCell}>
                          {items.reportfile ? (
                            <a 
                              href={`${url}${items.reportfile}`}
                              style={styles.fileLink}
                              className="file-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 View Report
                            </a>
                          ) : (
                            <span style={styles.noFileText}>
                              No file attached
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorReports
