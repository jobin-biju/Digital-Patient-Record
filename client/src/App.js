// import logo from './logo.svg';
// import './App.css';
// import AdminSidebar from './Admin/AdminSidebar';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AdminHospital from './Admin/AdminHospital';
// import AdminHospitalView from './Admin/AdminHospitalView';
// import AdminDoctors from './Admin/AdminDoctors';
// import Login from './Login/login';
// import Registration from './Patient/Registration'
// import React, { useState } from 'react';
// import Home from './Patient/Home';
// import HospitalSidebar from './Hospital/HospitalSidebar';
// import HospitalDoctorView from './Hospital/HospitalDoctorView';
// import AddDoctor from './Hospital/AddDoctor';
// import DoctorUpdate from './Hospital/DoctorUpdate';
// import PatientDetails from './Hospital/PatientDetails';
// import AddLab from './Hospital/AddLab';
// import LabView from './Hospital/LabView';
// import LabEdit from './Hospital/LabEdit';

// function App() {
//   const[auth]= useState(JSON.parse(localStorage.getItem("yourstorage")))
//   return (
//     <BrowserRouter>
//     {auth == null ?(
//       <Routes>
//       <Route path='/' element={<Login/>}></Route>
//       <Route path='/register' element={<Registration/>}></Route>
//       </Routes>
//     ):auth.userType == 1?(
//         <Routes>
//         <Route path='/' element={<AdminSidebar/>}></Route>
//         <Route path='/hospital' element={<AdminHospital/>}></Route>
//         <Route path='/hospitalview' element={<AdminHospitalView/>}></Route>
//         <Route path='/doctorview' element={<AdminDoctors/>}></Route>
//       </Routes>
//     ):auth.userType == 2?(
//         <Routes>
//         <Route path='/' element={<HospitalSidebar/>}></Route>
//         <Route path='/hospitaldoctorview' element={<HospitalDoctorView/>}/>
//         <Route path='/addDoctor' element={<AddDoctor/>}></Route>
//         <Route path='/updateDoctor' element={<DoctorUpdate/>}></Route>
//         <Route path='/hospitalpatientview' element={<PatientDetails/>}></Route>
//         <Route path='/hospitallabview' element={<LabView/>}></Route>
//         <Route path='/hospitallabadd' element={<AddLab/>}></Route>
//         <Route path='/hospitallabedit' element={<LabEdit/>}></Route>


//       </Routes>
//     ):auth.userType == 3?(
//       <Route path='/' element={<Home/>}></Route>
//     ):null} 
//     </BrowserRouter>
//   );
// }

// export default App;



import logo from './logo.svg';
import './App.css';
import AdminSidebar from './Admin/AdminSidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHospital from './Admin/AdminHospital';
import AdminHospitalView from './Admin/AdminHospitalView';
import AdminDoctors from './Admin/AdminDoctors';
import Login from './Login/login';
import Registration from './Patient/Registration'
import React, { useState } from 'react';
import Home from './Patient/Home';
import HospitalSidebar from './Hospital/HospitalSidebar';
import HospitalDoctorView from './Hospital/HospitalDoctorView';
import AddDoctor from './Hospital/AddDoctor';
import DoctorUpdate from './Hospital/DoctorUpdate';
import PatientDetails from './Hospital/PatientDetails';
import AddLab from './Hospital/AddLab';
import LabView from './Hospital/LabView';
import LabEdit from './Hospital/LabEdit';
import DoctorDetails from './Hospital/DoctorsDetails';
import AddPharmacy from './Hospital/AddPharmacy';
import PharmacyView from './Hospital/PharmacyView';
import Appointments from './Hospital/Appointments';

import DoctorSideBar from './Doctor/DoctorSideBar';
import DoctorDashboard from './Doctor/DoctorDashboard';
import DoctorPatients from './Doctor/DoctorPatients';
import DoctorAppointments from './Doctor/DoctorAppointments';
import DoctorPrescriptions from './Doctor/DoctorPrescriptions';
import DoctorReports from './Doctor/DoctorReports';
import AddPrescription from './Doctor/AddPrescription';
import ViewPrescriptions from './Doctor/ViewPrescriptions';

import AboutUs from './Patient/AboutUs';
import Appointment from './Patient/Appointment';
import DoctorTimetable from './Patient/DoctorTimetable'
import Myappoinment from './Patient/Myappoinment'
import PatientDashboard from './Patient/PatientDashboard';
import MedicalReports from './Patient/MedicalReports';
import Prescriptions from './Patient/Prescriptions';
import ProfileUpdate from './Patient/ProfileUpdate';
import AvailableHospitals from './Patient/AvailableHospitals';
import HospitalDetails from './Patient/HospitalDetails';
import DepartmentDoctors from './Patient/DepartmentDoctors';
import BookAppointment from './Patient/BookAppointment';
import LabViewAdmin from './Admin/LabViewAdmin';
import Aduit from './Admin/Aduit';
import DashboardHospital from './Hospital/DashboardHospital'
import LabHome from './Lab/LabHome';
import LabReport from './Lab/LabReport';
import LabResult from './Lab/LabResult';
import History from './Lab/History';
import TransferData from './Hospital/TransferData';
import TransferPatientData from './Doctor/TransferPatientData';
import ViewTransferData from './Hospital/ViewTransferData';
import ViewTransferPatients from './Doctor/ViewTransferPatients';
import ContactUs from './Patient/Contact';
import Transfer from './Patient/Transfer';
import DoctorTransfers from './Patient/DoctorTransfers';

