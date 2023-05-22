import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({student}) {

  function logout() {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="#">Tutor Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin/dashboard">Dashboard
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/students">Students</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/teachers">Teachers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/messages">Messages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/appointments">Appointments</Link>
            </li>
            <li className='nav-item'>
              <button className="dropdown-item nav-link" onClick={logout}>Logout</button>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profile</a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/admin/dashboard/profile">View Profile</Link>
                <Link className="dropdown-item" href="#">Edit Profile</Link>
                <Link className="dropdown-item" href="#">Delete Profile</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar