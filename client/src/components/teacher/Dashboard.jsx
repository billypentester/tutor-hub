import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Statistics from './Statistics'



function TeacherDashoard() {

    const [teacher, setTeacher] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function getTeacher() {

      try{
        if(localStorage.getItem('teacher')) {
          const teacher = JSON.parse(localStorage.getItem('teacher'))
          setTeacher(teacher)
        } 
        else
        {
          const res = await axios.post('http://localhost:3000/teacher/details', {token})
          console.log(res)
          setTeacher(res.data)
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
    }, [token])

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <Routes>
          <Route path="/" element={ <Statistics teacher={teacher} /> } />
        </Routes>
      </div>
    </>
  )
}

export default TeacherDashoard