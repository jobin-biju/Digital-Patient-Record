const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhone: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    symptoms: String,
    previousVisit: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    emergencyContact: String,
    insuranceProvider: String,
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    },
    department: String,
    status: {
        type: String,
        enum: ['completed', 'cancelled'],  // Removed 'scheduled'
        default: null  // Changed default from 'scheduled' to null
    },
    appointmentstatus: {
        type: String,
        default: null  // Changed default from 'scheduled' to null
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    isConsultationScheduled: {
        type: Boolean,
        default: false
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
}, {
    timestamps: true
});

// Add a compound index to prevent duplicate appointments
appointmentSchema.index(
    { 
        doctorId: 1, 
        appointmentDate: 1, 
        appointmentTime: 1,
        patientId: 1 
    }, 
    { unique: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);