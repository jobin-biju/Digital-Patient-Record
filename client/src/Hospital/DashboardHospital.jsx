import React, { useEffect, useState } from 'react'
import HospitalSidebar from './HospitalSidebar'
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  FlaskConical, 
  Pill, 
  Activity, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Building,
  Heart,
  Download,
  RefreshCw
} from 'lucide-react';

function HospitalDashboard() {
    const [dashboardData, setDashboardData] = useState({
        doctors: [],
        patients: [],
        appointments: [],
        labs: [],
        pharmacies: []
    });
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));

    useEffect(() => {
        fetchAllData();
        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchAllData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const hospitalPayload = { hospitalId: auth.loginId };

            // Fetch all data concurrently
            const [doctorsRes, patientsRes, appointmentsRes, labsRes, pharmaciesRes] = await Promise.all([
                fetch("http://localhost:4000/DPR/doctorview", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hospitalPayload)
                }),
                fetch('http://localhost:4000/DPR/hospitalpatientview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hospitalPayload)
                }),
                fetch('http://localhost:4000/DPR/hospitalappointmentview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hospitalPayload)
                }),
                fetch("http://localhost:4000/DPR/labView", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hospitalPayload)
                }),
                fetch('http://localhost:4000/DPR/pharmaciesView', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(hospitalPayload)
                })
            ]);

            const [doctors, patients, appointments, labs, pharmacies] = await Promise.all([
                doctorsRes.json(),
                patientsRes.json(),
                appointmentsRes.json(),
                labsRes.json(),
                pharmaciesRes.json()
            ]);

            setDashboardData({
                doctors: doctors || [],
                patients: patients || [],
                appointments: appointments || [],
                labs: labs || [],
                pharmacies: pharmacies || []
            });

            setLastUpdated(new Date());

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate real-time metrics from your actual data
    const getMetrics = () => {
        const { doctors, patients, appointments, labs, pharmacies } = dashboardData;

        // Department statistics
        const departmentStats = {};
        doctors.forEach(doctor => {
            const dept = doctor.department || 'General';
            departmentStats[dept] = (departmentStats[dept] || 0) + 1;
        });

        // Appointment statistics
        const appointmentStats = {};
        appointments.forEach(apt => {
            const status = apt.status || 'Unknown';
            appointmentStats[status] = (appointmentStats[status] || 0) + 1;
        });

        // Lab statistics
        const labStats = {};
        labs.forEach(lab => {
            const type = lab.labtype || 'General';
            labStats[type] = (labStats[type] || 0) + 1;
        });

        // Patient distribution by department
        const patientStats = {};
        patients.forEach(patient => {
            const dept = patient.department || 'General';
            patientStats[dept] = (patientStats[dept] || 0) + 1;
        });

        return {
            totalDoctors: doctors.length,
            totalPatients: patients.length,
            totalAppointments: appointments.length,
            totalLabs: labs.length,
            totalPharmacies: pharmacies.length,
            departmentStats,
            appointmentStats,
            labStats,
            patientStats,
            activePharmacies: pharmacies.filter(p => p.openingTime && p.closingTime).length
        };
    };

    const metrics = getMetrics();

    // Professional Hospital Dashboard Theme Styles
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
        maxWidth: '1600px',
        margin: '0 auto'
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

    const contentStyles = {
        padding: '2rem 3rem',
        maxWidth: '1600px',
        margin: '0 auto'
    };

    // KPI Cards Styles
    const kpiGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
    };

    const kpiCardStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    const kpiHeaderStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    };

    const kpiIconContainerStyles = (bgColor) => ({
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    const kpiNumberStyles = {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#1e293b',
        lineHeight: 1,
        marginBottom: '0.5rem'
    };

    const kpiLabelStyles = {
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '600',
        marginBottom: '0.5rem'
    };

    const kpiTrendStyles = {
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#059669'
    };

    // Chart Container Styles
    const chartSectionStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
    };

    const chartTitleStyles = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    };

    const chartSubtitleStyles = {
        fontSize: '0.95rem',
        color: '#64748b',
        marginBottom: '2rem'
    };

    const dataInsightsStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #f1f5f9'
    };

    const insightItemStyles = {
        textAlign: 'center',
        padding: '1rem'
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

    const keyframesStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .kpi-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
            border-color: #1e40af !important;
        }
        
        .refresh-btn:hover {
            background-color: rgba(255, 255, 255, 0.25) !important;
            transform: scale(1.05) !important;
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
                                Loading hospital analytics dashboard...
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
                    {/* Dashboard Header */}
                    <div style={headerStyles}>
                        <div style={headerContentStyles}>
                            <div>
                                <h1 style={pageTitleStyles}>
                                    <BarChart3 size={36} />
                                    Hospital Analytics Dashboard
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Real-time data visualization and comprehensive healthcare facility analytics
                                </p>
                            </div>
                            <div style={headerActionsStyles}>
                                <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.8 }}>
                                    Last updated: {lastUpdated.toLocaleTimeString()}
                                </div>
                                <button 
                                    className="refresh-btn"
                                    style={refreshButtonStyles}
                                    onClick={fetchAllData}
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
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={contentStyles}>
                        {/* KPI Cards */}
                        <div style={kpiGridStyles}>
                            {/* Total Doctors KPI */}
                            <div className="kpi-card" style={kpiCardStyles}>
                                <div style={kpiHeaderStyles}>
                                    <div style={kpiIconContainerStyles('#eff6ff')}>
                                        <Stethoscope size={28} style={{ color: '#1e40af' }} />
                                    </div>
                                    <TrendingUp size={20} style={{ color: '#10b981' }} />
                                </div>
                                <div style={kpiNumberStyles}>{metrics.totalDoctors}</div>
                                <div style={kpiLabelStyles}>Medical Professionals</div>
                                <div style={kpiTrendStyles}>
                                    <Activity size={14} />
                                    {Object.keys(metrics.departmentStats).length} departments active
                                </div>
                            </div>

                            {/* Total Patients KPI */}
                            <div className="kpi-card" style={kpiCardStyles}>
                                <div style={kpiHeaderStyles}>
                                    <div style={kpiIconContainerStyles('#ecfdf5')}>
                                        <Users size={28} style={{ color: '#059669' }} />
                                    </div>
                                    <TrendingUp size={20} style={{ color: '#10b981' }} />
                                </div>
                                <div style={kpiNumberStyles}>{metrics.totalPatients}</div>
                                <div style={kpiLabelStyles}>Registered Patients</div>
                                <div style={kpiTrendStyles}>
                                    <Heart size={14} />
                                    Active patient base
                                </div>
                            </div>

                            {/* Total Appointments KPI */}
                            <div className="kpi-card" style={kpiCardStyles}>
                                <div style={kpiHeaderStyles}>
                                    <div style={kpiIconContainerStyles('#fef3e2')}>
                                        <Calendar size={28} style={{ color: '#d97706' }} />
                                    </div>
                                    <PieChart size={20} style={{ color: '#d97706' }} />
                                </div>
                                <div style={kpiNumberStyles}>{metrics.totalAppointments}</div>
                                <div style={kpiLabelStyles}>Total Appointments</div>
                                <div style={kpiTrendStyles}>
                                    <Activity size={14} />
                                    {metrics.appointmentStats.scheduled || 0} scheduled
                                </div>
                            </div>

                            {/* Healthcare Services KPI */}
                            <div className="kpi-card" style={kpiCardStyles}>
                                <div style={kpiHeaderStyles}>
                                    <div style={kpiIconContainerStyles('#f3e8ff')}>
                                        <Building size={28} style={{ color: '#7c3aed' }} />
                                    </div>
                                    <BarChart3 size={20} style={{ color: '#7c3aed' }} />
                                </div>
                                <div style={kpiNumberStyles}>{metrics.totalLabs + metrics.totalPharmacies}</div>
                                <div style={kpiLabelStyles}>Healthcare Services</div>
                                <div style={kpiTrendStyles}>
                                    <FlaskConical size={14} />
                                    {metrics.totalLabs} labs, {metrics.totalPharmacies} pharmacies
                                </div>
                            </div>
                        </div>

                        {/* Main Data Visualization Section */}
                        <div style={chartSectionStyles}>
                            <h2 style={chartTitleStyles}>
                                <BarChart3 size={24} />
                                Hospital Operations Analytics
                            </h2>
                            <p style={chartSubtitleStyles}>
                                Comprehensive data visualization showing department distribution, appointment trends, 
                                laboratory utilization, and pharmaceutical services performance across your healthcare facility.
                            </p>
                            
                            {/* Chart Image */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                padding: '2rem',
                                backgroundColor: '#fafbfc',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0'
                            }}>
                                [chart:285]
                            </div>

                            {/* Data Insights */}
                            <div style={dataInsightsStyles}>
                                <div style={insightItemStyles}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e40af' }}>
                                        {Math.max(...Object.values(metrics.departmentStats))}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        Largest Department
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {Object.entries(metrics.departmentStats).reduce((a, b) => 
                                            metrics.departmentStats[a] > metrics.departmentStats[b] ? a : b
                                        )} leads
                                    </div>
                                </div>

                                <div style={insightItemStyles}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                                        {Math.round((metrics.appointmentStats.completed || 0) / metrics.totalAppointments * 100)}%
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        Completion Rate
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        Appointment success
                                    </div>
                                </div>

                                <div style={insightItemStyles}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d97706' }}>
                                        {Object.keys(metrics.labStats).length}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        Lab Categories
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        Diagnostic services
                                    </div>
                                </div>

                                <div style={insightItemStyles}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                                        {Math.round(metrics.totalPatients / metrics.totalDoctors)}:1
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        Patient-Doctor Ratio
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        Capacity planning
                                    </div>
                                </div>

                                <div style={insightItemStyles}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed' }}>
                                        {Math.round(metrics.activePharmacies / metrics.totalPharmacies * 100)}%
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                        Pharmacy Utilization
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        Active services
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Items */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #e2e8f0'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                                    📊 Key Performance Indicators
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        Total Healthcare Staff: <strong>{metrics.totalDoctors}</strong>
                                    </li>
                                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        Active Patient Base: <strong>{metrics.totalPatients}</strong>
                                    </li>
                                    <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        Monthly Appointments: <strong>{metrics.totalAppointments}</strong>
                                    </li>
                                    <li style={{ padding: '0.5rem 0' }}>
                                        Service Utilization: <strong>{metrics.totalLabs + metrics.totalPharmacies} facilities</strong>
                                    </li>
                                </ul>
                            </div>

                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #e2e8f0'
                            }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                                    🎯 Strategic Insights
                                </h3>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                                    <p>• Department capacity is well-distributed across specializations</p>
                                    <p>• Appointment completion rate indicates efficient workflow</p>
                                    <p>• Laboratory services support comprehensive diagnostics</p>
                                    <p>• Patient-doctor ratio maintains quality care standards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HospitalDashboard;
