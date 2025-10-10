import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import your navbar component
import './Appointment.css'; // You'll need to create this CSS file

function Appointment() {
    const navigate = useNavigate();
    
    // State for form data
    const [formData, setFormData] = useState({
        hospital: '',
        department: '',
        doctor: ''
    });
    
    // State for dropdown options
    const [hospitals, setHospitals] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    
    // Loading and error states
    const [loading, setLoading] = useState({
        hospitals: false,
        departments: false,
        doctors: false
    });
    const [error, setError] = useState('');

    // Fetch hospitals on component mount
    useEffect(() => {
        fetchHospitals();
    }, []);

    // Fetch departments when hospital changes
    useEffect(() => {
        if (formData.hospital) {
            const selectedHospital = hospitals.find(h => h._id === formData.hospital);
            // Ensure departments is always an array
            let deptArr = [];
            if (Array.isArray(selectedHospital?.department)) {
                deptArr = selectedHospital.department;
            } else if (typeof selectedHospital?.department === 'string') {
                // Split by comma if it's a comma-separated string
                deptArr = selectedHospital.department.split(',').map(d => d.trim()).filter(Boolean);
            } else if (selectedHospital?.department) {
                // If it's something else, wrap in array
                deptArr = [selectedHospital.department];
            }
            setDepartments(deptArr);
            setFormData(prev => ({ ...prev, department: '', doctor: '' }));
            setDoctors([]);
        } else {
            setDepartments([]);
            setDoctors([]);
        }
    }, [formData.hospital, hospitals]);

    // Fetch doctors when hospital or department changes
    useEffect(() => {
        if (formData.hospital && formData.department) {
            fetchDoctors(formData.hospital, formData.department);
            // Reset doctor selection
            setFormData(prev => ({ ...prev, doctor: '' }));
        } else {
            setDoctors([]);
        }
    }, [formData.hospital, formData.department]);

    const fetchHospitals = async () => {
        setLoading(prev => ({ ...prev, hospitals: true }));
        setError('');
        try {
            const response = await fetch('http://localhost:4000/DPR/available-hospitals');
            const data = await response.json();
            setHospitals(data || []);
        } catch (err) {
            console.error('Error fetching hospitals:', err);
            setError('Failed to connect to server');
        } finally {
            setLoading(prev => ({ ...prev, hospitals: false }));
        }
    };

    const fetchDepartments = async (hospitalId) => {
        setLoading(prev => ({ ...prev, departments: true }));
        
        try {
            const response = await fetch(`http://localhost:4000/DPR/hospital-departments/${hospitalId}`);
            const data = await response.json();
            
            if (data.success) {
                setDepartments(data.departments || []);
            } else {
                setDepartments([]);
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
            setDepartments([]);
        } finally {
            setLoading(prev => ({ ...prev, departments: false }));
        }
    };

    const fetchDoctors = async (hospitalId, department) => {
        setLoading(prev => ({ ...prev, doctors: true }));
        try {
            const response = await fetch('http://localhost:4000/DPR/department-doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hospitalId, department })
            });
            const data = await response.json();
            setDoctors(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setDoctors([]);
        } finally {
            setLoading(prev => ({ ...prev, doctors: false }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.hospital || !formData.department || !formData.doctor) {
            setError('Please select hospital, department, and doctor');
            return;
        }
        const selectedHospital = hospitals.find(h => h._id === formData.hospital);
        const selectedDoctor = doctors.find(d => d._id === formData.doctor);
        if (!selectedHospital || !selectedDoctor) {
            setError('Invalid selection. Please try again.');
            return;
        }
        // No need to call backend here, just navigate
        navigate(`/book-appointment/${formData.doctor}`, {
            state: {
                doctor: selectedDoctor,
                hospital: selectedHospital,
                department: formData.department
            }
        });
    };

    const resetForm = () => {
        setFormData({ hospital: '', department: '', doctor: '' });
        setDepartments([]);
        setDoctors([]);
        setError('');
    };

    return (
        <>
            <Navbar />
            <div className="appointment-container">
                <div className="appointment-wrapper">
                    <div className="appointment-header">
                        <h1 className="appointment-title">Book Your Appointment</h1>
                        <p className="appointment-subtitle">
                            Select your preferred hospital, department, and doctor to schedule your visit
                        </p>
                    </div>

                    {error && (
                        <div className="appointment-error">
                            <span className="appointment-error-text">{error}</span>
                            <button 
                                className="appointment-error-close"
                                onClick={() => setError('')}
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <form className="appointment-form" onSubmit={handleSubmit}>
                        <div className="appointment-form-grid">
                            {/* Hospital Selection */}
                            <div className="appointment-form-group">
                                <label className="appointment-label">
                                    Select Hospital <span className="appointment-required">*</span>
                                </label>
                                <select
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleInputChange}
                                    required
                                    className="appointment-select"
                                    disabled={loading.hospitals}
                                >
                                    <option value="">
                                        {loading.hospitals ? 'Loading hospitals...' : 'Choose a hospital'}
                                    </option>
                                    {hospitals.map(hospital => (
                                        <option key={hospital._id} value={hospital._id}>
                                            {hospital.hospitalName}
                                        </option>
                                    ))}
                                </select>
                                {loading.hospitals && (
                                    <div className="appointment-loading">Loading hospitals...</div>
                                )}
                            </div>

                            {/* Department Selection */}
                            <div className="appointment-form-group">
                                <label className="appointment-label">
                                    Select Department <span className="appointment-required">*</span>
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                    className="appointment-select"
                                    disabled={!formData.hospital || loading.departments}
                                >
                                    <option value="">
                                        {!formData.hospital 
                                            ? 'Select a hospital first' 
                                            : loading.departments 
                                                ? 'Loading departments...' 
                                                : 'Choose a department'
                                        }
                                    </option>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                                {loading.departments && (
                                    <div className="appointment-loading">Loading departments...</div>
                                )}
                            </div>

                            {/* Doctor Selection */}
                            <div className="appointment-form-group">
                                <label className="appointment-label">
                                    Select Doctor <span className="appointment-required">*</span>
                                </label>
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleInputChange}
                                    required
                                    className="appointment-select"
                                    disabled={!formData.department || loading.doctors}
                                >
                                    <option value="">
                                        {!formData.department
                                            ? 'Select a department first'
                                            : loading.doctors
                                                ? 'Loading doctors...'
                                                : doctors.length === 0
                                                    ? 'No doctors available'
                                                    : 'Choose a doctor'
                                        }
                                    </option>
                                    {doctors.map(doctor => (
                                        <option key={doctor._id} value={doctor._id}>
                                            Dr. {doctor.name} - {doctor.specialization}
                                        </option>
                                    ))}
                                </select>
                                {loading.doctors && (
                                    <div className="appointment-loading">Loading doctors...</div>
                                )}
                            </div>
                        </div>

                        {/* Selected Doctor Preview */}
                        {formData.doctor && doctors.length > 0 && (
                            <div className="appointment-preview">
                                <h3 className="appointment-preview-title">Selected Doctor</h3>
                                {(() => {
                                    const selectedDoctor = doctors.find(d => d._id === formData.doctor);
                                    const selectedHospital = hospitals.find(h => h._id === formData.hospital);
                                    
                                    return selectedDoctor ? (
                                        <div className="appointment-preview-content">
                                            <div className="appointment-preview-doctor">
                                                <img 
                                                    src={`http://localhost:4000/${selectedDoctor.profileImage}`}
                                                    alt={selectedDoctor.name}
                                                    className="appointment-preview-image"
                                                    onError={(e) => {
                                                        e.target.src = '/assets/images/default-doctor.png';
                                                    }}
                                                />
                                                <div className="appointment-preview-info">
                                                    <h4>Dr. {selectedDoctor.name}</h4>
                                                    <p className="appointment-preview-specialization">
                                                        {selectedDoctor.specialization}
                                                    </p>
                                                    <p className="appointment-preview-qualification">
                                                        {selectedDoctor.qualification}
                                                    </p>
                                                    <p className="appointment-preview-experience">
                                                        {selectedDoctor.yearsOfExperience} years experience
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedHospital && (
                                                <div className="appointment-preview-hospital">
                                                    <p><strong>Hospital:</strong> {selectedHospital.hospitalName}</p>
                                                    <p><strong>Department:</strong> {formData.department}</p>
                                                    <p><strong>Phone:</strong> {selectedHospital.Phone}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : null;
                                })()}
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="appointment-actions">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="appointment-reset-button"
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                className="appointment-submit-button"
                                disabled={!formData.hospital || !formData.department || !formData.doctor}
                            >
                                Continue to Book Appointment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Appointment;
