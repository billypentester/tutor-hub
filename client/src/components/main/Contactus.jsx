import React from 'react'

function Contactus() {
  return (
    <section>
        <div className="bg-light py-5 py-xl-6">
            <div class="container my-5 mb-md-6">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
                        <h2 class="mb-4 display-5">Get in touch</h2>
                        <p class="text-dark mb-4 mb-md-5">At Tutor Hub, we understand that every student is unique, and our tutors work closely with each student to develop personalized learning plans that address their individual needs and learning styles. </p>
                        <hr class="w-50 mx-auto mb-0 text-dark" />
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div className="col-lg-6 mx-auto">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter full name"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="form-label mt-4">Email Address</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter email address"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleTextarea" class="form-label mt-4">Message</label>
                            <textarea class="form-control" id="exampleTextarea" rows="3" spellcheck="false" placeholder="Write your message for us..."></textarea>
                        </div>
                        <button type="button" class="btn btn-primary my-5">Send</button>
                    </form>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Contactus