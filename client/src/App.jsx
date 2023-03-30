import React from 'react'
import { Routes, Route } from "react-router-dom"

import Nav from './components/utils/Nav'
import Home from './components/main/Home'
import Login from './components/main/Login'
import Signup from './components/main/Signup'

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="signup" element={ <Signup/> } />
      </Routes>
    </div>
  )
}

export default App
