import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'

function AdminHospital() {
  const [hospitalName, setHospitalName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState([]); // array of departments
  const [departmentInput, setDepartmentInput] = useState(''); // raw input text
  const [adminPerson, setAdminPerson] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [uploadDocument, setUploadDocument] = useState(null);
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const [password, setPassword] = useState('');

  // convert comma-separated string into array
  const handleDepartmentChange = (e) => {
    setDepartmentInput(e.target.value);
    const values = e.target.value.split(",").map(item => item.trim()).filter(Boolean);
    setDepartment(values);
  };

  const handleHospital = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hospitalName', hospitalName);
    formData.append('registerationNumber', registrationNumber);
    formData.append('Phone', phone);
    formData.append('address', address);
    formData.append('department', JSON.stringify(department)); // send as array
    formData.append('adminPerson', adminPerson);
    formData.append('adminEmail', adminEmail);
    formData.append('adminPhone', adminPhone);
    formData.append('documentUpload', uploadDocument);
    formData.append('hospitalLogo', hospitalLogo);
    formData.append('password', password);

    fetch('http://localhost:4000/DPR/hospitalInsert', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setHospitalName('');
        setRegistrationNumber('');
        setEmail('');
        setPhone('');
        setAddress('');
        setDepartment([]);
        setDepartmentInput('');
        setAdminPerson('');
        setAdminEmail('');
        setAdminPhone('');
        setUploadDocument(null);
        setHospitalLogo(null);
        setPassword('');
      })
  }

  return (
    <>
      <div className="d-flex">
        <div style={{ width: "250px" }}>
          <AdminSidebar />
        </div>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4">
                  <i className="fa-solid fa-hospital"></i> Hospital Registration
                </h3>
                <form>
                  <div className="row g-3">

                    {/* Hospital Name */}
                    <div className="col-md-12">
                      <label className="form-label">Hospital Name</label>
                      <input type="text" className="form-control" placeholder="Enter hospital name"
                        onChange={(e) => setHospitalName(e.target.value)} value={hospitalName} required />
                    </div>

                    {/* Registration Number */}
                    <div className="col-md-12">
                      <label className="form-label">Registration Number</label>
                      <input type="text" className="form-control" placeholder="Enter registration number"
                        onChange={(e) => setRegistrationNumber(e.target.value)} value={registrationNumber} required />
                    </div>

                    {/* Email */}
                    <div className="col-md-12">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>

                    {/* Phone */}
                    <div className="col-md-12">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-control" placeholder="Enter phone number"
                        onChange={(e) => setPhone(e.target.value)} value={phone} required />
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea className="form-control" rows="2" placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)} value={address} required></textarea>
                    </div>

                    {/* Department (comma-separated input) */}
                    <div className="col-md-12">
                      <label className="form-label">Departments</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter departments (comma separated, e.g. Cardiology, Neurology)"
                        value={departmentInput}
                        onChange={handleDepartmentChange}
                        required
                      />
                      <small className="text-muted">
                        Example: Cardiology, Neurology, Pediatrics
                      </small>
                    </div>

                    {/* Admin Contact Person */}
                    <div className="col-md-12">
                      <label className="form-label">Admin Contact Person</label>
                      <input type="text" className="form-control" placeholder="Enter admin person name"
                        onChange={(e) => setAdminPerson(e.target.value)} value={adminPerson} required />
                    </div>

                    {/* Admin Email */}
                    <div className="col-md-12">
                      <label className="form-label">Admin Email</label>
                      <input type="email" className="form-control" placeholder="Enter admin email"
                        onChange={(e) => setAdminEmail(e.target.value)} value={adminEmail} required />
                    </div>

                    {/* Admin Phone */}
                    <div className="col-md-12">
                      <label className="form-label">Admin Phone</label>
                      <input type="tel" className="form-control" placeholder="Enter admin phone number"
                        onChange={(e) => setAdminPhone(e.target.value)} value={adminPhone} required />
                    </div>

                    {/* Upload Document */}
                    <div className="col-md-12">
                      <label className="form-label">Upload Document</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setUploadDocument(e.target.files[0])}
                      />
                    </div>

                    {/* Hospital Logo */}
                    <div className="col-md-12">
                      <label className="form-label">Hospital Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setHospitalLogo(e.target.files[0])}
                      />
                    </div>

                    {/* Password */}
                    <div className="col-md-12">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mt-4">
                    <button type="submit" onClick={handleHospital} className="btn btn-primary">
                      <i className="fa-solid fa-paper-plane"></i> Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHospital
