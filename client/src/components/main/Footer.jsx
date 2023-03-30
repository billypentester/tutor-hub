import React from 'react'

function Footer() {
  return (
    
    <footer class="text-center text-lg-start bg-light text-muted">

        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            
            <div class="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
            </div>
            
            <div>
                <a href="" class="me-5 text-primary"><i class="fab fa-facebook-f"></i></a>
                <a href="" class="me-5 text-info"><i class="fab fa-twitter"></i></a>
                <a href="" class="me-5 text-success"><i class="fab fa-google"></i></a>
                <a href="" class="me-5 text-info"><i class="fab fa-instagram"></i></a>
                <a href="" class="me-5 text-danger"><i class="fab fa-linkedin"></i></a>
                <a href="" class="me-5 text-dark"><i class="fab fa-github"></i></a>
            </div>
            
        </section>
        
        <section class="">
            <div class="container text-center text-md-start mt-5">
                <div class="row mt-3">
                    
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">TUTOR HUB INC.</h6>
                        <p>
                            Tutor Hub is an online platform that connects students with qualified and experienced tutors who can provide personalized one-on-one or group lessons in a variety of subjects.
                        </p>
                    </div>
                    
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    
                        <h6 class="text-uppercase fw-bold mb-4">Services</h6>

                        <p><a href="#!" class="text-reset">Find Tutor</a></p>
                        <p><a href="#!" class="text-reset">Create Account</a></p>
                        <p><a href="#!" class="text-reset">FAQs</a></p>
                        <p><a href="#!" class="text-reset">Testimonials</a></p>

                    </div>
                    
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    
                        <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>

                        <p><a href="#!" class="text-reset">About Us</a></p>
                        <p><a href="#!" class="text-reset">Contact Us</a></p>
                        <p><a href="#!" class="text-reset">Help</a></p>
                        <p><a href="#!" class="text-reset">Privacy Policy</a></p>

                    </div>
                    
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i class="fas fa-home me-3"></i> COMSATS Unviersity, Lahore</p>
                        <p><i class="fas fa-envelope me-3"></i> tutorhub@official.com </p>
                        <p><i class="fas fa-phone me-3"></i> + 92 332 4187624</p>
                        <p><i class="fas fa-print me-3"></i> + 09 123 4567890</p>

                    </div>
                    
                </div>
            </div>
        </section>
        
        <div class="text-center p-4 bg-primary text-white">
            © 2023 Copyright: 
            <a class="text-reset fw-bold" href="https://mdbootstrap.com/"> tutorhub</a>
        </div>
    
    </footer>

  )
}

export default Footer