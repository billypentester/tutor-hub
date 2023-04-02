import React, {useEffect, useState} from 'react'
import { useParams, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Statistics from './Statistics'
import Finder from './Finder'
import Classroom from './Classroom'
import Messages from './Messages'
import Appointments from './Appointments'
import Profile from './Profile'


function Dashoard() {
  
    const [student, setStudent] = useState('')
    const navigate = useNavigate()

    async function getStudent() {
      const student = localStorage.getItem('student')
      if (!student)
      {
        navigate('/')
        return  // This is important
      }

      setStudent(JSON.parse(student))
    }

    useEffect(() => {
      getStudent()
    }, [])


  return (
    <>
      <Navbar />
      <div className="container p-5">
        <Routes>
          <Route path="/" element={ <Statistics student={student} /> } />
          <Route path="/finder" element={ <Finder/> } />
          <Route path="/classroom" element={ <Classroom/> } />
          <Route path="/messages" element={ <Messages/> } />
          <Route path="/appointments" element={ <Appointments/> } />
          <Route path="/profile" element={ <Profile/> } />
        </Routes>
      </div>
    </>
  )
}

export default Dashoard