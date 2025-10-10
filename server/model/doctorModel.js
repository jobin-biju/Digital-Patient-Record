const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,   
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    profileImage: {
        type: String,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
    },
    isOnline: {
        type: Boolean,
        default: false 
    },
    lastActive: {
        type: Date,
        default: Date.now  
    },
    availabilityStatus: {
        type: String,
        enum: ["Available", "Busy", "Offline"],
        default: "Offline"
    }
})

const doctorModel = mongoose.model('doctor', doctorSchema)
module.exports = doctorModel
