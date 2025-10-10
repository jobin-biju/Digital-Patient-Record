import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function DoctorTransfers() {
  const [transfers, setTransfers] = useState([]);
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!auth?.loginId) return;

    fetch(
      `http://localhost:4000/DPR/getdoctransfers?patientId=${auth.loginId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTransfers(data);
        cardRefs.current = new Array(data.length);
      })
      .catch((err) => console.error("Error fetching doctor transfers:", err));
  }, [auth?.loginId]);

  const handlePrintSingle = (index) => {
    const printContents = cardRefs.current[index].innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Doctor Transfer Record</title>');
    win.document.write('<style>body{font-family:Poppins,Arial,sans-serif;} .card{background:#fff;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;} .label{font-weight:600;color:#1f2937;} .row{display:grid;grid-template-columns:1fr 1fr;gap:12px;} ul{margin:0;padding-left:18px;} .report-link{color:#166534;text-decoration:underline;word-break:break-all;} </style>');
    win.document.write('</head><body>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  // --- Styles from Transfer.jsx ---
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
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    marginTop: "18px",
    cursor: "pointer"
  };

  // --- End styles ---

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <Dsidebar activePage="/doctortransfers" />
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            <h1 style={titleStyle}>Doctor-to-Doctor Transfers</h1>
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
                  <h3 style={{ color: "#374151", marginBottom: "8px" }}>No Doctor Transfer Records Found</h3>
                  <p>No doctor transfer records available for your account.</p>
                </div>
              ) : (
                transfers.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    style={transferCardStyle}
                    ref={el => cardRefs.current[idx] = el}
                  >
                    <div style={{ marginBottom: "12px", fontWeight: "600", color: "#1f2937" }}>
                      Transferred At: {item.transferredAt ? new Date(item.transferredAt).toLocaleString() : "N/A"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <strong>From Doctor:</strong> {item.formdoctorId?.name || "N/A"}
                      </div>
                      <div>
                        <strong>To Doctor:</strong> {item.newDoctorId?.name || "N/A"}
                      </div>
                      <div>
                        <strong>Appointment ID:</strong> {item.appointmentId?._id}
                      </div>
                      <div>
                        <strong>Appointment Date:</strong>{" "}
                        {item.appointmentId?.appointmentDate
                          ? new Date(item.appointmentId.appointmentDate).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div>
                        <strong>Symptoms:</strong> {item.appointmentId?.symptoms || "N/A"}
                      </div>
                    </div>

                    {/* Prescriptions */}
                    <div style={{ marginTop: "1em" }}>
                      <strong>Prescriptions:</strong>
                      {item.prescriptionsId && item.prescriptionsId.length > 0 ? (
                        item.prescriptionsId.map((pres, i) => (
                          <div
                            key={pres._id || i}
                            style={{
                              background: "#f8f9fa",
                              margin: "0.5em 0",
                              padding: "0.5em",
                              borderRadius: "6px",
                            }}
                          >
                            {pres.diagnosis && (
                              <p>
                                <strong>Diagnosis:</strong> {pres.diagnosis}
                              </p>
                            )}
                            <p>
                              <strong>Admitted:</strong> {pres.admitted ? "Yes" : "No"}
                            </p>
                            <p>
                              <strong>Medicines:</strong>
                            </p>
                            <ul>
                              {pres.medicines && pres.medicines.length > 0
                                ? pres.medicines.map((med, j) => (
                                    <li key={j}>
                                      {med.name} - Qty: {med.quantity}, Days: {med.days}
                                    </li>
                                  ))
                                : <li>No medicines</li>}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p>No prescriptions found.</p>
                      )}
                    </div>

                    {/* Lab Reports */}
                    <div style={{ marginTop: "1em" }}>
                      <strong>Lab Reports:</strong>
                      {item.labReportsId && item.labReportsId.length > 0 ? (
                        item.labReportsId.map((lab, i) => (
                          <div
                            key={lab._id || i}
                            style={{
                              background: "#e3f6fc",
                              margin: "0.5em 0",
                              padding: "0.5em",
                              borderRadius: "6px",
                            }}
                          >
                           
                            <p>
                              <strong>Findings:</strong> {lab.labfindings || "N/A"}
                            </p>
                            <p>
                              <strong>Details:</strong> {lab.reportDetails || "N/A"}
                            </p>
                            {lab.reportfile && (
                              <p>
                                <strong>Report File:</strong>{" "}
                                <a
                                  href={`http://localhost:4000/DPR/assets/${lab.reportfile}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="report-link"
                                >
                                  {lab.reportfile}
                                </a>
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>No lab reports found.</p>
                      )}
                    </div>
                    <button
                      style={downloadButtonStyle}
                      onClick={() => handlePrintSingle(idx)}
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

export default DoctorTransfers;