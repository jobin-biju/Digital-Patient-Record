import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building, 
  User,           // Changed from UserMd to User
  Users, 
  FlaskConical,   // Changed from Flask to FlaskConical for more medical look
  ClipboardCheck, 
  Heart,
  ChevronLeft,
  ChevronRight,
  UserCircle,     // Changed from User to UserCircle for admin avatar
  LogOut,
  Settings
} from 'lucide-react';

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', isActive: location.pathname === '/dashboard' },
    { path: '/hospitalview', icon: Building, label: 'Hospital', isActive: location.pathname === '/hospitalview' },
    { path: '/getAllDoctors', icon: User, label: 'Doctors', isActive: location.pathname === '/getAllDoctors' },
    { path: '/patients', icon: Users, label: 'Patients', isActive: location.pathname === '/patients' },
    { path: '/adminlabview', icon: FlaskConical, label: 'Labs', isActive: location.pathname === '/adminlabview' },
    { path: '/adminaudit', icon: ClipboardCheck, label: 'Audits', isActive: location.pathname === '/adminaudit' }
  ];

  // Styles matching MediGrids healthcare theme
  const sidebarStyles = {
    width: isCollapsed ? '80px' : '250px',
    minWidth: isCollapsed ? '80px' : '250px',
    height: '100vh',
    background: 'linear-gradient(180deg, #2d5730 0%, #1a3d1f 100%)',
    color: '#ffffff',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    minHeight: '80px'
  };

  const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoIconStyles = {
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)'
  };

  const logoTextStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: 0,
    opacity: isCollapsed ? 0 : 1,
    transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
    transition: 'all 0.3s ease'
  };

  const subTitleStyles = {
    fontSize: '0.75rem',
    margin: 0,
    opacity: 0.7,
    display: isCollapsed ? 'none' : 'block'
  };

  const toggleButtonStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    opacity: isCollapsed ? 0 : 1
  };

  const menuContainerStyles = {
    flex: 1,
    padding: '1rem 0',
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
    margin: '0.25rem 0.75rem'
  };

  const menuLinkStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: isActive ? '#2d5730' : '#ffffff',
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    fontWeight: isActive ? '600' : '500',
    fontSize: '0.95rem'
  });

  const menuIconStyles = {
    width: '20px',
    height: '20px',
    flexShrink: 0
  };

  const menuLabelStyles = {
    opacity: isCollapsed ? 0 : 1,
    transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const activeIndicatorStyles = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    backgroundColor: '#6ba46c',
    borderRadius: '0 4px 4px 0'
  };

  const footerStyles = {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1rem'
  };

  const userInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: '0.5rem'
  };

  const userAvatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  const userDetailsStyles = {
    opacity: isCollapsed ? 0 : 1,
    transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
    transition: 'all 0.3s ease'
  };

  const userNameStyles = {
    fontSize: '0.9rem',
    fontWeight: '600',
    margin: 0,
    lineHeight: 1.2
  };

  const userRoleStyles = {
    fontSize: '0.75rem',
    opacity: 0.8,
    margin: 0
  };

  const actionButtonsStyles = {
    display: 'flex',
    gap: '8px',
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease'
  };

  const actionButtonStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  };

  const scrollbarStyles = `
    .sidebar-menu::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
    
    .menu-link-hover:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
      transform: translateX(4px) !important;
    }
    
    .toggle-btn:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    .action-btn:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
      transform: scale(1.05) !important;
    }
    
    .expand-btn:hover {
      background-color: #2d5730 !important;
      transform: translateY(-50%) scale(1.1) !important;
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <nav style={sidebarStyles}>
        {/* Modern Header */}
        <div style={headerStyles}>
          <div style={logoContainerStyles}>
            <div style={logoIconStyles}>
              <Heart style={{ width: '24px', height: '24px', color: '#ffffff' }} />
            </div>
            {!isCollapsed && (
              <div>
                <h2 style={logoTextStyles}>MediGrids</h2>
                <p style={subTitleStyles}>Admin Panel</p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button
              className="toggle-btn"
              style={toggleButtonStyles}
              onClick={() => setIsCollapsed(!isCollapsed)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
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
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!item.isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {item.isActive && <div style={activeIndicatorStyles}></div>}
                    <IconComponent style={menuIconStyles} />
                    <span style={menuLabelStyles}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Modern Footer */}
        <div style={footerStyles}>
          <div style={userInfoStyles}>
            <div style={userAvatarStyles}>
              <UserCircle size={20} />
            </div>
            {!isCollapsed && (
              <div style={userDetailsStyles}>
                <p style={userNameStyles}>Admin User</p>
                <p style={userRoleStyles}>System Administrator</p>
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
                  e.target.style.transform = 'scale(1.05)';
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
                className="action-btn"
                style={actionButtonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
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
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#6ba46c',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(107, 164, 108, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setIsCollapsed(false)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2d5730';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#6ba46c';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </nav>
    </>
  );
}

export default AdminSidebar;
