import React from "react";
import "./DoctorTimetable.css"; // optional CSS
import Navbar from "./Navbar";

function DoctorTimetable() {
  return (
    <>
      <Navbar />
    <section className="doctor-calendar-area section">
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              
              <h2
                className="wow fadeInUp"
                data-wow-delay=".4s"
                style={{ visibility: "visible", animationDelay: ".4s", animationName: "fadeInUp" }}
              >
                Determine Your Date to Come
              </h2>
              <p
                className="wow fadeInUp"
                data-wow-delay=".6s"
                style={{ visibility: "visible", animationDelay: ".6s", animationName: "fadeInUp" }}
              >
                There are many variations of passages of Lorem Ipsum available, but the majority have
                suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="doctor-calendar-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="time">9.00</span></td>
                    <td><h3>Dr. Tanner</h3><span>Dermatologists</span></td>
                    <td><h3>Dr. Kwak</h3><span>Ear, Nose</span></td>
                    <td><h3>Dr. Slaughter</h3><span>Neurologist</span></td>
                    <td></td>
                    <td><h3>Dr. Foley</h3><span>Oncologist</span></td>
                    <td><h3>Dr. Palmer</h3><span>Maxine lowe</span></td>
                  </tr>

                  <tr>
                    <td><span className="time">12.00</span></td>
                    <td></td>
                    <td><h3>Dr. Megahead</h3><span>Orthopedics</span></td>
                    <td><h3>Dr. Neupane</h3><span>Pain Management</span></td>
                    <td><h3>Dr. Breidin</h3><span>Radiologist</span></td>
                    <td></td>
                    <td><h3>Dr. Pipe</h3><span>Surgeons</span></td>
                  </tr>

                  <tr>
                    <td><span className="time">15.00</span></td>
                    <td><h3>Dr. Tanner</h3><span>Dermatologists</span></td>
                    <td><h3>Dr. Kwak</h3><span>Ear, Nose</span></td>
                    <td></td>
                    <td><h3>Dr. Slaughter</h3><span>Neurologist</span></td>
                    <td><h3>Dr. Foley</h3><span>Oncologist</span></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><span className="time">18.00</span></td>
                    <td><h3>Dr. Slaughter</h3><span>Neurologist</span></td>
                    <td><h3>Dr. Megahead</h3><span>Orthopedics</span></td>
                    <td><h3>Dr. Neupane</h3><span>Pain Management</span></td>
                    <td><h3>Dr. Breidin</h3><span>Radiologist</span></td>
                    <td><h3>Dr. Kwak</h3><span>Ear, Nose</span></td>
                    <td><h3>Dr. Pipe</h3><span>Surgeons</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
  ;
}

export default DoctorTimetable;
