const Prescription = require("../model/prescriptionModel");
const appointmentModel =require("../model/appointmentModel");

// Add Prescription
exports.addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, admitted } = req.body;

    if (!appointmentId || !medicines) {
      return res.status(400).json({ message: "appointmentId and medicines are required" });
    }

    const newPrescription = new Prescription({
      appointmentId,
      medicines,
      admitted: admitted || false, // optional, defaults to false
    });

    await newPrescription.save();

    res.status(201).json({
      message: "Prescription saved successfully",
      prescription: newPrescription,
    });
  } catch (error) {
    console.error("Error saving prescription:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// previous prescriptions

// Get Prescriptions by Patient ID
exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const prescriptions = await Prescription.find({ appointmentId }).sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//view patients



// Get scheduled patients for the logged-in doctor
exports.getScheduledPatientsForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // pass doctorId in route or get from token/session

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const patients = await appointmentModel.find(
      { status: "scheduled", doctorId: doctorId }, // filter by doctor
      { patientName: 1, patientEmail: 1, patientId: 1, appointmentDate: 1, appointmentTime: 1, symptoms: 1, hospitalId: 1}// select only these fields
    );

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching scheduled patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
