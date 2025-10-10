import React, { useEffect, useState } from 'react';
import LabSidebar from './LabHome'; // Your lab sidebar component
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
  Edit,
  Upload,
  X,
  Save,
  FlaskConical,
  Microscope,
  ClipboardCheck
} from 'lucide-react';

function LabResult() {
    const [patientReport, setPatientReport] = useState([]);
    const [reportDetails, setReportDetails] = useState('');
    const [labfindings, setLabfindings] = useState('');
    const [reportfile, setReportfile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPatientReports();
    }, []);

    const fetchPatientReports = () => {
        setLoading(true);
        fetch('http://localhost:4000/DPR/acceptedreport')
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setPatientReport(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reports:', error);
                setLoading(false);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!selectedReportId) return;

        setSubmitting(true);
        const formData = new FormData();
        formData.append('_id', selectedReportId);
        formData.append('reportDetails', reportDetails);
        formData.append('labfindings', labfindings);
        if (reportfile) formData.append('reportfile', reportfile);

        fetch('http://localhost:4000/DPR/updateLabTestResult', {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                alert('Report Updated Successfully');
                setModalOpen(false);
                resetForm();
                fetchPatientReports(); // Refresh the list
            })
            .catch(err => {
                console.error('Update error:', err);
                alert('Error updating report');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const resetForm = () => {
        setReportDetails('');
        setLabfindings('');
        setReportfile(null);
        setSelectedReportId(null);
        setSelectedPatient(null);
    };

    const openModal = (report) => {
        setSelectedReportId(report._id);
        setSelectedPatient(report.appointmentId?.patientName || 'Unknown Patient');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        resetForm();
    };

    // Filter reports based on search term
    const filteredReports = patientReport.filter(report =>
        report.appointmentId?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.appointmentId?.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        color: '#059669'
    };

    const reportsGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
        padding: '3rem',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const reportCardStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    const reportHeaderStyles = {
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
        border: '2px solid #bfdbfe'
    };

    const statusBadgeStyles = {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        backgroundColor: '#fef3c7',
        color: '#d97706',
        border: '1px solid #fed7aa'
    };

    const patientNameStyles = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.2
    };

    const reportIdStyles = {
        fontSize: '0.875rem',
        color: '#64748b',
        margin: '0 0 1.5rem 0',
        fontFamily: 'monospace',
        backgroundColor: '#f8fafc',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
    };

    const doctorInfoStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #f1f5f9',
        marginBottom: '1.5rem'
    };

    const addReportButtonStyles = {
        width: '100%',
        padding: '1rem 2rem',
        backgroundColor: '#059669',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    // Modal Styles
    const modalOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
    };

    const modalContentStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '3rem',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        position: 'relative'
    };

    const modalHeaderStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f1f5f9'
    };

    const modalTitleStyles = {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    };

    const closeButtonStyles = {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        color: '#64748b',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
    };

    const formGroupStyles = {
        marginBottom: '2rem'
    };

    const labelStyles = {
        display: 'block',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const inputStyles = {
        width: '100%',
        padding: '1rem 1.25rem',
        fontSize: '0.95rem',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: 'white',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    };

    const textareaStyles = {
        ...inputStyles,
        minHeight: '120px',
        resize: 'vertical'
    };

    const fileInputContainerStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };

    const fileInputStyles = {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer'
    };

    const fileButtonStyles = {
        padding: '1rem 1.5rem',
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#374151',
        transition: 'all 0.2s ease'
    };

    const modalActionsStyles = {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        paddingTop: '2rem',
        borderTop: '2px solid #f1f5f9'
    };

    const buttonStyles = {
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        border: 'none'
    };

    const cancelButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#f8fafc',
        color: '#64748b',
        border: '2px solid #e2e8f0'
    };

    const submitButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#059669',
        color: 'white',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
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
        
        .input-focus:focus {
            border-color: #059669 !important;
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
        }
        
        .refresh-btn:hover {
            background-color: rgba(255, 255, 255, 0.25) !important;
            transform: scale(1.05) !important;
        }
        
        .stat-card:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
            border-color: #059669 !important;
        }
        
        .report-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
            border-color: #059669 !important;
        }
        
        .add-report-btn:hover {
            background-color: #047857 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4) !important;
        }
        
        .close-btn:hover {
            background-color: #f1f5f9 !important;
            color: #374151 !important;
        }
        
        .file-btn:hover {
            background-color: #f1f5f9 !important;
            border-color: #059669 !important;
        }
        
        .cancel-btn:hover {
            background-color: #f1f5f9 !important;
            border-color: #cbd5e1 !important;
        }
        
        .submit-btn:hover {
            background-color: #047857 !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4) !important;
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
                                Loading patient reports...
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
                                    <ClipboardCheck size={36} />
                                    Lab Results Entry
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Process and update laboratory test results for patient diagnostic reports
                                </p>
                            </div>
                            <div style={headerActionsStyles}>
                                <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.8 }}>
                                    Last updated: {new Date().toLocaleTimeString()}
                                </div>
                                <button 
                                    className="refresh-btn"
                                    style={refreshButtonStyles}
                                    onClick={fetchPatientReports}
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
                            <div style={statIconContainerStyles('#fef3e2')}>
                                <ClipboardCheck size={24} style={{ color: '#d97706' }} />
                            </div>
                            <div style={statNumberStyles}>{patientReport.length}</div>
                            <div style={statLabelStyles}>Pending Reports</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#eff6ff')}>
                                <User size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={statNumberStyles}>
                                {new Set(patientReport.map(r => r.appointmentId?.patientName)).size}
                            </div>
                            <div style={statLabelStyles}>Unique Patients</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#f0fdf4')}>
                                <Microscope size={24} style={{ color: '#059669' }} />
                            </div>
                            <div style={statNumberStyles}>{filteredReports.length}</div>
                            <div style={statLabelStyles}>Search Results</div>
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
                                placeholder="Search by patient name, doctor, or report ID..."
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
                        
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                            {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
                        </div>
                    </div>

                    {/* Patient Reports Grid */}
                    {filteredReports.length === 0 ? (
                        <div style={emptyStateStyles}>
                            <ClipboardCheck size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                            <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                {searchTerm ? 'No reports found' : 'No pending reports'}
                            </h3>
                            <p style={{ color: '#94a3b8' }}>
                                {searchTerm 
                                    ? `Try adjusting your search for "${searchTerm}"` 
                                    : 'Patient reports requiring lab results will appear here'
                                }
                            </p>
                        </div>
                    ) : (
                        <div style={reportsGridStyles}>
                            {filteredReports.map((report) => (
                                <div 
                                    key={report._id} 
                                    className="report-card"
                                    style={reportCardStyles}
                                >
                                    {/* Report Header */}
                                    <div style={reportHeaderStyles}>
                                        <div style={patientAvatarStyles}>
                                            <User size={28} style={{ color: '#1e40af' }} />
                                        </div>
                                        <div style={statusBadgeStyles}>
                                            Pending Results
                                        </div>
                                    </div>
                                    
                                    {/* Patient Information */}
                                    <h3 style={patientNameStyles}>
                                        {report.appointmentId?.patientName || 'Unknown Patient'}
                                    </h3>
                                    <div style={reportIdStyles}>
                                        Report ID: #{report._id?.slice(-8) || 'N/A'}
                                    </div>
                                    
                                    {/* Doctor Information */}
                                    {report.appointmentId?.doctorId && (
                                        <div style={doctorInfoStyles}>
                                            <Stethoscope size={16} style={{ color: '#059669' }} />
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                                                    Dr. {report.appointmentId.doctorId.name}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    Referring Physician
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Add Report Button */}
                                    <button
                                        className="add-report-btn"
                                        style={addReportButtonStyles}
                                        onClick={() => openModal(report)}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#047857';
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#059669';
                                            e.target.style.transform = 'translateY(0px)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <Plus size={20} />
                                        Add Lab Results
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Modal */}
                    {modalOpen && (
                        <div style={modalOverlayStyles} onClick={closeModal}>
                            <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
                                {/* Modal Header */}
                                <div style={modalHeaderStyles}>
                                    <h3 style={modalTitleStyles}>
                                        <FlaskConical size={24} />
                                        Add Lab Results
                                    </h3>
                                    <button 
                                        className="close-btn"
                                        style={closeButtonStyles}
                                        onClick={closeModal}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#f1f5f9';
                                            e.target.style.color = '#374151';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.color = '#64748b';
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Patient Info */}
                                <div style={{ 
                                    padding: '1rem 1.5rem', 
                                    backgroundColor: '#f8fafc', 
                                    borderRadius: '12px',
                                    marginBottom: '2rem',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                        Patient Name
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>
                                        {selectedPatient}
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleUpdate}>
                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <FileText size={16} />
                                            Report Details
                                        </label>
                                        <textarea
                                            value={reportDetails}
                                            onChange={(e) => setReportDetails(e.target.value)}
                                            placeholder="Enter detailed report description and observations..."
                                            required
                                            style={textareaStyles}
                                            className="input-focus"
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

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Microscope size={16} />
                                            Laboratory Findings
                                        </label>
                                        <textarea
                                            value={labfindings}
                                            onChange={(e) => setLabfindings(e.target.value)}
                                            placeholder="Enter specific laboratory findings and test results..."
                                            required
                                            style={textareaStyles}
                                            className="input-focus"
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

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Upload size={16} />
                                            Report File (Optional)
                                        </label>
                                        <div style={fileInputContainerStyles}>
                                            <div 
                                                className="file-btn"
                                                style={fileButtonStyles}
                                                onMouseOver={(e) => {
                                                    e.target.style.backgroundColor = '#f1f5f9';
                                                    e.target.style.borderColor = '#059669';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.backgroundColor = '#f8fafc';
                                                    e.target.style.borderColor = '#e2e8f0';
                                                }}
                                            >
                                                <Upload size={16} />
                                                {reportfile ? reportfile.name : 'Choose File'}
                                                <input
                                                    type="file"
                                                    onChange={(e) => setReportfile(e.target.files[0])}
                                                    style={fileInputStyles}
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                />
                                            </div>
                                            {reportfile && (
                                                <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '500' }}>
                                                    File selected
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                        </div>
                                    </div>

                                    {/* Modal Actions */}
                                    <div style={modalActionsStyles}>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            style={cancelButtonStyles}
                                            onClick={closeModal}
                                            disabled={submitting}
                                            onMouseOver={(e) => {
                                                if (!submitting) {
                                                    e.target.style.backgroundColor = '#f1f5f9';
                                                    e.target.style.borderColor = '#cbd5e1';
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!submitting) {
                                                    e.target.style.backgroundColor = '#f8fafc';
                                                    e.target.style.borderColor = '#e2e8f0';
                                                }
                                            }}
                                        >
                                            <X size={16} />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="submit-btn"
                                            style={{
                                                ...submitButtonStyles,
                                                backgroundColor: submitting ? '#94a3b8' : '#059669',
                                                cursor: submitting ? 'not-allowed' : 'pointer'
                                            }}
                                            disabled={submitting}
                                            onMouseOver={(e) => {
                                                if (!submitting) {
                                                    e.target.style.backgroundColor = '#047857';
                                                    e.target.style.transform = 'translateY(-1px)';
                                                    e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!submitting) {
                                                    e.target.style.backgroundColor = '#059669';
                                                    e.target.style.transform = 'translateY(0px)';
                                                    e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                                                }
                                            }}
                                        >
                                            {submitting ? (
                                                <>
                                                    <div style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        border: '2px solid white',
                                                        borderTop: '2px solid transparent',
                                                        borderRadius: '50%',
                                                        animation: 'spin 1s linear infinite'
                                                    }}></div>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Results
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LabResult;
