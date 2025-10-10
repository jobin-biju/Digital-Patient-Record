import React, { useState, useEffect } from 'react'
import HospitalSidebar from './HospitalSidebar'
import './addLab.css'

function AddLab() {
    const [labname, setLabname] = useState('')
    const [registernumber, setRegisternumber] = useState('')
    const [labtype, setLabtype] = useState([]) // Changed to array for multiple selection
    const [contactemail, setContactemail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [inchargename, setLabinchargename] = useState('')
    const [inchargeemail, setLabinchargeemail] = useState('')
    const [inchargephone, setLabinchargephone] = useState('')
    const [password, setPassword] = useState('')
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))
    
    // Validation states
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [touched, setTouched] = useState({})

    // Available lab types
    const availableLabTypes = [
        'Pathology',
        'Radiology', 
        'Biochemistry',
        'Microbiology',
        'Hematology',
        'Immunology',
        'Molecular Biology',
        'Cardiology Lab'
    ];

    // Enhanced unique registration number generation
    const generateUniqueRegistrationNumber = async (labTypes) => {
        setIsGenerating(true)
        
        try {
            // Lab type code mapping
            const labTypeMap = {
                'Pathology': 'PATH',
                'Radiology': 'RAD',
                'Biochemistry': 'BIOC',
                'Microbiology': 'MICRO',
                'Hematology': 'HEMA',
                'Immunology': 'IMMU',
                'Molecular Biology': 'MOLB',
                'Cardiology Lab': 'CARD'
            };

            // Create combined lab code from multiple types
            let labCode;
            if (labTypes.length === 1) {
                labCode = labTypeMap[labTypes[0]] || 'LAB';
            } else if (labTypes.length <= 3) {
                // For 2-3 types, combine first letters
                labCode = labTypes.map(type => labTypeMap[type]?.charAt(0) || 'L').join('');
            } else {
                // For more than 3 types, use MULTI
                labCode = 'MULTI';
            }

            const currentYear = new Date().getFullYear();
            
            // Get all existing registration numbers from storage
            const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
            
            // Generate unique sequential number
            let counter = 1;
            let newRegistration = '';
            let isUnique = false;
            
            while (!isUnique && counter <= 999999) {
                const formattedCounter = counter.toString().padStart(3, '0');
                newRegistration = `${labCode}-${currentYear}-${formattedCounter}`;
                
                // Check if registration already exists
                if (!existingRegistrations.includes(newRegistration)) {
                    isUnique = true;
                    // Add to existing registrations
                    existingRegistrations.push(newRegistration);
                    localStorage.setItem('existing_lab_registrations', JSON.stringify(existingRegistrations));
                } else {
                    counter++;
                }
            }
            
            if (!isUnique) {
                throw new Error('Unable to generate unique registration number');
            }
            
            // Simulate API call delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return newRegistration;
            
        } catch (error) {
            console.error('Registration generation error:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    };

    // Auto-generate registration when lab types change
    useEffect(() => {
        const autoGenerateRegistration = async () => {
            if (labtype.length > 0 && !registernumber) {
                try {
                    const newRegistration = await generateUniqueRegistrationNumber(labtype);
                    setRegisternumber(newRegistration);
                    // Clear any existing error
                    setErrors(prev => ({...prev, registernumber: ''}));
                    setTouched(prev => ({...prev, registernumber: true}));
                } catch (error) {
                    console.error('Auto-generation failed:', error);
                    setErrors(prev => ({
                        ...prev, 
                        registernumber: 'Failed to auto-generate registration. Please try manual generation.'
                    }));
                }
            }
        };

        autoGenerateRegistration();
    }, [labtype]); // Trigger when lab types change

    // Handle lab type selection (multiple)
    const handleLabTypeChange = (selectedType) => {
        // Remove current registration from storage if changing lab types
        if (registernumber) {
            const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
            const updatedRegistrations = existingRegistrations.filter(reg => reg !== registernumber);
            localStorage.setItem('existing_lab_registrations', JSON.stringify(updatedRegistrations));
            setRegisternumber(''); // Clear current registration
        }

        let newLabTypes;
        if (labtype.includes(selectedType)) {
            // Remove if already selected
            newLabTypes = labtype.filter(type => type !== selectedType);
        } else {
            // Add if not selected
            newLabTypes = [...labtype, selectedType];
        }
        
        setLabtype(newLabTypes);
        
        // Update validation if touched
        if (touched.labtype) {
            const error = validateField('labtype', newLabTypes);
            setErrors(prev => ({
                ...prev,
                labtype: error
            }));
        }
    };

    // Remove lab type
    const removeLabType = (typeToRemove) => {
        const newLabTypes = labtype.filter(type => type !== typeToRemove);
        handleLabTypeChange(typeToRemove); // This will handle the removal logic
    };

    // Handle manual registration regeneration
    const handleRegenerateRegistration = async () => {
        if (labtype.length === 0) {
            alert('Please select at least one lab type first');
            return;
        }
        
        // Remove current registration from storage if exists
        if (registernumber) {
            const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
            const updatedRegistrations = existingRegistrations.filter(reg => reg !== registernumber);
            localStorage.setItem('existing_lab_registrations', JSON.stringify(updatedRegistrations));
        }
        
        try {
            const newRegistration = await generateUniqueRegistrationNumber(labtype);
            setRegisternumber(newRegistration);
            // Clear any existing error
            setErrors(prev => ({...prev, registernumber: ''}));
            setTouched(prev => ({...prev, registernumber: true}));
        } catch (error) {
            alert('Failed to generate registration number. Please try again.');
        }
    };

    // Validation functions
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

    const validateRegistrationNumber = (regNumber) => {
        const regNumberRegex = /^[A-Z0-9]{2,6}-\d{4}-\d{3,6}$/i
        return regNumberRegex.test(regNumber)
    }

    // Real-time validation
    const validateField = (fieldName, value) => {
        let error = ''
        
        switch (fieldName) {
            case 'labname':
                if (!value.trim()) error = 'Lab name is required'
                else if (value.trim().length < 3) error = 'Lab name must be at least 3 characters'
                else if (value.trim().length > 100) error = 'Lab name must not exceed 100 characters'
                break
                
            case 'registernumber':
                if (!value.trim()) error = 'Registration number is required'
                else if (!validateRegistrationNumber(value)) error = 'Invalid registration number format'
                break
                
            case 'labtype':
                if (!value || value.length === 0) error = 'At least one lab type is required'
                else if (value.length > 5) error = 'Maximum 5 lab types allowed'
                break
                
            case 'contactemail':
                if (!value.trim()) error = 'Email is required'
                else if (!validateEmail(value)) error = 'Invalid email format'
                break
                
            case 'phone':
                if (!value.trim()) error = 'Phone number is required'
                else if (!validatePhone(value)) error = 'Invalid phone number format'
                break
                
            case 'address':
                if (!value.trim()) error = 'Address is required'
                else if (value.trim().length < 10) error = 'Address must be at least 10 characters'
                break
                
            case 'inchargename':
                if (!value.trim()) error = 'In-charge name is required'
                else if (value.trim().length < 2) error = 'Name must be at least 2 characters'
                break
                
            case 'inchargeemail':
                if (!value.trim()) error = 'In-charge email is required'
                else if (!validateEmail(value)) error = 'Invalid email format'
                break
                
            case 'inchargephone':
                if (!value.trim()) error = 'In-charge phone is required'
                else if (!validatePhone(value)) error = 'Invalid phone number format'
                break
                
            case 'password':
                if (!value) error = 'Password is required'
                else if (!validatePassword(value)) error = 'Password must be at least 6 characters'
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
            labname,
            registernumber,
            labtype,
            contactemail,
            phone,
            address,
            inchargename,
            inchargeemail,
            inchargephone,
            password
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

    // Validate all fields
    const validateAllFields = () => {
        const fields = [
            'labname', 'registernumber', 'labtype', 'contactemail', 
            'phone', 'address', 'inchargename', 'inchargeemail', 
            'inchargephone', 'password'
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
        
        setErrors(newErrors)
        return isValid
    }

    // Reset form
    const handleReset = () => {
        // Remove current registration from storage if form is reset
        if (registernumber) {
            const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
            const updatedRegistrations = existingRegistrations.filter(reg => reg !== registernumber);
            localStorage.setItem('existing_lab_registrations', JSON.stringify(updatedRegistrations));
        }
        
        setLabname('')
        setRegisternumber('')
        setLabtype([])
        setContactemail('')
        setPhone('')
        setAddress('')
        setLabinchargename('')
        setLabinchargeemail('')
        setLabinchargephone('')
        setPassword('')
        setErrors({})
        setTouched({})
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Mark all fields as touched
        const allFields = {
            labname: true,
            registernumber: true,
            labtype: true,
            contactemail: true,
            phone: true,
            address: true,
            inchargename: true,
            inchargeemail: true,
            inchargephone: true,
            password: true
        }
        setTouched(allFields)
        
        // Validate all fields
        if (!validateAllFields()) {
            alert('Please fix all validation errors before submitting')
            return
        }
        
        setIsSubmitting(true)
        
        try {
            let labData = {
                labname: labname.trim(),
                registernumber: registernumber.trim(),
                labtype: labtype, // Send as array
                email: contactemail.trim().toLowerCase(),
                phone: phone.trim(),
                address: address.trim(),
                inchargename: inchargename.trim(),
                inchargeemail: inchargeemail.trim().toLowerCase(),
                inchargephone: inchargephone.trim(),
                password: password,
                hospitalId: auth.loginId
            }
            
            const response = await fetch('http://localhost:4000/DPR/addLab', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(labData)
            })
            
            const data = await response.json()
            console.log(data)
            
            if (response.ok) {
                alert("Lab added successfully!")
                handleReset()
            } else {
                // If submission fails, remove the registration from storage to allow reuse
                const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
                const updatedRegistrations = existingRegistrations.filter(reg => reg !== registernumber);
                localStorage.setItem('existing_lab_registrations', JSON.stringify(updatedRegistrations));
                
                alert(`Error: ${data.error || 'Failed to add lab'}`)
            }
        } catch (error) {
            console.error('Error:', error)
            // If submission fails, remove the registration from storage to allow reuse
            const existingRegistrations = JSON.parse(localStorage.getItem('existing_lab_registrations') || '[]');
            const updatedRegistrations = existingRegistrations.filter(reg => reg !== registernumber);
            localStorage.setItem('existing_lab_registrations', JSON.stringify(updatedRegistrations));
            
            alert('Network error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="hospital-layout">
            <HospitalSidebar />
            <div className="main-content">
                <div className="content-header">
                    <div className="header-left">
                        <h1 className="page-title">Add New Lab</h1>
                        <p className="page-subtitle">Register a new laboratory in the system</p>
                    </div>
                    <div className="header-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => window.history.back()}
                            disabled={isSubmitting}
                        >
                            <span className="btn-icon">←</span>
                            Back to Labs
                        </button>
                    </div>
                </div>
                
                <div className="form-container">
                    <div className="lab-form">
                        <form onSubmit={handleSubmit}>
                            {/* Lab Information Section */}
                            <div className="form-section">
                                <h3 className="section-title">Laboratory Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Lab Name *</label>
                                        <input 
                                            type="text" 
                                            className={`form-input ${errors.labname && touched.labname ? 'error' : ''}`}
                                            placeholder="Enter laboratory name"
                                            value={labname}
                                            onChange={(e) => handleInputChange('labname', e.target.value, setLabname)}
                                            onBlur={() => handleBlur('labname')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.labname && touched.labname && (
                                            <span className="error-message">{errors.labname}</span>
                                        )}
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">Lab Types / Departments * (Select multiple)</label>
                                        
                                        {/* Selected Lab Types Display */}
                                        {labtype.length > 0 && (
                                            <div className="selected-types">
                                                {labtype.map((type, index) => (
                                                    <span key={index} className="type-tag">
                                                        {type}
                                                        <button
                                                            type="button"
                                                            className="remove-type"
                                                            onClick={() => removeLabType(type)}
                                                            disabled={isSubmitting}
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Lab Type Selection */}
                                        <div className="lab-type-selection">
                                            {availableLabTypes.map((type) => (
                                                <label key={type} className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={labtype.includes(type)}
                                                        onChange={() => handleLabTypeChange(type)}
                                                        disabled={isSubmitting || (labtype.length >= 5 && !labtype.includes(type))}
                                                    />
                                                    <span className="checkbox-text">{type}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {errors.labtype && touched.labtype && (
                                            <span className="error-message">{errors.labtype}</span>
                                        )}
                                        <small className="form-hint">
                                            Select 1-5 lab types. Selected: {labtype.length}/5
                                        </small>
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">Registration Number *</label>
                                        <div className="input-with-button">
                                            <input 
                                                type="text" 
                                                className={`form-input registration-input ${errors.registernumber && touched.registernumber ? 'error' : ''} ${isGenerating ? 'generating' : ''}`}
                                                placeholder={isGenerating ? "Generating unique registration..." : "Auto-generated when lab types are selected"}
                                                value={registernumber}
                                                readOnly
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className={`btn btn-regenerate ${isSubmitting || isGenerating ? 'disabled' : ''}`}
                                                onClick={handleRegenerateRegistration}
                                                disabled={isSubmitting || isGenerating}
                                                title="Regenerate registration number"
                                            >
                                                {isGenerating ? (
                                                    <span className="btn-icon spinning">⟳</span>
                                                ) : (
                                                    <span className="btn-icon">⟳</span>
                                                )}
                                                Regenerate
                                            </button>
                                        </div>
                                        {errors.registernumber && touched.registernumber && (
                                            <span className="error-message">{errors.registernumber}</span>
                                        )}
                                        <small className={`form-hint ${isGenerating ? 'generating' : (registernumber ? 'success' : '')}`}>
                                            {isGenerating ? (
                                                '⏳ Auto-generating unique registration number...'
                                            ) : registernumber ? (
                                                `✓ Auto-generated unique registration: ${registernumber}`
                                            ) : (
                                                'Registration will be auto-generated when lab types are selected'
                                            )}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details Section */}
                            <div className="form-section">
                                <h3 className="section-title">Contact Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input 
                                            type="email" 
                                            className={`form-input ${errors.contactemail && touched.contactemail ? 'error' : ''}`}
                                            placeholder="lab@hospital.com"
                                            value={contactemail}
                                            onChange={(e) => handleInputChange('contactemail', e.target.value, setContactemail)}
                                            onBlur={() => handleBlur('contactemail')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.contactemail && touched.contactemail && (
                                            <span className="error-message">{errors.contactemail}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number *</label>
                                        <input 
                                            type="tel" 
                                            className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                                            placeholder="+1 (555) 123-4567"
                                            value={phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value, setPhone)}
                                            onBlur={() => handleBlur('phone')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && touched.phone && (
                                            <span className="error-message">{errors.phone}</span>
                                        )}
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">Address *</label>
                                        <textarea 
                                            className={`form-textarea ${errors.address && touched.address ? 'error' : ''}`}
                                            rows="3"
                                            placeholder="Enter complete laboratory address"
                                            value={address}
                                            onChange={(e) => handleInputChange('address', e.target.value, setAddress)}
                                            onBlur={() => handleBlur('address')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.address && touched.address && (
                                            <span className="error-message">{errors.address}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Lab In-charge Section */}
                            <div className="form-section">
                                <h3 className="section-title">Lab In-charge Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">In-charge Name *</label>
                                        <input 
                                            type="text" 
                                            className={`form-input ${errors.inchargename && touched.inchargename ? 'error' : ''}`}
                                            placeholder="Dr. John Smith"
                                            value={inchargename}
                                            onChange={(e) => handleInputChange('inchargename', e.target.value, setLabinchargename)}
                                            onBlur={() => handleBlur('inchargename')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.inchargename && touched.inchargename && (
                                            <span className="error-message">{errors.inchargename}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">In-charge Email *</label>
                                        <input 
                                            type="email" 
                                            className={`form-input ${errors.inchargeemail && touched.inchargeemail ? 'error' : ''}`}
                                            placeholder="incharge@hospital.com"
                                            value={inchargeemail}
                                            onChange={(e) => handleInputChange('inchargeemail', e.target.value, setLabinchargeemail)}
                                            onBlur={() => handleBlur('inchargeemail')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.inchargeemail && touched.inchargeemail && (
                                            <span className="error-message">{errors.inchargeemail}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">In-charge Phone *</label>
                                        <input 
                                            type="tel" 
                                            className={`form-input ${errors.inchargephone && touched.inchargephone ? 'error' : ''}`}
                                            placeholder="+1 (555) 987-6543"
                                            value={inchargephone}
                                            onChange={(e) => handleInputChange('inchargephone', e.target.value, setLabinchargephone)}
                                            onBlur={() => handleBlur('inchargephone')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.inchargephone && touched.inchargephone && (
                                            <span className="error-message">{errors.inchargephone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* System Access Section */}
                            <div className="form-section">
                                <h3 className="section-title">System Access</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Password (for Lab Login) *</label>
                                        <input 
                                            type="password" 
                                            className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                                            placeholder="Enter secure password"
                                            value={password}
                                            onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
                                            onBlur={() => handleBlur('password')}
                                            disabled={isSubmitting}
                                        />
                                        {errors.password && touched.password && (
                                            <span className="error-message">{errors.password}</span>
                                        )}
                                        <small className="form-hint">Password must be at least 6 characters long</small>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={handleReset}
                                    disabled={isSubmitting}
                                >
                                    Reset Form
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    <span className="btn-icon">
                                        {isSubmitting ? '⏳' : '+'}
                                    </span>
                                    {isSubmitting ? 'Adding Lab...' : 'Add Laboratory'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLab
