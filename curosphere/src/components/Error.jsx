import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from './elements/NavBar'
import { Footer } from './common/Footer'
import { BackToTop } from './elements/BackToTop'

export const Error = () => {
  return (
    <>
  {/* Spinner Start */}
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
  <NavBar></NavBar>
  {/* Navbar End */}
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container py-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
        404 Error
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb text-uppercase mb-0">
          <li className="breadcrumb-item">
            <a className="text-white" href="#">
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a className="text-white" href="#">
              Pages
            </a>
          </li>
          <li
            className="breadcrumb-item text-primary active"
            aria-current="page"
          >
            404 Error
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  {/* 404 Start */}
  <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <i className="bi bi-exclamation-triangle display-1 text-primary" />
          <h1 className="display-1">404</h1>
          <h1 className="mb-4">Page Not Found</h1>
          <p className="mb-4">
            We’re sorry, the page you have looked for does not exist in our
            website! Maybe go to our home page or try to use a search?
          </p>
          <Link className="btn btn-primary rounded-pill py-3 px-5" to="/">
            Go Back To Home
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* 404 End */}
  {/* Footer Start */}
  
  <Footer></Footer>
  {/* Footer End */}
  {/* Back to Top */}
 <BackToTop></BackToTop>
  {/* JavaScript Libraries */}
  {/* Template Javascript */}
</>

  )
}
