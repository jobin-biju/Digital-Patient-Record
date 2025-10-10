import React from "react";
import { Link } from "react-router-dom";
import "./DoctorSideBar.css";

function DoctorSideBar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" className="hospital-logo">
            <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
          </svg>
        </div>
        <h2>MediGrids</h2>
        <p className="subtitle">Doctor Portal</p>
      </div>

      {/* Menu */}
      <nav className="menu">
        <ul className="main-menu">
          <li className="menu-item">
            <Link to="/doctor/dashboard" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3v-4h-3z" />
                </svg>
              </span>
              <span className="text">Dashboard</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/doctor/patients" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C19 14.17 14.33 13 12 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h4v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </span>
              <span className="text">Patients</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/doctor/appointments" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 21c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7v-5z" />
                </svg>
              </span>
              <span className="text">Appointments</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/doctor/prescriptions" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </span>
              <span className="text">Prescriptions</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/doctor/reports" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 21c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7v-5z" />
                </svg>
              </span>
              <span className="text">Lab Reports</span>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/transferpatientview" className="menu-link">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zM3 9h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V7H7z" />
                </svg>
              </span>
              <span className="text">Patients Transfer</span>
            </Link>
          </li>

        </ul>



        {/* Footer Links */}
        <div className="menu-footer">
          <ul>
            <li className="menu-item">
              <Link to="/doctor/settings" className="menu-link">
                <span className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87c-0.12,0.21-0.08,0.47,0.12,0.61l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                  </svg>
                </span>
                <span className="text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <button onClick={handleLogout} className="menu-link logout">
                <span className="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                </span>
                <span className="text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default DoctorSideBar;