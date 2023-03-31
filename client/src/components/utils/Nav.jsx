import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Nav() {

  const navigate = useNavigate()
  const moveto = () => {
    navigate('/signup/student')
  }
  
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
      <div class="container">
        <Link class="navbar-brand text-dark" to="/">TutorHub</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link active" to="/">
                Home
                <span class="visually-hidden">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">About</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/contact">Contact</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">Login</Link>
            </li>
            <li class="nav-item">
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Join Us</button>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/faq">FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Role</h5>
            <button type="button"  class="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <fieldset class="form-group text-center">
                <legend>Who are you?</legend>
                  <div className="p-3">
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-secondary mx-3" onClick={moveto}>
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/000/350/111/small/Education__28193_29.jpg" alt="student" width="100px" height="100px"/>
                      <br/>
                      <p className="lead">Student</p>
                    </button>
                    <button data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-secondary mx-3" onClick={moveto}>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7Qw8OuaJF3AmX7Fhnlou4EJAx6GpRpQIPg&usqp=CAU" alt="teacher" width="100px" height="100px"/>
                      <br/>
                      <p className="lead">Teacher</p>
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