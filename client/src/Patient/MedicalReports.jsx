import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function MedicalReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch reports
  useEffect(() => {
    if (!auth?.loginId) return;
    fetchReports();
  }, [auth?.loginId]);

  const fetchReports = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/DPR/patient/lab-reports?patientId=${auth.loginId}`
      );
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      console.log('Fetched reports:', data); // Debug log
      setReports(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load medical reports");
      setLoading(false);
    }
  };

  // Download handler
  const handleDownload = async (reportfile) => {
    if (!reportfile) {
      alert("No file available for download");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/DPR/assets/${reportfile}`);
      if (!response.ok) throw new Error('Failed to fetch file');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = reportfile;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to download report. Please try again.');
    }
  };

  // View handler
  const handleView = (reportfile) => {
    if (!reportfile) {
      alert("No file available to view");
      return;
    }
    window.open(`http://localhost:4000/DPR/assets/${reportfile}`, '_blank');
  };

  // Modal Component
  const ReportModal = ({ report, onClose, onView, onDownload }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Medical Report Details</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="report-section">
            <h3>Doctor Information</h3>
            <p><strong>Doctor:</strong> Dr. {report.appointmentId?.doctorId?.name || 'N/A'}</p>
          </div>

          <div className="report-section">
            <h3>Laboratory Information</h3>
            <p><strong>Lab Name:</strong> {report.labId?.labname || 'N/A'}</p>
            <p><strong>Lab Type:</strong> {report.labId?.labtype || 'N/A'}</p>
            <p><strong>Lab Findings:</strong></p>
            <p style={{whiteSpace: 'pre-wrap', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
              {report.labfindings || 'No findings recorded'}
            </p>
          </div>

          <div className="report-section">
            <h3>Report Details</h3>
            <p style={{whiteSpace: 'pre-wrap'}}>{report.reportDetails || 'No details available'}</p>
            <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
          </div>

          {report.reportfile && (
            <div className="report-actions">
              <button className="view-btn" onClick={onView}>
                👁️ View Full Report
              </button>
              <button className="download-btn" onClick={onDownload}>
                📥 Download Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const filteredReports = reports.filter(report =>
    report.reportDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.labfindings?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Styles
  const pageStyle = {
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

  const backButtonStyle = {
    background: "#ffffff",
    color: "#88C250",
    border: "2px solid #88C250",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const searchContainerStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    marginBottom: "24px",
  };

  const searchInputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    marginRight: "12px",
  };

  const downloadAllButtonStyle = {
    background: "#88C250",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "12px",
  };

  const tableContainerStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    textAlign: "left",
    padding: "16px",
    borderBottom: "2px solid #e5e7eb",
    fontWeight: "600",
    color: "#374151",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
  };

  const tdStyle = {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  };

  const tdWithEllipsisStyle = {
    ...tdStyle,
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
      backgroundColor: '#f8fafc',
      zIndex: 1
    }
  };

  const statusBadgeStyle = {
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: "#dcfce7",
    color: "#166534",
  };

  const actionButtonStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    marginRight: "8px",
    transition: "all 0.2s ease",
  };

  const viewButtonStyle = {
    ...actionButtonStyle,
    background: "#ffffff",
    color: "#88C250",
    border: "1px solid #88C250",
  };

  const downloadButtonStyle = {
    ...actionButtonStyle,
    background: "#88C250",
    color: "#ffffff",
    border: "none",
  };

  const reportDetailsStyle = {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <Dsidebar activePage="/medical-reports" />
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            <div style={headerStyle}>
              <h1 style={titleStyle}>Medical Reports</h1>
              <button 
                style={backButtonStyle}
                onClick={() => navigate('/dashboard')}
              >
                ← Back to Dashboard
              </button>
            </div>

            <div style={searchContainerStyle}>
              <input 
                style={searchInputStyle}
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div style={{textAlign: "center", padding: "20px"}}>Loading reports...</div>
            ) : error ? (
              <div style={{color: "red", textAlign: "center", padding: "20px"}}>{error}</div>
            ) : (
              <div style={tableContainerStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Doctor</th>
                      <th style={thStyle}>Lab Name</th>
                      <th style={thStyle}>Report Details</th>
                      <th style={thStyle}>Lab Findings</th>
                      <th style={thStyle}>Date</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report, index) => (
                      <tr key={index}>
                        <td style={tdStyle}>
                          <div>
                            <strong>Dr. {report.appointmentId?.doctorId?.name || 'N/A'}</strong>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <div>
                            <strong>{report.labId?.labname || 'N/A'}</strong>
                          </div>
                        </td>
                        <td style={tdWithEllipsisStyle}>
                          {report.reportDetails || 'No details available'}
                        </td>
                        <td style={tdWithEllipsisStyle}>
                          {report.labfindings || 'No findings recorded'}
                        </td>
                        <td style={tdStyle}>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td style={tdStyle}>
                          <div style={{display: 'flex', gap: '8px'}}>
                            <button 
                              style={viewButtonStyle}
                              onClick={() => {
                                setSelectedReport(report);
                                setShowModal(true);
                              }}
                            >
                              🔍 Details
                            </button>
                            {report.reportfile && (
                              <>
                                <button 
                                  style={viewButtonStyle}
                                  onClick={() => handleView(report.reportfile)}
                                >
                                  👁️ View
                                </button>
                                <button 
                                  style={downloadButtonStyle}
                                  onClick={() => handleDownload(report.reportfile)}
                                >
                                  📥 Download
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedReport && (
        <ReportModal 
          report={selectedReport}
          onClose={() => setShowModal(false)}
          onView={() => handleView(selectedReport.reportfile)}
          onDownload={() => handleDownload(selectedReport.reportfile)}
        />
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .modal-header button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .report-section {
          margin-bottom: 1.5rem;
        }

        .report-section h3 {
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .report-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .view-btn, .download-btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-btn {
          background: #ffffff;
          color: #88C250;
          border: 1px solid #88C250;
        }

        .download-btn {
          background: #88C250;
          color: white;
          border: none;
        }
      `}</style>
    </>
  );
}

export default MedicalReports;
