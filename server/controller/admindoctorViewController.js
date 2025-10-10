const doctorModel = require('../model/doctorModel');
const labModel = require('../model/labModel');

exports.getAllDoctors = async(req, res)=>{
    try {
        const doctors = await doctorModel.find().populate('hospitalId', 'hospitalName address');
        res.json(doctors);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

//labview

exports.adminlabView = async(req, res)=>{
    try{
        const lab = await labModel.find().populate('hospitalId', 'hospitalName address');
        res.json(lab);
    }
    catch(err){
        console.log(err);
    }
}