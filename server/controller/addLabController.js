const bcrypt = require('bcrypt');   
const labModel = require('../model/labModel');
const loginModel = require('../model/form.loginModel');
const sendEmail = require('../utils/sendMail');
const path = require('path');


exports.addLabs = async (req, res) => {
    try {
        const originalPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(originalPassword, 10);

        const labData = {
            labname: req.body.labname,
            registernumber: req.body.registernumber,
            labtype: req.body.labtype,
            contactemail: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            inchargename: req.body.inchargename,
            inchargephone: req.body.inchargephone,
            hospitalId: req.body.hospitalId 
        };

        const lab = new labModel(labData);
        await lab.save();

        // Login credentials
        const login = {
            email: req.body.email,   
            password: hashedPassword,
            userType: 5,
            regType: 'Lab',
            loginId: lab._id
        };

        await loginModel.create(login);

        // Email sending
        const subject = 'Welcome to Digital Patient Report System';
        const html = `
           <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2 style="color: #4CAF50;">Welcome, ${req.body.labName}!</h2>
                <p>You have successfully registered as a <strong>Laboratory</strong>.</p>
                
                <h4>Your login credentials:</h4>
                <ul style="line-height: 1.6;">
                  <li><strong>Email:</strong> ${req.body.email}</li>
                  <li><strong>Password:</strong> ${originalPassword}</li>
                  <li><strong>Lab Type:</strong> ${req.body.labType}</li>
                  <li><strong>Registration Number:</strong> ${req.body.registrationNumber}</li>
                </ul>

                <p style="color: #d9534f;"><strong>Important:</strong> Please change your password after first login.</p>
                
                <p>Best regards,<br/>DPR Admin Team</p>
           </div>
        `;

        await sendEmail(req.body.email, subject, html);

        res.json("Lab Added Successfully & Email Sent");
    }
    catch (err) {
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

//LabView
exports.labView = async (req, res)=>{
    try{
        const {hospitalId} = req.body;
        const labs  = await labModel.find({hospitalId: hospitalId});
        const results = await Promise.all(labs.map(async (lab)=>{
            const login = await loginModel.findOne({loginId: lab._id});
            return {
                ...lab.toObject(),
                email: login?.email || "No email found"
            }
        }))
        res.json(results)
    }
    catch(err){
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

//Get Lab By Id
exports.getLabById = async (req, res) => {
    try {
        const { id } = req.body;
        const lab = await labModel.findById(id)
        res.json(lab)
    }
    catch(err){
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

//Lab Update
exports.labUpdate = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const labUpdate = await labModel.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ message: "Lab Updated Successfully", lab: labUpdate });
    }
    catch (err) {
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}

//lab Delete
exports.labDelete = async (req, res)=>{
    try {
        const {id} = req.body;
        const lab = await labModel.findOneAndDelete(id);
        const login = await loginModel.findOneAndDelete({loginId: id});
        res.json("Lab Deleted Successfully");
    }
    catch{
        console.error("error", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}