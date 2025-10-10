import React from "react";
import { Link } from "react-router-dom";

function Services() {
  return (
    <section className="about-us section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left content */}
          <div className="col-lg-6 col-md-12 col-12">
            <div className="content-left wow fadeInLeft" data-wow-delay=".3s">
              <img src="/assets/images/about/about.png" alt="About Us" />
              <a
                href="https://www.youtube.com/watch?v=r44RKWyfcFw"
                className="glightbox video"
              >
                <i className="lni lni-play"></i>
              </a>
            </div>
          </div>

          {/* Right content */}
          <div className="col-lg-6 col-md-12 col-12">
            <div className="content-right wow fadeInRight" data-wow-delay=".5s">
              <span className="sub-heading">About</span>
              <h2>
                Thousands of specialities for any <br /> type diagnostic.
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eius mod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi aliquip ex ea commodo consequat.
              </p>

              <div className="row">
                <div className="col-lg-6 col-12">
                  <ul className="list">
                    <li>
                      <i className="lni lni-checkbox"></i> Conducts eye health
                      checkups
                    </li>
                    <li>
                      <i className="lni lni-checkbox"></i> Best lasik treatment
                    </li>
                    <li>
                      <i className="lni lni-checkbox"></i> Treats minor
                      illnesses
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 col-12">
                  <ul className="list">
                    <li>
                      <i className="lni lni-checkbox"></i> Special eye exam
                    </li>
                    <li>
                      <i className="lni lni-checkbox"></i> Contact lens service
                    </li>
                    <li>
                      <i className="lni lni-checkbox"></i> Special Retina exam
                    </li>
                  </ul>
                </div>
              </div>
{/* 
              <div className="button">
                <Link to="/about" className="btn">
                  More About Us
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

