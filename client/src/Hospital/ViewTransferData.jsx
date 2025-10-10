// import React, { useEffect, useState } from 'react';
// import HospitalSidebar from './HospitalSidebar';

// function ViewTransferData() {
//   const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
//   const [viewTransferData, setViewTransferData] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransferData = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/DPR/doctortransferdata', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ hospitalId: auth.loginId })
//         });
 
//         if (!response.ok) throw new Error(`${response.status}`);
//         const data = await response.json();
//         setViewTransferData(data);
//       } catch (err) {
//         console.error("Fetch transfer data error:", err);
//         setError('Failed to fetch transfer data');
//       }
//     };

//     if (auth.loginId) fetchTransferData();
//   }, [auth.loginId]);

//   if (error) return <p>{error}</p>;
//   if (viewTransferData.length === 0) return <p>No transfer data found.</p>;

//   return (
//     <>
//     <HospitalSidebar/>
//     <div>
      
//       {viewTransferData.map((item) => (
//         <div key={item._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
//           <h3>Patient: {item.appointmentId?.patientName || 'N/A'}</h3>
//           <p>Appointment: {item.appointmentId?.patientName || 'N/A'}</p>
//           <p>From Hospital: {item.fromHospitalId?.hospitalName}</p>
//           <p>To Hospital: {item.toHospitalId?.hospitalName}</p>
//           <p>Transfer Date: {new Date(item.transferDate).toLocaleString()}</p>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// }

// export default ViewTransferData;

import React, { useEffect, useState } from 'react';
import HospitalSidebar from './HospitalSidebar';
import { 
  ArrowRightLeft, 
  Building, 
  User, 
  Calendar, 
  Clock,
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  FileText,
  Search,
  Filter,
  Download
} from 'lucide-react';

