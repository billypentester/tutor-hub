import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Statistics from './Statistics'
import EditProfile from './EditProfile'
import DeleteProfile from './DeleteProfile'
import ViewProfile from './ViewProfile'



function TeacherDashoard() {

    const [teacher, setTeacher] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function getTeacher() {

      try{
        if(localStorage.getItem('token')) {
          const res = await axios.post('/api/teacher/details', {token: localStorage.getItem('token')})
          console.log(res)
          setTeacher(res.data)
          localStorage.setItem('teacher', JSON.stringify(res.data))
        } 
        else
        {
          const res = await axios.post('/api/teacher/details', {token})
          console.log(res)
          setTeacher(res.data)
          localStorage.setItem('token', token)
          localStorage.setItem('teacher', JSON.stringify(res.data))
        } 
      }
      catch(err) {
        console.log(err)
        navigate('/login')
      }
        
    }

    useEffect(() => {
      getTeacher()
    }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Statistics teacher={teacher} /> } />
        <Route path="/edit-profile" element={ <EditProfile teacher={teacher} /> } />
        <Route path="/view-profile" element={ <ViewProfile teacher={teacher} /> } />
        <Route path="/delete-profile" element={ <DeleteProfile/> } />
      </Routes>
    </>
  )
}

export default TeacherDashoard