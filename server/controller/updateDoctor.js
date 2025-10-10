const doctorModel = require('../model/doctorModel');
const loginModel = require('../model/form.loginModel');

exports.editDoctor = async (req, res) => {
    try {
        const { id } = req.body;

        // Fetch the doctor details
        const doctor = await doctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Fetch the login email for the doctor
        const login = await loginModel.findOne({ loginId: doctor._id });

        // Return combined doctor data with email
        res.json({
            ...doctor._doc,
            email: login?.email || ''
        });

    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


//Update Doctor
exports.updateDoctor = async (req, res)=>{
    try{
        let doctorUpdate = {
            name: req.body.name,
            phone: req.body.phone,
            specialization: req.body.specialization,
            qualification: req.body.qualification,
            licenseNumber: req.body.licenseNumber,
            department: req.body.department,
            yearsOfExperience: req.body.yearsOfExperience,
            email: req.body.email
        };
        let imageName;
        if(req.files?.profileImage){
            const file = req.files.profileImage;
            imageName = file.name;
            const imagePath = require('path').join(__dirname, '../asset/', imageName);
            await file.mv(imagePath);
            doctorUpdate.profileImage = imageName;
        }
        let up = await doctorModel.findByIdAndUpdate(req.body.id, doctorUpdate, { new: true });
        console.log("update", up);
        res.json("Doctor Updated Successfully");
    }
    catch(err){
        console.log("error", err);
        res.status(500).json({error: "Internal server error"});
    }
}





