
import React from "react";

function Achievements() {
  return (
    <section className="our-achievement section">
      <div className="container">
        <div className="row">
          {/* Hospital Rooms */}
          <div className="col-lg-3 col-md-3 col-12">
            <div className="single-achievement wow fadeInUp" data-wow-delay=".2s">
              <i className="lni lni-apartment"></i>
              <h3 className="counter">
                <span id="secondo1" className="countup" data-cup-end="1250">
                  1250
                </span>
              </h3>
              <p>Hospital Rooms</p>
            </div>
          </div>

          {/* Specialist Doctors */}
          <div className="col-lg-3 col-md-3 col-12">
            <div className="single-achievement wow fadeInUp" data-wow-delay=".4s">
              <i className="lni lni-sthethoscope"></i>
              <h3 className="counter">
                <span id="secondo2" className="countup" data-cup-end="350">
                  350
                </span>
              </h3>
              <p>Specialist Doctors</p>
            </div>
          </div>

          {/* Happy Patients */}
          <div className="col-lg-3 col-md-3 col-12">
            <div className="single-achievement wow fadeInUp" data-wow-delay=".6s">
              <i className="lni lni-emoji-smile"></i>
              <h3 className="counter">
                <span id="secondo3" className="countup" data-cup-end="2500">
                  2500
                </span>
              </h3>
              <p>Happy Patients</p>
            </div>
          </div>

          {/* Years of Experience */}
          <div className="col-lg-3 col-md-3 col-12">
            <div className="single-achievement wow fadeInUp" data-wow-delay=".6s">
              <i className="lni lni-certificate"></i>
              <h3 className="counter">
                <span id="secondo4" className="countup" data-cup-end="35">
                  35
                </span>
              </h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
