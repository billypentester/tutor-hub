import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Statistics from './Statistics'
import Finder from './Finder'
import Classroom from './Classroom'
import Messages from './Messages'
import Appointments from './Appointments'

import ViewProfile from './ViewProfile'
import EditProfile from './EditProfile'
import DeleteProfile from './DeleteProfile'

import TeacherProfile from './TeacherProfile'



function StudentDashoard() {

    const [student, setStudent] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function getStudent() {

      try{
        if(localStorage.getItem('token')) {
          console.log(localStorage.getItem('token'))
          const res = await axios.post('/api/student/details', {token: localStorage.getItem('token')})
          console.log(res)
          setStudent(res.data)
          localStorage.setItem('student', JSON.stringify(res.data))
        } 
        else
        {
          const res = await axios.post('/api/student/details', {token})
          console.log(res)
          setStudent(res.data)          
          localStorage.setItem('student', JSON.stringify(res.data))
          localStorage.setItem('token', token)
        } 
      }
      catch(err) {
        console.log(err)
        navigate('/login')
      }
        
    }

    useEffect(() => {
      getStudent()
    }, [])

  return (
    <>
      <Navbar student={student}/>
      <div className="container">
        <Routes>
          <Route path="/" element={ <Statistics student={student} /> } />
          <Route path="/finder" element={ <Finder/> } />
          <Route path="/classroom" element={ <Classroom/> } />
          <Route path="/messages" element={ <Messages/> } />
          <Route path="/appointments" element={ <Appointments/> } />
          <Route path="/profile/:username" element={ <TeacherProfile/> } />
          <Route path="/view-profile" element={ <ViewProfile/> } />
          <Route path="/edit-profile" element={ <EditProfile/> } />
          <Route path="/delete-profile" element={ <DeleteProfile/> } />
        </Routes>
      </div>
    </>
  )
}

export default StudentDashoard