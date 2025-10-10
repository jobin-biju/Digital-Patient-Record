const PharmacyModel = require('../model/pharmacyModel');
const loginModel = require('../model/form.loginModel');
const sendEmail = require('../utils/sendMail');
const bcrypt = require('bcrypt');

exports.addPharmacy = async (req, res) => {
  try {
    const originalPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    // Save pharmacy data
    const pharmacyData = {
      pharmacyName: req.body.pharmacyName,
      number: req.body.number,
      drugLicenseNumber: req.body.drugLicenseNumber,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      hospitalId: req.body.hospitalId
    };
    const pharmacy = await PharmacyModel.create(pharmacyData);

    // Save login data
    const login = {
      email: req.body.email,
      password: hashedPassword,
      userType: 6, 
      regType: "Pharmacy",
      loginId: pharmacy._id
    };
    const loginDetails = await loginModel.create(login);

    // Send welcome email
    const subject = 'Welcome to Bug Tracker System';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: #4CAF50;">Welcome, ${req.body.pharmacyName}!</h2>
        <p>You have successfully registered as a <strong>Pharmacy</strong>.</p>
        <p><strong>Login Email:</strong> ${req.body.email}</p>
        <p><strong>Password:</strong> ${originalPassword}</p>
        <p>We recommend changing your password after first login.</p>
      </div>
    `;
    await sendEmail(req.body.email, subject, html);

    // Final response
    res.status(201).json({
      message: "Pharmacy registered successfully",
      pharmacy,
      loginDetails,
    });

  } catch (err) {
    console.error("Error adding pharmacy:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.pharmacyView = async(req, res)=>{
  try {
     const {hospitalId} = req.body;
     const pharmacy = await PharmacyModel.find({hospitalId}).populate("hospitalId", "hospitalName")
     res.json(pharmacy)
     
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: "Internal server error" });
  }
}