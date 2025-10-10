import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

function AuditPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    actionType: 'all',
    entityType: 'all',
    userId: '',
    searchTerm: ''
  });
  const [stats, setStats] = useState({
    totalActivities: 0,
    todayActivities: 0,
    uniqueUsers: 0,
    criticalActions: 0
  });

  useEffect(() => {
    fetchAuditLogs();
    fetchAuditStats();
  }, [filters]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`http://localhost:4000/DPR/audit-logs?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch audit logs');
      
      const data = await response.json();
      setAuditLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditStats = async () => {
    try {
      const response = await fetch('http://localhost:4000/DPR/audit-stats');
      if (!response.ok) throw new Error('Failed to fetch audit stats');
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching audit stats:', err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      actionType: 'all',
      entityType: 'all',
      userId: '',
      searchTerm: ''
    });
  };

  const exportAuditLogs = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`http://localhost:4000/DPR/audit-logs/export?${queryParams}`);
      if (!response.ok) throw new Error('Failed to export audit logs');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Error exporting audit logs: ' + err.message);
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      'CREATE': '➕',
      'READ': '👁️',
      'UPDATE': '✏️',
      'DELETE': '🗑️',
      'LOGIN': '🔐',
      'LOGOUT': '🚪',
      'EXPORT': '📤',
      'IMPORT': '📥',
      'SCHEDULE': '📅',
      'PRESCRIBE': '💊',
      'ADMIT': '🏥'
    };
    return icons[action] || '📋';
  };

  const getEntityIcon = (entity) => {
    const icons = {
      'DOCTOR': '👨‍⚕️',
      'PATIENT': '👤',
      'APPOINTMENT': '📅',
      'PRESCRIPTION': '💊',
      'LAB_REPORT': '🧪',
      'HOSPITAL': '🏥',
      'USER': '👥',
      'SYSTEM': '⚙️'
    };
    return icons[entity] || '📄';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'LOW': '#059669',
      'MEDIUM': '#f59e0b',
      'HIGH': '#dc2626',
      'CRITICAL': '#991b1b'
    };
    return colors[severity] || '#6b7280';
  };

  const getSeverityBg = (severity) => {
    const colors = {
      'LOW': '#dcfce7',
      'MEDIUM': '#fef3c7',
      'HIGH': '#fee2e2',
      'CRITICAL': '#fef2f2'
    };
    return colors[severity] || '#f3f4f6';
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
    filtersContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    filterLabel: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    filterInput: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    filterSelect: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    filterActions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    },
    actionButton: {
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    primaryButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#059669',
      border: '2px solid #059669'
    },
    resetButton: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    auditLogsContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    tableWrapper: {
      overflowX: 'auto',
      maxHeight: '70vh'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    headerCell: {
      padding: '20px 16px',
      textAlign: 'left',
      fontWeight: '700',
      fontSize: '13px',
      letterSpacing: '0.1em',
      color: '#ffffff',
      textTransform: 'uppercase'
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      transition: 'all 0.2s ease'
    },
    tableCell: {
      padding: '16px',
      fontSize: '14px',
      color: '#374151',
      verticalAlign: 'middle'
    },
    logEntry: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    actionBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    entityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#3730a3',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    severityBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    timestamp: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500'
    },
    userInfo: {
      fontWeight: '600',
      color: '#1f2937'
    },
    details: {
      fontSize: '13px',
      color: '#6b7280',
      maxWidth: '300px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
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
      .filters-grid {
        grid-template-columns: 1fr !important;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr !important;
      }
      .filter-actions {
        justify-content: center !important;
      }
    }
    
    .filter-input:focus, .filter-select:focus {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .table-row:hover {
      background-color: #f8fafc !important;
    }
    
    .primary-button:hover {
      background-color: #047857 !important;
      transform: translateY(-1px) !important;
    }
    
    .secondary-button:hover {
      background-color: #059669 !important;
      color: white !important;
      transform: translateY(-1px) !important;
    }
    
    .reset-button:hover {
      background-color: #4b5563 !important;
      transform: translateY(-1px) !important;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <AdminSidebar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
                Loading audit logs...
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
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <AdminSidebar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.errorContainer}>
              <h3>⚠️ Error Loading Audit Logs</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  ...styles.actionButton,
                  ...styles.primaryButton,
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
      <style>{cssRules}</style>
      <div style={styles.pageContainer}>
        <AdminSidebar />
        <div style={styles.mainContent} className="main-content">
          {/* Header */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>System Audit Trail</h1>
            <p style={styles.subtitle}>
              Comprehensive tracking of all system activities and user actions
            </p>
          </div>

          {/* Statistics */}
          <div style={styles.statsGrid} className="stats-grid">
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <div style={styles.statNumber}>{stats.totalActivities}</div>
              <div style={styles.statLabel}>Total Activities</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statNumber}>{stats.todayActivities}</div>
              <div style={styles.statLabel}>Today's Activities</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statNumber}>{stats.uniqueUsers}</div>
              <div style={styles.statLabel}>Active Users</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⚠️</div>
              <div style={styles.statNumber}>{stats.criticalActions}</div>
              <div style={styles.statLabel}>Critical Actions</div>
            </div>
          </div>

          {/* Filters */}
          <div style={styles.filtersContainer}>
            <div style={styles.filtersGrid} className="filters-grid">
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>📅 Date From</label>
                <input
                  type="date"
                  style={styles.filterInput}
                  className="filter-input"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>📅 Date To</label>
                <input
                  type="date"
                  style={styles.filterInput}
                  className="filter-input"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>⚡ Action Type</label>
                <select
                  style={styles.filterSelect}
                  className="filter-select"
                  value={filters.actionType}
                  onChange={(e) => handleFilterChange('actionType', e.target.value)}
                >
                  <option value="all">All Actions</option>
                  <option value="CREATE">Create</option>
                  <option value="READ">Read</option>
                  <option value="UPDATE">Update</option>
                  <option value="DELETE">Delete</option>
                  <option value="LOGIN">Login</option>
                  <option value="LOGOUT">Logout</option>
                  <option value="EXPORT">Export</option>
                  <option value="SCHEDULE">Schedule</option>
                  <option value="PRESCRIBE">Prescribe</option>
                </select>
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>📋 Entity Type</label>
                <select
                  style={styles.filterSelect}
                  className="filter-select"
                  value={filters.entityType}
                  onChange={(e) => handleFilterChange('entityType', e.target.value)}
                >
                  <option value="all">All Entities</option>
                  <option value="DOCTOR">Doctors</option>
                  <option value="PATIENT">Patients</option>
                  <option value="APPOINTMENT">Appointments</option>
                  <option value="PRESCRIPTION">Prescriptions</option>
                  <option value="LAB_REPORT">Lab Reports</option>
                  <option value="HOSPITAL">Hospitals</option>
                  <option value="USER">Users</option>
                </select>
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>👤 User ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID..."
                  style={styles.filterInput}
                  className="filter-input"
                  value={filters.userId}
                  onChange={(e) => handleFilterChange('userId', e.target.value)}
                />
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>🔍 Search</label>
                <input
                  type="text"
                  placeholder="Search in details..."
                  style={styles.filterInput}
                  className="filter-input"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </div>
            </div>
            <div style={styles.filterActions} className="filter-actions">
              <button
                style={{...styles.actionButton, ...styles.resetButton}}
                className="reset-button"
                onClick={resetFilters}
              >
                🔄 Reset Filters
              </button>
              <button
                style={{...styles.actionButton, ...styles.secondaryButton}}
                className="secondary-button"
                onClick={exportAuditLogs}
              >
                📤 Export CSV
              </button>
              <button
                style={{...styles.actionButton, ...styles.primaryButton}}
                className="primary-button"
                onClick={fetchAuditLogs}
              >
                🔍 Apply Filters
              </button>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div style={styles.auditLogsContainer}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.headerCell}>Timestamp</th>
                    <th style={styles.headerCell}>User</th>
                    <th style={styles.headerCell}>Action</th>
                    <th style={styles.headerCell}>Entity</th>
                    <th style={styles.headerCell}>Severity</th>
                    <th style={styles.headerCell}>IP Address</th>
                    <th style={styles.headerCell}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={styles.emptyState}>
                        <div style={{fontSize: '3rem', marginBottom: '1rem', opacity: 0.3}}>📋</div>
                        <div style={{fontSize: '18px', fontWeight: '600', marginBottom: '0.5rem'}}>
                          No audit logs found
                        </div>
                        <div style={{fontSize: '14px', opacity: 0.8}}>
                          Try adjusting your filters or check back later
                        </div>
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log, index) => (
                      <tr key={index} style={styles.tableRow} className="table-row">
                        <td style={styles.tableCell}>
                          <div style={styles.timestamp}>
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.userInfo}>
                            {log.userName || log.userId || 'System'}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{
                            ...styles.actionBadge,
                            backgroundColor: '#e0f2fe',
                            color: '#0e7490'
                          }}>
                            {getActionIcon(log.action)} {log.action}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={styles.entityBadge}>
                            {getEntityIcon(log.entityType)} {log.entityType}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{
                            ...styles.severityBadge,
                            backgroundColor: getSeverityBg(log.severity),
                            color: getSeverityColor(log.severity)
                          }}>
                            {log.severity}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{fontSize: '12px', fontFamily: 'monospace'}}>
                            {log.ipAddress || 'N/A'}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.details} title={log.details}>
                            {log.details}
                          </div>
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
  );
}

export default AuditPage;
