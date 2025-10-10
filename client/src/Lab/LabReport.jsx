import React, { useEffect, useState } from "react";
import LabHome from './LabHome';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  Calendar,
  User,
  Stethoscope,
  Phone,
  Clock,
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Plus
} from 'lucide-react';

function LabReportsForLab() {
  const [labReports, setLabReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredReports, setFilteredReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [status, setStatus] = useState([])
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));

const handleReport = (report) => {
  let data = {
    appointmentId: report.appointmentId?._id,
    doctorId: report.appointmentId?.doctorId?._id,
    hospitalId: report.hospitalId,
    labId: auth?.loginId,
    status: "In Progress"
  };

  fetch("http://localhost:4000/DPR/addLabReport", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Report Accepted");
      fetchLabReports();
    })
    .catch((err) => console.error("Error:", err));
};

useEffect(()=> {
  fetch('http://localhost:4000/DPR/viewpatinetreportlab')
  .then((res)=> res.json())
  .then((result)=>{
    console.log(result);
    setStatus(result)
  })
},[])

  useEffect(() => {
    fetchLabReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [labReports, searchTerm, statusFilter, dateFilter]);

  const fetchLabReports = () => {
    if (!auth?.loginId) {
      console.error("No hospitalId found in auth");
      setLoading(false);
      return;
    }

    setLoading(true);
    const requestBody = { hospitalId: auth.loginId };
    fetch("http://localhost:4000/DPR/viewLabreportForLab", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setLabReports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setLabReports([]);
        setLoading(false);
        console.error("Fetch error:", err);
      });
  };

  const filterReports = () => {
    let filtered = labReports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.appointmentId?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.appointmentId?.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.createdAt);
        switch (dateFilter) {
          case 'today':
            return reportDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return reportDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return reportDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredReports(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Professional Laboratory Theme Styles
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
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    padding: '2.5rem 3rem',
    color: 'white',
    boxShadow: '0 4px 20px rgba(5, 150, 105, 0.2)'
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

  const headerActionsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const refreshButtonStyles = {
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
    transition: 'all 0.2s ease'
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
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
    color: '#059669'
  };

  const filterSelectStyles = {
    padding: '12px 16px',
    fontSize: '0.95rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '150px'
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
    whiteSpace: 'nowrap'
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

  const reportRowStyles = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const reportIdStyles = {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#059669',
    backgroundColor: '#f0fdf4',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid #bbf7d0'
  };

  const patientCardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const avatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #dbeafe'
  };

  const patientInfoStyles = {
    flex: 1
  };

  const patientNameStyles = {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 4px 0'
  };

  const patientSubtextStyles = {
    fontSize: '0.8rem',
    color: '#64748b',
    margin: 0
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

  const doctorPhoneStyles = {
    fontSize: '0.8rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const reportDetailsStyles = {
    fontSize: '0.9rem',
    color: '#374151',
    lineHeight: 1.4,
    maxWidth: '250px'
  };

  const dateTimeStyles = {
    fontSize: '0.875rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const actionBtnStyles = {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const viewBtnStyles = {
    ...actionBtnStyles,
    backgroundColor: '#e0f2fe',
    color: '#0369a1'
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
    borderTop: '4px solid #059669',
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
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .filter-select:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .refresh-btn:hover {
      background-color: rgba(255, 255, 255, 0.25) !important;
      transform: scale(1.05) !important;
    }
    
    .export-btn:hover {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
    }
    
    .stat-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
      border-color: #059669 !important;
    }
    
    .view-btn:hover {
      background-color: #bae6fd !important;
      transform: scale(1.1) !important;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{keyframesStyles}</style>
        <div style={layoutContainerStyles}>
          <LabHome />
          <div style={mainContentStyles}>
            <div style={loadingContainerStyles}>
              <div style={spinnerStyles}></div>
              <p style={{ fontSize: '1.1rem', color: '#059669', fontWeight: '500' }}>
                Loading laboratory reports...
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
        <LabHome />
        <div style={mainContentStyles}>
          {/* Laboratory Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <div style={headerLeftStyles}>
                <h1 style={pageTitleStyles}>
                  <FileText size={36} />
                  Laboratory Reports Management
                </h1>
                <p style={pageSubtitleStyles}>
                  Comprehensive laboratory report tracking and patient diagnostic data management
                </p>
              </div>
              <div style={headerActionsStyles}>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.8 }}>
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <button 
                  className="refresh-btn"
                  style={refreshButtonStyles}
                  onClick={fetchLabReports}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Laboratory Statistics */}
          <div style={statsGridStyles}>
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#f0fdf4')}>
                <FileText size={24} style={{ color: '#059669' }} />
              </div>
              <div style={statNumberStyles}>{labReports.length}</div>
              <div style={statLabelStyles}>Total Reports</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#eff6ff')}>
                <User size={24} style={{ color: '#1e40af' }} />
              </div>
              <div style={statNumberStyles}>
                {new Set(labReports.map(r => r.appointmentId?.patientName)).size}
              </div>
              <div style={statLabelStyles}>Unique Patients</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#fef3e2')}>
                <Stethoscope size={24} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>
                {new Set(labReports.map(r => r.appointmentId?.doctorId?.name)).size}
              </div>
              <div style={statLabelStyles}>Referring Doctors</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#ecfdf5')}>
                <TrendingUp size={24} style={{ color: '#10b981' }} />
              </div>
              <div style={statNumberStyles}>
                {labReports.filter(r => {
                  const today = new Date().toDateString();
                  return new Date(r.createdAt).toDateString() === today;
                }).length}
              </div>
              <div style={statLabelStyles}>Today's Reports</div>
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
                placeholder="Search reports by patient, doctor, report ID, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyles}
                className="search-input"
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
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={filterSelectStyles}
                className="filter-select"
                onFocus={(e) => {
                  e.target.style.borderColor = '#059669';
                  e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

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
                Export Reports
              </button>
            </div>
          </div>

          {/* Laboratory Reports Table */}
          <div style={tableContainerStyles}>
            <div style={tableHeaderStyles}>
              <h3 style={tableHeaderTitleStyles}>
                <FileText size={20} />
                Laboratory Reports Directory ({filteredReports.length} reports)
              </h3>
            </div>

            {filteredReports.length === 0 ? (
              <div style={emptyStateStyles}>
                <FileText size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                  {searchTerm || dateFilter !== 'all' ? 'No reports found' : 'No laboratory reports available'}
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  {searchTerm || dateFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria' 
                    : 'Laboratory reports will appear here once generated'
                  }
                </p>
              </div>
            ) : (
              <div style={tableWrapperStyles}>
                <table style={tableStyles}>
                  <thead>
                    <tr>
                      <th style={thStyles}>Report ID</th>
                      <th style={thStyles}>Patient Information</th>
                      <th style={thStyles}>Referring Doctor</th>
                      <th style={thStyles}>Report Details</th>
                      <th style={thStyles}>Generated Date</th>
                      <th style={thStyles}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr
                        key={report._id}
                        style={reportRowStyles}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0px)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <td style={tdStyles}>
                          <div style={reportIdStyles}>
                            #{report._id?.slice(-8) || 'N/A'}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={patientCardStyles}>
                            <div style={avatarStyles}>
                              <User size={20} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={patientInfoStyles}>
                              <h4 style={patientNameStyles}>
                                {report.appointmentId?.patientName || 'Unknown Patient'}
                              </h4>
                              <p style={patientSubtextStyles}>Patient Record</p>
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={doctorInfoStyles}>
                            <div style={doctorNameStyles}>
                              <Stethoscope size={14} style={{ color: '#059669' }} />
                              Dr. {report.appointmentId?.doctorId?.name || 'Unknown Doctor'}
                            </div>
                            <div style={doctorPhoneStyles}>
                              <Phone size={12} />
                              {report.appointmentId?.doctorId?.phone || 'N/A'}
                            </div>
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={reportDetailsStyles} title={report.reportDetails}>
                            {truncateText(report.reportDetails)}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <div style={dateTimeStyles}>
                            <Clock size={14} />
                            {formatDate(report.createdAt)}
                          </div>
                        </td>
                        
                        <td style={tdStyles}>
                          <button 
                            className="btn btn-sm view-btn"
                            style={viewBtnStyles}
                            title="View Full Report"
                            onClick={() => handleReport(report)}
                          >
                            Accept
                          </button>
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

export default LabReportsForLab;
