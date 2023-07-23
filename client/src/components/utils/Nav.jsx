import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Nav() {

  const navigate = useNavigate()

  const movetosignupStudent = () => {
    navigate('/signup/student')
  }

  const movetosignupTutor = () => {
    navigate('/signup/teacher')
  }

  const movetologinStudent = () => {
    navigate('/login/student')
  }

  const movetologinTutor = () => {
    navigate('/login/teacher')
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
      <div className="container">
        <Link className="navbar-brand text-dark" to="/">Mehrab</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#aboutus">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contactus">Contact</a>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal2">Login</button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal">Join Us</button>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/faq">FAQs</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Role</h5>
            <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <fieldset className="form-group text-center">
                <legend>Who are you?</legend>
                  <div classNameName="p-3">
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal" className="btn btn-outline-secondary mx-3" onClick={movetosignupStudent}>
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/350/111/small/Education__28193_29.jpg" alt="student" width="100px" height="100px"/>
                      <br/>
                      <p classNameName="lead">Student</p>
                    </button>
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal" className="btn btn-outline-secondary mx-3" onClick={movetosignupTutor}>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7Qw8OuaJF3AmX7Fhnlou4EJAx6GpRpQIPg&usqp=CAU" alt="teacher" width="100px" height="100px"/>
                      <br/>
                      <p classNameName="lead">Teacher</p>
                    </button>
                  </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Role</h5>
            <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal2">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <fieldset className="form-group text-center">
                <legend>Who are you?</legend>
                  <div classNameName="p-3">
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal2" className="btn btn-outline-secondary mx-3" onClick={movetologinStudent}>
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/350/111/small/Education__28193_29.jpg" alt="student" width="100px" height="100px"/>
                      <br/>
                      <p classNameName="lead">Student</p>
                    </button>
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal2" className="btn btn-outline-secondary mx-3" onClick={movetologinTutor}>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7Qw8OuaJF3AmX7Fhnlou4EJAx6GpRpQIPg&usqp=CAU" alt="teacher" width="100px" height="100px"/>
                      <br/>
                      <p classNameName="lead">Teacher</p>
                    </button>         
                  </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

export default Nav