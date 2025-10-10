const mongoose = require('mongoose');

const addHospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true
    },
    registerationNumber: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    adminPerson: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPhone:{
        type: String,
        required: true
    },
    documentUpload: {
        type: String,
    },
    hospitalLogo: {
        type: String
    }
})

const HospitalModel = mongoose.model('hospital', addHospitalSchema)
module.exports = HospitalModel