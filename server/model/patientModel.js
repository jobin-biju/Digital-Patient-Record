const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
    },
    emergencyContact: {
        name: String,
        phone: String,
    },
    bloodType: {
        type: String,
    },
    allergies: {
        type: String,
    },
    medicalConditions: {
        type: String,
    },
    insurance: {
        type: String,
    },
   
}, {
    timestamps: true
});
const patientModel = mongoose.model('patient',patientSchema)
module.exports = patientModel