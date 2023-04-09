import React from 'react'

function Footer() {
  return (
    
    <footer className="text-center text-lg-start bg-light text-muted">

        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            
            <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
            </div>
            
            <div>
                <a href="" className="me-5 text-primary"><i className="fab fa-facebook-f"></i></a>
                <a href="" className="me-5 text-info"><i className="fab fa-twitter"></i></a>
                <a href="" className="me-5 text-success"><i className="fab fa-google"></i></a>
                <a href="" className="me-5 text-info"><i className="fab fa-instagram"></i></a>
                <a href="" className="me-5 text-danger"><i className="fab fa-linkedin"></i></a>
                <a href="" className="me-5 text-dark"><i className="fab fa-github"></i></a>
            </div>
            
        </section>
        
        <section className="">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">TUTOR HUB INC.</h6>
                        <p>
                            Tutor Hub is an online platform that connects students with qualified and experienced tutors who can provide personalized one-on-one or group lessons in a variety of subjects.
                        </p>
                    </div>
                    
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    
                        <h6 className="text-uppercase fw-bold mb-4">Services</h6>

                        <p><a href="#!" className="text-reset">Find Tutor</a></p>
                        <p><a href="#!" className="text-reset">Create Account</a></p>
                        <p><a href="#!" className="text-reset">FAQs</a></p>
                        <p><a href="#!" className="text-reset">Testimonials</a></p>

                    </div>
                    
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    
                        <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>

                        <p><a href="#!" className="text-reset">About Us</a></p>
                        <p><a href="#!" className="text-reset">Contact Us</a></p>
                        <p><a href="#!" className="text-reset">Help</a></p>
                        <p><a href="#!" className="text-reset">Privacy Policy</a></p>

                    </div>
                    
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    
                        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i className="fas fa-home me-3"></i> COMSATS Unviersity, Lahore</p>
                        <p><i className="fas fa-envelope me-3"></i> tutorhub@official.com </p>
                        <p><i className="fas fa-phone me-3"></i> + 92 332 4187624</p>
                        <p><i className="fas fa-print me-3"></i> + 09 123 4567890</p>

                    </div>
                    
                </div>
            </div>
        </section>
        
        <div className="text-center p-4 bg-info text-light">
            © 2023 Copyright: 
            <a className="text-reset fw-bold" href=""> tutorhub</a>
        </div>
    
    </footer>

  )
}

export default Footer