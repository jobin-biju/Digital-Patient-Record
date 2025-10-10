const bcrypt = require('bcrypt');
const loginModel = require('../model/form.loginModel');
const patientModel = require('../model/patientModel');
const HospitalModel = require('../model/form.adminhospitalModel');
const doctorModel = require('../model/doctorModel');
const appointmentModel = require('../model/appointmentModel');
const sendEmail = require('../utils/sendMail');
const prescriptionModel = require('../model/prescriptionModel');
const labpatientreportModel = require('../model/labpatientreportModel'); // Import the lab report model
const transferModel = require('../model/transferModel');
const DoctorPatientTransfer = require('../model/doctorPatientTransferModel');
//

// No fs or path required for photo upload anymore

exports.PatientInsert = async (req, res) => {
  try {
    const originalPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    const patientData = {
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      emergencyContact: {
        name: req.body.emergencyContactName,
        phone: req.body.emergencyContactPhone
      },
      bloodType: req.body.bloodType,
      allergies: req.body.allergies,
      medicalConditions: req.body.medicalConditions,
      insurance: req.body.insurance
    };

    const patient = new patientModel(patientData);
    await patient.save();

    const login = {
      email: req.body.email,
      password: hashedPassword,
      userType: 3,
      regType: 'Patient',
      loginId: patient._id
    };
    await loginModel.create(login);

    const subject = 'Welcome to Bug Tracker System';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #4CAF50;">Welcome, ${req.body.name}!</h2>
        <p>You have successfully registered as a <strong>Patient</strong>.</p>
        <h4>Your login credentials:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Email:</strong> ${req.body.email}</li>
          <li><strong>Password:</strong> ${originalPassword}</li>
        </ul>
        <p style="color: #d9534f;"><strong>Important:</strong> Please change your password after first login.</p>
        <p>Best regards,<br/>Bug Tracker Admin Team</p>
      </div>
    `;

    await sendEmail(req.body.email, subject, html);

    res.json("Patient Added Successfully & Email Sent");
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({
      error: "Insertion Failed",
      details: err.message
    });
  }
};


// BELOW ARE THE CONTROLLERS OF PATIENT PAGES






exports.getAvailableHospitals = async (req, res) => {
    try {
        // Fetch all active hospitals
        const hospitals = await HospitalModel.find({})
            .select('hospitalName Phone address department hospitalLogo')
            .lean();

        // Add image URL and format the response
        const formattedHospitals = hospitals.map(hospital => ({
            ...hospital,
            hospitalLogo: hospital.hospitalLogo ? `${hospital.hospitalLogo}` : null,
        }));

        res.status(200).json(formattedHospitals);
    } catch (err) {
        console.error("Error fetching available hospitals:", err);
        res.status(500).json({ error: "Failed to fetch available hospitals" });
    }
};


exports.hospitalDoctorView = async (req, res) => {
    try {
        const { hospitalId, department } = req.body;
        console.log('Received request:', { hospitalId, department });

        const doctors = await doctorModel.find({
            hospitalId: hospitalId,
            $or: [
                { department: department },
                { specialization: { $regex: department, $options: 'i' } }
            ]
        }).select('name phone specialization qualification licenseNumber department yearsOfExperience profileImage availabilityStatus');

        console.log('Found doctors:', doctors);
        res.json(doctors);
    } catch (err) {
        console.error("Error fetching doctors:", err);
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
};

exports.getDoctorsByDepartment = async (req, res) => {
    try {
        const { hospitalId, department } = req.body;
        
        // Clean up department name and handle array-like strings
        const cleanDepartment = department
            .replace(/[\[\]"]/g, '') // Remove brackets and quotes
            .trim();
        
        console.log('Searching for doctors:', { hospitalId, cleanDepartment });

        const doctors = await doctorModel.find({
            hospitalId: hospitalId,
            $or: [
                { department: { $regex: new RegExp(cleanDepartment, 'i') } },
                { department: { $regex: new RegExp('^' + cleanDepartment + '$', 'i') } }
            ]
        }).lean();

        console.log('Found doctors:', doctors);

        res.status(200).json(doctors); // Send array directly
    } catch (err) {
        console.error("Error fetching doctors:", err);
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
};

exports.bookAppointment = async (req, res) => {
    try {
        // Include patientId in appointmentData
        const appointmentData = {
            patientName: req.body.patientName,
            patientEmail: req.body.patientEmail,
            patientPhone: req.body.patientPhone,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            symptoms: req.body.symptoms,
            previousVisit: req.body.previousVisit,
            emergencyContact: req.body.emergencyContact,
            insuranceProvider: req.body.insuranceProvider,
            bloodGroup: req.body.bloodGroup,
            doctorId: req.body.doctorId,
            hospitalId: req.body.hospitalId,
            department: req.body.department,
            patientId: req.body.patientId  // Add this line
        };

        const appointment = new appointmentModel(appointmentData);
        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {
        console.error("Appointment booking error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to book appointment",
            error: error.message
        });
    }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.body;
        console.log("Fetching appointments for doctorId:", doctorId);

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required"
            });
        }

        const appointments = await appointmentModel.find({ doctorId })
            .sort({ appointmentDate: 1, appointmentTime: 1 });

        console.log("Found appointments:", appointments.length);
        
        // Return the appointments array directly
        res.status(200).json(appointments);

    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
            error: error.message
        });
    }
};
exports.scheduleConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const { appointmentDate, appointmentTime } = req.body;
        
        // Update appointment with the new flag
        const updateData = {
            status: 'scheduled',
            isConsultationScheduled: true,
            ...(appointmentDate && { appointmentDate }),
            ...(appointmentTime && { appointmentTime })
        };

        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: false }
        );

        // Send confirmation email
        const subject = 'Consultation Scheduled';
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #2ecc71;">Consultation Scheduled</h2>
                <p>Dear ${updatedAppointment.patientName},</p>
                <p>Your consultation has been scheduled with your doctor.</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>Date:</strong> ${new Date(updatedAppointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${updatedAppointment.appointmentTime}</p>
                    <p><strong>Blood Group:</strong> ${updatedAppointment.bloodGroup}</p>
                    <p><strong>Status:</strong> Scheduled</p>
                </div>

                <p>Please arrive 15 minutes before your scheduled time.</p>
                <p>If you need to reschedule, please contact us.</p>
                
                <p style="color: #666;">Best regards,<br/>Hospital Management</p>
            </div>
        `;

        await sendEmail(updatedAppointment.patientEmail, subject, html);

        res.status(200).json({
            success: true,
            message: "Consultation scheduled successfully",
            appointment: updatedAppointment
        });
    } catch (error) {
        console.error("Schedule consultation error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to schedule consultation",
            error: error.message
        });
    }
};

