import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import your navbar component
import './BookAppointment.css';

function BookAppointment() {
    const { doctorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor, hospital, department } = location.state || {};

    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        appointmentDate: '',
        appointmentTime: '',
        symptoms: '',
        previousVisit: 'no',
        emergencyContact: '',
        insuranceProvider: '',
        bloodGroup: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [doctorSchedule, setDoctorSchedule] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem("yourstorage");
        if (userData) {
            const parsed = JSON.parse(userData);
            setUserId(parsed.loginId);

            // Fetch patient profile from server
            fetch('http://localhost:4000/DPR/patient-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId: parsed.loginId, email: parsed.email })
            })
            .then(res => res.json())
            .then(result => {
                if (result.success && result.data) {
                    setFormData(prev => ({
                        ...prev,
                        patientName: result.data.name || "",
                        patientEmail: result.data.email || "",
                        patientPhone: result.data.phone || "",
                        emergencyContact: result.data.emergencyContact?.phone || "",
                        bloodGroup: result.data.bloodType || "",
                        insuranceProvider: result.data.insurance || ""
                    }));
                }
            })
            .catch(err => {
                console.error("Failed to fetch patient profile:", err);
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Fetch schedule when date changes
        if (name === 'appointmentDate') {
            fetchDoctorSchedule(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!userId) {
            alert('Please login to book an appointment');
            navigate('/login');
            return;
        }

        try {
            const appointmentData = {
                ...formData,
                doctorId,
                hospitalId: hospital?._id,
                department,
                patientId: userId  // Make sure this is included
            };

            // Check for existing appointments
            const checkResponse = await fetch('http://localhost:4000/DPR/check-appointment-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId,
                    appointmentDate: formData.appointmentDate,
                    appointmentTime: formData.appointmentTime,
                    patientId: userId
                })
            });

            const checkResult = await checkResponse.json();

            if (!checkResult.available) {
                alert(checkResult.message);
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:4000/DPR/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) throw new Error('Failed to book appointment');
            
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book appointment: ' + error.message);
            setLoading(false);
        }
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    // Blood group options
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const goBack = () => {
        navigate(-1);
    };

    const fetchDoctorSchedule = async (date) => {
        try {
            const response = await fetch(`http://localhost:4000/DPR/doctor-schedule/${doctorId}/${date}`);
            const data = await response.json();
            
            if (data.success && data.schedule) {
                setDoctorSchedule(data.schedule);
                // Generate time slots based on start and end time
                const slots = generateTimeSlots(data.schedule.startTime, data.schedule.endTime);
                setAvailableTimeSlots(slots);
            } else {
                setAvailableTimeSlots([]);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setAvailableTimeSlots([]);
        }
    };

    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        const start = new Date(`2000/01/01 ${startTime}`);
        const end = new Date(`2000/01/01 ${endTime}`);
        
        while (start < end) {
            slots.push(start.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            }));
            start.setMinutes(start.getMinutes() + 30); // 30-minute intervals
        }
        return slots;
    };

    if (success) {
        return (
            <>
                <Navbar />
                <div className="book-appointment">
                    <div className="book-appointment__container">
                        <div className="book-appointment__success">
                            <div className="book-appointment__success-icon">✅</div>
                            <h2 className="book-appointment__success-title">Appointment Booked Successfully!</h2>
                            <p className="book-appointment__success-message">
                                Your appointment with Dr. {doctor?.name} has been scheduled.
                            </p>
                            <p className="book-appointment__success-submessage">
                                You will receive a confirmation email shortly.
                            </p>
                            <button 
                                className="book-appointment__success-button"
                                onClick={() => navigate('/')}
                            >
                                Back to Hospitals
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar /><br /><br /><br /><br />
            <div className="book-appointment">
                <div className="book-appointment__container">
                    <button className="book-appointment__back-button" onClick={goBack}>
                        ← Back
                    </button>
                    <div className="book-appointment__content">
                        {/* Doctor Information Panel */}
                        <div className="book-appointment__doctor-panel">
                            {doctor && (
                                <>
                                    <div className="book-appointment__doctor-image-container">
                                        <img 
                                            src={`http://localhost:4000/${doctor.profileImage}`}
                                            alt={doctor.name}
                                            className="book-appointment__doctor-image"
                                            onError={(e) => {
                                                e.target.src = '/assets/images/default-doctor.png';
                                            }}
                                        />
                                    </div>
                                    <div className="book-appointment__doctor-info">
                                        <h3 className="book-appointment__doctor-name">Dr. {doctor.name}</h3>
                                        <div className="book-appointment__doctor-details">
                                            <p className="book-appointment__doctor-specialization">{doctor.specialization}</p>
                                            <p className="book-appointment__doctor-qualification">{doctor.qualification}</p>
                                            <p className="book-appointment__doctor-experience">{doctor.yearsOfExperience} years experience</p>
                                            
                                            {/* Add Schedule Information */}
                                            <div className="book-appointment__schedule-info">
                                                <h4 className="book-appointment__schedule-title">Consultation Hours</h4>
                                                {doctorSchedule ? (
                                                    <div className="book-appointment__schedule-details">
                                                        <div className="book-appointment__schedule-item">
                                                            <span className="book-appointment__schedule-label">Days:</span>
                                                            <span className="book-appointment__schedule-value">
                                                                {doctorSchedule.daysOfWeek.join(', ')}
                                                            </span>
                                                        </div>
                                                        <div className="book-appointment__schedule-item">
                                                            <span className="book-appointment__schedule-label">Hours:</span>
                                                            <span className="book-appointment__schedule-value">
                                                                {doctorSchedule.startTime} - {doctorSchedule.endTime}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="book-appointment__schedule-empty">
                                                        Please select a date to view available time slots
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {hospital && (
                                <div className="book-appointment__hospital-info">
                                    <h4 className="book-appointment__hospital-title">Hospital Information</h4>
                                    <div className="book-appointment__hospital-details">
                                        <div className="book-appointment__info-item">
                                            <span className="book-appointment__info-label">Hospital:</span>
                                            <span className="book-appointment__info-value">{hospital.hospitalName}</span>
                                        </div>
                                        <div className="book-appointment__info-item">
                                            <span className="book-appointment__info-label">Department:</span>
                                            <span className="book-appointment__info-value">{department}</span>
                                        </div>
                                        <div className="book-appointment__info-item">
                                            <span className="book-appointment__info-label">Phone:</span>
                                            <span className="book-appointment__info-value">{hospital.Phone}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Appointment Form */}
                        <div className="book-appointment__form-container">
                            <h2 className="book-appointment__form-title">Book Your Appointment</h2>
                            
                            <form className="book-appointment__form" onSubmit={handleSubmit}>
                                <div className="book-appointment__form-grid">
                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Full Name <span className="book-appointment__required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="patientName"
                                            value={formData.patientName}
                                            onChange={handleInputChange}
                                            required
                                            className="book-appointment__input"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Email Address <span className="book-appointment__required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="patientEmail"
                                            value={formData.patientEmail}
                                            onChange={handleInputChange}
                                            required
                                            className="book-appointment__input"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Phone Number <span className="book-appointment__required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="patientPhone"
                                            value={formData.patientPhone}
                                            onChange={handleInputChange}
                                            required
                                            className="book-appointment__input"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Emergency Contact
                                        </label>
                                        <input
                                            type="tel"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleInputChange}
                                            className="book-appointment__input"
                                            placeholder="Emergency contact number"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Appointment Date <span className="book-appointment__required">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="appointmentDate"
                                            value={formData.appointmentDate}
                                            onChange={handleInputChange}
                                            min={today}
                                            required
                                            className="book-appointment__input"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Preferred Time <span className="book-appointment__required">*</span>
                                        </label>
                                        <select
                                            name="appointmentTime"
                                            value={formData.appointmentTime}
                                            onChange={handleInputChange}
                                            required
                                            className="book-appointment__select"
                                            disabled={!doctorSchedule}
                                        >
                                            <option value="">
                                                {doctorSchedule ? 'Select time' : 'Select a date first'}
                                            </option>
                                            {availableTimeSlots.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                        {!doctorSchedule && formData.appointmentDate && (
                                            <p className="book-appointment__error-text">
                                                No schedule available for selected date
                                            </p>
                                        )}
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Previous Visit
                                        </label>
                                        <select
                                            name="previousVisit"
                                            value={formData.previousVisit}
                                            onChange={handleInputChange}
                                            className="book-appointment__select"
                                        >
                                            <option value="no">First time</option>
                                            <option value="yes">Previous patient</option>
                                        </select>
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Insurance Provider
                                        </label>
                                        <input
                                            type="text"
                                            name="insuranceProvider"
                                            value={formData.insuranceProvider}
                                            onChange={handleInputChange}
                                            className="book-appointment__input"
                                            placeholder="Insurance company name"
                                        />
                                    </div>

                                    <div className="book-appointment__form-group">
                                        <label className="book-appointment__label">
                                            Blood Group <span className="book-appointment__required">*</span>
                                        </label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                            required
                                            className="book-appointment__select"
                                        >
                                            <option value="">Select blood group</option>
                                            {bloodGroups.map(group => (
                                                <option key={group} value={group}>
                                                    {group}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="book-appointment__form-group-full">
                                    <label className="book-appointment__label">
                                        Symptoms / Reason for Visit
                                    </label>
                                    <textarea
                                        name="symptoms"
                                        value={formData.symptoms}
                                        onChange={handleInputChange}
                                        className="book-appointment__textarea"
                                        placeholder="Please describe your symptoms or reason for the visit..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`book-appointment__submit-button ${loading ? 'book-appointment__submit-button--disabled' : ''}`}
                                >
                                    {loading ? 'Booking Appointment...' : 'Book Appointment'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookAppointment;
