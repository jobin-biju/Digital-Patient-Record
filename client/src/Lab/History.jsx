import React, { useEffect, useState } from 'react';
import LabSidebar from './LabHome'; // Your lab sidebar component
import url from '../Admin/imageUrl';
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
  Plus,
  Building,
  FlaskConical,
  Microscope,
  ExternalLink,
  ChevronDown,
  MoreHorizontal,
  BookOpen
} from 'lucide-react';

function CompletedReports() {
    const [completedReports, setCompletedReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [expandedRows, setExpandedRows] = useState(new Set());

    useEffect(() => {
        fetchCompletedReports();
    }, []);

    const fetchCompletedReports = () => {
        setLoading(true);
        fetch('http://localhost:4000/DPR/completedreport')
            .then(res => res.json())
            .then(data => {
                setCompletedReports(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const toggleRowExpansion = (reportId) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(reportId)) {
            newExpanded.delete(reportId);
        } else {
            newExpanded.add(reportId);
        }
        setExpandedRows(newExpanded);
    };

    // Filter reports based on search term and filters
    const filteredReports = completedReports.filter(report => {
        const matchesSearch = 
            report.appointmentId?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.hospitalId?.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.labId?.labname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.reportDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report._id?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = dateFilter === 'all' || (() => {
            const reportDate = new Date(report.createdAt);
            const now = new Date();
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
        })();

        return matchesSearch && matchesDate;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateText = (text, maxLength = 40) => {
        if (!text) return 'N/A';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' };
            case 'pending':
                return { bg: '#fef3c7', color: '#92400e', border: '#fed7aa' };
            case 'in-progress':
                return { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' };
            default:
                return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
        }
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
        maxWidth: '1600px',
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
        padding: '1.25rem 1rem',
        backgroundColor: '#f1f5f9',
        color: '#1e293b',
        fontWeight: '600',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '2px solid #e2e8f0',
        whiteSpace: 'nowrap',
        textAlign: 'left'
    };

    const tdStyles = {
        padding: '1.25rem 1rem',
        borderBottom: '1px solid #f1f5f9',
        verticalAlign: 'top',
        fontSize: '0.9rem'
    };

    const reportRowStyles = {
        transition: 'all 0.3s ease',
        cursor: 'pointer'
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
        border: '1px solid #dbeafe',
        flexShrink: 0
    };

    const patientInfoStyles = {
        flex: 1,
        minWidth: 0
    };

    const patientNameStyles = {
        fontSize: '0.95rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 4px 0'
    };

    const appointmentIdStyles = {
        fontSize: '0.8rem',
        color: '#64748b',
        margin: 0,
        fontFamily: 'monospace'
    };

    const organizationInfoStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    };

    const orgNameStyles = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const orgSubtextStyles = {
        fontSize: '0.8rem',
        color: '#64748b'
    };

    const reportDetailsStyles = {
        fontSize: '0.9rem',
        color: '#374151',
        lineHeight: 1.4,
        maxWidth: '200px'
    };

    const statusBadgeStyles = (status) => {
        const colors = getStatusColor(status);
        return {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'capitalize',
            backgroundColor: colors.bg,
            color: colors.color,
            border: `1px solid ${colors.border}`
        };
    };

    const fileLinkStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '0.8rem',
        fontWeight: '500',
        border: '1px solid #dbeafe',
        transition: 'all 0.2s ease'
    };

    const dateTimeStyles = {
        fontSize: '0.875rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const expandButtonStyles = {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        color: '#64748b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
    };

    const expandedContentStyles = {
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderTop: '1px solid #e2e8f0'
    };

    const expandedGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    };

    const expandedSectionStyles = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0'
    };

    const sectionTitleStyles = {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
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
        
        .file-link:hover {
            background-color: #dbeafe !important;
            transform: translateY(-1px) !important;
        }
        
        .expand-btn:hover {
            background-color: #f1f5f9 !important;
            border-color: #059669 !important;
            color: #059669 !important;
        }
    `;

    if (loading) {
        return (
            <>
                <style>{keyframesStyles}</style>
                <div style={layoutContainerStyles}>
                    <LabSidebar />
                    <div style={mainContentStyles}>
                        <div style={loadingContainerStyles}>
                            <div style={spinnerStyles}></div>
                            <p style={{ fontSize: '1.1rem', color: '#059669', fontWeight: '500' }}>
                                Loading completed reports...
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
                <LabSidebar />
                <div style={mainContentStyles}>
                    {/* Laboratory Header */}
                    <div style={headerStyles}>
                        <div style={headerContentStyles}>
                            <div style={headerLeftStyles}>
                                <h1 style={pageTitleStyles}>
                                    <CheckCircle size={36} />
                                    Completed Laboratory Reports
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Comprehensive archive of completed diagnostic reports and laboratory test results
                                </p>
                            </div>
                            <div style={headerActionsStyles}>
                                <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.8 }}>
                                    Last updated: {new Date().toLocaleTimeString()}
                                </div>
                                <button 
                                    className="refresh-btn"
                                    style={refreshButtonStyles}
                                    onClick={fetchCompletedReports}
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
                                <CheckCircle size={24} style={{ color: '#059669' }} />
                            </div>
                            <div style={statNumberStyles}>{completedReports.length}</div>
                            <div style={statLabelStyles}>Completed Reports</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#eff6ff')}>
                                <User size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={statNumberStyles}>
                                {new Set(completedReports.map(r => r.appointmentId?.patientName)).size}
                            </div>
                            <div style={statLabelStyles}>Unique Patients</div>
                        </div>
                        
                        <div style={statCardStyles}>
                            <div style={statIconContainerStyles('#fef3e2')}>
                                <Building size={24} style={{ color: '#d97706' }} />
                            </div>
                            <div style={statNumberStyles}>
                                {new Set(completedReports.map(r => r.hospitalId?.hospitalName || r.hospitalId)).size}
                            </div>
                            <div style={statLabelStyles}>Healthcare Facilities</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#ecfdf5')}>
                                <FlaskConical size={24} style={{ color: '#10b981' }} />
                            </div>
                            <div style={statNumberStyles}>
                                {completedReports.filter(r => r.reportfile).length}
                            </div>
                            <div style={statLabelStyles}>Reports with Files</div>
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
                                placeholder="Search by patient, doctor, hospital, lab, or report details..."
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

                    {/* Completed Reports Table */}
                    <div style={tableContainerStyles}>
                        <div style={tableHeaderStyles}>
                            <h3 style={tableHeaderTitleStyles}>
                                <BookOpen size={20} />
                                Completed Reports Archive ({filteredReports.length} reports)
                            </h3>
                        </div>

                        {filteredReports.length === 0 ? (
                            <div style={emptyStateStyles}>
                                <CheckCircle size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                    {searchTerm || dateFilter !== 'all' ? 'No reports found' : 'No completed reports available'}
                                </h3>
                                <p style={{ color: '#94a3b8' }}>
                                    {searchTerm || dateFilter !== 'all'
                                        ? 'Try adjusting your search or filter criteria' 
                                        : 'Completed laboratory reports will appear here'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div style={tableWrapperStyles}>
                                <table style={tableStyles}>
                                    <thead>
                                        <tr>
                                            <th style={thStyles}>Patient & Appointment</th>
                                            <th style={thStyles}>Healthcare Provider</th>
                                            <th style={thStyles}>Laboratory</th>
                                            <th style={thStyles}>Report Summary</th>
                                            <th style={thStyles}>File</th>
                                            <th style={thStyles}>Status</th>
                                            <th style={thStyles}>Date Created</th>
                                            <th style={thStyles}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReports.map((report) => (
                                            <React.Fragment key={report._id}>
                                                <tr
                                                    style={reportRowStyles}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f8fafc';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <td style={tdStyles}>
                                                        <div style={patientCardStyles}>
                                                            <div style={avatarStyles}>
                                                                <User size={20} style={{ color: '#1e40af' }} />
                                                            </div>
                                                            <div style={patientInfoStyles}>
                                                                <h4 style={patientNameStyles}>
                                                                    {report.appointmentId?.patientName || 'Unknown Patient'}
                                                                </h4>
                                                                <p style={appointmentIdStyles}>
                                                                    ID: {report.appointmentId?._id?.slice(-8) || 'N/A'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={organizationInfoStyles}>
                                                            <div style={orgNameStyles}>
                                                                <Stethoscope size={14} style={{ color: '#059669' }} />
                                                                Dr. {typeof report.doctorId === 'object' ? 
                                                                    (report.doctorId?.name || 'Unknown') : 
                                                                    (report.doctorId || 'Unknown')
                                                                }
                                                            </div>
                                                            <div style={orgSubtextStyles}>
                                                                <Building size={12} style={{ marginRight: '4px' }} />
                                                                {typeof report.hospitalId === 'object' ? 
                                                                    (report.hospitalId?.hospitalName || 'Unknown Hospital') : 
                                                                    (report.hospitalId || 'Unknown Hospital')
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={orgNameStyles}>
                                                            <FlaskConical size={14} style={{ color: '#059669' }} />
                                                            {typeof report.labId === 'object' ? 
                                                                (report.labId?.labname || 'Unknown Lab') : 
                                                                (report.labId || 'Unknown Lab')
                                                            }
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={reportDetailsStyles} title={report.reportDetails}>
                                                            {truncateText(report.reportDetails)}
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        {report.reportfile ? (
                                                            <a 
                                                                href={`${url}${report.reportfile}`} 
                                                                target="_blank" 
                                                                rel="noreferrer"
                                                                className="file-link"
                                                                style={fileLinkStyles}
                                                                onMouseOver={(e) => {
                                                                    e.target.style.backgroundColor = '#dbeafe';
                                                                    e.target.style.transform = 'translateY(-1px)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.target.style.backgroundColor = '#eff6ff';
                                                                    e.target.style.transform = 'translateY(0px)';
                                                                }}
                                                            >
                                                                <ExternalLink size={14} />
                                                                View File
                                                            </a>
                                                        ) : (
                                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                                No File
                                                            </span>
                                                        )}
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={statusBadgeStyles(report.status)}>
                                                            <CheckCircle size={12} />
                                                            {report.status || 'Completed'}
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
                                                            className="expand-btn"
                                                            style={expandButtonStyles}
                                                            onClick={() => toggleRowExpansion(report._id)}
                                                            title="View Details"
                                                            onMouseOver={(e) => {
                                                                e.target.style.backgroundColor = '#f1f5f9';
                                                                e.target.style.borderColor = '#059669';
                                                                e.target.style.color = '#059669';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.backgroundColor = '#f8fafc';
                                                                e.target.style.borderColor = '#e2e8f0';
                                                                e.target.style.color = '#64748b';
                                                            }}
                                                        >
                                                            <ChevronDown 
                                                                size={16} 
                                                                style={{
                                                                    transform: expandedRows.has(report._id) ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                    transition: 'transform 0.2s ease'
                                                                }}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                                
                                                {/* Expanded Content */}
                                                {expandedRows.has(report._id) && (
                                                    <tr>
                                                        <td colSpan="8" style={{ padding: 0 }}>
                                                            <div style={expandedContentStyles}>
                                                                <div style={expandedGridStyles}>
                                                                    <div style={expandedSectionStyles}>
                                                                        <h4 style={sectionTitleStyles}>
                                                                            <FileText size={16} />
                                                                            Complete Report Details
                                                                        </h4>
                                                                        <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
                                                                            {report.reportDetails || 'No detailed report information available.'}
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    <div style={expandedSectionStyles}>
                                                                        <h4 style={sectionTitleStyles}>
                                                                            <Microscope size={16} />
                                                                            Laboratory Findings
                                                                        </h4>
                                                                        <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
                                                                            {report.labfindings || 'No laboratory findings recorded.'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
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

export default CompletedReports;
