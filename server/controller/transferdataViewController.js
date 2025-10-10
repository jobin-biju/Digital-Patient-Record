
// controllers/transferController.js
const transferModel = require("../model/transferModel");
const patienttransferModel = require("../model/doctorPatientTransferModel")

exports.getTransferData = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) {
      return res.status(400).json({ message: "hospitalId is required" });
    }

    // Fetch transfers where toHospitalId matches the logged-in hospital
    const transferData = await transferModel.find({ toHospitalId: hospitalId })
      .populate('patientId', 'name phone') // only selected fields
      .populate('appointmentId', 'patientName patientPhone appointmentDate appointmentTime')
      .populate("fromHospitalId toHospitalId", "hospitalName" )

    res.json(transferData);
  } catch (err) {
    console.error("Fetch transfer data error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTransferDataDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required" });
    }

    const transferData = await patienttransferModel.find({ newDoctorId: doctorId })
      .populate("labReportsId", "labfindings reportDetails reportfile")
      .populate("appointmentId", "patientName patientPhone appointmentDate appointmentTime")
      .populate("prescriptionsId", "medicines admitted")
      .populate("formdoctorId newDoctorId", "name" )

    res.json(transferData);
  } catch (err) {
    console.error("Fetch transfer data error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
