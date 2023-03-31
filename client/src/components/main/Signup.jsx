import React, {useState} from 'react'
import './../../assets/css/home.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {

  const { role } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const authwithGoogle = async() => {
    const url = `http://localhost:3000/${role}/createGoogle`;
    window.location.href = url;
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:3000/${role}/signup`, user)
      if(res.status === 200) {
        alert('Register Success')
        navigate(`/signup/${role}/verify/false`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div class="d-flex">

        <div class="col-3 signupBackground"></div>

        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7 py-5">
              <h3 class="display-5">Register</h3>
              <p class="mb-4">Thanks for joining us. Please register by completing the information below.</p>

              <div class="row">
                <button type="button" class="btn btn-outline-danger btn-lg btn-block" onClick={authwithGoogle}>
                  <i class="fa-brands fa-google text-outline-danger mx-3"></i> Sign up with Google
                </button>
              </div>

              <span class="text-muted text-center my-4 d-block legendLine">or</span>

              <form>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputName" class="form-label mt-4">Full Name</label>
                      <input type="text" class="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={user.name} onChange={handleChangeInput}/>
                    </div>    
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputUsername" class="form-label mt-4">Username</label>
                      <input type="text" class="form-control" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={user.username} onChange={handleChangeInput}/>
                    </div>   
                  </div>
                </div>

                <div class="row">
                  <div class="form-group">
                    <label for="exampleInputEmail" class="form-label mt-4">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                    <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputPassword" class="form-label mt-4">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputPassword2" class="form-label mt-4">Confirm Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChangeInput}/>
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

                <button class="btn px-5 btn-primary" onClick={handleSubmit}>Sign up</button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup