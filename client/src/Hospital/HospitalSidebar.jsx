import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  FlaskConical, 
  Calendar,
  Pill,
  Heart,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Settings,
  Building,
  Activity
} from 'lucide-react';

function HospitalSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const menuItems = [
        { path: '/hospitaldashboard', icon: LayoutDashboard, label: 'Dashboard', isActive: location.pathname === '/hospitaldashboard' },
        { path: '/hospitaldoctorview', icon: Stethoscope, label: 'Doctors', isActive: location.pathname === '/hospitaldoctorview' },
        { path: '/hospitalpatientview', icon: Users, label: 'Patients', isActive: location.pathname === '/hospitalpatientview' },
        { path: '/hospitallabview', icon: FlaskConical, label: 'Lab Reports', isActive: location.pathname === '/hospitallabview' },
        { path: '/hospitalappointment', icon: Calendar, label: 'Appointments', isActive: location.pathname === '/hospitalappointment' },
        { path: '/pharmacyView', icon: Pill, label: 'Pharmacy', isActive: location.pathname === '/pharmacyView' },
        { path: '/viewtransferdata', icon: Pill, label: 'Transferdatas', isActive: location.pathname === '/viewtransferdata'}
    ];

    // Professional Hospital Theme Styles
    const sidebarStyles = {
        width: isCollapsed ? '80px' : '280px',
        minWidth: isCollapsed ? '80px' : '280px',
        height: '100vh',
        background: 'linear-gradient(180deg, #1e40af 0%, #1e3a8a 50%, #1d4ed8 100%)',
        color: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '6px 0 25px rgba(30, 64, 175, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const headerStyles = {
        padding: '2rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        minHeight: '100px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(10px)'
    };

    const logoContainerStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    };

    const logoIconStyles = {
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
    };

    const logoTextContainerStyles = {
        opacity: isCollapsed ? 0 : 1,
        transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'all 0.3s ease'
    };

    const logoTextStyles = {
        fontSize: '1.75rem',
        fontWeight: '800',
        margin: '0 0 4px 0',
        letterSpacing: '-0.025em',
        background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    };

    const subtitleStyles = {
        fontSize: '0.8rem',
        margin: 0,
        opacity: 0.8,
        fontWeight: '500',
        letterSpacing: '0.5px'
    };

    const toggleButtonStyles = {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        opacity: isCollapsed ? 0 : 1,
        backdropFilter: 'blur(10px)'
    };

    const menuContainerStyles = {
        flex: 1,
        padding: '1.5rem 0',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    };

    const menuListStyles = {
        listStyle: 'none',
        margin: 0,
        padding: 0
    };

    const menuItemStyles = {
        margin: '0.5rem 1rem'
    };

    const menuLinkStyles = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '16px 20px',
        borderRadius: '14px',
        textDecoration: 'none',
        color: isActive ? '#1e40af' : '#ffffff',
        backgroundColor: isActive ? '#ffffff' : 'transparent',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        fontWeight: isActive ? '700' : '500',
        fontSize: '0.95rem',
        border: isActive ? 'none' : '1px solid transparent',
        boxShadow: isActive ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
    });

    const menuIconStyles = {
        width: '22px',
        height: '22px',
        flexShrink: 0
    };

    const menuLabelStyles = {
        opacity: isCollapsed ? 0 : 1,
        transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        fontWeight: 'inherit'
    };

    const activeIndicatorStyles = {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        backgroundColor: '#1e40af',
        borderRadius: '0 4px 4px 0'
    };

    const footerStyles = {
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
    };

    const userInfoStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px 20px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: '1rem',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const userAvatarStyles = {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '1px solid rgba(255, 255, 255, 0.2)'
    };

    const userDetailsStyles = {
        opacity: isCollapsed ? 0 : 1,
        transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'all 0.3s ease'
    };

    const userNameStyles = {
        fontSize: '1rem',
        fontWeight: '700',
        margin: '0 0 4px 0',
        lineHeight: 1.2
    };

    const userRoleStyles = {
        fontSize: '0.8rem',
        opacity: 0.8,
        margin: 0,
        fontWeight: '500'
    };

    const actionButtonsStyles = {
        display: 'flex',
        gap: '10px',
        opacity: isCollapsed ? 0 : 1,
        transition: 'all 0.3s ease'
    };

    const actionButtonStyle = {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const logoutButtonStyles = {
        ...actionButtonStyle,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
    };

    const scrollbarStyles = `
        .sidebar-menu::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }
        
        .menu-link-hover:hover {
            background-color: rgba(255, 255, 255, 0.15) !important;
            transform: translateX(4px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        
        .toggle-btn:hover {
            background-color: rgba(255, 255, 255, 0.25) !important;
            transform: scale(1.05) !important;
        }
        
        .action-btn:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
            transform: scale(1.1) !important;
        }
        
        .logout-btn:hover {
            background-color: rgba(239, 68, 68, 0.3) !important;
            transform: scale(1.1) !important;
        }
        
        .expand-btn:hover {
            background-color: #1d4ed8 !important;
            transform: translateY(-50%) scale(1.15) !important;
        }
    `;

    return (
        <>
            <style>{scrollbarStyles}</style>
            <nav style={sidebarStyles}>
                {/* Professional Hospital Header */}
                <div style={headerStyles}>
                    <div style={logoContainerStyles}>
                        <div style={logoIconStyles}>
                            <Heart style={{ width: '28px', height: '28px', color: '#ffffff' }} />
                        </div>
                        {!isCollapsed && (
                            <div style={logoTextContainerStyles}>
                                <h2 style={logoTextStyles}>HealthCare Pro</h2>
                                <p style={subtitleStyles}>Medical Management System</p>
                            </div>
                        )}
                    </div>
                    
                    {!isCollapsed && (
                        <button
                            className="toggle-btn"
                            style={toggleButtonStyles}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}
                </div>

                {/* Hospital Navigation Menu */}
                <div style={menuContainerStyles} className="sidebar-menu">
                    <ul style={menuListStyles}>
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <li key={item.path} style={menuItemStyles}>
                                    <Link
                                        to={item.path}
                                        className="menu-link-hover"
                                        style={menuLinkStyles(item.isActive)}
                                        onMouseOver={(e) => {
                                            if (!item.isActive) {
                                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                                e.target.style.transform = 'translateX(4px)';
                                                e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (!item.isActive) {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.transform = 'translateX(0)';
                                                e.target.style.border = '1px solid transparent';
                                            }
                                        }}
                                    >
                                        {item.isActive && <div style={activeIndicatorStyles}></div>}
                                        <IconComponent style={menuIconStyles} />
                                        <span style={menuLabelStyles}>{item.label}</span>
                                        
                                        {/* Status indicators for some items */}
                                        {item.label === 'Appointments' && !isCollapsed && (
                                            <div style={{
                                                marginLeft: 'auto',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: '#10b981',
                                                boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)'
                                            }}></div>
                                        )}
                                        
                                        {item.label === 'Patients' && !isCollapsed && (
                                            <div style={{
                                                marginLeft: 'auto',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                                fontSize: '0.7rem',
                                                fontWeight: '600',
                                                color: '#60a5fa'
                                            }}>24</div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Professional Footer */}
                <div style={footerStyles}>
                    <div style={userInfoStyles}>
                        <div style={userAvatarStyles}>
                            <Building size={22} />
                        </div>
                        {!isCollapsed && (
                            <div style={userDetailsStyles}>
                                <p style={userNameStyles}>Hospital Admin</p>
                                <p style={userRoleStyles}>Medical Facility Manager</p>
                            </div>
                        )}
                    </div>
                    
                    {!isCollapsed && (
                        <div style={actionButtonsStyles}>
                            <button
                                className="action-btn"
                                style={actionButtonStyle}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                                title="Settings"
                            >
                                <Settings size={16} />
                            </button>
                            <button
                                className="logout-btn"
                                style={logoutButtonStyles}
                                onClick={handleLogout}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                                title="Logout"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Collapsed state toggle */}
                {isCollapsed && (
                    <button
                        className="expand-btn"
                        style={{
                            position: 'absolute',
                            right: '-18px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#1e40af',
                            border: 'none',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)',
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(10px)'
                        }}
                        onClick={() => setIsCollapsed(false)}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#1d4ed8';
                            e.target.style.transform = 'translateY(-50%) scale(1.15)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#1e40af';
                            e.target.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <ChevronRight size={18} />
                    </button>
                )}
            </nav>
        </>
    );
}

export default HospitalSidebar
