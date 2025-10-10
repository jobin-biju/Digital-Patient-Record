const appointmentModel = require('../model/appointmentModel')
const prescriptionModel = require('../model/prescriptionModel')
const labpatientreportModel = require('../model/labpatientreportModel')
const doctorModel = require('../model/doctorModel')
const DoctorPatientTransfer = require('../model/doctorPatientTransferModel')

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPrescriptionsByAppointment = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel.find({ appointmentId: req.params.id });
    if (!prescriptions || prescriptions.length === 0) {
      return res.status(404).json({ message: 'No prescriptions found for this appointment' });
    }
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.getLabReportsByAppointment = async (req, res) => {
//   try {
//     const labReports = await labpatientreportModel.find({ appointmentId: req.params.appointmentId });
//     if (!labReports || labReports.length === 0) {
//       return res.status(404).json({ message: 'No lab reports found for this appointment' });
//     }
//     res.json(labReports);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.getLabReportsByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const reports = await labpatientreportModel.find({ appointmentId });

    // Always return an array (even if empty)
    return res.json(reports);
  } catch (err) {
    console.error("Error fetching lab reports:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDoctorsByLogin = async (req, res) => {
  try {
    const { loginId } = req.params;

    // Find the logged-in doctor
    const currentDoctor = await doctorModel.findById(loginId);
    if (!currentDoctor) return res.status(404).json({ message: "Doctor not found" });

    // Get all doctors in the same hospital except the current doctor
    const doctors = await doctorModel.find({ 
      hospitalId: currentDoctor.hospitalId,
      _id: { $ne: loginId }  // exclude current doctor
    });

    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.transferPatientData = async (req, res) => {
  try {
    const { appointmentId, newDoctorId, prescriptionsId, labReportsId, formdoctorId } = req.body;

    if (!appointmentId || !newDoctorId || !formdoctorId) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Get patientId from appointment
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const transfer = new DoctorPatientTransfer({
      appointmentId,
      newDoctorId,
      formdoctorId,
      prescriptionsId: prescriptionsId || [],
      labReportsId: labReportsId || [],
      patientId: appointment.patientId // <-- Store patientId here
    });

    const savedTransfer = await transfer.save();

    res.status(200).json({ message: "Patient transferred successfully.", data: savedTransfer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};