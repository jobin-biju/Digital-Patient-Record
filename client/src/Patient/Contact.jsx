import React, { useState } from "react";
import Navbar from "./Navbar";


function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    
    try {
      const response = await fetch('http://localhost:4000/DPR/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ " + data.message);
        setFormData({ name: "", email: "", description: "" });
      } else {
        setStatus("❌ " + (data.message || "Failed to send message"));
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navbar />
      <div style={pageStyle}>
        <div style={mainContentStyle}>
          <div style={containerStyle}>
            <h1 style={titleStyle}>Contact Us</h1>
            
            <div style={formContainerStyle}>
              <form onSubmit={handleSubmit}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={textareaStyle}
                    required
                    placeholder="How can we help you?"
                    rows="5"
                  />
                </div>

                <button 
                  type="submit" 
                  style={{
                    ...submitButtonStyle,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <div style={status.includes("✅") ? successStyle : errorStyle}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Styles
const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
  fontFamily: '"Poppins", sans-serif',
  paddingTop: "70px",
};

const mainContentStyle = {
  flex: 1,
  padding: "32px",
  margin: "0 auto", // Center the content
  width: "100%",    // Take full width
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const titleStyle = {
  color: "#0b2f05",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "24px",
};

const formContainerStyle = {
  background: "#ffffff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const inputGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "500",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "120px",
};

const submitButtonStyle = {
  background: "#88C250",
  color: "#ffffff",
  padding: "12px 24px",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  width: "100%",
};

const successStyle = {
  marginTop: "16px",
  padding: "12px",
  background: "#dcfce7",
  color: "#166534",
  borderRadius: "6px",
  textAlign: "center",
};

const errorStyle = {
  marginTop: "16px",
  padding: "12px",
  background: "#fee2e2",
  color: "#dc2626",
  borderRadius: "6px",
  textAlign: "center",
};

export default ContactUs;



