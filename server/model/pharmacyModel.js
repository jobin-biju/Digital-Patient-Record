const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    drugLicenseNumber: {
        type: String,
        required: true
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    }
})

const PharmacyModel = mongoose.model('Pharmacy', pharmacySchema)
module.exports = PharmacyModel