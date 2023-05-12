import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  function logout() {
    localStorage.removeItem('teacher')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="#">Tutor Hub</Link>
        <form className="d-flex">
          <input className="form-control me-sm-2" type="search" placeholder="Search"/>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/teacher/dashboard">Dashboard
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher/dashboard/classNameroom">Classroom</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher/dashboard/messages">Messages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher/dashboard/appointments">Appointments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher/dashboard/finder">Earnings</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profile</a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="view-profile">View Profile</Link>
                <Link className="dropdown-item" to="edit-profile">Edit Profile</Link>
                <Link className="dropdown-item" to="delete-profile">Delete Profile</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar