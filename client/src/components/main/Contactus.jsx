import React from 'react'

function Contactus() {
  return (
    <section id="contactus">
        <div className="bg-light py-5 py-xl-6">
            <div className="container my-5 mb-md-6">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
                        <h2 className="mb-4 display-5">Get in touch</h2>
                        <p className="text-dark mb-4 mb-md-5">At Tutor Hub, we understand that every student is unique, and our tutors work closely with each student to develop personalized learning plans that address their individual needs and learning styles. </p>
                        <hr className="w-50 mx-auto mb-0 text-dark" />
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div className="col-lg-6 mx-auto">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1" className="form-label mt-4">Name</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter full name"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1" className="form-label mt-4">Email Address</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter email address"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleTextarea" className="form-label mt-4">Message</label>
                            <textarea className="form-control" id="exampleTextarea" rows="3" spellcheck="false" placeholder="Write your message for us..."></textarea>
                        </div>
                        <button type="button" className="btn btn-primary my-5">Send</button>
                    </form>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Contactus