exports.getScheduledPatients = async (req, res) => {
  try {
    const scheduledPatients = await appointmentModel.find({
      isConsultationScheduled: true
    }).sort({ appointmentDate: 1, appointmentTime: 1 });

    res.status(200).json(scheduledPatients);
  } catch (error) {
    console.error('Error fetching scheduled patients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scheduled patients',
      error: error.message
    });
  }
};

exports.checkAppointmentAvailability = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, patientId } = req.body;

        // Check if patient has existing appointment at same time
        const existingPatientAppointment = await appointmentModel.findOne({
            patientId,
            appointmentDate,
            appointmentTime,
            status: { $ne: 'cancelled' }
        });

        if (existingPatientAppointment) {
            return res.json({
                available: false,
                message: 'You already have an appointment at this time'
            });
        }

        // Check if time slot is available for doctor
        const existingDoctorAppointment = await appointmentModel.findOne({
            doctorId,
            appointmentDate,
            appointmentTime,
            status: { $ne: 'cancelled' }
        });

        if (existingDoctorAppointment) {
            return res.json({
                available: false,
                message: 'This time slot is already booked'
            });
        }

        res.json({
            available: true,
            message: 'Time slot is available'
        });

    } catch (error) {
        console.error('Error checking appointment availability:', error);
        res.status(500).json({
            available: false,
            message: 'Error checking appointment availability'
        });
    }
};

// Update the getPatientAppointments function
exports.getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });
        }

        // Update the populate to include hospitalId
        const appointments = await appointmentModel.find({ patientId })
            .populate({
                path: 'doctorId',
                model: doctorModel,
                select: 'name specialization department'
            })
            .populate({
                path: 'hospitalId',
                model: HospitalModel,
                select: 'hospitalName'
            })
            .sort({ appointmentDate: -1 })
            .lean();

        // Update the formattedAppointments to include hospital name
        const formattedAppointments = appointments.map(apt => ({
            id: apt._id,
            doctorName: apt.doctorId ? `Dr. ${apt.doctorId.name}` : 'Unknown Doctor',
            speciality: apt.doctorId ? apt.doctorId.specialization : apt.department,
            date: new Date(apt.appointmentDate).toISOString().split('T')[0],
            time: apt.appointmentTime,
            isConsultationScheduled: apt.isConsultationScheduled,
            status: apt.isConsultationScheduled ? "confirmed" : "pending",
            type: "In-Person",
            location: apt.hospitalId ? apt.hospitalId.hospitalName : 'Unknown Hospital',
            reason: apt.symptoms || 'Not specified',
            duration: "30 mins"
        }));

        res.status(200).json(formattedAppointments);

    } catch (error) {
        console.error("Error fetching patient appointments:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
            error: error.message
        });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // First check if appointment exists
        const appointment = await appointmentModel.findById(appointmentId);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Delete the appointment instead of updating status
        await appointmentModel.findByIdAndDelete(appointmentId);

        // Send cancellation email
        const subject = 'Appointment Cancellation Confirmation';
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #dc2626;">Appointment Cancelled</h2>
                <p>Dear ${appointment.patientName},</p>
                <p>Your appointment has been cancelled and removed from the system.</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
                </div>

                <p>If you wish to schedule a new appointment, please visit our website.</p>
                
                <p style="color: #666;">Best regards,<br/>Hospital Management</p>
            </div>
        `;

        await sendEmail(appointment.patientEmail, subject, html);

        res.status(200).json({
            success: true,
            message: "Appointment cancelled and deleted successfully"
        });

    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.status(500).json({
            success: false,
            message: "Failed to cancel appointment",
            error: error.message
        });
    }
};

exports.getPatientProfile = async (req, res) => {
    try {
        const { patientId, email } = req.body;
        console.log('Fetching profile with:', { patientId, email });
        
        if (!patientId && !email) {
            return res.status(400).json({ 
                success: false,
                message: "Either patientId or email is required" 
            });
        }

        let patient = await loginModel.findOne({ loginId: patientId });
        if (patient) {
            patient = await patientModel.findOne({ email: patient.email });
        } else {
            patient = await patientModel.findOne({ email });
        }

        if (!patient) {
            console.error('No patient found with provided credentials');
            return res.status(404).json({ 
                success: false,
                message: "Patient not found" 
            });
        }

        res.json({
            success: true,
            data: {
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                gender: patient.gender,
                age: patient.age,
                dateOfBirth: patient.dateOfBirth,
                address: patient.address || "",
                emergencyContact: patient.emergencyContact || {
                    name: "",
                    phone: ""
                },
                bloodType: patient.bloodType || "",
                allergies: patient.allergies || "",
                medicalConditions: patient.medicalConditions || "",
                insurance: patient.insurance || ""
                // profileImage removed
            }
        });
    } catch (error) {
        console.error("Error in getPatientProfile:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch profile",
            error: error.message 
        });
    }
};

exports.updatePatientProfile = async (req, res) => {
    try {
        const { patientId } = req.body;

        const loginUser = await loginModel.findOne({ loginId: patientId });
        if (!loginUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updateData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            emergencyContact: {
                name: req.body.emergencyContactName,
                phone: req.body.emergencyContactPhone
            },
            bloodType: req.body.bloodType,
            allergies: req.body.allergies,
            medicalConditions: req.body.medicalConditions,
            insurance: req.body.insurance
            // profileImage removed
        };

        const updatedPatient = await patientModel.findOneAndUpdate(
            { email: loginUser.email },
            { $set: updateData },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            patient: updatedPatient
        });
    } catch (error) {
        console.error("Error updating patient profile:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};

// Add this route to handle appointment completion
exports.updateappointmentstatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const {appointmentstatus } = req.body;
    
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { 
        
        appointmentstatus: appointmentstatus
      },
      { new: true }
    );
    
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({
      success: true,
      message: 'Appointment completed successfully',
      appointment: updatedAppointment
    });
    
  } catch (error) {
    console.error('Error completing appointment:', error);
    res.status(500).json({ error: 'Failed to complete appointment' });
  }
}
exports.getPatientPrescriptions = async (req, res) => {
  try {
    const { loginId } = req.query;
    
    const prescriptions = await prescriptionModel.find()
      .populate({
        path: 'appointmentId',
        match: { patientId: loginId },
        populate: [{
          path: 'doctorId',
          select: 'name department specialization'
        }]
      })
      .sort({ createdAt: -1 });

    // Filter out null appointmentIds and format response
    const formattedPrescriptions = prescriptions
      .filter(p => p.appointmentId !== null)
      .map(p => ({
        ...p._doc,
        doctor: {
          name: p.appointmentId?.doctorId?.name || 'Unknown Doctor',
          department: p.appointmentId?.doctorId?.department || 'Unknown Department',
          specialization: p.appointmentId?.doctorId?.specialization || 'Unknown Specialization'
        },
        symptoms: p.appointmentId?.symptoms || 'No symptoms recorded'
      }));

    res.status(200).json(formattedPrescriptions);
  } catch (err) {
    console.error("Error fetching prescriptions:", err);
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
};

// Add this new function to get lab reports for a patient
exports.getPatientLabReports = async (req, res) => {
  try {
    const { patientId } = req.query;
    const reports = await labpatientreportModel.find()
      .populate({
        path: 'appointmentId',
        match: { patientId },
        populate: {
          path: 'doctorId',
          select: 'name'
        }
      })
      .populate('labId', 'labname labtype') // Add this populate
      .sort({ createdAt: -1 });

    const filteredReports = reports.filter(report => report.appointmentId !== null);
    
    res.status(200).json(filteredReports);
  } catch (err) {
    console.error("Error fetching lab reports:", err);
    res.status(500).json({ error: "Failed to fetch lab reports" });
  }
};

exports.getPatientTransferHistory = async (req, res) => {
  try {
    let { patientId } = req.params;

    // If patientId is a login doc's _id, find the corresponding patient doc's _id
    if (patientId && patientId.length === 24) {
      const loginDoc = await loginModel.findById(patientId);
      if (loginDoc && loginDoc.loginId) {
        patientId = loginDoc.loginId; // Use the patient document's _id
      }
    }

    if (!patientId) {
      return res.status(400).json({ success: false, message: "Patient ID is required" });
    }

    const transfers = await transferModel.find({ patientId })
      .populate('fromHospitalId', 'hospitalName')
      .populate('toHospitalId', 'hospitalName')
      .populate({
        path: 'appointmentId',
        model: 'Appointment',
        populate: {
          path: 'doctorId',
          select: 'name department specialization'
        }
      })
      .sort({ transferDate: -1 });

    res.status(200).json({ success: true, transfers });
  } catch (err) {
    console.error("Error fetching transfer history:", err);
    res.status(500).json({ success: false, message: "Failed to fetch transfer history", error: err.message });
  }
};
exports.getPatientTransfers = async (req, res) => {
  try {
    const { loginId } = req.query; // This should be the patient document's _id

    const transfers = await transferModel.find({ patientId: loginId })
      .populate('fromHospitalId', 'hospitalName')
      .populate('toHospitalId', 'hospitalName')
      .populate({
        path: 'appointmentId',
        model: 'Appointment',
        populate: {
          path: 'doctorId',
          select: 'name department specialization'
        }
      })
      .sort({ transferDate: -1 });

    res.status(200).json(transfers);
  } catch (err) {
    console.error("Error fetching transfers:", err);
    res.status(500).json({ error: "Failed to fetch transfers" });
  }
};

exports.getDoctorTransfersForPatient = async (req, res) => {
  try {
    const { patientId } = req.query;
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const transfers = await DoctorPatientTransfer.find({ patientId })
      .populate({
        path: 'appointmentId',
        populate: { path: 'doctorId', select: 'name department specialization' }
      })
      .populate('newDoctorId', 'name department specialization')
      .populate('formdoctorId', 'name department specialization')
      .populate({
        path: 'prescriptionsId',
        model: prescriptionModel
      })
      .populate({
        path: 'labReportsId',
        model: labpatientreportModel
      })
      .sort({ transferredAt: -1 });

    res.status(200).json(transfers);
  } catch (err) {
    console.error("Error fetching doctor transfers:", err);
    res.status(500).json({ message: "Failed to fetch doctor transfers" });
  }
};