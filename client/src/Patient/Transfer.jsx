import React, { useEffect, useState, useRef } from 'react';
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function Transfer() {
  const [transfers, setTransfers] = useState([]);
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!auth?.loginId) return;
    fetch(`http://localhost:4000/DPR/getpatienttransfers?loginId=${auth.loginId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setTransfers(result);
        cardRefs.current = new Array(result.length);
      })
      .catch((err) => console.error("Error fetching transfers:", err));
  }, [auth?.loginId]);

  const handlePrintSingle = (index) => {
    const printContents = cardRefs.current[index].innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Patient Transfer Record</title>');
    win.document.write('<style>body{font-family:Poppins,Arial,sans-serif;} .card{background:#fff;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;} .label{font-weight:600;color:#1f2937;} .row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}</style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  // --- Styles copied and adapted from Myappoinment.jsx ---
  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    paddingTop: "80px",
  };

  const mainContentStyle = {
    marginLeft: "280px",
    flex: 1,
    padding: "32px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
  };

  const titleStyle = {
    color: "#0b2f05",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "32px",
  };

  const transfersGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "24px",
  };

  const transferCardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    marginBottom: "24px"
  };

  const downloadButtonStyle = {
    background: "#88C250",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    marginBottom: "20px",
    cursor: "pointer"
  };

  // --- End styles ---

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <Dsidebar activePage="/appointments" />
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            <h1 style={titleStyle}>My Transfers</h1>
            <div style={transfersGridStyle}>
              {transfers.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#6b7280",
                  background: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔄</div>
                  <h3 style={{ color: "#374151", marginBottom: "8px" }}>No Transfer Records Found</h3>
                  <p>No transfer records available for your account.</p>
                </div>
              ) : (
                transfers.map((item, index) => (
                  <div
                    key={index}
                    style={transferCardStyle}
                    ref={el => cardRefs.current[index] = el}
                  >
                    <div style={{ marginBottom: "12px", fontWeight: "600", color: "#1f2937" }}>
                      Transfer Date: {new Date(item.transferDate).toLocaleString()}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <strong>From Hospital:</strong> {item.fromHospitalId?.hospitalName || "N/A"}
                      </div>
                      <div>
                        <strong>To Hospital:</strong> {item.toHospitalId?.hospitalName || "N/A"}
                      </div>
                      <div>
                        <strong>Appointment ID:</strong> {item.appointmentId?._id}
                      </div>
                      <div>
                        <strong>Doctor:</strong> {item.appointmentId?.doctorId?.name || "N/A"}
                      </div>
                      <div>
                        <strong>Date:</strong> {item.appointmentId?.appointmentDate ? new Date(item.appointmentId.appointmentDate).toLocaleDateString() : "N/A"}
                      </div>
                      <div>
                        <strong>Time:</strong> {item.appointmentId?.appointmentTime || "N/A"}
                      </div>
                    </div>
                    <button
                      style={{
                        background: "#88C250",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        marginTop: "18px",
                        cursor: "pointer"
                      }}
                      onClick={() => handlePrintSingle(index)}
                    >
                      ⬇️ Download this Transfer as PDF
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transfer;