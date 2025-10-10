import React, { useState, useEffect } from 'react'
import HospitalSidebar from './HospitalSidebar'
import { ArrowLeft, User, Mail, Phone, GraduationCap, Award, Building, Clock, Lock, Upload, Check, AlertCircle, Stethoscope, RefreshCw } from 'lucide-react';

function AddDoctor() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [qualification, setQualification] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))
    
    // Validation states
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    // Enhanced unique license number generation
    const generateUniqueLicenseNumber = async (specialization) => {
        setIsGenerating(true)
        
        try {
            // Specialty code mapping
            const specialtyMap = {
                'Cardiology': 'CARD',
                'Neurology': 'NEUR',
                'Pediatrics': 'PED',
                'Orthopedics': 'ORTH',
                'Dermatology': 'DERM',
                'Psychiatry': 'PSY',
                'Emergency Medicine': 'EMER',
                'Internal Medicine': 'INTM',
                'Surgery': 'SURG',
                'Radiology': 'RAD',
                'Cardiothoracic Surgery': 'CTS',
                'Gynecology': 'GYN',
                'Urology': 'URO',
                'Ophthalmology': 'OPH',
                'Anesthesiology': 'ANES'
            };

            const specialtyCode = specialtyMap[specialization] || 'DR';
            const currentYear = new Date().getFullYear();
            
            // Get all existing license numbers from storage
            const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
            
            // Generate unique sequential number
            let counter = 1;
            let newLicense = '';
            let isUnique = false;
            
            while (!isUnique && counter <= 999999) {
                const formattedCounter = counter.toString().padStart(3, '0');
                newLicense = `${specialtyCode}-${currentYear}-${formattedCounter}`;
                
                // Check if license already exists
                if (!existingLicenses.includes(newLicense)) {
                    isUnique = true;
                    // Add to existing licenses
                    existingLicenses.push(newLicense);
                    localStorage.setItem('existing_licenses', JSON.stringify(existingLicenses));
                } else {
                    counter++;
                }
            }
            
            if (!isUnique) {
                throw new Error('Unable to generate unique license number');
            }
            
            // Simulate API call delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return newLicense;
            
        } catch (error) {
            console.error('License generation error:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    };

    // Auto-generate license when specialization changes
    useEffect(() => {
        const autoGenerateLicense = async () => {
            if (specialization && !licenseNumber) {
                try {
                    const newLicense = await generateUniqueLicenseNumber(specialization);
                    setLicenseNumber(newLicense);
                    // Clear any existing error
                    setErrors(prev => ({...prev, licenseNumber: ''}));
                    setTouched(prev => ({...prev, licenseNumber: true}));
                } catch (error) {
                    console.error('Auto-generation failed:', error);
                    setErrors(prev => ({
                        ...prev, 
                        licenseNumber: 'Failed to auto-generate license. Please try manual generation.'
                    }));
                }
            }
        };

        autoGenerateLicense();
    }, [specialization]); // Trigger when specialization changes

    // Handle manual license regeneration
    const handleRegenerateLicense = async () => {
        if (!specialization) {
            alert('Please select a specialization first');
            return;
        }
        
        // Remove current license from storage if exists
        if (licenseNumber) {
            const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
            const updatedLicenses = existingLicenses.filter(license => license !== licenseNumber);
            localStorage.setItem('existing_licenses', JSON.stringify(updatedLicenses));
        }
        
        try {
            const newLicense = await generateUniqueLicenseNumber(specialization);
            setLicenseNumber(newLicense);
            // Clear any existing error
            setErrors(prev => ({...prev, licenseNumber: ''}));
            setTouched(prev => ({...prev, licenseNumber: true}));
        } catch (error) {
            alert('Failed to generate license number. Please try again.');
        }
    };

    // Validation functions (keeping existing ones)
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
    }

    const validatePassword = (password) => {
        return password.length >= 6
    }

    const validateLicenseNumber = (license) => {
        const licenseRegex = /^[A-Z]{2,4}-\d{4}-\d{3,6}$/i
        return licenseRegex.test(license)
    }

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/
        return nameRegex.test(name.trim())
    }

    // Real-time validation
    const validateField = (fieldName, value) => {
        let error = ''
        
        switch (fieldName) {
            case 'name':
                if (!value.trim()) error = 'Full name is required'
                else if (!validateName(value)) error = 'Name must contain only letters and be 2-50 characters'
                break
                
            case 'phone':
                if (!value.trim()) error = 'Phone number is required'
                else if (!validatePhone(value)) error = 'Invalid phone number format'
                break
                
            case 'email':
                if (!value.trim()) error = 'Email address is required'
                else if (!validateEmail(value)) error = 'Invalid email format'
                break
                
            case 'specialization':
                if (!value) error = 'Specialization is required'
                break
                
            case 'qualification':
                if (!value.trim()) error = 'Qualification is required'
                else if (value.trim().length < 2) error = 'Qualification must be at least 2 characters'
                break
                
            case 'licenseNumber':
                if (!value.trim()) error = 'License number is required'
                else if (!validateLicenseNumber(value)) error = 'Invalid license format'
                break
                
            case 'department':
                if (!value) error = 'Department is required'
                break
                
            case 'yearsOfExperience':
                if (!value) error = 'Years of experience is required'
                else if (value < 0 || value > 50) error = 'Experience must be between 0-50 years'
                break
                
            case 'password':
                if (!value) error = 'Password is required'
                else if (!validatePassword(value)) error = 'Password must be at least 6 characters'
                break
                
            case 'profileImage':
                if (value && value.size > 5 * 1024 * 1024) error = 'Image must be less than 5MB'
                else if (value && !['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)) {
                    error = 'Only JPEG, JPG, and PNG images are allowed'
                }
                break
                
            default:
                break
        }
        
        return error
    }

    // Handle field blur for validation
    const handleBlur = (fieldName) => {
        setTouched(prev => ({
            ...prev,
            [fieldName]: true
        }))
        
        const fieldValue = getFieldValue(fieldName)
        const error = validateField(fieldName, fieldValue)
        
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }))
    }

    // Get field value by name
    const getFieldValue = (fieldName) => {
        const fieldMap = {
            name,
            phone,
            email,
            specialization,
            qualification,
            licenseNumber,
            department,
            yearsOfExperience,
            password,
            profileImage
        }
        return fieldMap[fieldName]
    }

    // Handle input change with validation
    const handleInputChange = (fieldName, value, setter) => {
        setter(value)
        
        if (touched[fieldName]) {
            const error = validateField(fieldName, value)
            setErrors(prev => ({
                ...prev,
                [fieldName]: error
            }))
        }
    }

    // Handle specialization change
    const handleSpecializationChange = (value) => {
        // Remove current license from storage if changing specialization
        if (licenseNumber && value !== specialization) {
            const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
            const updatedLicenses = existingLicenses.filter(license => license !== licenseNumber);
            localStorage.setItem('existing_licenses', JSON.stringify(updatedLicenses));
            setLicenseNumber(''); // Clear current license
        }
        
        handleInputChange('specialization', value, setSpecialization);
    };

    // Validate all fields
    const validateAllFields = () => {
        const fields = [
            'name', 'phone', 'email', 'specialization', 'qualification', 
            'licenseNumber', 'department', 'yearsOfExperience', 'password'
        ]
        
        const newErrors = {}
        let isValid = true
        
        fields.forEach(field => {
            const value = getFieldValue(field)
            const error = validateField(field, value)
            if (error) {
                newErrors[field] = error
                isValid = false
            }
        })
        
        if (profileImage) {
            const imageError = validateField('profileImage', profileImage)
            if (imageError) {
                newErrors.profileImage = imageError
                isValid = false
            }
        }
        
        setErrors(newErrors)
        return isValid
    }

    const handleDoctor = async () => {
        const allFields = {
            name: true,
            phone: true,
            email: true,
            specialization: true,
            qualification: true,
            licenseNumber: true,
            department: true,
            yearsOfExperience: true,
            password: true,
            profileImage: true
        }
        setTouched(allFields)

        if (!validateAllFields()) {
            alert('Please fix all validation errors before submitting')
            return
        }

        setIsSubmitting(true)

        try {
            let formData = new FormData()
            formData.append('name', name.trim())
            formData.append('phone', phone.trim())
            formData.append('specialization', specialization)
            formData.append('qualification', qualification.trim())
            formData.append('licenseNumber', licenseNumber.trim().toUpperCase())
            formData.append('department', department)
            formData.append('yearsOfExperience', yearsOfExperience)
            if (profileImage) formData.append('profileImage', profileImage)
            formData.append('email', email.trim().toLowerCase())
            formData.append('password', password)
            formData.append('hospitalId', auth.loginId)

            const response = await fetch('http://localhost:4000/DPR/addDoctor', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            console.log(data)

            if (response.ok) {
                alert('Doctor added successfully!')
                handleReset()
            } else {
                // If submission fails, remove the license from storage to allow reuse
                const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
                const updatedLicenses = existingLicenses.filter(license => license !== licenseNumber);
                localStorage.setItem('existing_licenses', JSON.stringify(updatedLicenses));
                
                alert(`Error: ${data.error || 'Failed to add doctor'}`)
            }
        } catch (error) {
            console.error('Error:', error)
            // If submission fails, remove the license from storage to allow reuse
            const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
            const updatedLicenses = existingLicenses.filter(license => license !== licenseNumber);
            localStorage.setItem('existing_licenses', JSON.stringify(updatedLicenses));
            
            alert('Network error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        // Remove current license from storage if form is reset
        if (licenseNumber) {
            const existingLicenses = JSON.parse(localStorage.getItem('existing_licenses') || '[]');
            const updatedLicenses = existingLicenses.filter(license => license !== licenseNumber);
            localStorage.setItem('existing_licenses', JSON.stringify(updatedLicenses));
        }
        
        setName('')
        setPhone('')
        setSpecialization('')
        setQualification('')
        setLicenseNumber('')
        setDepartment('')
        setYearsOfExperience('')
        setProfileImage(null)
        setEmail('')
        setPassword('')
        setErrors({})
        setTouched({})
        
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const error = validateField('profileImage', file)
            if (error) {
                setErrors(prev => ({
                    ...prev,
                    profileImage: error
                }))
                e.target.value = ''
                setProfileImage(null)
                return
            }
            setProfileImage(file)
            setErrors(prev => ({
                ...prev,
                profileImage: ''
            }))
        }
    }

    // Professional Hospital Theme Styles (keeping existing styles)
    const layoutContainerStyles = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const mainContentStyles = {
        marginLeft: '280px',
        width: 'calc(100% - 280px)',
        minHeight: '100vh',
        padding: '0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    };

    const headerStyles = {
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2rem 3rem',
        color: 'white',
        boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
    };

    const headerContentStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const headerLeftStyles = {
        flex: 1
    };

    const pageTitleStyles = {
        fontSize: '2.5rem',
        fontWeight: '700',
        margin: '0 0 0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };

    const pageSubtitleStyles = {
        fontSize: '1.1rem',
        opacity: 0.9,
        margin: 0
    };

    const backButtonStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    };

    const formContainerStyles = {
        padding: '3rem',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const formCardStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
    };

    const sectionStyles = {
        padding: '2.5rem',
        borderBottom: '1px solid #f1f5f9'
    };

    const sectionTitleStyles = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 2rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    };

    const profileUploadStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
    };

    const profileImageContainerStyles = {
        position: 'relative'
    };

    const profilePlaceholderStyles = {
        width: '120px',
        height: '120px',
        borderRadius: '20px',
        backgroundColor: '#f8fafc',
        border: '3px dashed #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    const profilePreviewStyles = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    };

    const placeholderIconStyles = {
        width: '40px',
        height: '40px',
        color: '#94a3b8'
    };

    const uploadInfoStyles = {
        flex: 1
    };

    const uploadButtonStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#1e40af',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        marginBottom: '1rem'
    };

    const fileInputStyles = {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer'
    };

    const formGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    };

    const formGroupStyles = {
        display: 'flex',
        flexDirection: 'column'
    };

    const fullWidthGroupStyles = {
        ...formGroupStyles,
        gridColumn: '1 / -1'
    };

    const labelStyles = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const inputStyles = {
        padding: '0.875rem 1rem',
        fontSize: '0.95rem',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: 'white',
        fontFamily: 'inherit'
    };

    const readOnlyInputStyles = {
        ...inputStyles,
        backgroundColor: '#f8fafc',
        color: '#374151',
        cursor: 'default',
        userSelect: 'none'
    };

    const generatingInputStyles = {
        ...readOnlyInputStyles,
        backgroundColor: '#fef3c7',
        borderColor: '#f59e0b'
    };

    const inputFocusStyles = {
        ...inputStyles,
        borderColor: '#1e40af',
        boxShadow: '0 0 0 3px rgba(30, 64, 175, 0.1)'
    };

    const inputErrorStyles = {
        ...inputStyles,
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2'
    };

    const selectStyles = {
        ...inputStyles,
        cursor: 'pointer',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.75rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '3rem',
        appearance: 'none'
    };

    const errorMessageStyles = {
        color: '#ef4444',
        fontSize: '0.8rem',
        marginTop: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    };

    const formHintStyles = {
        fontSize: '0.8rem',
        color: '#6b7280',
        marginTop: '0.5rem'
    };

    const successHintStyles = {
        ...formHintStyles,
        color: '#059669'
    };

    const generatingHintStyles = {
        ...formHintStyles,
        color: '#f59e0b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    };

    const formActionsStyles = {
        padding: '2.5rem',
        backgroundColor: '#f8fafc',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end'
    };

    const buttonStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.875rem 2rem',
        fontSize: '0.9rem',
        fontWeight: '600',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        minWidth: '120px',
        justifyContent: 'center'
    };

    const secondaryButtonStyles = {
        ...buttonStyles,
        backgroundColor: 'white',
        color: '#6b7280',
        border: '2px solid #e2e8f0'
    };

    const primaryButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#1e40af',
        color: 'white',
        boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
    };

    const disabledButtonStyles = {
        ...primaryButtonStyles,
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed',
        boxShadow: 'none'
    };

    const regenerateButtonStyles = {
        padding: '0.875rem 1.25rem',
        backgroundColor: '#f59e0b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const regenerateButtonDisabledStyles = {
        ...regenerateButtonStyles,
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed'
    };

    const spinnerStyles = {
        width: '18px',
        height: '18px',
        border: '2px solid transparent',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const smallSpinnerStyles = {
        width: '14px',
        height: '14px',
        border: '2px solid transparent',
        borderTop: '2px solid currentColor',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const keyframesStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <style>{keyframesStyles}</style>
            <div style={layoutContainerStyles}>
                <HospitalSidebar />
                <div style={mainContentStyles}>
                    {/* Professional Header */}
                    <div style={headerStyles}>
                        <div style={headerContentStyles}>
                            <div style={headerLeftStyles}>
                                <h1 style={pageTitleStyles}>
                                    <Stethoscope size={36} />
                                    Add New Doctor
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Register a new medical professional to your healthcare facility
                                </p>
                            </div>
                            <button 
                                style={backButtonStyles}
                                onClick={() => window.history.back()}
                                disabled={isSubmitting}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                }}
                            >
                                <ArrowLeft size={16} />
                                Back to Doctors
                            </button>
                        </div>
                    </div>
                    
                    <div style={formContainerStyles}>
                        <div style={formCardStyles}>
                            {/* Profile Image Section */}
                            <div style={sectionStyles}>
                                <h3 style={sectionTitleStyles}>
                                    <User size={20} />
                                    Profile Information
                                </h3>
                                <div style={profileUploadStyles}>
                                    <div style={profileImageContainerStyles}>
                                        <div style={profilePlaceholderStyles}>
                                            {profileImage ? (
                                                <img 
                                                    src={URL.createObjectURL(profileImage)} 
                                                    alt="Profile Preview" 
                                                    style={profilePreviewStyles}
                                                />
                                            ) : (
                                                <User style={placeholderIconStyles} />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            id="profileImage"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={fileInputStyles}
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div style={uploadInfoStyles}>
                                        <label htmlFor="profileImage" style={uploadButtonStyles}>
                                            <Upload size={16} />
                                            Choose Photo
                                        </label>
                                        {errors.profileImage && touched.profileImage && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.profileImage}
                                            </div>
                                        )}
                                        <div style={formHintStyles}>
                                            Maximum file size: 5MB. Supported formats: JPG, JPEG, PNG
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div style={sectionStyles}>
                                <h3 style={sectionTitleStyles}>
                                    <User size={20} />
                                    Personal Information
                                </h3>
                                <div style={formGridStyles}>
                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <User size={16} />
                                            Full Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            style={errors.name && touched.name ? inputErrorStyles : inputStyles}
                                            value={name}
                                            onChange={(e) => handleInputChange('name', e.target.value, setName)}
                                            onBlur={() => handleBlur('name')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="Enter doctor's full name"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && touched.name && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Phone size={16} />
                                            Phone Number *
                                        </label>
                                        <input 
                                            type="tel" 
                                            style={errors.phone && touched.phone ? inputErrorStyles : inputStyles}
                                            value={phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value, setPhone)}
                                            onBlur={() => handleBlur('phone')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="+1 (555) 123-4567"
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && touched.phone && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div style={fullWidthGroupStyles}>
                                        <label style={labelStyles}>
                                            <Mail size={16} />
                                            Email Address *
                                        </label>
                                        <input 
                                            type="email" 
                                            style={errors.email && touched.email ? inputErrorStyles : inputStyles}
                                            value={email}
                                            onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
                                            onBlur={() => handleBlur('email')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="doctor@hospital.com"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && touched.email && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div style={sectionStyles}>
                                <h3 style={sectionTitleStyles}>
                                    <GraduationCap size={20} />
                                    Professional Information
                                </h3>
                                <div style={formGridStyles}>
                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Stethoscope size={16} />
                                            Specialization *
                                        </label>
                                        <select 
                                            style={errors.specialization && touched.specialization ? {...selectStyles, borderColor: '#ef4444'} : selectStyles}
                                            value={specialization}
                                            onChange={(e) => handleSpecializationChange(e.target.value)}
                                            onBlur={() => handleBlur('specialization')}
                                            disabled={isSubmitting}
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
                                        {errors.specialization && touched.specialization && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.specialization}
                                            </div>
                                        )}
                                    </div>

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <GraduationCap size={16} />
                                            Qualification *
                                        </label>
                                        <input 
                                            type="text" 
                                            style={errors.qualification && touched.qualification ? inputErrorStyles : inputStyles}
                                            value={qualification}
                                            onChange={(e) => handleInputChange('qualification', e.target.value, setQualification)}
                                            onBlur={() => handleBlur('qualification')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="MD, FACC, etc."
                                            disabled={isSubmitting}
                                        />
                                        {errors.qualification && touched.qualification && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.qualification}
                                            </div>
                                        )}
                                    </div>

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Award size={16} />
                                            License Number *
                                        </label>
                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <input 
                                                type="text" 
                                                style={{
                                                    ...(isGenerating ? generatingInputStyles : readOnlyInputStyles),
                                                    flex: 1,
                                                    ...(errors.licenseNumber && touched.licenseNumber ? {borderColor: '#ef4444', backgroundColor: '#fef2f2'} : {})
                                                }}
                                                value={licenseNumber}
                                                placeholder={isGenerating ? "Generating unique license..." : "Auto-generated when specialization is selected"}
                                                readOnly
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                style={isSubmitting || isGenerating ? regenerateButtonDisabledStyles : regenerateButtonStyles}
                                                onClick={handleRegenerateLicense}
                                                disabled={isSubmitting || isGenerating}
                                                onMouseOver={(e) => {
                                                    if (!isSubmitting && !isGenerating) {
                                                        e.target.style.backgroundColor = '#d97706';
                                                    }
                                                }}
                                                onMouseOut={(e) => {
                                                    if (!isSubmitting && !isGenerating) {
                                                        e.target.style.backgroundColor = '#f59e0b';
                                                    }
                                                }}
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <div style={spinnerStyles}></div>
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <RefreshCw size={16} />
                                                        Regenerate
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {errors.licenseNumber && touched.licenseNumber && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.licenseNumber}
                                            </div>
                                        )}
                                        <div style={isGenerating ? generatingHintStyles : (licenseNumber ? successHintStyles : formHintStyles)}>
                                            {isGenerating ? (
                                                <>
                                                    <div style={smallSpinnerStyles}></div>
                                                    Auto-generating unique license number...
                                                </>
                                            ) : licenseNumber ? (
                                                `✓ Auto-generated unique license: ${licenseNumber}`
                                            ) : (
                                                'License will be auto-generated when specialization is selected'
                                            )}
                                        </div>
                                    </div>

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Building size={16} />
                                            Department *
                                        </label>
                                        <select 
                                            style={errors.department && touched.department ? {...selectStyles, borderColor: '#ef4444'} : selectStyles}
                                            value={department}
                                            onChange={(e) => handleInputChange('department', e.target.value, setDepartment)}
                                            onBlur={() => handleBlur('department')}
                                            disabled={isSubmitting}
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
                                        {errors.department && touched.department && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.department}
                                            </div>
                                        )}
                                    </div>

                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Clock size={16} />
                                            Years of Experience *
                                        </label>
                                        <input 
                                            type="number" 
                                            style={errors.yearsOfExperience && touched.yearsOfExperience ? inputErrorStyles : inputStyles}
                                            value={yearsOfExperience}
                                            onChange={(e) => handleInputChange('yearsOfExperience', e.target.value, setYearsOfExperience)}
                                            onBlur={() => handleBlur('yearsOfExperience')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="5"
                                            min="0"
                                            max="50"
                                            disabled={isSubmitting}
                                        />
                                        {errors.yearsOfExperience && touched.yearsOfExperience && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.yearsOfExperience}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Security Information */}
                            <div style={sectionStyles}>
                                <h3 style={sectionTitleStyles}>
                                    <Lock size={20} />
                                    Security Information
                                </h3>
                                <div style={formGridStyles}>
                                    <div style={formGroupStyles}>
                                        <label style={labelStyles}>
                                            <Lock size={16} />
                                            Password *
                                        </label>
                                        <input 
                                            type="password" 
                                            style={errors.password && touched.password ? inputErrorStyles : inputStyles}
                                            value={password}
                                            onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
                                            onBlur={() => handleBlur('password')}
                                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                            placeholder="Enter secure password"
                                            disabled={isSubmitting}
                                        />
                                        {errors.password && touched.password && (
                                            <div style={errorMessageStyles}>
                                                <AlertCircle size={14} />
                                                {errors.password}
                                            </div>
                                        )}
                                        <div style={formHintStyles}>
                                            Password must be at least 6 characters long
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div style={formActionsStyles}>
                                <button 
                                    type="button"
                                    style={secondaryButtonStyles}
                                    onClick={handleReset}
                                    disabled={isSubmitting}
                                    onMouseOver={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.borderColor = '#cbd5e1';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.borderColor = '#e2e8f0';
                                        }
                                    }}
                                >
                                    Reset Form
                                </button>
                                <button 
                                    type="button" 
                                    style={isSubmitting ? disabledButtonStyles : primaryButtonStyles}
                                    onClick={handleDoctor}
                                    disabled={isSubmitting}
                                    onMouseOver={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = '#1e3a8a';
                                            e.target.style.transform = 'translateY(-1px)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = '#1e40af';
                                            e.target.style.transform = 'translateY(0px)';
                                        }
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div style={spinnerStyles}></div>
                                            Adding Doctor...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={16} />
                                            Add Doctor
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDoctor
