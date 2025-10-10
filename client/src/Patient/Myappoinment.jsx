import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function MyAppointment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add this function after your other utility functions
  const getAppointmentStatus = (isConsultationScheduled) => {
    return isConsultationScheduled ? "confirmed" : "pending";
  };

  // Add this useEffect to fetch patient's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('yourstorage'));
        if (!userData?.loginId) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/DPR/patient-appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientId: userData.loginId
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        // Map the appointments to include status based on isConsultationScheduled
        const updatedAppointments = data.map(apt => ({
          ...apt,
          status: getAppointmentStatus(apt.isConsultationScheduled)
        }));
        setAppointments(updatedAppointments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // Update the filteredAppointments logic
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment?.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Styles
  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    paddingTop: "80px", // Increased padding-top to account for sticky navbar
  };

  const mainContentStyle = {
    marginLeft: "280px",
    flex: 1,
    padding: "32px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  };

  const titleStyle = {
    color: "#0b2f05",
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
  };

  const newAppointmentButtonStyle = {
    background: "#88C250",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const filtersContainerStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  const filtersRowStyle = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const searchInputStyle = {
    flex: 1,
    minWidth: "300px",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
  };

  const filterSelectStyle = {
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "150px",
    cursor: "pointer",
  };

  const appointmentsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "24px",
  };

  const appointmentCardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
  };

  const cardHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  };

  const doctorInfoStyle = {
    flex: 1,
  };

  const doctorNameStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
  };

  const specialityStyle = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  };

  const appointmentDetailsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  };

  const detailItemStyle = {
    fontSize: "14px",
  };

  const detailLabelStyle = {
    color: "#6b7280",
    fontWeight: "500",
  };

  const detailValueStyle = {
    color: "#1f2937",
    fontWeight: "400",
  };

  const reasonStyle = {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "16px",
    border: "1px solid #e5e7eb",
  };

  const actionButtonsStyle = {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "none",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "#88C250",
    color: "#ffffff",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "#ffffff",
    color: "#6b7280",
    border: "1px solid #d1d5db",
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: "#fee2e2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  };

  // Status badge styles
  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      padding: "4px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "500",
      textTransform: "capitalize",
    };

    switch (status) {
      case "confirmed":
        return {
          ...baseStyle,
          backgroundColor: "#dcfce7",
          color: "#166534",
        };
      case "pending":
        return {
          ...baseStyle,
          backgroundColor: "#fef3c7",
          color: "#92400e",
        };
      case "completed":
        return {
          ...baseStyle,
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
        };
      case "cancelled":
        return {
          ...baseStyle,
          backgroundColor: "#fee2e2",
          color: "#dc2626",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "#f3f4f6",
          color: "#374151",
        };
    }
  };

  // Handler functions
  const handleNewAppointment = () => {
    alert("Redirecting to book new appointment...");
    // navigate('/book-appointment');
  };

  const handleJoinCall = (appointmentId) => {
    alert(`Joining video call for appointment ${appointmentId}...`);
  };

  const handleReschedule = (appointmentId) => {
    alert(`Rescheduling appointment ${appointmentId}...`);
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment? This action cannot be undone.")) {
        try {
            const response = await fetch('http://localhost:4000/DPR/cancel-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ appointmentId })
            });

            const data = await response.json();

            if (data.success) {
                // Remove the appointment from state completely
                setAppointments(prevAppointments => 
                    prevAppointments.filter(apt => apt.id !== appointmentId)
                );
                alert("Appointment cancelled and deleted successfully");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment: ' + error.message);
        }
    }
  };

  const handleViewDetails = (appointmentId) => {
    alert(`Viewing details for appointment ${appointmentId}...`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        {/* Reusable Sidebar Component */}
        <Dsidebar activePage="/appointments" />

        {/* Main Content */}
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <h1 style={titleStyle}>My Appointments</h1>
             
            </div>

            {/* Filters */}
            <div style={filtersContainerStyle}>
              <div style={filtersRowStyle}>
                <input 
                  style={searchInputStyle}
                  type="text" 
                  placeholder="Search appointments by doctor, specialty, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  style={filterSelectStyle}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Appointments Grid */}
            <div style={appointmentsGridStyle}>
              {filteredAppointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  style={appointmentCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={cardHeaderStyle}>
                    <div style={doctorInfoStyle}>
                      <div style={doctorNameStyle}>{appointment.doctorName}</div>
                      <div style={specialityStyle}>{appointment.speciality}</div>
                    </div>
                    <span style={getStatusBadgeStyle(appointment.status)}>
                      {appointment.status}
                    </span>
                  </div>

                  <div style={appointmentDetailsStyle}>
                    <div style={detailItemStyle}>
                      <div style={detailLabelStyle}>Date</div>
                      <div style={detailValueStyle}>{appointment.date}</div>
                    </div>
                    <div style={detailItemStyle}>
                      <div style={detailLabelStyle}>Time</div>
                      <div style={detailValueStyle}>{appointment.time}</div>
                    </div>
                    <div style={detailItemStyle}>
                      <div style={detailLabelStyle}>Type</div>
                      <div style={detailValueStyle}>{appointment.type}</div>
                    </div>
                    <div style={detailItemStyle}>
                      <div style={detailLabelStyle}>Duration</div>
                      <div style={detailValueStyle}>{appointment.duration}</div>
                    </div>
                  </div>

                  <div style={reasonStyle}>
                    <strong>Reason:</strong> {appointment.reason}
                    <br />
                    <strong>Location:</strong> {appointment.location}
                  </div>

                  <div style={actionButtonsStyle}>
                    {appointment.status === "confirmed" && appointment.type === "Video Call" && (
                      <button 
                        style={primaryButtonStyle}
                        onClick={() => handleJoinCall(appointment.id)}
                        onMouseEnter={(e) => e.target.style.background = "#6ba83a"}
                        onMouseLeave={(e) => e.target.style.background = "#88C250"}
                      >
                        📹 Join Call
                      </button>
                    )}
                    
                    {(appointment.status === "confirmed" || appointment.status === "pending") && (
                      <button 
                        style={secondaryButtonStyle}
                        onClick={() => handleReschedule(appointment.id)}
                        onMouseEnter={(e) => e.target.style.background = "#f3f4f6"}
                        onMouseLeave={(e) => e.target.style.background = "#ffffff"}
                      >
                        🔄 Reschedule
                      </button>
                    )}
                    
                    <button 
                      style={secondaryButtonStyle}
                      onClick={() => handleViewDetails(appointment.id)}
                      onMouseEnter={(e) => e.target.style.background = "#f3f4f6"}
                      onMouseLeave={(e) => e.target.style.background = "#ffffff"}
                    >
                      👁️ Details
                    </button>
                    
                    {(appointment.status === "confirmed" || appointment.status === "pending") && (
                      <button 
                        style={dangerButtonStyle}
                        onClick={() => handleCancel(appointment.id)}
                        onMouseEnter={(e) => e.target.style.background = "#fecaca"}
                        onMouseLeave={(e) => e.target.style.background = "#fee2e2"}
                      >
                        ❌ Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div style={{
                textAlign: "center", 
                padding: "60px 20px", 
                color: "#6b7280",
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
                <h3 style={{ color: "#374151", marginBottom: "8px" }}>No Appointments Found</h3>
                <p>No appointments match your current search criteria.</p>
              
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAppointment;
