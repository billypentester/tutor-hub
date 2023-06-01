import React, {useEffect} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"

import Home from './components/main/Home'
import Login from './components/main/Login'
import AdminLogin from './components/main/AdminLogin'
import Signup from './components/main/Signup'
import Verifier from './components/main/Verifier'

import StudentDashboard from './components/student/Dashboard'
import TeacherDashboard from './components/teacher/Dashboard'
import AdminDashboard from './components/admin/Dashboard'


function App() {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('student')) {
        navigate('/student/dashboard')
      }
      else if (localStorage.getItem('teacher')) {
        navigate('/teacher/dashboard')
      }
      else if (localStorage.getItem('admin')) {
        console.log('admin')
      }
      else{
        console.log()
      }
    }
  }, [])
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        
        <Route path="/signup/:role" element={ <Signup/> } />
        <Route path="/login/:role" element={ <Login/> } />
        <Route path="/login/admin" element={ <AdminLogin/> } />

        <Route path="/verify/:role/:status" element={ <Verifier/> } />

        <Route path="/student/dashboard/*" element={ <StudentDashboard/> } />
        <Route path="/teacher/dashboard/*" element={ <TeacherDashboard/> } />
        <Route path="/admin/dashboard/*" element={ <AdminDashboard/> } />

        <Route path="/*" element={ <Home/> } />
      </Routes> 
    </div>
  )
}

export default App
