import React from 'react'
import testimonial1 from "../../assets/designs/img/testimonial-1.jpg"
import testimonial2 from "../../assets/designs/img/testimonial-2.jpg"
import testimonial3 from "../../assets/designs/img/testimonial-3.jpg"

export const Testimonials = () => {
  return (
    <div>
         <div className="container-xxl py-5 bg-light" >
              <div className="container">
                <div
                  className="text-center mx-auto mb-5 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{ maxWidth: 600 }}
                >
                  <p className="d-inline-block border rounded-pill py-1 px-4">
                    Testimonial
                  </p>
                  <h1>What Say Our Patients!</h1>
                </div>
                <div id="testimonialCarousel" className="carousel slide carousel-dark" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="testimonial-item text-center">
                        <img
                          className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                          src={testimonial1}
                          style={{ width: 100, height: 100 }}
                          alt="Testimonial 1"
                        />
                        <div className="testimonial-text rounded text-center p-4" >
                          <p>
                            Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                            duo labore sed sed. Magna ut diam sit et amet stet eos sed clita
                            erat magna elitr erat sit sit erat at rebum justo sea clita.
                          </p>
                          <h5 className="mb-1">Patient Name 1</h5>
                          <span className="fst-italic">Profession</span>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="testimonial-item text-center">
                        <img
                          className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                          src={testimonial2}
                          style={{ width: 100, height: 100 }}
                          alt="Testimonial 2"
                        />
                        <div className="testimonial-text rounded text-center p-4">
                          <p>
                            Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                            duo labore sed sed. Magna ut diam sit et amet stet eos sed clita
                            erat magna elitr erat sit sit erat at rebum justo sea clita.
                          </p>
                          <h5 className="mb-1">Patient Name 2</h5>
                          <span className="fst-italic">Profession</span>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="testimonial-item text-center">
                        <img
                          className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                          src={testimonial3}
                          style={{ width: 100, height: 100 }}
                          alt="Testimonial 3"
                        />
                        <div className="testimonial-text rounded text-center p-4 ">
                          <p>
                            Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                            duo labore sed sed. Magna ut diam sit et amet stet eos sed clita
                            erat magna elitr erat sit sit erat at rebum justo sea clita.
                          </p>
                          <h5 className="mb-1">Patient Name 3</h5>
                          <span className="fst-italic">Profession</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev" style={{position:"absolute", bottom:"50px"}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next" style={{position:"absolute", bottom:"50px"}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
    </div>
  )
}
