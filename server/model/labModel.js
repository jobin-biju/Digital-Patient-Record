const mongoose =  require('mongoose')

const labSchema = new mongoose.Schema({
    labname: {
        type: String,
        required: true
    },
    registernumber: {
        type: String,
        required: true
    },
    labtype: {
        type: [String],
        required: true
    },
    contactemail: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true  
    },
    inchargename: {
        type: String,   
        required: true
    },
    inchargephone: {
        type: Number,
        required: true
    },
    hospitalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    }
})

const labModel = mongoose.model('lab', labSchema)
module.exports = labModel