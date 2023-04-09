import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function ViewProfile() {

  const [profile, setProfile] = React.useState({})
  
  async function getProfile() {
    const response = localStorage.getItem('student')
    const data = JSON.parse(response)
    setProfile(data)
  }

  React.useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-6'>

        <div className='d-flex justify-content-between align-items-center px-4 mb-4'>
          <div>
            <h1 className='mb-0'>{profile.name}</h1>
          </div>
          <div>
            <img src={profile.profile} alt='profile' className='img-fluid rounded-circle' />
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-4 rounded-3'>
          <div>
            <div className='d-flex align-items-center mb-3'>
              <i className='fas fa-envelope h4'></i>
              <div className='mx-4'>
                <h5 className='mb-0'>Email</h5>
                <small className='text-muted'>{profile.email}</small>
              </div>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <i className='fas fa-user h4'></i>
              <div className='mx-4'>
                <h5 className='mb-0'>Username</h5>
                <small className='text-muted'>{profile.username}</small>
              </div>
            </div>
          </div>
          <div>
            <Link to='/student/dashboard/edit-profile' className='btn btn-primary'>Edit Profile</Link>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-4 rounded-3'>
          <div className='d-flex align-items-center mb-3'>
            <img src='https://img.icons8.com/color/256/verified-badge.png' alt='graduation' className='img-fluid' width={'50px'} />
          </div>
          <div>
            <div className='d-flex align-items-center'>
              <div className='mx-4'>
                <h5>Verification</h5>
                <p className='text-dark'>Your account is verified. You can now search and hire tutors.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-4 rounded-3'>
          <div className='d-flex align-items-center mb-3'>
            <img src='https://img.icons8.com/color/256/warning-shield.png' alt='graduation' className='img-fluid' />
          </div>
          <div>
            <div className='d-flex align-items-center'>
              <div className='mx-4'>
                <h5>Complete your profile</h5>
                <p className='text-dark'>We will use this information to improve your experience and to provide you with the best service and recommendation.</p>
                <Link to='/student/dashboard/edit-profile' className='btn btn-warning'>Complete Profile</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewProfile