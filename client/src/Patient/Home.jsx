
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tns } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

import Navbar from "./Navbar";

import Achievements from "./Achievements";
// import CTA from "./CTA";
import Footer from "./Footer"
import Services from "./Services";
import Hospital from "./Hospital";

function Home() {
  const [loading, setLoading] = useState(true); // state for preloader

  useEffect(() => {
    // Hide preloader after 1.5s (simulate loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Hero slider
    const slider = tns({
      container: ".hero-slider",
      slideBy: "page",
      autoplay: true,
      autoplayButtonOutput: false,
      mouseDrag: true,
      gutter: 0,
      items: 1,
      nav: false,
      controls: true,
      controlsText: [
        '<i class="lni lni-chevron-left"></i>',
        '<i class="lni lni-chevron-right"></i>',
      ],
    });

    return () => {
      clearTimeout(timer);
      if (slider && typeof slider.destroy === "function") {
        slider.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* Preloader */}
      {loading && (
        <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      {/* Hero Section */}
      <section className="hero-area">
        <div className="shapes">
          <img src="/assets/images/hero/05.svg" className="shape1" alt="shape" />
          <img src="/assets/images/hero/01.svg" className="shape2" alt="shape" />
        </div>

        <div className="hero-slider">
          {/* Slide 1 */}
          <div className="single-slider">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-text">
                    <div className="section-heading">
                      <h2>
                        Find A Doctor & <br />Book Appointment
                      </h2>
                      <p>
                        Since the first days of operation of MediGrids, our
                        teaming has been focused on building a high-qualities
                        medicals service by MediGrids.
                      </p>
                      <div className="button">
                        <Link to="/appointment" className="btn">
                          Book Appointment
                        </Link>
                        <Link to="/about" className="btn">
                          About Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-image">
                    <img
                      src="/assets/images/hero/02.png"
                      alt="Medical Service"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="single-slider">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-text">
                    <div className="section-heading">
                      <h2>
                        We only give <br /> Best care to your eyes
                      </h2>
                      <p>
                        Since the first days of operation of MediGrids, our
                        teaming has been focused on building a high-qualities
                        medicals service by MediGrids.
                      </p>
                      <div className="button">
                        <Link to="/appointment" className="btn">
                          Book Appointment
                        </Link>
                        <Link to="/about" className="btn">
                          About Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-image">
                    <img
                      src="/assets/images/hero/slider-2.png"
                      alt="Eye Care"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="single-slider">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-text">
                    <div className="section-heading">
                      <h2>
                        Superior solutions that <br /> help you to shine.
                      </h2>
                      <p>
                        Since the first days of operation of MediGrids, our
                        teaming has been focused on building a high-qualities
                        medicals service by MediGrids.
                      </p>
                      <div className="button">
                        <Link to="/appointment" className="btn">
                          Book Appointment
                        </Link>
                        <Link to="/about" className="btn">
                          About Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="hero-image">
                    <img
                      src="/assets/images/hero/slider-3.png"
                      alt="Medical Solutions"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Hospital />
   <Services/>
      <Achievements />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}

export default Home;
