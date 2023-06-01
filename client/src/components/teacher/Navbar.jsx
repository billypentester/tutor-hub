import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  const [activeTab, setActiveTab] = useState('dashboard');

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function logout() {
    localStorage.removeItem('teacher')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="#">Tutor Hub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} to="/teacher/dashboard" onClick={() => handleTabClick('dashboard')}>Dashboard
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeTab === 'classrooms' ? 'active' : ''}`} to="/teacher/dashboard/classrooms" onClick={() => handleTabClick('classrooms')}>Classrooms</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} to="/teacher/dashboard/messages" onClick={() => handleTabClick('messages')}>Messages</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`} to="/teacher/dashboard/appointments" onClick={() => handleTabClick('appointments')}>Appointments</Link>
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