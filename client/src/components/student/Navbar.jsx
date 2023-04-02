import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({student}) {

  function logout() {
    localStorage.removeItem('student')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <Link class="navbar-brand" href="#">Tutor Hub</Link>
        <form class="d-flex">
          <input class="form-control me-sm-2" type="search" placeholder="Search"/>
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link active" to="/student/dashboard">Dashboard
                <span class="visually-hidden">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/student/dashboard/finder">Finder</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/student/dashboard/classroom">Classroom</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/student/dashboard/messages">Messages</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/student/dashboard/appointments">Appointments</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profile</a>
              <div class="dropdown-menu">
                <Link class="dropdown-item" to="/student/dashboard/profile">View Profile</Link>
                <Link class="dropdown-item" href="#">Edit Profile</Link>
                <Link class="dropdown-item" href="#">Delete Profile</Link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar