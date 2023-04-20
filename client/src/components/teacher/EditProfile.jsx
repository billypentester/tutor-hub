import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
import { compose, withProps } from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({lat, lng}) => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat : lat, lng : lng}}>
      <Marker position={{ lat : lat, lng : lng}} />
  </GoogleMap>
));

function EditProfile() {

  const [loading, setLoading] = useState(false)

  const [teacher, setTeacher] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [map, setMap] = useState(false);

  const submitProfile = async() => {
    setLoading(true)
    const {name, username, email, gender, city, age, contactno, language} = JSON.parse(localStorage.getItem('info'))
    const education = JSON.parse(localStorage.getItem('education'))
    const experience = JSON.parse(localStorage.getItem('experience'))
    const result = await axios.post('/api/teacher/update', {
      token : localStorage.getItem('token'),
      teacher : {
        name,
        username,
        email,
        gender,
        city,
        age,
        contactno,
        language,
        education,
        experience,
        availability
      }
    })
    setLoading(false)
    console.log(result)
  }

  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setTeacher({...teacher, [name]:value})
  }

  const handleChangeInputEducation = (e) => {
    const {name, value} = e.target
    setEducation({...education, [name]:value})
  }

  const handleChangeInputExperience = (e) => {
    const {name, value} = e.target
    setExperience({...experience, [name]:value})
  }

  const handleChangeInputAvailability = (e) => {
    const {name, value} = e.target
    setAvailability({...availability, [name]:value})
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeacher({...teacher, profile: reader.result})
    }
  }

  const fetchstorage = () => {
    if(localStorage.getItem('info'))
    {
      const {name, username, email, age, gender, address, contactno, profile} = JSON.parse(localStorage.getItem('info'))
      setTeacher({...teacher, name, username, email, age, gender, address, contactno, profile})
    }
    else
    {
      const { name, username, email } = JSON.parse(localStorage.getItem('teacher'))
      setTeacher({...teacher, name, username, email })
    }
  
  }

  const saveInfo = (e) => {
    setLoading(true)
    e.preventDefault()
    localStorage.setItem('info', JSON.stringify(teacher))
    alert('Saved')
    setLoading(false)
  }

  const saveEducation = (e) => {
    setLoading(true)
    e.preventDefault()
    localStorage.setItem('education', JSON.stringify(education))
    alert('Saved')
    setLoading(false)
  }

  const saveExperience = (e) => {
    setLoading(true)
    e.preventDefault()
    localStorage.setItem('experience', JSON.stringify(experience))
    alert('Saved')
    setLoading(false)
  }

  const handleChangeSelectMultiple = (e) => {
    const name = e.target.name;
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setExperience({...experience, [name]:value})
  }

  const handleChangeCheckbox = (e) => {
    const {name, value} = e.target
    setAvailability((prev) => {
      if(e.target.checked)
      {
        return {
          ...prev,
          [name]: [...(prev[name] || []), value],
        }
      }
      else
      {
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }
      }
    })
  }

  const getLocation = () => {
    // if(availability.address)
    // {
      setLoading(true)
      // const res = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${availability.location}&key=AIzaSyDHEjdq0-VWiBRx2ih2TNuAc-ImURiUdkU`);
      // const {lat, lng} = res.data.results[0].geometry.location;
      console.log(availability.address)
      if(window.navigator.geolocation)
      {
        window.navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setAvailability({...availability, ['location']: [lat, lng] })
          setMap(true)
          setLoading(false)
        })
      }
    // }
  }


  const saveAvailability = (e) => {
    setLoading(true)
    e.preventDefault()
    localStorage.setItem('availability', JSON.stringify(availability))
    alert('Saved')
    setLoading(false)
  }

  useEffect(()=>{
    fetchstorage();
  }, [loading])


  return (

    <>

    {
      loading && <Loader loading={loading} />
    }

    <div>

      <div className='bg-light p-4 rounded-3'>
        <div className='container'> 
          <h1 className='display-6'>Edit Profile</h1>
          <p className='lead mb-0 pb-0'>Complete the profile and become eligible for tutor position</p>
        </div>
      </div>

      <div className='container my-3 mb-5'>
        <div class="accordion" id="accordionExample">

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Basic Information
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="accordion-body">

                <div className='container px-4'>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="Fullname" className="form-label mt-4">Full Name</label>
                        <input type="text" className="form-control" id="Fullname" aria-describedby="Fullname" placeholder="Name" name="name" value={teacher.name}/>
                      </div>    
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="Username" className="form-label mt-4">Username</label>
                        <input type="text" className="form-control text-muted" id="Username" aria-describedby="Username" placeholder="Username" name="username" value={teacher.username} disabled />
                      </div>   
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="Email" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="Email" aria-describedby="Email" placeholder="Email Address" name="email" value={teacher.email} disabled />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="ContactNumber" className="form-label mt-4">Contact No.</label>
                        <input type="number" className="form-control" id="ContactNumber" aria-describedby="ContactNo" placeholder="ContactNumber" name="contactno" value={teacher.contactno} onChange={handleChangeInput}/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                      <div class="form-group">
                        <label for="formFile" class="form-label mt-4">Profile Pic</label>
                        <input class="form-control" type="file" accept="image/*" id="formFile" onChange={handleFileChange} />
                      </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="City" className="form-label mt-4">District / City</label>
                            <input type="text" className="form-control" id="City" placeholder="Enter your City / District name" name="city" value={teacher.city} onChange={handleChangeInput}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                        <div class="form-group">
                          <label for="updateLanguage" class="form-label mt-4">Language</label>
                          <select class="form-select" id="updateLanguage" name='language' value={teacher.language} onChange={handleChangeInput}>
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
                    <div className="col-md-6">
                      <div className='row'>
                        <div className='col-6'>
                          <div className="form-group">
                            <label for="Age" className="form-label mt-4">Age</label>
                            <input type="number" className="form-control" id="Age" placeholder="Age" name="age" value={teacher.age} onChange={handleChangeInput}/>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label for="Gender" class="form-label mt-4">Gender</label>
                            <select className="form-select" id="Gender" name="gender" onChange={handleChangeInput}>
                              <option selected>Choose...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='text-end my-4'>
                    <button className="btn px-5 btn-primary" onClick={saveInfo}>Save and Next</button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Educational Background
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                    <div className="row">
                        <div class="form-group">
                          <label for="Qualification" class="form-label mt-4">Qualification</label>
                          <select class="form-select" id="Qualification" name="qualification" onChange={handleChangeInputEducation}>
                            <option>Select Education</option>
                            <option value="PhD">PhD</option>
                            <option value="Masters">Masters</option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Matric">Matric</option>
                            <option value="High School">High School</option>
                          </select>
                        </div>    
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleMarks" className="form-label mt-4">Enter Obtained marks / GPA </label>
                          <input type="number" className="form-control" id="exampleMarks" placeholder="Enter your marks" name="marks" value={education.marks} onChange={handleChangeInputEducation}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Upload transcript (Marks sheet)</label>
                          <input class="form-control" type="file" id="formFile"/>
                        </div> 
                      </div>
                    </div>

                    <div className="d-flex my-4 align-items-center">
                      <div className="d-flex align-items-center">
                          <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                              <label className="form-check-label" for="flexCheckDefault">
                              I confirm that I've no criminal background or pending case.
                              </label>
                          </div>
                      </div>
                  </div>

                  <div className='text-end my-4'>
                    <button className="btn px-5 btn-primary" onClick={saveEducation}>Save and Next</button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Experience
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                    <div className="row">
                      <div className="col-md-6">
                      <div class="form-group">
                        <label for="Experience" class="form-label mt-4">How much experience do you have?</label>
                        <select class="form-select" id="Experience" name="experience" onChange={handleChangeInputExperience}>
                          <option selected>Choose...</option>
                          <option value="professional">Professional (3 years or more)</option>
                          <option value="intermediate">Intermediate (1 year - 3 years)</option>
                          <option value="beginner">Beginner level (6 months - 1 year)</option>
                          <option vlaue="New">First time ?</option>
                        </select>
                      </div>   
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="Interest" className="form-label mt-4">Area of Interest</label>
                          <input type="text" className="form-control text-muted" id="Interest" placeholder="Your favourite subject?" name="interest" value={experience.interest} onChange={handleChangeInputExperience}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="SubjectType" class="form-label mt-4">Which subject you can taugh better?</label>
                          <select class="form-select" id="SubjectType" name="subjectType" onChange={handleChangeInputExperience}>
                            <option selected>Choose...</option>
                            <option value="Science">Science Subjects</option>
                            <option value="Arts">Arts Subjects</option>
                            <option value="Commerce">Commerce Subjects</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="SubjectLevel" class="form-label mt-4">Select level of classes you can teach</label>
                          <select class="form-select" id="SubjectLevel" name="subjectLevel" onChange={handleChangeInputExperience}>
                            <option selected>Choose...</option>
                            <option value="Primary">Primary level</option>
                            <option value="Middle">Middle level</option>
                            <option value="Matriculation">Matriculation / O level</option>
                            <option value="Intermediate">Intermiedate / A level</option>
                            <option value="Graduation">Graduation level</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div class="form-group">
                          <label for="expertise" class="form-label mt-4">Select subject of expertise</label>
                          <select class="form-select" id="expertise" name="expertise" onChange={handleChangeInputExperience}>
                            <option selected>Choose...</option>
                            <option value="Islamic Studies">Islamic Studies</option>
                            <option value="Social Studies">Social Studies</option>
                            <option value="Science">Science (Physics, Chemistry)</option>
                            <option value="Math">Math</option>
                            <option value="Urdu">Urdu</option>
                            <option value="English">English</option>
                            <option value="Computer">Computer</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="form-group">
                        <label for="MultipleSubject" class="form-label mt-4">Select multiple of subjects that you can taught</label>
                        <select multiple class="form-select" id="MultipleSubject" name="multipleSubject" onChange={handleChangeSelectMultiple}>
                          <option selected>Choose...</option>
                          <option value="Islamic Studies">Islamic Studies</option>
                          <option value="Social Studies">Social Studies</option>
                          <option value="Science">Science (Physics, Chemistry)</option>
                          <option value="Math">Math</option>
                          <option value="Urdu">Urdu</option>
                          <option value="English">English</option>
                          <option value="Computer">Computer</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>    
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary" onClick={saveExperience}>Save and Next</button>
                    </div>

                </div>

              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Availibility
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                  <div className="row">
                    
                    <div className="col-md-4">
                      <div className="form-group">
                        <label for="hours" className="form-label mt-4">Available hours in day</label>
                        <input type="text" className="form-control" id="hours" placeholder="No. of available hours" name="hours" value={availability.hours} onChange={handleChangeInputAvailability}/>
                      </div> 
                    </div>

                    <div className="col-md-8">
                      <div class="form-group">
                        <label for="availability-dates" className="form-label mt-4">Availability start and end hours</label>
                        <div class="row">
                          <div class="col">
                            <input type="time" class="form-control" id="start-date" name="startDate" value={availability.startDate} onChange={handleChangeInputAvailability}/>
                          </div>
                          <div class="col">
                            <input type="time" class="form-control" id="end-date" name="endDate" value={availability.endDate} onChange={handleChangeInputAvailability}/>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="row">

                    <div class="form-group">
                      <label for="days" className="form-label mt-4">Days of the week</label>
                      <div class="d-flex">
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="monday" name="days" value="monday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="monday">Monday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="tuesday" name="days" value="tuesday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="tuesday">Tuesday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="wednesday" name="days" value="wednesday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="wednesday">Wednesday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="thursday" name="days" value="thursday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="thursday">Thursday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="friday" name="days" value="friday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="friday">Friday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="saturday" name="days" value="saturday" onChange={handleChangeCheckbox}/>
                          <label class="form-check-label" for="saturday">Saturday</label>
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  <div className="row">

                    <div class="form-group">
                      <label for="timeslots" className="form-label mt-4">Time slots</label>
                      <div class="d-flex">
                      <div class="form-check me-3">
                        <input type="checkbox" class="form-check-input" id="morning" name="timeslots" value="morning" onChange={handleChangeCheckbox}/>
                        <label class="form-check-label" for="morning">Morning</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" class="form-check-input" id="afternoon" name="timeslots" value="afternoon" onChange={handleChangeCheckbox}/>
                        <label class="form-check-label" for="afternoon">Afternoon</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" class="form-check-input" id="evening" name="timeslots" value="evening" onChange={handleChangeCheckbox}/>
                        <label class="form-check-label" for="evening">Evening</label>
                      </div>
                      </div>
                    </div>

                  </div>

                  {/* <div className="row">
                    <div class="form-group">
                      <label for="exceptions" className="form-label mt-4">Exceptions</label>
                      <textarea class="form-control" id="exceptions" name="exceptions" rows="3"></textarea>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className='col-md-6'>
                      <div class="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Physical Address</label>
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Enter your complete address" aria-label="Recipient's username" name="address" value={availability.address} onChange={handleChangeInputAvailability}/> 
                            <button class="btn btn-primary" type="button" id="button-addon2" onClick={getLocation}>Get Location</button>
                          </div>
                      </div>
                    </div>
                  </div>

                  {
                    map &&
                    <div className="row">
                      <div class="my-4">
                        <MyMapComponent lat={availability.location[0]} lng={availability.location[1]} />
                      </div>
                    </div>
                  }

                  <div className='text-center mt-5 p-2'>
                    <button className="btn btn-primary" onClick={submitProfile}>Submit</button>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
          
    </div>

    </>

  )
}

export default EditProfile