function App() {
  const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))
  return (
    <BrowserRouter>
      {auth == null ? (
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/AboutUs' element={<AboutUs />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
      ) : auth.userType == 1 ? (
        <Routes>
          <Route path='/' element={<AdminSidebar />}></Route>
          <Route path='/hospital' element={<AdminHospital />}></Route>
          <Route path='/hospitalview' element={<AdminHospitalView />}></Route>
          <Route path='/doctorview' element={<AdminDoctors />}></Route>
          <Route path='/getAllDoctors' element={<AdminDoctors />}></Route>
          <Route path='/adminlabview' element={<LabViewAdmin />}></Route>
          <Route path='/adminaudit' element={<Aduit />}></Route>
        </Routes>
      ) : auth.userType == 2 ? (
        <Routes>
          {/* <Route path='/' element={<HospitalSidebar/>}></Route>
        <Route path='/hospitaldoctorview' element={<HospitalDoctorView/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}></Route>
        <Route path='/updateDoctor' element={<DoctorUpdate/>}></Route>
        <Route path='/hospitalpatientview' element={<PatientDetails/>}></Route>
        <Route path='/hospitallabview' element={<LabView/>}></Route>
        <Route path='/hospitallabadd' element={<AddLab/>}></Route>
        <Route path='/hospitallabedit' element={<LabEdit/>}></Route> */}
          <Route path='/' element={<HospitalSidebar />}></Route>
          <Route path='/hospitaldoctorview' element={<HospitalDoctorView />} />
          <Route path='/addDoctor' element={<AddDoctor />}></Route>
          <Route path='/updateDoctor' element={<DoctorUpdate />}></Route>
          <Route path='/hospitalpatientview' element={<PatientDetails />}></Route>
          <Route path='/hospitallabview' element={<LabView />}></Route>
          <Route path='/hospitallabadd' element={<AddLab />}></Route>
          <Route path='/hospitallabedit' element={<LabEdit />}></Route>
          <Route path='/doctorDetails' element={<DoctorDetails />} />
          <Route path='/addPharmacy' element={<AddPharmacy />} />
          <Route path='/pharmacyView' element={<PharmacyView />} />
          <Route path='/hospitalappointment' element={<Appointments />} />
          <Route path='/hospitaldashboard' element={<DashboardHospital />} />
          <Route path='/transferdata' element={<TransferData />} />
          <Route path='/viewtransferdata' element={<ViewTransferData />} />




        </Routes>
      ) : auth.userType == 3 ? (
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/AboutUs' element={<AboutUs />}></Route>
          <Route path='/Appointment' element={<Appointment />}></Route>
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/DoctorTimetable' element={< DoctorTimetable />}></Route>
          <Route path='/Transfer' element={<Transfer />}></Route>
          <Route path='/DoctorTransfers' element={<DoctorTransfers />}></Route>
          <Route path='/PatientDashboard' element={< PatientDashboard />}></Route>
          <Route path="/medical-reports" element={<MedicalReports />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/Myappoinment" element={<Myappoinment />} />
          <Route path="/profile" element={<ProfileUpdate />} />
          <Route path="/AvailableHospitals" element={<AvailableHospitals />} />
          <Route path="/hospital/:hospitalId" element={<HospitalDetails />} />
          <Route path="/hospital/:hospitalId/department/:departmentName" element={<DepartmentDoctors />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        </Routes>

      ) : auth.userType == 4 ? (
        <Routes>
          <Route path='/' element={<DoctorSideBar />}></Route>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
          <Route path="/doctor/reports" element={<DoctorReports />} />
          <Route path="/addprescription" element={<AddPrescription />} />
          <Route path="/viewprescriptions" element={<ViewPrescriptions />} />
          <Route path="/transferpatient" element={<TransferPatientData />} />
          <Route path="/transferpatientview" element={<ViewTransferPatients />} />

        </Routes>
      ) : auth.userType == 5 ? (
        <Routes>
          <Route path='/' element={<LabHome />} />
          <Route path='/labreport' element={<LabReport />} />
          <Route path='/acceptedeport' element={<LabResult />} />
          <Route path='/history' element={<History />} />



        </Routes>
      ) : null}
    </BrowserRouter>
  );
}

export default App;


