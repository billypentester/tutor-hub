import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Loader from './../utils/Loader'

function ViewProfile() {

  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(false)
  
  async function getProfile() {
    setLoading(true)
    const response = localStorage.getItem('student')
    const data = JSON.parse(response)
    setProfile(data)
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      {
        loading && <Loader />
      }
      {
        profile &&
        <div className='d-flex justify-content-center my-4'>
          <div className='col-6'>
            <div className='d-flex justify-content-between align-items-center px-4 mb-3'>
              <div>
                <h1 className='mb-0'>{profile.name}</h1>
              </div>
              <div>
                <img src={profile.profile} alt='profile' className='rounded-circle' width={'100px'} height={'100px'} />
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-2 rounded-3'>
              <div>
                { 
                  profile.email &&
                  <div className='d-flex align-items-center mb-3'>
                  <i className='fas fa-envelope h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Email</h5>
                      <small className='text-muted'>{profile.email}</small>
                    </div>
                  </div>
                }
                {
                  profile.username &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-user h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Username</h5>
                      <small className='text-muted'>{profile.username}</small>
                    </div>
                  </div>
                }
                {
                  profile.contactno &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-phone h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Phone</h5>
                      <small className='text-muted'>{profile.contactno}</small>
                    </div>
                  </div>
                }
                {
                  profile.dob &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-calendar-alt h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Date of Birth</h5>
                      <small className='text-muted'>{profile.dob}</small>
                    </div>
                  </div>
                }
                {
                  profile.city &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-map-marker-alt h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>City</h5>
                      <small className='text-muted'>{profile.city}</small>
                    </div>
                  </div>
                }
                {
                  profile.language &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-language h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Language</h5>
                      <small className='text-muted'>{profile.language}</small>
                    </div>
                  </div>
                }
                {
                  profile.gender &&
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fas fa-venus-mars h4'></i>
                    <div className='mx-4'>
                      <h5 className='mb-0'>Gender</h5>
                      <small className='text-muted'>{profile.gender}</small>
                    </div>
                  </div>
                }
              </div>
              <div>
                <Link to='/student/dashboard/edit-profile' className='btn btn-primary'>Edit Profile</Link>
              </div>
            </div>

            {
              <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-2 rounded-3'>
                <div className='col-2 d-flex align-items-center justify-content-center mb-3'>
                  <img src='https://img.icons8.com/color/256/verified-badge.png' alt='graduation' className='img-fluid' width={'50px'} />
                </div>
                <div className='col-10'>
                  <div className='d-flex align-items-center'>
                    <div className='mx-4'>
                      {
                        profile.isVerified ?
                        <>
                          <h5>Your Profile is verified</h5>
                          <p className='text-dark'>Your account is verified. You can now search and hire tutors.</p>
                        </>
                        :
                        <>
                          <h5>Your Profile is not verified</h5>
                          <p className='text-dark'>Your account is not verified. Please verify your account to search and hire tutors.</p>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }

            {
              profile.name && profile.profile && profile.email && profile.username && profile.contactno && profile.city && profile.gender && profile.language && profile.dob ?
              <div className='d-flex align-items-center bg-light p-4 mb-3 rounded-3'>
                <div className='col-2 mb-3'>
                  <img src='https://img.icons8.com/color/256/graduation-cap.png' alt='graduation' className='img-fluid' width={'170px'} />
                </div>
                <div className='col-10'>
                  <div className='d-flex align-items-center'>
                    <div className='mx-4'>
                      <h5>Your Profile is completed</h5>
                      <p className='text-dark'>We will use this information to improve your experience and to provide you with the best service and recommendation.</p>
                      <Link to='/student/dashboard/finder' className='btn btn-success'>Search Tutor</Link>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='d-flex justify-content-between align-items-center bg-light p-4 mb-4 rounded-3'>
                <div className='col-2 mb-3'>
                  <img src='https://img.icons8.com/color/256/warning-shield.png' alt='graduation' className='img-fluid' width={'170px'} />
                </div>
                <div className='col-10'>
                  <div className='d-flex align-items-center'>
                    <div className='mx-4'>
                      <h5>Complete your profile</h5>
                      <p className='text-dark'>It is recommended to complete your profile to get better experience and to get better recommendations.</p>
                      <Link to='/student/dashboard/edit-profile' className='btn btn-warning'>Complete Profile</Link>
                    </div>
                  </div>
                </div>
              </div>
            }

            

          </div>
        </div>
      }
    </>
  )
}

export default ViewProfile