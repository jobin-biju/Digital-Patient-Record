import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer overlay">
      {/* Start Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="cta">
                <h3>Need Medical Help?</h3>
                <p>
                  Please feel free to contact our friendly reception staff for any medical assistance, or book an appointment through{" "}
                  <Link to="/AvailableHospitals">our hospitals</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Top */}

      {/* Start Footer Middle */}
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              {/* Single Widget */}
              <div className="single-footer f-about">
                <div className="logo">
                  <Link to="/">
                    <h2 style={{ color: '#fff' }}>DPR Healthcare</h2>
                  </Link>
                </div>
                <p>Your trusted partner in healthcare management and medical services.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              {/* Single Widget */}
              <div className="single-footer f-link">
                <h3>Quick Links</h3>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/AboutUs">About Us</Link></li>
                      <li><Link to="/AvailableHospitals">Hospitals</Link></li>
                      <li><Link to="/Appointment">Appointments</Link></li>
                      <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <ul>
                      <li><Link to="/PatientDashboard">Dashboard</Link></li>
                      <li><Link to="/medical-reports">Medical Reports</Link></li>
                      <li><Link to="/prescriptions">Prescriptions</Link></li>
                      <li><Link to="/Myappoinment">My Appointments</Link></li>
                      <li><Link to="/profile">Profile</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              {/* Single Widget */}
              <div className="single-footer last f-contact">
                <h3>Contact Information</h3>
                <ul>
                  <li>
                    <i className="lni lni-map-marker"></i> Kerala, India
                  </li>
                  <li>
                    <i className="lni lni-phone"></i> Emergency: +91 1800-123-4567
                  </li>
                  <li>
                    <i className="lni lni-envelope"></i> support@dprhealthcare.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Footer Bottom */}
      <div style={{
        backgroundColor: '#006838',
        padding: '25px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ color: '#95a5a6' }}>
              <p style={{ margin: 0 }}>
                © {new Date().getFullYear()} DPR Healthcare. All Rights Reserved.
              </p>
            </div>
            <ul style={{
              display: 'flex',
              gap: '25px',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              <li>
                <Link to="/terms" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Footer Bottom */}
    </footer>
  );
}

export default Footer;
