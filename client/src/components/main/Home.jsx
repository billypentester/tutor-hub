import React from 'react'
import './../../assets/css/home.css'
import Footer from './Footer'
import Testimonials from './Testimonials'
import Services from './Services'
import Contactus from './Contactus'

function Home() {
  return (
    <div>
      <section class="container-fluid">
        <div class="row">
          <div class="col-lg-6 mx-auto text-center">
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height:'100vh' }}>
              <h1>
                <strong>Personalized <span className="text-primary">Learning Solutions</span> </strong>
                </h1>
              <p class="lead">Find Your Perfect Tutor!</p>
              <div className="my-3">
                <a href="/signup" class="btn btn-primary mx-2">Get Started</a>
                <a href="/learnmore" class="btn btn-outline-primary mx-2">Learn More</a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 m-0 p-0 text-center">
            <div className="background"></div>
          </div>
        </div>
      </section>


      <Services />
      <Testimonials />
      
      <Contactus />
      <Footer />
    </div>
  )
}

export default Home