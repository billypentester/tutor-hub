import React, {useState} from 'react'
import './../../assets/css/home.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../utils/Loader'

function Login() {

  const { role } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authwithGoogle = async() => {
    const url = `http://localhost:5000/${role}/useGoogle`;
    window.location.href = url;
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      console.log(user)
      const res = await axios.post(`/api/${role}/login`, user)
      console.log(res)
      if(res.status === 200) {
        setLoading(false)
        const { token } = res.data
        localStorage.setItem('token', token)
        navigate(`/${role}/dashboard`)
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

        <div className="col-3 loginBackground"></div>

        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7 py-5">
              <h3 className="display-5">Login</h3>
              <p className="mb-4">Welcome back! Please log in to access your account.</p>

              <div className="row">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={authwithGoogle}>
                  <i className="fa-brands fa-google text-outline-danger mx-3"></i> Login with Google
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
                  <div className="form-group">
                    <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                  </div>
                </div>
                
                <div className="d-flex mb-5 mt-4 align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                      <label className="form-check-label" for="flexCheckDefault">
                        Keep me logged in
                      </label>
                    </div>
                  </div>
                </div>

                <button className="btn px-5 btn-primary" onClick={handleSubmit}>Login</button>

                <span className="text-center d-block pt-4">
                  Don't have an account? <Link to={`/signup/${role}`} className="text-primary"> Signup</Link>
                </span>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login