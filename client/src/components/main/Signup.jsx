import React from 'react'
import './../../assets/css/home.css'
import { useParams } from 'react-router-dom'

function Signup() {

  const { role } = useParams()
  console.log(role)

  return (
    <div>
      <div class="d-flex">

        <div class="col-3 signupBackground" ></div>

        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7 py-5">
              <h3 class="display-5">Register</h3>
              <p class="mb-4">Thanks for joining us. Please register by completing the information below.</p>
              <form action="#" method="post">

                {/* sign up with google button with google icon */}

                <div class="row">
                  <button type="button" class="btn btn-outline-danger btn-lg btn-block">
                    <i class="fa-brands fa-google text-outline-danger mx-3"></i> Sign up with Google
                  </button>
                </div>

                <span class="text-muted text-center my-4 d-block legendLine">or</span>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Full Name</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>    
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="form-label mt-4">Username</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>   
                  </div>
                </div>

                <div class="row">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputPassword1" class="form-label mt-4">Confirm Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex mb-5 mt-4 align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                      <label class="form-check-label" for="flexCheckDefault">
                        I agree to the <a href="#" class="text-primary">Terms and Conditions</a>
                      </label>
                    </div>
                  </div>
                </div>

                <input type="submit" value="Register" class="btn px-5 btn-primary"/>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup