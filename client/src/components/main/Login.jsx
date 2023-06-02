import React, {useState} from 'react'
import './../../assets/css/home.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../utils/Loader'
import Alert from '../utils/Alert'
import Joi from 'joi';

function Login() {

  const { role } = useParams()
  const [alert, setAlert] = useState({'type': '', 'message': ''})
  const navigate = useNavigate()

  const [user, setUser] = useState([])

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState([])

  const authwithGoogle = async() => {
    const url = `http://localhost:5000/${role}/useGoogle`;
    window.location.href = url;
  }

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'pk'] } }).required().error(new Error('Email must be a valid email.')),
    password: Joi.string().required().error(new Error('Password is required.')),
  })

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
    const obj = {[name]:value}
    const schema1 = Joi.object({[name]: schema.extract(name)})
    const res = schema1.validate(obj)
    if(res.error) {
      seterror({...error, [name]: res.error.message})
    }
    else {
      seterror({...error, [name]: null})
    }
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
      setAlert({'type': 'danger', 'message': err.response.data.message})
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

              <form>

                <div className="row">
                  <div className="form-group">
                    <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                    <input type="email" className={error.email ? "form-control is-invalid" : "form-control" } id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                    { error.email && <div class="invalid-feedback">{error.email}</div> }
                  </div>
                </div>

                <div className="row">
                  <div className="form-group">
                    <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                    <input type="password" className={error.password ? "form-control is-invalid" : "form-control" } id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                    { error.password && <div class="invalid-feedback">{error.password}</div> }
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

                {
                  user.length != 2 && (error.email || error.password) ?
                  <button type="submit" className="btn px-5 btn-primary" disabled>Fill the fields</button>
                  :
                  <button className="btn px-5 btn-primary" onClick={handleSubmit}>Login</button>
                }

                <span className="text-center d-block pt-4">
                  Don't have an account? <Link to={`/signup/${role}`} className="text-primary"> Signup</Link>
                </span>

              </form>
            </div>
          </div>
        </div>

        {
          alert.message && <Alert type={alert.type} message={alert.message} />
        }

      </div>
    </div>
  )
}

export default Login