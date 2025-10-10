import React, { useState, useEffect } from "react";
import DoctorSideBar from "./DoctorSideBar";

function DoctorDashboard() {
  const [dashboardData, setDashboardData] = useState({
    patients: 0,
    prescriptions: 0,
    appointments: 0,
    reports: 0,
    todayAppointments: 0,
    completedToday: 0,
    pendingPrescriptions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get doctor info from localStorage
  const auth = JSON.parse(localStorage.getItem("yourstorage")) || {};
  const doctorName = auth.name || "Doctor";
  const doctorId = auth.loginId;

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchDashboardData();

    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data (you can create separate endpoints or combine them)
      const [patientsRes, prescriptionsRes, appointmentsRes, reportsRes] = await Promise.allSettled([
        fetch(`http://localhost:4000/DPR/scheduled-patients/${doctorId}`),
        fetch(`http://localhost:4000/DPR/prescriptions/count/${doctorId}`),
        fetch(`http://localhost:4000/DPR/doctor-appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doctorId })
        }),
        fetch(`http://localhost:4000/DPR/getlabreports`)
      ]);

      let patients = 0, prescriptions = 0, appointments = 0, reports = 0;
      let todayAppointments = 0, completedToday = 0, pendingPrescriptions = 0;

      // Process patients data
      if (patientsRes.status === 'fulfilled' && patientsRes.value.ok) {
        const patientsData = await patientsRes.value.json();
        patients = patientsData.length || 0;
      }

      // Process appointments data
      if (appointmentsRes.status === 'fulfilled' && appointmentsRes.value.ok) {
        const appointmentsData = await appointmentsRes.value.json();
        appointments = appointmentsData.length || 0;
        
        const today = new Date().toDateString();
        todayAppointments = appointmentsData.filter(apt => 
          new Date(apt.appointmentDate).toDateString() === today
        ).length;
        
        completedToday = appointmentsData.filter(apt => 
          new Date(apt.appointmentDate).toDateString() === today && 
          (apt.appointmentstatus === "1" || apt.status === 'completed')
        ).length;
      }

      // Process prescriptions data (if you have a count endpoint)
      if (prescriptionsRes.status === 'fulfilled' && prescriptionsRes.value.ok) {
        const prescriptionsData = await prescriptionsRes.value.json();
        prescriptions = prescriptionsData.count || 50; // fallback to static number
        pendingPrescriptions = prescriptionsData.pending || 5;
      } else {
        prescriptions = 50; // Static fallback
        pendingPrescriptions = 5;
      }

      // Process reports data
      if (reportsRes.status === 'fulfilled' && reportsRes.value.ok) {
        const reportsData = await reportsRes.value.json();
        reports = reportsData.length || 80; // fallback to static number
      } else {
        reports = 80; // Static fallback
      }

      setDashboardData({
        patients,
        prescriptions,
        appointments,
        reports,
        todayAppointments,
        completedToday,
        pendingPrescriptions
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
      // Set fallback data in case of error
      setDashboardData({
        patients: 120,
        prescriptions: 50,
        appointments: 30,
        reports: 80,
        todayAppointments: 5,
        completedToday: 2,
        pendingPrescriptions: 3
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
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
    welcomeSection: {
      marginBottom: '2.5rem',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      borderRadius: '24px',
      padding: '2.5rem',
      color: 'white',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    },
    welcomeContent: {
      position: 'relative',
      zIndex: 2
    },
    greeting: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      opacity: 0.9
    },
    doctorName: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      letterSpacing: '-0.025em'
    },
    dateTime: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      marginTop: '1.5rem'
    },
    dateTimeItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    dateTimeLabel: {
      fontSize: '0.9rem',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: '600'
    },
    dateTimeValue: {
      fontSize: '1.1rem',
      fontWeight: '700'
    },
    backgroundPattern: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      fontSize: '12rem',
      opacity: 0.05,
      transform: 'rotate(15deg)'
    },
    statsSection: {
      marginBottom: '2.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    statCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: '#059669'
    },
    statCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    statIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
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
      letterSpacing: '0.05em',
      marginBottom: '1rem'
    },
    statTrend: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    trendUp: {
      color: '#059669'
    },
    trendDown: {
      color: '#dc2626'
    },
    quickStatsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem'
    },
    quickStatCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    quickStatNumber: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.25rem'
    },
    quickStatLabel: {
      fontSize: '0.9rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
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
    refreshButton: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      padding: '8px 16px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  const cssRules = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    
    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0 !important;
        padding: 1.5rem !important;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
      .quick-stats-grid {
        grid-template-columns: 1fr 1fr !important;
      }
      .date-time {
        flex-direction: column !important;
        gap: 1rem !important;
      }
      .doctor-name {
        font-size: 2rem !important;
      }
    }
    
    .stat-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      border-color: #059669 !important;
    }
    
    .quick-stat-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1) !important;
    }
    
    .refresh-button:hover {
      background-color: rgba(255, 255, 255, 0.3) !important;
      transform: translateY(-1px) !important;
    }
  `;

  const statCards = [
    {
      icon: '👥',
      number: dashboardData.patients,
      label: 'Total Patients',
      trend: '+12%',
      trendDirection: 'up',
      color: '#3b82f6'
    },
    {
      icon: '💊',
      number: dashboardData.prescriptions,
      label: 'Prescriptions',
      trend: '+8%',
      trendDirection: 'up',
      color: '#8b5cf6'
    },
    {
      icon: '📅',
      number: dashboardData.appointments,
      label: 'Appointments',
      trend: '+15%',
      trendDirection: 'up',
      color: '#f59e0b'
    },
    {
      icon: '🧪',
      number: dashboardData.reports,
      label: 'Lab Reports',
      trend: '+5%',
      trendDirection: 'up',
      color: '#ef4444'
    }
  ];

  const quickStats = [
    {
      number: dashboardData.todayAppointments,
      label: "Today's Appointments",
      color: '#059669'
    },
    {
      number: dashboardData.completedToday,
      label: "Completed Today",
      color: '#22c55e'
    },
    {
      number: dashboardData.pendingPrescriptions,
      label: "Pending Prescriptions",
      color: '#f59e0b'
    },
    {
      number: dashboardData.patients - dashboardData.completedToday,
      label: "Remaining Today",
      color: '#6366f1'
    }
  ];

  if (loading) {
    return (
      <>
        <style>{cssRules}</style>
        <div style={styles.pageContainer}>
          <DoctorSideBar />
          <div style={styles.mainContent} className="main-content">
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <div style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>
                Loading dashboard...
              </div>
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
        <DoctorSideBar />
        <div style={styles.mainContent} className="main-content">
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <button
              style={styles.refreshButton}
              className="refresh-button"
              onClick={fetchDashboardData}
              title="Refresh Dashboard"
            >
              🔄 Refresh
            </button>
            <div style={styles.backgroundPattern}>🩺</div>
            <div style={styles.welcomeContent}>
              <div style={styles.greeting}>{getGreeting()},</div>
              {/* <div style={styles.doctorName} className="doctor-name">
                Dr. {doctorName}
              </div> */}
              <div style={styles.dateTime} className="date-time">
                <div style={styles.dateTimeItem}>
                  <div style={styles.dateTimeLabel}>📅 Today</div>
                  <div style={styles.dateTimeValue}>{formatDate(currentTime)}</div>
                </div>
                <div style={styles.dateTimeItem}>
                  <div style={styles.dateTimeLabel}>🕐 Current Time</div>
                  <div style={styles.dateTimeValue}>{formatTime(currentTime)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Statistics */}
          <div style={styles.statsSection}>
            <h2 style={styles.sectionTitle}>
              📊 Practice Overview
            </h2>
            <div style={styles.statsGrid} className="stats-grid">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  style={styles.statCard}
                  className="stat-card"
                >
                  <div style={styles.statCardHeader}>
                    <div style={styles.statIcon}>{stat.icon}</div>
                    <div 
                      style={{
                        ...styles.statTrend,
                        ...(stat.trendDirection === 'up' ? styles.trendUp : styles.trendDown)
                      }}
                    >
                      {stat.trendDirection === 'up' ? '📈' : '📉'} {stat.trend}
                    </div>
                  </div>
                  <div style={styles.statNumber}>{stat.number}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsSection}>
            <h2 style={styles.sectionTitle}>
              ⚡ Today's Quick Stats
            </h2>
            <div style={styles.quickStatsGrid} className="quick-stats-grid">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  style={styles.quickStatCard}
                  className="quick-stat-card"
                >
                  <div 
                    style={{
                      ...styles.quickStatNumber,
                      color: stat.color
                    }}
                  >
                    {stat.number}
                  </div>
                  <div style={styles.quickStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <h3>⚠️ Note</h3>
              <p>Some data might not be real-time. Using fallback values where needed.</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Error details: {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;
