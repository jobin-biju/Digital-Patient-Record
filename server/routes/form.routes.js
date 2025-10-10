// var express = require('express')
// var router = express.Router()

// var hospitalController = require('../controller/adminhospitalController');
// var loginController = require('../controller/loginController');
// var patientContrller =require('../controller/patientController');
// var doctorController = require('../controller/addDoctorController')
// var updateDoctorController = require('../controller/updateDoctor')
// var addLabController = require('../controller/addLabController')
// var prescriptionController =require('../controller/prescriptionController');
// var patientViewController = require('../controller/patientViewController')
// var addPharmacyController =require('../controller/addPharmacyController');
// var appointmentController = require('../controller/appointmentController')

// router.post('/hospitalInsert',hospitalController.hospitalInsert);
// router.get("/hospitalview", hospitalController.getHospitals);
// router.post('/login', loginController.userLogin);
// router.post('/patientInsert',patientContrller.PatientInsert);
// router.post('/addDoctor', doctorController.addDoctors);
// router.post('/doctorview', doctorController.hospitalDoctorView);
// router.post('/doctoreditview', updateDoctorController.editDoctor);
// router.put('/doctorupdate', updateDoctorController.updateDoctor);
// router.post('/doctordelete', doctorController.deleteDoctor);
// router.post('/addSchedule', doctorController.addSchedule);
// router.get("/getSchedules/:doctorId", doctorController.getSchedules);
// router.put("/updateSchedule", doctorController.updateSchedule);
// router.post('/deleteSchedule/', doctorController.deleteSchedule);

// router.post('/addLab', addLabController.addLabs);
// router.post('/labView', addLabController.labView);
// router.post('/getLabById', addLabController.getLabById);
// router.put('/labUpdate', addLabController.labUpdate)
// router.post('/labDelete', addLabController.labDelete);
// router.get("/available-hospitals", patientContrller.getAvailableHospitals);
// router.post('/department-doctors', patientContrller.getDoctorsByDepartment);
// router.post('/book-appointment', patientContrller.bookAppointment);
// router.post('/doctor-appointments', patientContrller.getDoctorAppointments);
// router.get('/scheduled-patients', patientContrller.getScheduledPatients);

// router.patch('/schedule-consultation/:id', patientContrller.scheduleConsultation);
// router.get('/doctor-schedule/:doctorId/:appointmentDate', doctorController.getDoctorSchedule);
// router.post('/check-appointment-availability', patientContrller.checkAppointmentAvailability);

// router.post('/add',prescriptionController.addPrescription);
// router.get("/prescriptions/:appointmentId", prescriptionController.getPrescriptionsByPatient);
// router.get("/scheduled-patients/:doctorId", prescriptionController.getScheduledPatientsForDoctor);

// router.post('/hospitalpatientview', patientViewController.hospitalPatientView);


// router.post('/addPharamacy', addPharmacyController.addPharmacy);
// router.post('/pharmaciesView', addPharmacyController.pharmacyView);

// router.post('/hospitalappointmentview', appointmentController.hospitalAppointmentView)

// module.exports=router



var express = require('express')
var router = express.Router()
var path = require('path')



var hospitalController = require('../controller/adminhospitalController');
var loginController = require('../controller/loginController');
var patientContrller =require('../controller/patientController');
var doctorController = require('../controller/addDoctorController')
var updateDoctorController = require('../controller/updateDoctor')
var addLabController = require('../controller/addLabController')
var prescriptionController =require('../controller/prescriptionController');
var patientViewController = require('../controller/patientViewController')
var appointmentController = require('../controller/appointmentController')
var addPharmacyController =require('../controller/addPharmacyController');
var labReportController = require("../controller/labReportController");
var admindocttorViewController = require("../controller/admindoctorViewController");
var labController = require("../controller/labController");
var patientreportController = require("../controller/patientreportController");
var transferController = require("../controller/transferController");
var patientTransferController = require('../controller/patientTransferController');
var transferDataViewController = require('../controller/transferdataViewController')
const contactController = require('../controller/contactController');


