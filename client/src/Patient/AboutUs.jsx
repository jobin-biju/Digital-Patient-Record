import React from "react";
import Navbar from "./Navbar"; // make sure the path is correct
import Footer from "./Footer"; // make sure the path is correct
import { Link } from 'react-router-dom';


function AboutUs() {
  return (
    <>
      <Navbar />

      {/* Breadcrumbs */}
      <div className="breadcrumbs overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 offset-lg-2 col-md-12 col-12">
              <div className="breadcrumbs-content">
                <h1 className="page-title">About Us</h1>
              </div>
              <ul className="breadcrumb-nav">
                <li><a href="/">Home</a></li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-us section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="content-left">
                <img src="assets/images/about/about.png" alt="About" />
                <a href="https://www.youtube.com/watch?v=r44RKWyfcFw" className="glightbox video">
                  <i className="lni lni-play"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="content-right">
                <span className="sub-heading">About</span>
                <h2>Thousands of specialities for any type diagnostic.</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius mod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi aliquip ex ea commodo consequat.
                </p>
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <ul className="list">
                      <li><i className="lni lni-checkbox"></i>Conducts eye health checkups</li>
                      <li><i className="lni lni-checkbox"></i>Best lasik treatment</li>
                      <li><i className="lni lni-checkbox"></i>Treats minor illnesses</li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-12">
                    <ul className="list">
                      <li><i className="lni lni-checkbox"></i>Special eye exam</li>
                      <li><i className="lni lni-checkbox"></i>Contact lens service</li>
                      <li><i className="lni lni-checkbox"></i>Special Retina exam</li>
                    </ul>
                  </div>
                </div>
                <div className="button">
                  <Link to="/about-details" className="btn">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="our-achievement section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-achievement">
                <i className="lni lni-apartment"></i>
                <h3 className="counter">1250</h3>
                <p>Hospital Rooms</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-achievement">
                <i className="lni lni-sthethoscope"></i>
                <h3 className="counter">350</h3>
                <p>Specialist Doctors</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-achievement">
                <i className="lni lni-emoji-smile"></i>
                <h3 className="counter">2500</h3>
                <p>Happy Patients</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-achievement">
                <i className="lni lni-certificate"></i>
                <h3 className="counter">35</h3>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;
