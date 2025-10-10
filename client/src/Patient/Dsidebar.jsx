import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dsidebar({ activePage = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Default navigation items data
  const defaultNavItems = [
    {
      icon: "🏠",
      title: "Dashboard",
      description: "Return to main dashboard",
      path: "/PatientDashboard"
    },
    {
      icon: "🏠",
      title: "Appoinments",
      description: "View your Appoinments",
      path: "/Myappoinment"
    },
    {
      icon: "📋",
      title: "Medical Reports",
      description: "View and download your medical documents",
      path: "/medical-reports"
    },
    {
      icon: "📋",
      title: "Transfer Details",
      description: "View and download your medical documents",
      path: "/Transfer"
    },
    {
      icon: "📋",
      title: "Doctor Transfers",
      description: "View and download your medical documents",
      path: "/DoctorTransfers"
    },
    {
      icon: "💊",
      title: "Prescriptions", 
      description: "Access current medications and prescriptions",
      path: "/prescriptions"
    },
    {
      icon: "👤",
      title: "Profile Settings",
      description: "Update personal and medical information",
      path: "/profile"
    }
  ];

  // Determine active item based on current path or activePage prop
  const getActiveItem = () => {
    if (activePage) return activePage;
    const currentPath = location.pathname;
    return currentPath;
  };

  // Styles
  const sidebarStyle = {
    width: "280px",
    background: "#ffffff",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
    padding: "24px 0",
    borderRight: "1px solid #e5e7eb",
    minHeight: "calc(100vh - 70px)",
    position: "fixed",
    left: 0,
    top: "60px", // Position below navbar
    zIndex: 998, // Lower than navbar but high enough to stay visible
    overflowY: "auto",
  };

  const sidebarHeaderStyle = {
    padding: "0 24px 24px 24px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  const sidebarTitleStyle = {
    color: "#0b2f05",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "4px",
  };

  const sidebarSubtitleStyle = {
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: "400",
  };

  const navItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderLeft: "4px solid transparent",
    margin: "2px 0",
    position: "relative",
    zIndex: 1,
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    background: "#f0f9ff",
    borderLeft: "4px solid #88C250",
    transform: "translateX(4px)",
  };

  const hoveredNavItemStyle = {
    ...navItemStyle,
    background: "#f9fafb",
    borderLeft: "4px solid #88C250",
    transform: "translateX(4px)",
  };

  const navIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #88C250 0%, #6ba83a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    fontSize: "18px",
    color: "#ffffff",
    flexShrink: 0,
  };

  const navTextStyle = {
    flex: 1,
  };

  const navTitleStyle = {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "4px",
    lineHeight: "1.2",
  };

  const navDescStyle = {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "1.3",
  };

  // Determine which style to apply to nav item
  const getNavItemStyle = (item, index) => {
    const activeItem = getActiveItem();
    const isActive = activeItem === item.path || 
                    (activeItem === "/Myappoinment" && item.path === "/Myappoinment") ||
                    (activeItem === "/PatientDashboard" && item.path === "/PatientDashboard") ||
                    (activeItem === "/medical-reports" && item.path === "/medical-reports") ||
                    (activeItem === "/DoctorTransfers" && item.path === "/DoctorTransfers") ||
                    (activeItem === "/Transfer" && item.path === "/Transfer") ||
                    (activeItem === "/prescriptions" && item.path === "/prescriptions") ||
                    (activeItem === "/profile" && item.path === "/profile");
    
    if (isActive) return activeNavItemStyle;
    if (hoveredItem === index) return hoveredNavItemStyle;
    return navItemStyle;
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarHeaderStyle}>
        <h2 style={sidebarTitleStyle}>Navigation</h2>
        <p style={sidebarSubtitleStyle}>Quick access to your health data</p>
      </div>
      
      {defaultNavItems.map((item, index) => (
        <div
          key={index}
          style={getNavItemStyle(item, index)}
          onClick={() => navigate(item.path)}
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={navIconStyle}>
            {item.icon}
          </div>
          <div style={navTextStyle}>
            <div style={navTitleStyle}>{item.title}</div>
            <div style={navDescStyle}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dsidebar;
