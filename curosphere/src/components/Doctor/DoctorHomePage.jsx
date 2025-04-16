import React from 'react'

import { AddDoctor } from './AddDoctor'
import { DocNavBar } from '../common/DocNavBar'
import { Header } from '../elements/Header'
import { Aboutus } from '../elements/Aboutus'
import { Services } from '../elements/Services'
import { Features } from '../elements/Features'
import { Teams } from '../elements/Teams'
import { Appointments } from '../elements/Appointments'
import { Footer } from '../common/Footer'
import { Testimonials } from '../elements/Testimonials'
import { BackToTop } from '../elements/BackToTop'


export const DoctorHomePage = () => {
  return (
    <>
    <meta charSet="utf-8" />
    <title>Curosphere</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="keywords" />
    <meta content="" name="description" />
    
    {/* <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-grow text-primary"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
    {/* Spinner End */}
    {/* Topbar Start */}
    {/* <div
      className="container-fluid bg-light p-0 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-map-marker-alt text-primary me-2" />
            <small>123 Street, New York, USA</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center py-3">
            <small className="far fa-clock text-primary me-2" />
            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-phone-alt text-primary me-2" />
            <small>+012 345 6789</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center">
            <a
              className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
              href=""
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
              href=""
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
              href=""
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              className="btn btn-sm-square rounded-circle bg-white text-primary me-0"
              href=""
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    </div> */}
    {/* Topbar End */}
    {/* Navbar Start */}
      <DocNavBar></DocNavBar>
    {/* Navbar End */}
    {/* Header Start */}
   
   
<Header></Header>
    {/* Header End */}
    {/* About Start */}
   
    <Aboutus></Aboutus>
    {/* About End */}
    {/* Service Start */}
 
    <Services></Services>
    {/* Service End */}
    {/* Feature Start */}
   
    <Features></Features>
    {/* Feature End */}
    {/* Add Doctor Start */}
    <AddDoctor/>
    {/* Add Doctor End */}
    {/* Team Start */}
    {/* <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: 600 }}
        >
          <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
          <h1>Our Experience Doctors</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src={team1} alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Doctor Name</h5>
                <p className="text-primary">Department</p>
                <div className="team-social text-center">
                  <a className="btn btn-square" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src={team2} alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Doctor Name</h5>
                <p className="text-primary">Department</p>
                <div className="team-social text-center">
                  <a className="btn btn-square" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src={team3} alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Doctor Name</h5>
                <p className="text-primary">Department</p>
                <div className="team-social text-center">
                  <a className="btn btn-square" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src={team4} alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Doctor Name</h5>
                <p className="text-primary">Department</p>
                <div className="team-social text-center">
                  <a className="btn btn-square" href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square" href="">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <Teams></Teams>
    {/* Team End */}
    {/* Appointment Start */}
    {/* <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="d-inline-block border rounded-pill py-1 px-4">
              Appointment
            </p>
            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                style={{ width: 55, height: 55 }}
              >
                <i className="fa fa-phone-alt text-primary" />
              </div>
              <div className="ms-4">
                <p className="mb-2">Call Us Now</p>
                <h5 className="mb-0">+012 345 6789</h5>
              </div>
            </div>
            <div className="bg-light rounded d-flex align-items-center p-5">
              <div
                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                style={{ width: 55, height: 55 }}
              >
                <i className="fa fa-envelope-open text-primary" />
              </div>
              <div className="ms-4">
                <p className="mb-2">Mail Us Now</p>
                <h5 className="mb-0">info@example.com</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
              <form>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Your Name"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="email"
                      className="form-control border-0"
                      placeholder="Your Email"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Your Mobile"
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <select
                      className="form-select border-0"
                      style={{ height: 55 }}
                    >
                      <option selected="">Choose Doctor</option>
                      <option value={1}>Doctor 1</option>
                      <option value={2}>Doctor 2</option>
                      <option value={3}>Doctor 3</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="date" id="date" data-target-input="nearest">
                      <input
                        type="text"
                        className="form-control border-0 datetimepicker-input"
                        placeholder="Choose Date"
                        data-target="#date"
                        data-toggle="datetimepicker"
                        style={{ height: 55 }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="time" id="time" data-target-input="nearest">
                      <input
                        type="text"
                        className="form-control border-0 datetimepicker-input"
                        placeholder="Choose Date"
                        data-target="#time"
                        data-toggle="datetimepicker"
                        style={{ height: 55 }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      placeholder="Describe your problem"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <Appointments></Appointments>
    {/* Appointment End */}
    {/* Testimonial Start */}
    
     {/* <div className="container-xxl py-5">
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
    </div> */}
    <Testimonials></Testimonials>
    {/* Testimonial End */}
    {/* Footer Start */}
    <Footer></Footer>
    {/* Footer End */}
    {/* Back to Top */}
    {/* <a
      href="#"
      className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
    >
      <i className="bi bi-arrow-up"  style={{position:"absolute",right:"13px"}}/>
    </a> */}
    <BackToTop></BackToTop>
    {/* JavaScript Libraries */}
    {/* Template Javascript */}
  </>
  )
}


