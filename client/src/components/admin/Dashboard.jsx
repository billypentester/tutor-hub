import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Statistics from './Statistics'
import Navbar from './Navbar'
import Students from './Students'
import Teachers from './Teachers'
import Messages from './Messages'
import Appointments from './Appointments'


function AdminDashoard() {

  const [admin, setAdmin] = useState('')
  const navigate = useNavigate()

  async function getAdmin() {
    const token = localStorage.getItem('token')
    if(!token) return navigate('/admin/login')
  }

  useEffect(() => {
    getAdmin()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <Routes>
          <Route path="/" element={ <Statistics /> } />
          <Route path="/students" element={ <Students /> } />
          <Route path="/teachers" element={ <Teachers /> } />
          <Route path="/messages" element={ <Messages /> } />
          <Route path="/appointments" element={ <Appointments /> } />
        </Routes>
      </div>
    </>
  )
}

export default AdminDashoard