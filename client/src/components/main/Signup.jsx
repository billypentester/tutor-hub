import React, {useState} from 'react'
import './../../assets/css/home.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../utils/Loader'
import Alert from '../utils/Alert'
import Joi from 'joi';

function Signup() {

  const { role } = useParams()
  const navigate = useNavigate()
  const [error, seterror] = useState([])
  const [user, setUser] = useState([])
  const [alert, setAlert] = useState({type: '', message: ''})
  const [loading, setLoading] = useState(false);

  const schema = Joi.object({
    name: Joi.string().min(3).max(12).required().error(new Error('Name must be between 3 and 12 characters.')),
    username: Joi.string().min(5).max(15).required().error(new Error('It must be between 5 and 15 characters.')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'pk'] } }).required().error(new Error('Email must be a valid email.')),
    password: Joi.string().min(6).max(12).required().error(new Error('It must be between 6 and 12 characters.')),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().error(new Error('Passwords do not match.')),
  })
  
  const authwithGoogle = async () => {
    const url = `http://localhost:5000/${role}/createGoogle`  
    window.location.href = url
  }

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
    const obj = {[name]:value}
    if(name === 'confirmPassword') 
    {
      const schema1 = Joi.object({password: schema.extract('password'), confirmPassword: schema.extract('confirmPassword')})
      const res = schema1.validate({password: user.password, confirmPassword: value})
      if(res.error) {
        seterror({...error, confirmPassword: res.error.message})
      }
      else {
        seterror({...error, confirmPassword: null})
      }
    }
    else 
    {
      const schema1 = Joi.object({[name]: schema.extract(name)})
      const res = schema1.validate(obj)
      if(res.error) {
        seterror({...error, [name]: res.error.message})
      }
      else {
        seterror({...error, [name]: null})
      }
    }
  }

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {

      const res = await axios.post(`/api/${role}/signup`, {
        ...user,
        role: role
      })
      console.log(res)
      if(res.status === 200) {
        setLoading(false)
        navigate(`/verify/${role}/false`)
      }
    } 
    catch (err) {
      console.log(err.response.data.message)
      setLoading(false)
      setAlert({type: 'danger', message: err.response.data.message})
      setUser([])
      setTimeout(() => {setAlert({type: '', message: ''})}, 3000)
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

            <form>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                    <input type="text" className={error.name ? "form-control is-invalid" : "form-control" } id="exampleInputName" placeholder="Enter Name" name="name" value={user.name} onChange={handleChangeInput}/>
                    { error.name && <div class="invalid-feedback">{error.name}</div> }
                  </div>    
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                    <input type="text" className={error.username ? "form-control is-invalid" : "form-control" } id="exampleInputUsername" placeholder="Enter Unique username" name="username" value={user.username} onChange={handleChangeInput}/>
                    { error.username && <div class="invalid-feedback">{error.username}</div> }
                  </div>   
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                  <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                  <input type="email" className={error.email ? "form-control is-invalid" : "form-control" } id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                  <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  { error.email && <div class="invalid-feedback">{error.email}</div> }
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                    <input type="password" className={error.password ? "form-control is-invalid" : "form-control" } id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                    { error.password && <div class="invalid-feedback">{error.password}</div> }
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputPassword2" className="form-label mt-4">Confirm Password</label>
                    <input type="password" className={error.confirmPassword ? "form-control is-invalid" : "form-control" } id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChangeInput}/>
                    { error.confirmPassword && <div class="invalid-feedback">{error.confirmPassword}</div> }
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

              {
                user.length != 5 && (error.name || error.username || error.email || error.password || error.confirmPassword) ?
                <button className="btn px-5 btn-primary" disabled>Fill all the fields and resolve errors</button>
                :
                <button className="btn px-5 btn-primary" onClick={handleSubmit}>Sign up</button>
              }

              <span className="text-center d-block pt-4">
                Already have an account? <Link to={`/login/${role}`} className="text-primary"> Login</Link>
              </span>

            </form>

          </div>
        </div>
      </div>

    </div>

    {
      alert.message && <Alert type={alert.type} message={alert.message} />
    }

  </div>
  )
}

export default Signup