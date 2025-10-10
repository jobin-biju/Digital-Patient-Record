const mongoose = require('mongoose')

const labpatientreportSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: false
    },
    hospitalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: false
    },
    labId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lab',
        required: false
    },
    reportDetails: {
        type: String
    },
    labfindings: {
        type: String,
    },
    reportfile: {
        type: String,
        
    },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const labpatientreportModel = mongoose.model('labpatientreport', labpatientreportSchema)
module.exports = labpatientreportModel