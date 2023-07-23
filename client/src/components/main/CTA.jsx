import React from 'react'

function CTA() {
  return (
    <section className="container-fluid">
        <div className="row">
            <div className="col-lg-6 mx-auto text-center">
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height:'100vh' }}>
                    <h1>
                        <strong>Personalized <span className="text-primary">Learning Solutions</span> </strong>
                        </h1>
                    <p className="lead">Find Your Perfect Tutor!</p>
                    <div className="my-3">
                        <button href="/signup" className="btn btn-primary mx-2" data-toggle="modal" data-target="#exampleModal">Get Started</button>
                        {/* <button href="/learnmore" className="btn btn-outline-primary mx-2">Learn More</button> */}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 m-0 p-0 text-center">
                <div className="background"></div>
            </div>
        </div>
    </section>
  )
}

export default CTA