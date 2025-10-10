import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dsidebar from "./Dsidebar";

function ProfileUpdate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContactName: "",
    emergencyContact: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    insurance: ""
  });

  // Styles
  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    paddingTop: "70px",
    width: "100%",
    overflow: "hidden"
  };

  const mainContentStyle = {
    marginLeft: "280px",
    flex: 1,
    padding: "32px",
    background: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
    width: "calc(100% - 280px)",
    overflowY: "auto",
    overflowX: "hidden"
  };

  const containerStyle = {
    maxWidth: "800px",
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

  const formContainerStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e5e7eb",
  };

  const sectionStyle = {
    marginBottom: "32px",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid #e5e7eb",
  };

  const inputGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  };

  const inputGroupStyle = {
    marginBottom: "16px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#374151",
    fontSize: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "vertical",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e5e7eb",
  };

  const btnPrimary = {
    background: "#88C250",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };

  const btnSecondary = {
    background: "#ffffff",
    color: "#88C250",
    border: "2px solid #88C250",
    padding: "10px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  useEffect(() => {
    const fetchPatientData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const userData = JSON.parse(localStorage.getItem('yourstorage'));
            if (!userData?.loginId || !userData?.email) {
                setError('User not authenticated');
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:4000/DPR/patient-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    patientId: userData.loginId,
                    email: userData.email 
                })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to fetch profile');
            }

            const patientData = result.data;

            setProfileData({
                name: patientData.name || "",
                email: patientData.email || "",
                phone: patientData.phone || "",
                gender: patientData.gender || "",
                age: patientData.age || "",
                dateOfBirth: patientData.dateOfBirth ? 
                    new Date(patientData.dateOfBirth).toISOString().split('T')[0] : "",
                address: patientData.address || "",
                emergencyContactName: patientData.emergencyContact?.name || "",
                emergencyContact: patientData.emergencyContact?.phone || "",
                bloodType: patientData.bloodType || "",
                allergies: patientData.allergies || "",
                medicalConditions: patientData.medicalConditions || "",
                insurance: patientData.insurance || ""
            });

            setLoading(false);
        } catch (err) {
            setError(err.message || 'Failed to load profile data');
            setLoading(false);
        }
    };

    fetchPatientData();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
        setLoading(true);
        setError(null);
        const userData = JSON.parse(localStorage.getItem('yourstorage'));
        const updateData = {
            patientId: userData.loginId,
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            dateOfBirth: profileData.dateOfBirth,
            address: profileData.address,
            emergencyContactName: profileData.emergencyContactName,
            emergencyContactPhone: profileData.emergencyContact,
            bloodType: profileData.bloodType,
            allergies: profileData.allergies,
            medicalConditions: profileData.medicalConditions,
            insurance: profileData.insurance
        };
        const response = await fetch('http://localhost:4000/DPR/update-patient-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to update profile');
        }

        alert('Profile updated successfully!');
        navigate('/dashboard');
    } catch (err) {
        setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar /><br /><br />
      <div style={pageStyle}>
        <Dsidebar activePage="/profile" />
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            <div style={headerStyle}>
              <h1 style={titleStyle}>Update Profile</h1>
            </div>

            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#ffffff',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <p style={{ color: '#666' }}>Loading profile data...</p>
              </div>
            )}

            {error && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#fee2e2',
                borderRadius: '8px',
                marginBottom: '20px',
                color: '#dc2626'
              }}>
                {error}
              </div>
            )}

            {/* Form */}
            <div style={formContainerStyle}>
              {/* Personal Information */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Personal Information</h2>
                <div style={inputGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name *</label>
                    <input 
                      style={inputStyle}
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Date of Birth *</label>
                    <input 
                      style={inputStyle}
                      type="date" 
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                      required
                    />
                  </div>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Address</label>
                  <input 
                    style={inputStyle}
                    type="text" 
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = "#88C250"}
                    onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Contact Information</h2>
                <div style={inputGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email Address *</label>
                    <input 
                      style={inputStyle}
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input 
                      style={inputStyle}
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Emergency Contact</h2>
                <div style={inputGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Emergency Contact Name</label>
                    <input 
                      style={inputStyle}
                      type="text" 
                      value={profileData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Emergency Contact Phone</label>
                    <input 
                      style={inputStyle}
                      type="tel" 
                      value={profileData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Medical Information</h2>
                <div style={inputGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Blood Type</label>
                    <select 
                      style={inputStyle}
                      value={profileData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Insurance Provider</label>
                    <input 
                      style={inputStyle}
                      type="text" 
                      value={profileData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>
                </div>

                <div style={inputGridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Known Allergies</label>
                    <textarea 
                      style={textareaStyle}
                      value={profileData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="List any known allergies..."
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Medical Conditions</label>
                    <textarea 
                      style={textareaStyle}
                      value={profileData.medicalConditions}
                      onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                      placeholder="List any chronic conditions..."
                      onFocus={(e) => e.target.style.borderColor = "#88C250"}
                      onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={buttonGroupStyle}>
                <button 
                  style={btnSecondary} 
                  onClick={handleCancel}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#ffffff";
                  }}
                >
                  Cancel
                </button>
                <button 
                  style={btnPrimary} 
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#6ba83a";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#88C250";
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