function ViewTransferData() {
  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const [viewTransferData, setViewTransferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTransferData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/DPR/doctortransferdata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hospitalId: auth.loginId })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setViewTransferData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch transfer data error:", err);
        setError('Failed to fetch transfer data');
      } finally {
        setLoading(false);
      }
    };

    if (auth.loginId) fetchTransferData();
  }, [auth.loginId]);

  // Filter transfer data based on search and status
  const filteredTransferData = viewTransferData.filter(item => {
    const matchesSearch = 
      item.appointmentId?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fromHospitalId?.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toHospitalId?.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Get transfer statistics
  const getTransferStats = () => {
    const total = viewTransferData.length;
    const thisMonth = viewTransferData.filter(item => {
      const transferDate = new Date(item.transferDate);
      const now = new Date();
      return transferDate.getMonth() === now.getMonth() && transferDate.getFullYear() === now.getFullYear();
    }).length;
    const completed = viewTransferData.filter(item => item.status === 'completed').length;
    const pending = viewTransferData.filter(item => item.status === 'pending').length;

    return { total, thisMonth, completed, pending };
  };

  const stats = getTransferStats();

  // Professional Hospital Module Theme Styles
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
    color: '#1e40af'
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

  const exportButtonStyles = {
    padding: '12px 24px',
    backgroundColor: '#f8fafc',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    fontWeight: '600'
  };

  const transferGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '2rem',
    padding: '3rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const transferCardStyles = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const transferHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem'
  };

  const patientAvatarStyles = {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #bfdbfe',
    flexShrink: 0
  };

  const patientInfoStyles = {
    flex: 1,
    marginLeft: '1rem'
  };

  const patientNameStyles = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0'
  };

  const appointmentIdStyles = {
    fontSize: '0.8rem',
    color: '#64748b',
    fontFamily: 'monospace',
    backgroundColor: '#f8fafc',
    padding: '2px 8px',
    borderRadius: '6px',
    display: 'inline-block'
  };

  const statusBadgeStyles = (status) => {
    const colors = {
      completed: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
      pending: { bg: '#fef3c7', color: '#92400e', border: '#fed7aa' },
      failed: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' }
    };
    const statusColors = colors[status?.toLowerCase()] || colors.pending;
    
    return {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'capitalize',
      backgroundColor: statusColors.bg,
      color: statusColors.color,
      border: `1px solid ${statusColors.border}`
    };
  };

  const transferDetailsStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const detailRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #f1f5f9'
  };

  const detailIconStyles = {
    width: '20px',
    height: '20px',
    color: '#1e40af',
    flexShrink: 0
  };

  const detailTextStyles = {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: '500',
    flex: 1
  };

  const transferDateStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f0fdf4',
    borderRadius: '10px',
    border: '1px solid #bbf7d0'
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
    color: '#64748b',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    margin: '3rem'
  };

  const errorStyles = {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '2rem',
    borderRadius: '20px',
    margin: '3rem',
    textAlign: 'center',
    border: '1px solid #fecaca'
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
    
    .filter-select:focus {
      border-color: #1e40af !important;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
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
      border-color: #1e40af !important;
    }
    
    .transfer-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
      border-color: #1e40af !important;
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
                Loading transfer data...
              </p>
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
          <HospitalSidebar />
          <div style={mainContentStyles}>
            <div style={errorStyles}>
              <AlertCircle size={64} style={{ marginBottom: '1rem', color: '#dc2626' }} />
              <h3>Error Loading Transfer Data</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#1e40af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
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
    );
  }

  return (
    <>
      <style>{keyframesStyles}</style>
      <div style={layoutContainerStyles}>
        <HospitalSidebar />
        <div style={mainContentStyles}>
          {/* Header */}
          <div style={headerStyles}>
            <div style={headerContentStyles}>
              <div style={headerLeftStyles}>
                <h1 style={pageTitleStyles}>
                  <ArrowRightLeft size={36} />
                  Patient Transfer Records
                </h1>
                <p style={pageSubtitleStyles}>
                  Comprehensive tracking of inter-hospital patient transfers and medical handoffs
                </p>
              </div>
              <div style={headerActionsStyles}>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.8 }}>
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <button 
                  className="refresh-btn"
                  style={refreshButtonStyles}
                  onClick={() => window.location.reload()}
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

          {/* Statistics */}
          <div style={statsGridStyles}>
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#eff6ff')}>
                <ArrowRightLeft size={24} style={{ color: '#1e40af' }} />
              </div>
              <div style={statNumberStyles}>{stats.total}</div>
              <div style={statLabelStyles}>Total Transfers</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#f0fdf4')}>
                <CheckCircle size={24} style={{ color: '#059669' }} />
              </div>
              <div style={statNumberStyles}>{stats.completed}</div>
              <div style={statLabelStyles}>Completed</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#fef3e2')}>
                <Clock size={24} style={{ color: '#d97706' }} />
              </div>
              <div style={statNumberStyles}>{stats.pending}</div>
              <div style={statLabelStyles}>Pending</div>
            </div>
            
            <div className="stat-card" style={statCardStyles}>
              <div style={statIconContainerStyles('#f3e8ff')}>
                <TrendingUp size={24} style={{ color: '#7c3aed' }} />
              </div>
              <div style={statNumberStyles}>{stats.thisMonth}</div>
              <div style={statLabelStyles}>This Month</div>
            </div>
          </div>

          {/* Search and Filter Toolbar */}
          <div style={toolbarStyles}>
            <div style={searchContainerStyles}>
              <div style={searchIconStyles}>
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by patient name, hospital..."
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
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={filterSelectStyles}
                className="filter-select"
                onFocus={(e) => {
                  e.target.style.borderColor = '#1e40af';
                  e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
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
                Export Data
              </button>
            </div>
          </div>

          {/* Transfer Records */}
          {filteredTransferData.length === 0 ? (
            <div style={emptyStateStyles}>
              <ArrowRightLeft size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
              <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                {searchTerm || statusFilter !== 'all' ? 'No matching transfers found' : 'No transfer records available'}
              </h3>
              <p style={{ color: '#94a3b8' }}>
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Patient transfer records will appear here when transfers are made'
                }
              </p>
            </div>
          ) : (
            <div style={transferGridStyles}>
              {filteredTransferData.map((item) => (
                <div 
                  key={item._id} 
                  className="transfer-card"
                  style={transferCardStyles}
                >
                  <div style={transferHeaderStyles}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={patientAvatarStyles}>
                        <User size={28} style={{ color: '#1e40af' }} />
                      </div>
                      <div style={patientInfoStyles}>
                        <h3 style={patientNameStyles}>
                          {item.appointmentId?.patientName || 'Unknown Patient'}
                        </h3>
                        <div style={appointmentIdStyles}>
                          Appointment: {item.appointmentId?._id?.slice(-8) || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div style={statusBadgeStyles(item.status || 'completed')}>
                      {item.status || 'Completed'}
                    </div>
                  </div>

                  <div style={transferDetailsStyles}>
                    <div style={detailRowStyles}>
                      <Building style={detailIconStyles} />
                      <div style={detailTextStyles}>
                        <strong>From:</strong> {item.fromHospitalId?.hospitalName || 'Unknown Hospital'}
                      </div>
                    </div>
                    
                    <div style={detailRowStyles}>
                      <Building style={detailIconStyles} />
                      <div style={detailTextStyles}>
                        <strong>To:</strong> {item.toHospitalId?.hospitalName || 'Unknown Hospital'}
                      </div>
                    </div>
                    
                    {item.transferNotes && (
                      <div style={detailRowStyles}>
                        <FileText style={detailIconStyles} />
                        <div style={detailTextStyles}>
                          <strong>Notes:</strong> {item.transferNotes}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={transferDateStyles}>
                    <Calendar size={16} style={{ color: '#059669' }} />
                    <span style={{ fontSize: '0.9rem', color: '#059669', fontWeight: '600' }}>
                      Transfer Date: {new Date(item.transferDate).toLocaleString()}
                    </span>
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

export default ViewTransferData;
