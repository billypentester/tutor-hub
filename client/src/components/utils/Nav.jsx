import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">
      <div class="container">
        <Link class="navbar-brand text-dark" to="/">TutorHub</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link active" to="/">
                Home
                <span class="visually-hidden">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">About</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/contact">Contact</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/signup">Join Us</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/faq">FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav