const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",   
    required: true
  },
  medicines: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      days: { type: String, required: true }
    }
  ],
  admitted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
