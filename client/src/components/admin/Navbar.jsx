import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Navbar() {

  const [activeTab, setActiveTab] = useState('dashboard');

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  const logout = () => {
    localStorage.removeItem('admin')
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
            <li className='nav-item'>
              <Link className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} to="/admin/dashboard" onClick={() => handleTabClick('dashboard')}>Dashboard
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${activeTab === 'students' ? 'active' : ''}`} to="/admin/dashboard/students" onClick={() => handleTabClick('students')}>Students</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${activeTab === 'teachers' ? 'active' : ''}`} to="/admin/dashboard/teachers" onClick={() => handleTabClick('teachers')}>Teachers</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} to="/admin/dashboard/messages" onClick={() => handleTabClick('messages')}>Messages</Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${activeTab === 'appointments' ? 'active' : ''}`} to="/admin/dashboard/appointments" onClick={() => handleTabClick('appointments')}>Appointments</Link>
            </li>
            <li className='nav-item'>
              <button className="dropdown-item nav-link" onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar