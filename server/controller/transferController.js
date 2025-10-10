const HospitalModel = require('../model/form.adminhospitalModel')
const transferModel = require('../model/transferModel')
const appointmentModel = require('../model/appointmentModel'); // Add this import
const mongoose = require('mongoose');

exports.viewAllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalModel.find();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.transferPatient = async (req, res) => {
  try {
    const { appointmentId, fromHospitalId, hospitalId } = req.body;

    if (!appointmentId || !fromHospitalId || !hospitalId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch the appointment to get the correct patientId
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const patientId = appointment.patientId; // This is the correct patientId

    const newTransfer = new transferModel({
      patientId,
      appointmentId,
      fromHospitalId,
      toHospitalId: hospitalId,
    });

    await newTransfer.save();

    res.status(201).json({
      message: "Patient transferred successfully",
      transfer: newTransfer,
    });
  } catch (err) {
    console.error("Error transferring patient:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};