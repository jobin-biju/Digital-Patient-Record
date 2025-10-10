const mongoose = require("mongoose");

const LabReportSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },
  hospitalId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true  
  },
  reportDetails: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LabreportModel = mongoose.model("labreport", LabReportSchema);
module.exports = LabreportModel;