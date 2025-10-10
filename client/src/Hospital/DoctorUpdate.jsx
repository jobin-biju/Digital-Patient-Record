import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import HospitalSidebar from './HospitalSidebar'
import url from '../Admin/imageUrl';
import './doctorUpdate.css'

function DoctorUpdate() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [qualification, setQualification] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [currentImage, setCurrentImage] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.id) {
            navigate('/hospitaldoctorview');
            return;
        }

        fetchDoctorDetails();
    }, [location.state?.id]);

    const fetchDoctorDetails = () => {
        let updateDoctor = { id: location.state.id };

        fetch('http://localhost:4000/DPR/doctoreditview', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(updateDoctor)
        })
            .then(res => res.json())
            .then(result => {
                console.log("doctor details", result);
                setName(result.name);
                setPhone(result.phone);
                setSpecialization(result.specialization);
                setQualification(result.qualification);
                setLicenseNumber(result.licenseNumber);
                setDepartment(result.department);
                setYearsOfExperience(result.yearsOfExperience);
                setCurrentImage(result.profileImage);
                setEmail(result.email);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching doctor:', error);
                setIsLoading(false);
                alert('Error loading doctor details');
            });
    };

    const handleUpdate = async () => {
        if (!name || !phone || !email || !specialization || !qualification || !licenseNumber || !department || !yearsOfExperience) {
            alert('Please fill in all required fields');
            return;
        }

        setIsUpdating(true);

        try {
            const formData = new FormData();
            formData.append('id', location.state.id);
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('specialization', specialization);
            formData.append('qualification', qualification);
            formData.append('licenseNumber', licenseNumber);
            formData.append('department', department);
            formData.append('yearsOfExperience', yearsOfExperience);
            formData.append('email', email);
            if (profileImage) formData.append('profileImage', profileImage);

            const response = await fetch('http://localhost:4000/DPR/doctorupdate', {
                method: 'PUT',
                body: formData
            });

            const result = await response.json();
            console.log("update result", result);

            if (response.ok) {
                alert('Doctor updated successfully!');
                navigate('/hospitaldoctorview');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Network error occurred');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        navigate('/hospitaldoctorview');
    };

    if (isLoading) {
        return (
            <div className="hospital-layout">
                <HospitalSidebar />
                <div className="main-content">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading doctor details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hospital-layout">
            <HospitalSidebar />
            <div className="main-content">
                <div className="content-header">
                    <div className="header-left">
                        <h1 className="page-title">Update Doctor</h1>
                        <p className="page-subtitle">Modify doctor information in the system</p>
                    </div>
                    <div className="header-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleCancel}
                            disabled={isUpdating}
                        >
                            <span className="btn-icon">←</span>
                            Back to Doctors
                        </button>
                    </div>
                </div>
                
                <div className="form-container">
                    <div className="doctor-form">
                        {/* Profile Image Section */}
                        <div className="form-section">
                            <h3 className="section-title">Profile Information</h3>
                            <div className="profile-upload">
                                <div className="profile-image-container">
                                    <div className="profile-image-placeholder">
                                        <img 
                                            src={profileImage 
                                                ? URL.createObjectURL(profileImage)
                                                : (currentImage ? url + currentImage : '/default-avatar.png')
                                            } 
                                            alt="Profile Preview" 
                                            className="profile-preview"
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png';
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="image/*"
                                        onChange={(e) => setProfileImage(e.target.files[0])}
                                        className="file-input"
                                        disabled={isUpdating}
                                    />
                                    <label htmlFor="profileImage" className="upload-btn">
                                        Update Photo
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="form-section">
                            <h3 className="section-title">Personal Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Full Name *</label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        className="form-input"
                                        onChange={(e) => setName(e.target.value)} 
                                        value={name}
                                        placeholder="Enter doctor's full name"
                                        disabled={isUpdating}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        id="phone"
                                        className="form-input"
                                        onChange={(e) => setPhone(e.target.value)} 
                                        value={phone}
                                        placeholder="+1 (555) 123-4567"
                                        disabled={isUpdating}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="email" className="form-label">Email Address *</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        className="form-input"
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email}
                                        placeholder="doctor@hospital.com"
                                        disabled={isUpdating}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="form-section">
                            <h3 className="section-title">Professional Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="specialization" className="form-label">Specialization *</label>
                                    <select
                                        id="specialization"
                                        className="form-input"
                                        onChange={(e) => setSpecialization(e.target.value)} 
                                        value={specialization}
                                        disabled={isUpdating}
                                    >
                                        <option value="">Select Specialization</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="Psychiatry">Psychiatry</option>
                                        <option value="Emergency Medicine">Emergency Medicine</option>
                                        <option value="Internal Medicine">Internal Medicine</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Radiology">Radiology</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="qualification" className="form-label">Qualification *</label>
                                    <input 
                                        type="text" 
                                        id="qualification"
                                        className="form-input"
                                        onChange={(e) => setQualification(e.target.value)} 
                                        value={qualification}
                                        placeholder="MD, FACC, etc."
                                        disabled={isUpdating}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="licenseNumber" className="form-label">License Number *</label>
                                    <input 
                                        type="text" 
                                        id="licenseNumber"
                                        className="form-input"
                                        onChange={(e) => setLicenseNumber(e.target.value)} 
                                        value={licenseNumber}
                                        placeholder="MD-2023-001"
                                        disabled={isUpdating}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="department" className="form-label">Department *</label>
                                    <select
                                        id="department"
                                        className="form-input"
                                        onChange={(e) => setDepartment(e.target.value)} 
                                        value={department}
                                        disabled={isUpdating}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Radiology">Radiology</option>
                                        <option value="Laboratory">Laboratory</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="yearsOfExperience" className="form-label">Years of Experience *</label>
                                    <input 
                                        type="number" 
                                        id="yearsOfExperience"
                                        className="form-input"
                                        onChange={(e) => setYearsOfExperience(e.target.value)} 
                                        value={yearsOfExperience}
                                        placeholder="5"
                                        min="0"
                                        max="50"
                                        disabled={isUpdating}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleCancel}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={handleUpdate}
                                disabled={isUpdating}
                            >
                                <span className="btn-icon">
                                    {isUpdating ? '⏳' : '✓'}
                                </span>
                                {isUpdating ? 'Updating Doctor...' : 'Update Doctor'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorUpdate
