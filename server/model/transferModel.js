// models/Transfer.js
const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient", // reference to Patient collection
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment", // reference to Appointment collection
    required: true,
  },
  fromHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital", // hospital where the patient is currently registered
    required: true,
  },
  toHospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital", // hospital where the patient is transferred
    required: true,
  },
  transferDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transfer", transferSchema);
