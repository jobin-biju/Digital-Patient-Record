import React, { useEffect, useState } from 'react'
import HospitalSidebar from './HospitalSidebar'
import './labEdit.css'
import { useLocation } from 'react-router-dom'

const AVAILABLE_LAB_TYPES = [
    "Pathology",
    "Radiology",
    "Biochemistry",
    "Microbiology",
    "Hematology",
    "Immunology",
    "Molecular Biology",
    "Cardiology Lab"
];

function LabEdit() {
    const [labname, setLabname] = useState('')
    const [registernumber, setRegisternumber] = useState('')
    const [labtype, setLabtype] = useState([]) // MULTIPLE!
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [inchargename, setInchargename] = useState('')
    const [inchargephone, setInchargephone] = useState('')
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id) {
            let labedit = { id: location.state.id };
            fetch('http://localhost:4000/DPR/getLabById', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(labedit)
            })
                .then((res) => res.json())
                .then((data) => {
                    setLabname(data.labname || "")
                    setRegisternumber(data.registernumber || "")
                    setLabtype(Array.isArray(data.labtype) ? data.labtype : (data.labtype ? [data.labtype] : []))
                    setEmail(data.email || data.contactemail || "")
                    setPhone(data.phone || "")
                    setAddress(data.address || "")
                    setInchargename(data.inchargename || "")
                    setInchargephone(data.inchargephone || "")
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [location.state]);

    // Handle checkbox for lab types
    const handleTypeChange = (type) => {
        if (labtype.includes(type)) {
            setLabtype(labtype.filter(t => t !== type));
        } else {
            setLabtype([...labtype, type]);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let labupdate = {
            id: location.state.id,
            labname,
            registernumber,
            labtype,
            email,
            phone,
            address,
            inchargename,
            inchargephone
        };
        fetch('http://localhost:4000/DPR/labUpdate', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(labupdate)
        }).then((res) => res.json())
            .then((data) => {
                console.log("update", data);
                alert("Laboratory Updated Successfully")
                window.history.back()
            })
    }

    return (
        <div className="lab-edit-layout">
            <HospitalSidebar />
            <div className="lab-edit-content">
                <div className="lab-edit-header">
                    <div className="header-left">
                        <h1 className="page-title">Edit Laboratory</h1>
                        <p className="page-subtitle">Update laboratory information in the system</p>
                    </div>
                    <div className="header-actions">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => window.history.back()}
                        >
                            <span className="btn-icon">←</span>
                            Back to Labs
                        </button>
                    </div>
                </div>

                <div className="lab-edit-form-container">
                    <div className="lab-edit-form">
                        <form>
                            {/* Lab Information Section */}
                            <div className="lab-edit-form-section">
                                <h3 className="lab-edit-section-title">Laboratory Information</h3>
                                <div className="lab-edit-form-grid">
                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">Lab Name *</label>
                                        <input
                                            type="text"
                                            className="lab-edit-form-input"
                                            placeholder="Enter laboratory name"
                                            onChange={(e) => setLabname(e.target.value)}
                                            value={labname}
                                        />
                                    </div>

                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">Registration Number *</label>
                                        <input
                                            type="text"
                                            className="lab-edit-form-input"
                                            placeholder="LAB-2023-001"
                                            value={registernumber}
                                            readOnly // Typically registration number should NOT be edited!
                                        />
                                    </div>

                                    <div className="lab-edit-form-group full-width">
                                        <label className="lab-edit-form-label">
                                            Lab Types / Departments * (Select multiple)
                                        </label>
                                        <div className="lab-type-checkbox-group">
                                            {AVAILABLE_LAB_TYPES.map((type) => (
                                                <label key={type} className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={labtype.includes(type)}
                                                        onChange={() => handleTypeChange(type)}
                                                    />
                                                    <span className="checkbox-text">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details Section */}
                            <div className="lab-edit-form-section">
                                <h3 className="lab-edit-section-title">Contact Information</h3>
                                <div className="lab-edit-form-grid">
                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            className="lab-edit-form-input"
                                            placeholder="lab@hospital.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                    </div>

                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className="lab-edit-form-input"
                                            placeholder="+1 (555) 123-4567"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                    </div>

                                    <div className="lab-edit-form-group full-width">
                                        <label className="lab-edit-form-label">Address *</label>
                                        <textarea
                                            className="lab-edit-form-textarea"
                                            rows="3"
                                            placeholder="Enter complete laboratory address"
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Lab In-charge Section */}
                            <div className="lab-edit-form-section">
                                <h3 className="lab-edit-section-title">Lab In-charge Information</h3>
                                <div className="lab-edit-form-grid">
                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">In-charge Name *</label>
                                        <input
                                            type="text"
                                            className="lab-edit-form-input"
                                            placeholder="Dr. John Smith"
                                            onChange={(e) => setInchargename(e.target.value)}
                                            value={inchargename}
                                        />
                                    </div>
                                    <div className="lab-edit-form-group">
                                        <label className="lab-edit-form-label">In-charge Phone *</label>
                                        <input
                                            type="tel"
                                            className="lab-edit-form-input"
                                            placeholder="+1 (555) 987-6543"
                                            onChange={(e) => setInchargephone(e.target.value)}
                                            value={inchargephone}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="lab-edit-form-actions">
                                <button type="button" className="lab-edit-btn lab-edit-btn-secondary" onClick={() => window.history.back()}>
                                    Cancel
                                </button>
                                <button type="submit" className="lab-edit-btn lab-edit-btn-primary" onClick={handleUpdate}>
                                    <span className="btn-icon">✓</span>
                                    Update Laboratory
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LabEdit
