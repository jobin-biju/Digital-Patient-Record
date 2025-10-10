const mongoose = require('mongoose')

const patientTransferSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    newDoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },
    prescriptionsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
    }],
    labReportsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labpatientreport',
    }],
    formdoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
    },
    patientId: { // <-- Add this field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    transferredAt: {
        type: Date,
        default: Date.now
    }
})

const patientTransferModel = mongoose.model('patientTransfer', patientTransferSchema)
module.exports = patientTransferModel