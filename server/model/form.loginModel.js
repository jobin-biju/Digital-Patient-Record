const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    loginId: {
        type: mongoose.Schema.Types.ObjectId,
        refpath: 'regType',
        required: true
    },
    regType: {
        type: String,
        enum: ['Hospital','Patient', 'Doctor', 'Lab','Pharmacy'],
        required: true
    }
})

const loginModel = mongoose.model('Login', loginSchema)
module.exports = loginModel