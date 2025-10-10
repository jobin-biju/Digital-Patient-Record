// models/DoctorSchedule.js
const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  daysOfWeek: [{ type: String, required: true }], // Array of strings
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
