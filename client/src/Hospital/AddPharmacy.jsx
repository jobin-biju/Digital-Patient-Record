import React from 'react'
import { useState } from 'react'
import HospitalSidebar from './HospitalSidebar'
import './addPharmacy.css'

function AddPharmacy() {
    const [pharmacyName, setPharmacyName] = useState('');
    const [number, setNumber] = useState('');
    const [drugLicenseNumber, setDrugLicenseNumber] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))

    const handleSubmit = async () => {
        if (!pharmacyName || !number || !drugLicenseNumber || !openingTime || !closingTime || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        setLoading(true);
        
        let pharmacyData = {
            pharmacyName: pharmacyName,
            number: number,
            drugLicenseNumber: drugLicenseNumber,
            openingTime: openingTime,
            closingTime: closingTime,
            email: email,
            password: password,
            hospitalId: auth.loginId
        }

        try {
            const response = await fetch('http://localhost:4000/DPR/addPharamacy', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(pharmacyData)
            });
            
            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                alert('Pharmacy added successfully!');
                // Clear form
                setPharmacyName('');
                setNumber('');
                setDrugLicenseNumber('');
                setOpeningTime('');
                setClosingTime('');
                setEmail('');
                setPassword('');
            } else {
                alert('Error: ' + (data.message || 'Failed to add pharmacy'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error occurred');
        } finally {
            setLoading(false);
        }
    }

    const handleReset = () => {
        setPharmacyName('');
        setNumber('');
        setDrugLicenseNumber('');
        setOpeningTime('');
        setClosingTime('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className="add-pharmacy-layout">
            <HospitalSidebar />
            <div className="add-pharmacy-main">
                <div className="add-pharmacy-header">
                    <div className="pharmacy-header-left">
                        <h1 className="pharmacy-page-title">Add New Pharmacy</h1>
                        <p className="pharmacy-page-subtitle">Enter pharmacy information to add them to the system</p>
                    </div>
                    <div className="pharmacy-header-actions">
                        <button 
                            type="button" 
                            className="pharmacy-btn pharmacy-btn-back" 
                            onClick={() => window.history.back()}
                            disabled={loading}
                        >
                            <span className="pharmacy-btn-icon">←</span>
                            Back to Pharmacies
                        </button>
                    </div>
                </div>
                
                <div className="add-pharmacy-container">
                    <div className="add-pharmacy-form">
                        {/* Basic Information */}
                        <div className="pharmacy-form-section">
                            <h3 className="pharmacy-section-title">Basic Information</h3>
                            <div className="pharmacy-form-grid">
                                <div className="pharmacy-form-group">
                                    <label htmlFor="pharmacyName" className="pharmacy-form-label">Pharmacy Name *</label>
                                    <input 
                                        type="text" 
                                        id="pharmacyName"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setPharmacyName(e.target.value)} 
                                        value={pharmacyName}
                                        placeholder="Enter pharmacy name"
                                        disabled={loading}
                                    />
                                </div>
                                
                                <div className="pharmacy-form-group">
                                    <label htmlFor="number" className="pharmacy-form-label">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        id="number"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setNumber(e.target.value)} 
                                        value={number}
                                        placeholder="+1 (555) 123-4567"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="pharmacy-form-group pharmacy-full-width">
                                    <label htmlFor="drugLicenseNumber" className="pharmacy-form-label">Drug License Number *</label>
                                    <input 
                                        type="text" 
                                        id="drugLicenseNumber"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setDrugLicenseNumber(e.target.value)} 
                                        value={drugLicenseNumber}
                                        placeholder="DL-2023-001"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="pharmacy-form-section">
                            <h3 className="pharmacy-section-title">Operating Hours</h3>
                            <div className="pharmacy-form-grid">
                                <div className="pharmacy-form-group">
                                    <label htmlFor="openingTime" className="pharmacy-form-label">Opening Time *</label>
                                    <input 
                                        type="time" 
                                        id="openingTime"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setOpeningTime(e.target.value)} 
                                        value={openingTime}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="pharmacy-form-group">
                                    <label htmlFor="closingTime" className="pharmacy-form-label">Closing Time *</label>
                                    <input 
                                        type="time" 
                                        id="closingTime"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setClosingTime(e.target.value)} 
                                        value={closingTime}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Login Information */}
                        <div className="pharmacy-form-section">
                            <h3 className="pharmacy-section-title">Contact & Login Information</h3>
                            <div className="pharmacy-form-grid">
                                <div className="pharmacy-form-group">
                                    <label htmlFor="email" className="pharmacy-form-label">Email Address *</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email}
                                        placeholder="pharmacy@hospital.com"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="pharmacy-form-group">
                                    <label htmlFor="password" className="pharmacy-form-label">Password *</label>
                                    <input 
                                        type="password" 
                                        id="password"
                                        className="pharmacy-form-input"
                                        onChange={(e) => setPassword(e.target.value)} 
                                        value={password}
                                        placeholder="Enter secure password"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="pharmacy-form-actions">
                            <button 
                                type="button" 
                                className="pharmacy-btn pharmacy-btn-secondary" 
                                onClick={handleReset}
                                disabled={loading}
                            >
                                Reset Form
                            </button>
                            <button 
                                type="button" 
                                className="pharmacy-btn pharmacy-btn-primary" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                <span className="pharmacy-btn-icon">
                                    {loading ? '⏳' : '+'}
                                </span>
                                {loading ? 'Adding Pharmacy...' : 'Add Pharmacy'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPharmacy
