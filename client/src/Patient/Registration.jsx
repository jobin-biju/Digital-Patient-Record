// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';

// function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     gender: '',
//     age: '',
//     email: '',
//     phone: '',
//     password: '',
//     dateOfBirth: '',
//   });
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:4000/DPR/patientInsert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         alert('Registration successful!');
//         navigate('/login');
//       } else {
//         setError(data.message || 'Registration failed');
//       }
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
      
//       <section className="register-section section">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-6 col-md-8 col-12">
//               <div className="register-form">
//                 <h1 className="text-center mb-4">Register</h1>
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <form onSubmit={handleRegister}>
//                   <div className="form-group mb-3">
//                     <label>Name *</label>
//                     <input 
//                       type="text" 
//                       name="name"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.name}
//                       required 
//                     />
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Gender *</label>
//                     <div className="d-flex gap-4">
//                       <div className="form-check">
//                         <input 
//                           type="radio" 
//                           name="gender"
//                           className="form-check-input"
//                           value="Male" 
//                           onChange={handleInputChange}
//                           checked={formData.gender === "Male"}
//                           required 
//                         />
//                         <label className="form-check-label">Male</label>
//                       </div>
//                       <div className="form-check">
//                         <input 
//                           type="radio" 
//                           name="gender"
//                           className="form-check-input"
//                           value="Female" 
//                           onChange={handleInputChange}
//                           checked={formData.gender === "Female"}
//                           required 
//                         />
//                         <label className="form-check-label">Female</label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Age *</label>
//                     <input 
//                       type="number" 
//                       name="age"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.age}
//                       required 
//                     />
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Date of Birth *</label>
//                     <input 
//                       type="date" 
//                       name="dateOfBirth"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.dateOfBirth}
//                       required 
//                     />
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Phone *</label>
//                     <input 
//                       type="tel" 
//                       name="phone"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.phone}
//                       required 
//                     />
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Email *</label>
//                     <input 
//                       type="email" 
//                       name="email"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.email}
//                       required 
//                     />
//                   </div>

//                   <div className="form-group mb-3">
//                     <label>Password *</label>
//                     <input 
//                       type="password" 
//                       name="password"
//                       className="form-control"
//                       onChange={handleInputChange}
//                       value={formData.password}
//                       required 
//                     />
//                   </div>

//                   <div className="text-center">
//                     <button 
//                       type="submit"
//                       className="btn btn-primary"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Lock, AlertCircle, Heart, UserPlus, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/DPR/patientInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Styling matching MediGrids theme
  const sectionStyles = {
    background: 'linear-gradient(135deg, #2d5730 0%, #4a7c59 50%, #6ba46c 100%)',
    minHeight: '100vh',
    padding: '60px 0',
    position: 'relative',
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const decorativeElementStyles = {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite'
  };

  const decorativeElement2Styles = {
    position: 'absolute',
    bottom: '10%',
    left: '8%',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    animation: 'float 4s ease-in-out infinite reverse'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 10
  };

  const formContainerStyles = {
    maxWidth: '600px',
    margin: '0 auto'
  };

  const brandSectionStyles = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const brandLogoStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };

  const brandIconStyles = {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    marginRight: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const brandTitleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0',
    letterSpacing: '-0.5px'
  };

  const formTitleStyles = {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 10px 0',
    textAlign: 'center'
  };

  const formSubtitleStyles = {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    margin: '0',
    lineHeight: '1.5'
  };

  const formCardStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '3rem 2.5rem',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const errorStyles = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center'
  };

  const errorTextStyles = {
    fontSize: '0.875rem',
    color: '#dc2626',
    margin: '0',
    marginLeft: '0.75rem'
  };

  const formRowStyles = {
    display: 'flex',
    gap: '20px',
    marginBottom: '1.75rem'
  };

  const formGroupStyles = {
    marginBottom: '1.75rem',
    flex: '1'
  };

  const labelStyles = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2d5730',
    marginBottom: '0.75rem'
  };

  const inputContainerStyles = {
    position: 'relative'
  };

  const inputIconStyles = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6ba46c',
    pointerEvents: 'none'
  };

  const inputStyles = {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '1rem',
    border: '2px solid #e5f3e7',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafffe',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const inputNoIconStyles = {
    ...inputStyles,
    paddingLeft: '16px'
  };

  const inputFocusStyles = {
    borderColor: '#6ba46c',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 4px rgba(107, 164, 108, 0.1)'
  };

  const genderContainerStyles = {
    display: 'flex',
    gap: '30px',
    marginTop: '0.5rem'
  };

  const radioContainerStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  const radioStyles = {
    width: '18px',
    height: '18px',
    marginRight: '10px',
    accentColor: '#6ba46c',
    cursor: 'pointer'
  };

  const radioLabelStyles = {
    fontSize: '0.9rem',
    color: '#2d5730',
    cursor: 'pointer',
    margin: '0'
  };

  const buttonStyles = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '56px',
    fontFamily: 'inherit',
    marginTop: '2rem'
  };

  const buttonActiveStyles = {
    ...buttonStyles,
    background: 'linear-gradient(135deg, #6ba46c 0%, #2d5730 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 25px rgba(107, 164, 108, 0.4)',
    transform: 'translateY(0px)'
  };

  const buttonDisabledStyles = {
    ...buttonStyles,
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed'
  };

  const spinnerStyles = {
    width: '22px',
    height: '22px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px'
  };

  const privacyNoticeStyles = {
    marginTop: '2rem',
    padding: '1.25rem',
    backgroundColor: '#f0f9f1',
    border: '1px solid #d1fae5',
    borderRadius: '12px',
    fontSize: '0.875rem',
    color: '#2d5730',
    textAlign: 'center'
  };

  const keyframesStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
  `;

  const isFormValid = formData.name && formData.gender && formData.age && 
                     formData.email && formData.phone && formData.password && 
                     formData.dateOfBirth;

  return (
    <>
      <style>{keyframesStyles}</style>
     
      
      <section style={sectionStyles}>
        <div style={decorativeElementStyles}></div>
        <div style={decorativeElement2Styles}></div>
        
        <div style={containerStyles}>
          <div style={formContainerStyles}>
            <div style={brandSectionStyles}>
              <div style={brandLogoStyles}>
                <div style={brandIconStyles}>
                  <Heart style={{ width: '36px', height: '36px', color: '#6ba46c' }} />
                </div>
                <h1 style={brandTitleStyles}>MediGrids</h1>
              </div>
              <h2 style={formTitleStyles}>Patient Registration</h2>
              <p style={formSubtitleStyles}>Join our healthcare community - Create your patient account</p>
            </div>

            <div style={formCardStyles}>
              {error && (
                <div style={errorStyles}>
                  <AlertCircle style={{ width: '20px', height: '20px', color: '#dc2626' }} />
                  <p style={errorTextStyles}>{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister}>
                {/* Name Field */}
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Full Name *</label>
                  <div style={inputContainerStyles}>
                    <div style={inputIconStyles}>
                      <User style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                      style={inputStyles}
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                </div>

                {/* Gender and Age Row */}
                <div style={formRowStyles}>
                  <div style={formGroupStyles}>
                    <label style={labelStyles}>Gender *</label>
                    <div style={genderContainerStyles}>
                      <div style={radioContainerStyles}>
                        <input 
                          type="radio" 
                          name="gender"
                          value="Male" 
                          onChange={handleInputChange}
                          checked={formData.gender === "Male"}
                          style={radioStyles}
                          required 
                        />
                        <label style={radioLabelStyles}>Male</label>
                      </div>
                      <div style={radioContainerStyles}>
                        <input 
                          type="radio" 
                          name="gender"
                          value="Female" 
                          onChange={handleInputChange}
                          checked={formData.gender === "Female"}
                          style={radioStyles}
                          required 
                        />
                        <label style={radioLabelStyles}>Female</label>
                      </div>
                    </div>
                  </div>

                  <div style={formGroupStyles}>
                    <label style={labelStyles}>Age *</label>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputNoIconStyles)}
                      style={inputNoIconStyles}
                      placeholder="Enter age"
                      min="1"
                      max="120"
                      required 
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Date of Birth *</label>
                  <div style={inputContainerStyles}>
                    <div style={inputIconStyles}>
                      <Calendar style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input 
                      type="date" 
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                      style={inputStyles}
                      required 
                    />
                  </div>
                </div>

                {/* Contact Information Row */}
                <div style={formRowStyles}>
                  <div style={formGroupStyles}>
                    <label style={labelStyles}>Phone Number *</label>
                    <div style={inputContainerStyles}>
                      <div style={inputIconStyles}>
                        <Phone style={{ width: '20px', height: '20px' }} />
                      </div>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                        style={inputStyles}
                        placeholder="+91 98765 43210"
                        required 
                      />
                    </div>
                  </div>

                  <div style={formGroupStyles}>
                    <label style={labelStyles}>Email Address *</label>
                    <div style={inputContainerStyles}>
                      <div style={inputIconStyles}>
                        <Mail style={{ width: '20px', height: '20px' }} />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                        onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                        style={inputStyles}
                        placeholder="patient@medigrids.com"
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div style={formGroupStyles}>
                  <label style={labelStyles}>Create Password *</label>
                  <div style={inputContainerStyles}>
                    <div style={inputIconStyles}>
                      <Lock style={{ width: '20px', height: '20px' }} />
                    </div>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                      onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                      style={inputStyles}
                      placeholder="Create a secure password"
                      minLength="6"
                      required 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  style={isLoading || !isFormValid ? buttonDisabledStyles : buttonActiveStyles}
                  onMouseOver={(e) => {
                    if (!isLoading && isFormValid) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(107, 164, 108, 0.5)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading && isFormValid) {
                      e.target.style.transform = 'translateY(0px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(107, 164, 108, 0.4)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={spinnerStyles}></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus style={{ marginRight: '10px', width: '20px', height: '20px' }} />
                      <span>Create Patient Account</span>
                      <ArrowRight style={{ marginLeft: '10px', width: '18px', height: '18px' }} />
                    </>
                  )}
                </button>

                {/* Privacy Notice */}
                <div style={privacyNoticeStyles}>
                  <strong>🔒 HIPAA Compliant Registration</strong>
                  <br />
                  Your personal and medical information is protected with industry-standard encryption. 
                  By registering, you agree to our Privacy Policy and Terms of Service.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default Register;
