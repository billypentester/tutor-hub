import React from 'react'
import { Routes, Route } from "react-router-dom"

import Home from './components/main/Home'
import Login from './components/main/Login'
import Signup from './components/main/Signup'
import Verifier from './components/main/Verifier'

import StudentDashboard from './components/student/Dashboard'
import TeacherDashboard from './components/teacher/Dashboard'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login/:role" element={ <Login/> } />
        <Route path="/signup/:role" element={ <Signup/> } />
        <Route path="/verify/:role/:status" element={ <Verifier/> } />
        <Route path="/student/dashboard/*" element={ <StudentDashboard/> } />
        <Route path="/teacher/dashboard/*" element={ <TeacherDashboard/> } />
        <Route path="/*" element={ <Home/> } />
      </Routes> 
    </div>
  )
}

export default App
