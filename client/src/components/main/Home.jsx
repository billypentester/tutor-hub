import React from 'react'
import './../../assets/css/home.css'
import Footer from './Footer'
import Nav from './../utils/Nav'
import CTA from './CTA'
import Testimonials from './Testimonials'
import Services from './Services'
import Contactus from './Contactus'
import Aboutus from './Aboutus'
import Loader from '../utils/Loader'
import { useState, useEffect } from 'react'

function Home() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <>
      {isLoaded ? null : <Loader />}
      <Nav />
      <CTA />
      <Services />
      <Testimonials />
      <Aboutus />
      <Contactus />
      <Footer />
    </>
  )
}

export default Home