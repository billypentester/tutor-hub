import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'

function EditProfile() {

  const [updateProfile, setUpdateProfile] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [alert, setAlert] = useState({type: '', message: ''})
  
  async function getProfile() {
    const response = localStorage.getItem('student')
    const data = JSON.parse(response)
    setUpdateProfile(data)  
    
  }

  const inputHandler = (e) => {
    const {name, value} = e.target
    setUpdateProfile({...updateProfile, [name]: value})
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUpdateProfile({...updateProfile, profile: reader.result})
    }
  }

  const updateProfileHandler = async(e) => {
    try{
      setLoading(true)
      e.preventDefault()
      const token = localStorage.getItem('token')
      const res = await axios.post('/api/student/update', { 
        data : updateProfile,
        token: token
      })
      if(res.status === 200) {
        localStorage.setItem('student', JSON.stringify(res.data))
        setUpdateProfile(res.data)
        setLoading(false)
        setAlert({type: 'success', message: 'Profile Updated'})
        setTimeout(() => setAlert({type: '', message: ''}), 5000);
      }
    }
    catch(err) {
      setLoading(false)
      setError(err.response.data.msg)
    }
  }


  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>

      {
        loading && <Loader loading={loading} />
      } 

      <div className='d-flex justify-content-center my-4'>
        <div className='col-10'>

          <div className='d-flex justify-content-center align-items-center px-4 my-4'>
            <div>
              <h1 className='display-5'>Update Profile</h1>
            </div>
          </div>

          <div className='d-flex bg-light p-4 mb-4 rounded-3 flex-column'>
            <div className='p-3'>
              <h4>Personal Information</h4>
              <div className='d-flex flex-column'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="updateName" class="form-label mt-4">Name</label>
                      <input type="text" class="form-control" id="updateName" placeholder="Enter name" name="name" value={updateProfile.name} onChange={inputHandler}/>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="updateUsername" class="form-label mt-4">Username</label>
                      <input type="text" class="form-control" id="updateUsername" placeholder="Enter username" name="username"  value={updateProfile.username} onChange={inputHandler}/>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="updateEmail" class="form-label mt-4">Email address</label>
                      <input disabled type="email" class="form-control" id="updateEmail" placeholder="Enter email" name="email" value={updateProfile.email} onChange={inputHandler}/>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="updateContact" class="form-label mt-4">Contact No.</label>
                      <input type="email" class="form-control" id="updateContact" placeholder="Enter Phone No." name="contactno" value={updateProfile.contactno} onChange={inputHandler}/>
                    </div>
                  </div>
                </div>
                <div className='row align-items-end'>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="formFile" class="form-label mt-4 d-block">Profile</label>
                      <div className='text-center my-4'>
                        <img src={updateProfile.profile} alt='profile' className='rounded-circle' style={{width: '100px', height: '100px'}}/>
                      </div>
                      <input class="form-control" type="file" id="formFile" accept="image/*" name="profile" onChange={handleFileChange}/> 
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="updateDOB" class="form-label mt-4">Date of Birth</label>
                      <input type="date" class="form-control" id="updateDOB" placeholder="Select DOB" name="dob" value={updateProfile.dob} onChange={inputHandler}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-3'>
              <h4>Prefrences</h4>
              <div className='d-flex flex-column'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div class="form-group">
                      <label for="updateCity" class="form-label mt-4">City</label>
                      <select class="form-select" id="updateCity" name="city" value={updateProfile.city} onChange={inputHandler}>
                        <option>Select City</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Gilgit">Gilgit</option>
                        <option value="Muzaffarabad">Muzaffarabad</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div class="form-group">
                      <label for="updateGender" class="form-label mt-4">Gender</label>
                      <select class="form-select" id="updateGender" name='gender' onChange={inputHandler} value={updateProfile.gender}>
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div class="form-group">
                      <label for="updateLanguage" class="form-label mt-4">Language</label>
                      <select class="form-select" id="updateLanguage" name='language' onChange={inputHandler} value={updateProfile.language}>
                        <option>Select Language</option>
                        <option value="Urdu">Urdu</option>
                        <option value="English">English</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Sindhi">Sindhi</option>
                        <option value="Pashto">Pashto</option>
                        <option value="Saraiki">Saraiki</option>
                        <option value="Balochi">Balochi</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-5 w-100'>
              <div className='text-center'>
              <button type="submit" class="btn btn-primary col-4" onClick={updateProfileHandler}>Save</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {
        alert.message ? <Alert type={alert.type} message={alert.message} /> : ''
      }

    </>
  )
}

export default EditProfile