import React from 'react'
import { Routes, Route } from "react-router-dom"

import Home from './components/main/Home'
import Login from './components/main/Login'
import Signup from './components/main/Signup'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="signup/:role" element={ <Signup/> } />
        <Route path="*" element={ <Home/> } />
      </Routes>
    </div>
  )
}

export default App
