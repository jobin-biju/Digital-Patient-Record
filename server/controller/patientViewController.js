const appointmentModel = require('../model/appointmentModel');

exports.hospitalPatientView = async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const appointments = await appointmentModel
      .find({ hospitalId })
      .populate('doctorId', 'name specialization')
      .sort({ appointmentDate: 1, appointmentTime: 1 }); // ascending order

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};