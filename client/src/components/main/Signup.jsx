import React, {useState} from 'react'
import './../../assets/css/home.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../utils/Loader'

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authwithGoogle = async () => {
    const url = `http://localhost:5000/${role}/createGoogle`  
    window.location.href = url
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await axios.post(`/api/${role}/signup`, user)
      if(res.status === 200) {
        setLoading(false)
        navigate(`/verify/${role}/false`)
      }
    } 
    catch (err) {
      setLoading(false)
      setError(err.response.data.message)
    }
  }

  return (

    <div>

    {
      loading && <Loader loading={loading} />
    }


    <div className="d-flex">
     
     <div className="col-3 signupBackground"></div>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7 py-5">

            <h3 className="display-5">Register</h3>
            <p className="mb-4">Thanks for joining us. Please register by completing the information below.</p>

            <div className="row">
              <button className="btn btn-outline-danger btn-lg btn-block" onClick={authwithGoogle}>
                <i className="fa-brands fa-google text-outline-danger mx-3"></i> Sign up with Google
              </button>
            </div>

            <span className="text-muted text-center my-4 d-block legendLine">or</span>

            {
              error && 
              <div className="postion-absolute w-100 alert alert-danger alert-dismissible m-0">
                <strong>Oh snap!</strong> {error}
                <button type="button" class="btn-close" data-dismiss="alert"></button>
              </div>
            }

            <form>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={user.name} onChange={handleChangeInput}/>
                  </div>    
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={user.username} onChange={handleChangeInput}/>
                  </div>   
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                  <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                  <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputPassword2" className="form-label mt-4">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChangeInput}/>
                  </div>
                </div>
              </div>
              
              <div className="d-flex mb-5 mt-4 align-items-center">
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" for="flexCheckDefault">
                      I agree to the <a href="#" className="text-primary">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
              </div>

              <button className="btn px-5 btn-primary" onClick={handleSubmit}>Sign up</button>

              <span className="text-center d-block pt-4">
                Already have an account? <Link to={`/login/${role}`} className="text-primary"> Login</Link>
              </span>

            </form>

          </div>
        </div>
      </div>

    </div>

  </div>
  )
}

export default Signup