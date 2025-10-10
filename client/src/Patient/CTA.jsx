import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <>
      {/* Call to Action Section */}
      <section className="call-action section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <div className="inner">
                <div className="content text-center">
                  <h2 className="wow fadeInUp" data-wow-delay=".4s">
                    Currently You are using free <br />
                    Lite version of MediGrids
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay=".6s">
                    Please, purchase full version of the template to get all
                    pages, <br /> features and commercial license.
                  </p>
                  <div className="button wow fadeInUp" data-wow-delay=".8s">
                    <Link to="/purchase" className="btn">
                      Purchase Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CTA;
