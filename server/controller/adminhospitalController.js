const bcrypt = require('bcrypt')
const HospitalModel = require('../model/form.adminhospitalModel')
const loginModel = require('../model/form.loginModel')
const path = require('path')

exports.hospitalInsert = async (req, res) => {
    try {
        const originalPassword = req.body.password
        const hashedPassword = await bcrypt.hash(originalPassword, 10)

        // Handle file uploads
        let documentUpload, hospitalLogo
        if (req.files) {
            if (req.files.documentUpload) {
                const docFile = req.files.documentUpload
                const docPath = path.join(__dirname, "../asset/" + docFile.name)
                await docFile.mv(docPath)
                documentUpload = docFile.name
            }
            if (req.files.hospitalLogo) {
                const logoFile = req.files.hospitalLogo
                const logoPath = path.join(__dirname, "../asset/" + logoFile.name)
                await logoFile.mv(logoPath)
                hospitalLogo = logoFile.name
            }
        }

        const hospitalData = {
            hospitalName: req.body.hospitalName,
            registerationNumber: req.body.registerationNumber,
            Phone: req.body.Phone,
            address: req.body.address,
            department: req.body.department,
            adminPerson: req.body.adminPerson,
            adminEmail: req.body.adminEmail,
            adminPhone: req.body.adminPhone,
            documentUpload,
            hospitalLogo
        }
        const hospital = new HospitalModel(hospitalData)
        await hospital.save()

        const login = {
            email: req.body.adminEmail,
            password: hashedPassword,
            userType: 2,     // ← corrected
            regType: 'Hospital',
            loginId: hospital._id
        }
        await loginModel.create(login)

        res.json("success")
    } catch (err) {
        console.error("error", err)
        res.status(500).json({ error: "Internal server error", details: err.message })
    }
}

//hospitaladminviews

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalModel.find();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};