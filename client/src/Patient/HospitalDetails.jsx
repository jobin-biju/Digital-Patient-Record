import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import your navbar component
import './HospitalDetails.css';

function HospitalDetails() {
    const { hospitalId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [hospital, setHospital] = useState(location.state?.hospital || null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchHospitalDetails = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/DPR/hospital/${hospitalId}`);
            if (!response.ok) throw new Error('Failed to fetch hospital details');
            const data = await response.json();
            setHospital(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }, [hospitalId]);

    const processDepartments = useCallback(() => {
        if (hospital?.department) {
            const deptArray = hospital.department.split(',').map(dept => {
                // Remove square brackets and trim whitespace
                return dept.trim().replace(/^\[|\]$/g, '');
            });
            const departmentData = deptArray.map(dept => ({
                name: dept,
                description: getDepartmentDescription(dept),
                icon: getDepartmentIcon(dept)
            }));
            setDepartments(departmentData);
        }
        setLoading(false);
    }, [hospital]);

    useEffect(() => {
        if (!hospital) {
            fetchHospitalDetails();
        } else {
            processDepartments();
        }
    }, [hospital, fetchHospitalDetails, processDepartments]);

    const getDepartmentDescription = (department) => {
        const descriptions = {
            'Cardiology': 'Heart and cardiovascular system specialists',
            'Neurology': 'Brain and nervous system disorders',
            'Orthopedics': 'Bone, joint, and muscle treatments',
            'Pediatrics': 'Children\'s healthcare and development',
            'Gynecology': 'Women\'s reproductive health',
            'Dermatology': 'Skin, hair, and nail conditions',
            'Psychiatry': 'Mental health and behavioral disorders',
            'Radiology': 'Medical imaging and diagnostics',
            'Emergency': '24/7 emergency medical care',
            'Surgery': 'Surgical procedures and operations'
        };
        return descriptions[department] || 'Specialized medical care and treatment';
    };

    const getDepartmentIcon = (department) => {
        const icons = {
            'Cardiology': '❤️',
            'Neurology': '🧠',
            'Orthopedics': '🦴',
            'Pediatrics': '👶',
            'Gynecology': '👩',
            'Dermatology': '✨',
            'Psychiatry': '🧘',
            'Radiology': '🔬',
            'Emergency': '🚨',
            'Surgery': '⚕️'
        };
        return icons[department] || '🏥';
    };

    const handleDepartmentClick = (departmentName) => {
        const cleanDepartmentName = departmentName.trim();
        
        console.log('Navigating to department:', {
            hospitalId,
            departmentName: cleanDepartmentName,
            hospital
        });
        
        navigate(`/hospital/${hospitalId}/department/${encodeURIComponent(cleanDepartmentName)}`, {
            state: { 
                hospital, 
                departmentName: cleanDepartmentName 
            }
        });
    };

    // Filter departments based on search term
    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
    };

    const goBack = () => {
        navigate(-1);
    };

    if (loading) return <div className="hospital-details__loading">Loading hospital details...</div>;

    return (
        <>
            <Navbar /><br /><br /><br />
            <div className="hospital-details">
                <div className="hospital-details__container">
                    <button 
                        className="hospital-details__back-button"
                        onClick={goBack}
                    >
                        ← Back
                    </button>

                    {hospital && (
                        <>
                            {/* Hero Section with Large Hospital Image */}
                            <div className="hospital-details__hero">
                                <div className="hospital-details__hero-image">
                                    <img 
                                        src={`http://localhost:4000/${hospital.hospitalLogo}`}
                                        alt={hospital.hospitalName}
                                        className="hospital-details__hero-photo"
                                        onError={(e) => {
                                            e.target.src = '/assets/images/default-hospital.png';
                                        }}
                                    />
                                    <div className="hospital-details__hero-overlay">
                                        <div className="hospital-details__hero-content">
                                            <h1 className="hospital-details__hero-title">{hospital.hospitalName}</h1>
                                            <p className="hospital-details__hero-subtitle">Excellence in Healthcare</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hospital Information Card */}
                            <div className="hospital-details__info-card">
                                <div className="hospital-details__info-content">
                                    <div className="hospital-details__info-section">
                                        <h2 className="hospital-details__info-title">Hospital Information</h2>
                                        <div className="hospital-details__contact-info">
                                            <div className="hospital-details__contact-item">
                                                <div className="hospital-details__contact-icon-wrapper">
                                                    <span className="hospital-details__contact-icon">📍</span>
                                                </div>
                                                <div className="hospital-details__contact-details">
                                                    <span className="hospital-details__contact-label">Address</span>
                                                    <span className="hospital-details__contact-value">{hospital.address}</span>
                                                </div>
                                            </div>
                                            <div className="hospital-details__contact-item">
                                                <div className="hospital-details__contact-icon-wrapper">
                                                    <span className="hospital-details__contact-icon">📞</span>
                                                </div>
                                                <div className="hospital-details__contact-details">
                                                    <span className="hospital-details__contact-label">Phone</span>
                                                    <span className="hospital-details__contact-value">{hospital.Phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="hospital-details__departments-section">
                        <div className="hospital-details__departments-header-section">
                            <h2 className="hospital-details__section-title">Medical Departments</h2>
                            
                            {/* Search Bar */}
                            <div className="hospital-details__search-container">
                                <div className="hospital-details__search-wrapper">
                                    <div className="hospital-details__search-input-container">
                                        <span className="hospital-details__search-icon">🔍</span>
                                        <input
                                            type="text"
                                            className="hospital-details__search-input"
                                            placeholder="Search departments..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {searchTerm && (
                                            <button 
                                                className="hospital-details__search-clear"
                                                onClick={clearSearch}
                                                aria-label="Clear search"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Search Results Info */}
                                <div className="hospital-details__search-results">
                                    {searchTerm && (
                                        <span className="hospital-details__results-text">
                                            {filteredDepartments.length} of {departments.length} departments found
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="hospital-details__departments-container">
                            <div className="hospital-details__departments-header">
                                <div className="hospital-details__department-col">Department</div>
                                <div className="hospital-details__description-col">Description</div>
                                <div className="hospital-details__action-col">Actions</div>
                            </div>
                            
                            {filteredDepartments.length === 0 ? (
                                <div className="hospital-details__no-results">
                                    <div className="hospital-details__no-results-icon">🔍</div>
                                    <h3 className="hospital-details__no-results-title">No departments found</h3>
                                    <p className="hospital-details__no-results-text">
                                        {searchTerm ? 
                                            `No departments match "${searchTerm}". Try a different search term.` :
                                            'No departments available at this hospital.'
                                        }
                                    </p>
                                    {searchTerm && (
                                        <button 
                                            className="hospital-details__clear-search-btn"
                                            onClick={clearSearch}
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            ) : (
                                filteredDepartments.map((dept, index) => (
                                    <div 
                                        key={index}
                                        className="hospital-details__department-row"
                                        onClick={() => handleDepartmentClick(dept.name)}
                                    >
                                        <div className="hospital-details__department-info">
                                            <span className="hospital-details__department-icon">{dept.icon}</span>
                                            <span className="hospital-details__department-name">{dept.name}</span>
                                        </div>
                                        <div className="hospital-details__department-description">
                                            {dept.description}
                                        </div>
                                        <div className="hospital-details__department-action">
                                            <button className="hospital-details__view-doctors-btn">
                                                View Doctors →
                                            </button>
                                        </div>
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

export default HospitalDetails;
