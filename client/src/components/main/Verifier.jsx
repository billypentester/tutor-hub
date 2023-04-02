import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './../../assets/css/home.css'


function Verifier() {

  const { status, role } = useParams()

  return (
    <div>
        
      <div className="verifierBg">
        <div className="verifierOverlay">
          {
            status == 'false' ? 
            <div className="p-5 text-center text-dark">
              <img className='my-3' src="https://www.pngall.com/wp-content/uploads/8/Email-Verification.png" width='150px' />
              <h1 className='display-4 text-dark'>Check Your Email</h1>
              <div className='my-4'>
                <p className='lead p-0 m-0'>An email has been sent to your email inbox with verification link. <br/> <strong>Click to link to verify your email address and login.</strong> </p>
                <p className='lead p-0 m-0'>If you don't see the email in your inbox, please check your spam folder.</p>
              </div>
              <div>
                <Link className='btn btn-primary mx-2' to={'/login/'+role}>Login</Link>
                <Link className='btn btn-outline-primary mx-2' to="/">Go to Home</Link>
              </div>
            </div>
            :
            <div className="p-5 text-center text-dark">
              <h1 className='display-4 text-dark'>Email Verified</h1>
              <div className='my-4'>
                <p className='lead p-0 m-0'>Thanks for email verification.<br/> <strong>Your email have been verified.</strong> </p>
                <p className='lead p-0 m-0'>Now, you can use your credential to login to your account.</p>
              </div>
              <div>
                <Link className='btn btn-primary mx-2' to={'/login/'+role}>Login</Link>
                <Link className='btn btn-outline-primary mx-2'  to="/">Go to Home</Link>
              </div>
            </div>
          } 
        </div>
      </div>
        
    </div>   
  )
}

export default Verifier