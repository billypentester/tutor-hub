import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Statistics from './Statistics'


function AdminDashoard() {

    const [student, setStudent] = useState('')
    const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <Routes>
          <Route path="/" element={ <Statistics /> } />
        </Routes>
      </div>
    </>
  )
}

export default AdminDashoard