import React from 'react'
import './../../assets/css/home.css'
import Footer from './Footer'
import Nav from './../utils/Nav'
import CTA from './CTA'
import Testimonials from './Testimonials'
import Services from './Services'
import Contactus from './Contactus'

function Home() {
  return (
    <>
      <Nav />
      <CTA />
      <Services />
      <Testimonials />
      <Contactus />
      <Footer />
    </>
  )
}

export default Home