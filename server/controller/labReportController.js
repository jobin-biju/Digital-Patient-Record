const LabReport = require("../model/labreportModel");
const LabPatientReport = require("../model/labpatientreportModel")

exports.addLabReport = async (req, res) => {
  try {
    const { appointmentId,hospitalId, reportDetails } = req.body;

    if (!appointmentId || !reportDetails) {
      return res.status(400).json({ message: "AppointmentId and report details are required" });
    }

    const newReport = new LabReport({
      appointmentId,
      hospitalId,
      reportDetails
    });

    await newReport.save();
    res.status(201).json({ message: "Lab report saved successfully", report: newReport });
  } catch (error) {
    console.error("Error saving lab report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.getLabReportDoctor = async(req, res)=>{

const {doctorId}= req.body;
console.log(doctorId);


    try {
        const reportview = await LabPatientReport.find({doctorId:doctorId}).populate('appointmentId','patientName patientPhone')
        res.json(reportview);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}