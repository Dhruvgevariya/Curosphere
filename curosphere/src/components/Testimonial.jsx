import React from 'react'
import { Link } from 'react-router-dom'

import testimonial1 from "../assets/designs/img/testimonial-1.jpg"
import testimonial2 from "../assets/designs/img/testimonial-2.jpg"
import testimonial3 from "../assets/designs/img/testimonial-3.jpg"
import { NavBar } from './elements/NavBar'
import { Testimonials } from './elements/Testimonials'
import { Footer } from './common/Footer'
import { BackToTop } from './elements/BackToTop'
export const Testimonial = () => {
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
        Testimonial
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
            Testimonial
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  {/* Testimonial Start */}
  
 <Testimonials></Testimonials>
  {/* Testimonial End */}
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
