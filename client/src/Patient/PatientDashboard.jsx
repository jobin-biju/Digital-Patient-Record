import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function PatientDashboard() {
  const navigate = useNavigate();

  // Styles
  const dashboardStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    paddingTop: "70px",
  };

  const mainContentStyle = {
    marginLeft: "280px",
    flex: 1,
    padding: "32px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
  };

  const headerStyle = {
    marginBottom: "32px",
  };

  const titleStyle = {
    color: "#0b2f05",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    color: "#6b7280",
    fontSize: "16px",
    fontWeight: "400",
  };

  const quickStatsStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  const statsHeaderStyle = {
    fontSize: "20px", 
    fontWeight: "600", 
    color: "#1f2937", 
    marginBottom: "24px",
    textAlign: "left"
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "32px",
  };

  const statItemStyle = {
    textAlign: "center",
  };

  const statNumberStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#88C250",
    marginBottom: "8px",
    lineHeight: "1",
  };

  const statLabelStyle = {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
  };

  return (
    <>
      <Navbar />
      <div style={dashboardStyle}>
        {/* Reusable Sidebar Component */}
        <Dsidebar activePage="/dashboard" />

        {/* Main Content Area */}
        <div style={mainContentStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Patient Dashboard</h1>
            <p style={subtitleStyle}>Welcome back! Here's your health overview</p>
          </div>

          {/* Quick Stats */}
          <div style={quickStatsStyle}>
            <h2 style={statsHeaderStyle}>Quick Overview</h2>
            <div style={statsGridStyle}>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>4</div>
                <div style={statLabelStyle}>Medical Reports</div>
              </div>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>3</div>
                <div style={statLabelStyle}>Active Prescriptions</div>
              </div>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>2</div>
                <div style={statLabelStyle}>Upcoming Appointments</div>
              </div>
              <div style={statItemStyle}>
                <div style={statNumberStyle}>100%</div>
                <div style={statLabelStyle}>Profile Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;
