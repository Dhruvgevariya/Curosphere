import React from 'react'

import { NavBar } from './elements/NavBar'
import { Header } from './elements/Header'
import { Aboutus } from './elements/Aboutus'
import { Services } from './elements/Services'
import { Features } from './elements/Features'
import { Teams } from './elements/Teams'
import { Appointments } from './elements/Appointments'
import { Testimonials } from './elements/Testimonials'
import { Footer } from './common/Footer'
import { BackToTop } from './elements/BackToTop'


export const HomePage = () => {
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
   
    {/* Navbar Start */}
   
    <NavBar></NavBar>
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
    {/* Team Start */}
    
    <Teams></Teams>
    {/* Team End */}
    {/* Appointment Start */}
   
    {/* <Appointments></Appointments> */}
    {/* Appointment End */}
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


