const appointmentModel = require('../model/appointmentModel')

exports.hospitalAppointmentView = async(req, res)=>{
    try {
        const {hospitalId} = req.body;
        const appointment = await appointmentModel.find({hospitalId: hospitalId}).populate('doctorId','name')
        res.json(appointment)
    }
    catch(err){
        console.log(err);
        
    }
}