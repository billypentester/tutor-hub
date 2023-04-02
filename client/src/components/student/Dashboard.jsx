import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Statistics from './Statistics'
import Finder from './Finder'
import Classroom from './Classroom'
import Messages from './Messages'
import Appointments from './Appointments'
import Profile from './Profile'


function StudentDashoard() {

    const [student, setStudent] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function getStudent() {

      try{
        if(localStorage.getItem('student')) {
          const student = JSON.parse(localStorage.getItem('student'))
          setStudent(student)
        } 
        else
        {
          const res = await axios.post('http://localhost:3000/student/details', {token})
          console.log(res)
          setStudent(res.data)
          localStorage.setItem('student', JSON.stringify(res.data))
        } 
      }
      catch(err) {
        console.log(err)
        navigate('/login')
      }
        
    }

    useEffect(() => {
      getStudent()
    }, [token])

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

export default StudentDashoard