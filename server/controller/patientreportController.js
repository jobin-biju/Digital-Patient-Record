const patientreportModel = require('../model/labpatientreportModel');
const multer = require('multer');
const path = require('path');

exports.acceptPatientReport = async (req, res)=> {
    try {
        const patientreport = await patientreportModel.create(req.body);
        res.json(patientreport);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
}

exports.getpatinetStatus = async (req, res)=>{
    try {
        const status = await patientreportModel.find();
        res.json(status);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});       
    }
}

exports.getAcceptedReports = async (req, res) => {
    try {
        // Only fetch reports with status NOT "Completed"
        const reports = await patientreportModel.find({ status: { $ne: "Completed" } })
            .populate('appointmentId doctorId hospitalId labId');
        res.status(200).json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateLabTestResult = async (req, res) => {
    try {
        const { reportDetails, labfindings } = req.body;
        const reportId = req.body._id; // the _id of the report to update

        if (!reportId) {
            return res.status(400).json({ error: "Report _id is required" });
        }

        // Prepare update object
        let updateData = {
            reportDetails,
            labfindings,
            status: "Completed" // you can update status as needed
        };

        // Handle file if uploaded
        if (req.files && req.files.reportfile) {
            const file = req.files.reportfile;
            const filename = Date.now() + path.extname(file.name);
            await file.mv(path.join(__dirname, '../asset/', filename));
            updateData.reportfile = filename;
        }

        // Update the document
        const updatedReport = await patientreportModel.findByIdAndUpdate(
            reportId,
            { $set: updateData },
            { new: true } // return the updated document
        );

        if (!updatedReport) {
            return res.status(404).json({ error: "Report not found" });
        }

        res.status(200).json({ message: "Report updated successfully", data: updatedReport });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};





// Fetch completed reports — for review/view only
exports.getCompletedReports = async (req, res) => {
    try {
        const reports = await patientreportModel.find({ status: "Completed" })
            .populate('appointmentId doctorId hospitalId labId');
        res.status(200).json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
