const mongoose = require("mongoose");
const labReportModel = require("../model/labreportModel");
const LabModel = require("../model/labModel");

exports.getLabReportsForLab = async (req, res) => {
  try {
    const { loginId } = req.body;

    console.log("Received loginId:", loginId);


    const lab = await LabModel.findOne({ loginId });
    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    console.log("Lab found:", lab);


    // Populate appointmentId and its doctorId
    const labReports = await labReportModel
      .find({ hospitalId: lab.hospitalId })
      .populate({
        path: "appointmentId",
        select: "patientName patientEmail patientPhone appointmentDate appointmentTime symptoms doctorId hospitalId department",
        populate: {
          path: "doctorId",
          model: "doctor",
          select: "name phone department"
        }
      })
      .exec();
    console.log(labReports);
    res.json(labReports);
  } catch (err) {
    console.error("Error in getLabReportsForLab:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
