const bcrypt = require('bcrypt');   // ✅ add this line at the very top
const doctorModel = require('../model/doctorModel');
const loginModel = require('../model/form.loginModel');
const sendEmail = require('../utils/sendMail');
const path = require('path');
const { log } = require('console');
const doctorScheduleModel = require('../model/doctorscheduleModel'); // Add this line

exports.addDoctors = async (req, res) => {
    try {
        const originalPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        let profileImage;
        if (req.files && req.files.profileImage) {
            const profile = req.files.profileImage;
            const profilePath = path.join(__dirname, "../asset", profile.name);
            await profile.mv(profilePath);
            profileImage = profile.name;
        }

        // Doctor data
        const doctorData = {
            name: req.body.name,
            phone: req.body.phone,
            specialization: req.body.specialization,
            qualification: req.body.qualification,
            licenseNumber: req.body.licenseNumber,
            department: req.body.department,
            yearsOfExperience: req.body.yearsOfExperience,
            profileImage,
            hospitalId: req.body.hospitalId 
        };

        const doctor = new doctorModel(doctorData);
        await doctor.save();

        // Login credentials
        const login = {
            email: req.body.email,   // ✅ FIXED
            password: hashedPassword,
            userType: 4,
            regType: 'Doctor',
            loginId: doctor._id
        };

        await loginModel.create(login);

        // Email sending
        const subject = 'Welcome to Digital Patient Report System';
        const html = `
           <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2 style="color: #4CAF50;">Welcome, ${req.body.name}!</h2>
                <p>You have successfully registered as a <strong>Doctor</strong>.</p>
                
                <h4>Your login credentials:</h4>
                <ul style="line-height: 1.6;">
                  <li><strong>Email:</strong> ${req.body.email}</li>
                  <li><strong>Password:</strong> ${originalPassword}</li>
                </ul>

                <p style="color: #d9534f;"><strong>Important:</strong> Please change your password after first login.</p>
                
                <p>Best regards,<br/>DPR Admin Team</p>
           </div>
        `;

        await sendEmail(req.body.email, subject, html);

        res.json("Doctor Added Successfully & Email Sent");
    }
    catch (err) {
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};


//Doctor View
exports.hospitalDoctorView = async (req,res)=>{
    try{
        const {hospitalId} = req.body;
        const doctors = await doctorModel.find({hospitalId: hospitalId})
        const results = await Promise.all(doctors.map(async (doctor)=>{
            const login = await loginModel.findOne({ loginId: doctor._id});

            return {
                ...doctor.toObject(),
                email: login?. email || "No email found"
            }
        }))
        res.json(results)
    }
    catch(err){
        console.log("error", err);     
    }
}

//Delete Doctor
exports.deleteDoctor = async (req, res)=>{
    try{
        const {id} = req.body;
        await doctorModel.findByIdAndDelete(id);
        await loginModel.findOneAndDelete({loginId: id});
        res.json("Doctor Deleted Successfully");
    }
    catch(err){
        console.log("error", err);
        res.status(500).json({error: "Internal server error"});
    }
}



// Add schedule for a doctor
exports.addSchedule = async (req, res) => {
    try {
        const data = await doctorScheduleModel.create(req.body);
        res.json({
            success: true,
            message: "Schedule added successfully",
            data: data
        });
    }
    catch (err) { // Add err parameter here
        console.log("error", err);
        res.status(500).json({
            success: false,
            error: "Internal server error",
            message: err.message
        });
    }
}

// Get schedules of a doctor
exports.getSchedules = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const schedules = await doctorScheduleModel.find({ doctorId });
    res.json({ success: true, schedules });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { scheduleId, daysOfWeek, startTime, endTime } = req.body;
    if (!scheduleId || !Array.isArray(daysOfWeek) || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updated = await doctorScheduleModel.findByIdAndUpdate(
      scheduleId,
      { daysOfWeek, startTime, endTime },
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (err) {
    console.error("Error updating schedule:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//delete schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const {scheduleId} = req.body;
        const deleteSchedule = await doctorScheduleModel.findByIdAndDelete(scheduleId)
        res.json("Schedule Deleted Successfully", deleteSchedule);
    }
    catch{
        console.log("error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

// Add this new function
exports.getDoctorSchedule = async (req, res) => {
    try {
        const { doctorId, appointmentDate } = req.params;
        const schedule = await doctorScheduleModel.find({ doctorId });
        
        // Get day of week from appointment date
        const dayOfWeek = new Date(appointmentDate).toLocaleString('en-us', {weekday: 'long'});
        
        // Filter schedules for the selected day
        const availableSchedules = schedule.filter(sch => 
            sch.daysOfWeek.includes(dayOfWeek)
        );

        if (availableSchedules.length === 0) {
            return res.json({ 
                success: false, 
                message: 'No schedule available for selected date' 
            });
        }

        res.json({
            success: true,
            schedule: availableSchedules[0]
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};