router.post('/hospitalInsert',hospitalController.hospitalInsert);
router.get("/hospitalview", hospitalController.getHospitals);
router.post('/login', loginController.userLogin);
router.post('/patientInsert',patientContrller.PatientInsert);
router.post('/addDoctor', doctorController.addDoctors);
router.post('/doctorview', doctorController.hospitalDoctorView);
router.post('/doctoreditview', updateDoctorController.editDoctor);
router.put('/doctorupdate', updateDoctorController.updateDoctor);
router.post('/doctordelete', doctorController.deleteDoctor);
router.post('/addSchedule', doctorController.addSchedule);
router.get("/getSchedules/:doctorId", doctorController.getSchedules);
router.put("/updateSchedule", doctorController.updateSchedule);
router.post('/deleteSchedule/', doctorController.deleteSchedule);

router.post('/addLab', addLabController.addLabs);
router.post('/labView', addLabController.labView);
router.post('/getLabById', addLabController.getLabById);
router.put('/labUpdate', addLabController.labUpdate)
router.post('/labDelete', addLabController.labDelete);
router.get("/available-hospitals", patientContrller.getAvailableHospitals);
router.post('/department-doctors', patientContrller.getDoctorsByDepartment);
router.post('/book-appointment', patientContrller.bookAppointment);
router.post('/doctor-appointments', patientContrller.getDoctorAppointments);
router.get('/scheduled-patients', patientContrller.getScheduledPatients);

router.patch('/schedule-consultation/:id', patientContrller.scheduleConsultation);
router.get('/doctor-schedule/:doctorId/:appointmentDate', doctorController.getDoctorSchedule);
router.post('/check-appointment-availability', patientContrller.checkAppointmentAvailability);
router.post('/patient-appointments', patientContrller.getPatientAppointments);
router.post('/cancel-appointment', patientContrller.cancelAppointment);
router.post('/patient-profile', patientContrller.getPatientProfile);
router.post('/update-patient-profile', patientContrller.updatePatientProfile);
router.patch('/complete-appointment/:appointmentId',patientContrller.updateappointmentstatus)



router.post('/add',prescriptionController.addPrescription);
router.get("/prescriptions/:appointmentId", prescriptionController.getPrescriptionsByPatient);
router.get("/scheduled-patients/:doctorId", prescriptionController.getScheduledPatientsForDoctor);
router.post('/hospitalpatientview', patientViewController.hospitalPatientView);


router.post('/addPharamacy', addPharmacyController.addPharmacy);
router.post('/pharmaciesView', addPharmacyController.pharmacyView);
router.post('/hospitalappointmentview', appointmentController.hospitalAppointmentView)

router.post('/add-labreport',labReportController.addLabReport)
router.post('/getlabreports',labReportController.getLabReportDoctor)

router.get('/getAllDoctors', admindocttorViewController.getAllDoctors)
router.get('/adminviewlab', admindocttorViewController.adminlabView)



router.post('/viewLabreportForLab', labController.getLabReportsForLab);

router.post('/addLabReport', patientreportController.acceptPatientReport);
router.get('/viewpatinetreportlab', patientreportController.getpatinetStatus)
router.get('/acceptedreport', patientreportController.getAcceptedReports)
router.put('/updateLabTestResult', patientreportController.updateLabTestResult)
router.get('/completedreport', patientreportController.getCompletedReports);

router.get('/allhospitals', transferController.viewAllHospitals); 
router.post('/transferPatient', transferController.transferPatient); 




router.get('/appointment/:id',patientTransferController.getAppointmentById);
router.get('/prescriptions/:appointmentId', patientTransferController.getPrescriptionsByAppointment);
router.get('/labreports/:appointmentId', patientTransferController.getLabReportsByAppointment);
router.get("/hospital-doctors-by-login/:loginId", patientTransferController.getDoctorsByLogin);
router.post('/doctortransferPatient', patientTransferController.transferPatientData);

router.post('/doctortransferdata', transferDataViewController.getTransferData)
router.post('/patienttransferdataview', transferDataViewController.getTransferDataDoctor)

//aj
router.get('/getpatientprescription', patientContrller.getPatientPrescriptions);
router.get('/patient/lab-reports', patientContrller.getPatientLabReports);
router.post('/contact-us', contactController.submitContact);

router.use('/assets', express.static(path.join(__dirname, '../asset')));


router.get('/getpatienttransfers', patientContrller.getPatientTransfers);
router.get('/getdoctransfers', patientContrller.getDoctorTransfersForPatient);


module.exports=router