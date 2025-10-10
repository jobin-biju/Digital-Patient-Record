import React, { useEffect, useState } from 'react'
import HospitalSidebar from './HospitalSidebar';
import { Search, Filter, Download, Calendar, Clock, User, Stethoscope, CheckCircle, XCircle, AlertCircle, TrendingUp, Activity, BarChart3 } from 'lucide-react';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))

    useEffect(() => {
        setLoading(true);
        const hospitalId = {
            hospitalId: auth.loginId
        };
        fetch('http://localhost:4000/DPR/hospitalappointmentview', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(hospitalId)
        })
        .then((res) => res.json())
        .then((data) => {
            setAppointments(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [auth.loginId]);

    // Enhanced date & time formatting
    const formatDateTime = (date, time) => {
        const d = new Date(date);
        const options = { 
            weekday: 'short',
            day: "2-digit", 
            month: "short", 
            year: "numeric" 
        };
        return `${d.toLocaleDateString("en-GB", options)} at ${time}`;
    };

    // Format time only
    const formatTime = (time) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Filter appointments
    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = 
            appointment.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.status?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Get appointment statistics
    const getAppointmentStats = () => {
        const total = appointments.length;
        const scheduled = appointments.filter(apt => apt.status === 'scheduled').length;
        const completed = appointments.filter(apt => apt.status === 'completed').length;
        const cancelled = appointments.filter(apt => apt.status === 'cancelled').length;
        
        return { total, scheduled, completed, cancelled };
    };

    const stats = getAppointmentStats();

    // Get status icon and color
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'scheduled':
                return { icon: Clock, color: '#1e40af', bgColor: '#eff6ff' };
            case 'completed':
                return { icon: CheckCircle, color: '#059669', bgColor: '#ecfdf5' };
            case 'cancelled':
                return { icon: XCircle, color: '#dc2626', bgColor: '#fef2f2' };
            default:
                return { icon: AlertCircle, color: '#d97706', bgColor: '#fef3c7' };
        }
    };

    // Professional Hospital Appointment Theme Styles
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

    const appointmentRowStyles = {
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const patientCardStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const patientAvatarStyles = {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: '700',
        flexShrink: 0
    };

    const patientInfoStyles = {
        flex: 1
    };

    const patientNameStyles = {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 4px 0'
    };

    const appointmentIdStyles = {
        fontSize: '0.8rem',
        color: '#64748b',
        margin: 0
    };

    const statusBadgeStyles = (config) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        textTransform: 'capitalize',
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.color}20`
    });

    const doctorInfoStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        color: '#475569'
    };

    const dateTimeInfoStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    };

    const dateStyles = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#1e293b'
    };

    const timeStyles = {
        fontSize: '0.8rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
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
        
        .filter-select:focus {
            border-color: #1e40af !important;
            box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
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
                                Loading appointment schedule...
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
                    {/* Modern Header */}
                    <div style={headerStyles}>
                        <div style={headerContentStyles}>
                            <div style={headerLeftStyles}>
                                <h1 style={pageTitleStyles}>
                                    <Calendar size={36} />
                                    Appointment Management
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Comprehensive appointment scheduling and patient visit management
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Statistics Grid */}
                    <div style={statsGridStyles}>
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#eff6ff')}>
                                <Calendar size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={statNumberStyles}>{stats.total}</div>
                            <div style={statLabelStyles}>Total Appointments</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#eff6ff')}>
                                <Clock size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={statNumberStyles}>{stats.scheduled}</div>
                            <div style={statLabelStyles}>Scheduled</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#ecfdf5')}>
                                <CheckCircle size={24} style={{ color: '#059669' }} />
                            </div>
                            <div style={statNumberStyles}>{stats.completed}</div>
                            <div style={statLabelStyles}>Completed</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#fef2f2')}>
                                <XCircle size={24} style={{ color: '#dc2626' }} />
                            </div>
                            <div style={statNumberStyles}>{stats.cancelled}</div>
                            <div style={statLabelStyles}>Cancelled</div>
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
                                placeholder="Search patients, doctors, appointment details..."
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
                        
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
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
                                Export Schedule
                            </button>
                        </div>
                    </div>

                    {/* Modern Table Container */}
                    <div style={tableContainerStyles}>
                        <div style={tableHeaderStyles}>
                            <h3 style={tableHeaderTitleStyles}>
                                <Calendar size={20} />
                                Appointment Schedule ({filteredAppointments.length} appointments)
                            </h3>
                        </div>

                        {filteredAppointments.length === 0 ? (
                            <div style={emptyStateStyles}>
                                <Calendar size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                    {searchTerm || statusFilter !== 'all' ? 'No appointments found' : 'No appointments scheduled'}
                                </h3>
                                <p style={{ color: '#94a3b8' }}>
                                    {searchTerm || statusFilter !== 'all'
                                        ? 'Try adjusting your search or filter criteria' 
                                        : 'Patient appointments will appear here once scheduled'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div style={tableWrapperStyles}>
                                <table style={tableStyles}>
                                    <thead>
                                        <tr>
                                            <th style={thStyles}>Patient Information</th>
                                            <th style={thStyles}>Appointment Status</th>
                                            <th style={thStyles}>Assigned Doctor</th>
                                            <th style={thStyles}>Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map((appointment, index) => {
                                            const statusConfig = getStatusConfig(appointment.status);
                                            const StatusIcon = statusConfig.icon;
                                            
                                            return (
                                                <tr
                                                    key={index}
                                                    style={appointmentRowStyles}
                                                    onMouseEnter={() => setHoveredRow(index)}
                                                    onMouseLeave={() => setHoveredRow(null)}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f8fafc';
                                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.1)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.transform = 'translateY(0px)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <td style={tdStyles}>
                                                        <div style={patientCardStyles}>
                                                            <div style={patientAvatarStyles}>
                                                                {appointment.patientName?.charAt(0)?.toUpperCase() || 'P'}
                                                            </div>
                                                            <div style={patientInfoStyles}>
                                                                <h4 style={patientNameStyles}>{appointment.patientName || 'Unknown Patient'}</h4>
                                                                <p style={appointmentIdStyles}>Appointment #{index + 1}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={statusBadgeStyles(statusConfig)}>
                                                            <StatusIcon size={14} />
                                                            {appointment.status || 'Unknown'}
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={doctorInfoStyles}>
                                                            <Stethoscope size={16} style={{ color: '#1e40af' }} />
                                                            Dr. {appointment.doctorId?.name || 'Unassigned'}
                                                        </div>
                                                    </td>
                                                    
                                                    <td style={tdStyles}>
                                                        <div style={dateTimeInfoStyles}>
                                                            <div style={dateStyles}>
                                                                {appointment.appointmentDate ? 
                                                                    new Date(appointment.appointmentDate).toLocaleDateString("en-GB", {
                                                                        weekday: 'short',
                                                                        day: "2-digit", 
                                                                        month: "short", 
                                                                        year: "numeric" 
                                                                    }) : 'No date'
                                                                }
                                                            </div>
                                                            <div style={timeStyles}>
                                                                <Clock size={12} />
                                                                {appointment.appointmentTime ? formatTime(appointment.appointmentTime) : 'No time'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default Appointments
