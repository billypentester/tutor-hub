import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loader from './../utils/Loader'
import Alert from './../utils/Alert'
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [alert, setAlert] = useState({type : '', message : ''});

  const navigate = useNavigate()

  const submitProfile = async() => {
    setLoading(true)
    const {name, username, email, gender, city, age, contactno, language, profile} = JSON.parse(localStorage.getItem('info'))
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
        profile,
        language,
        education,
        experience,
        isProfileComplete : true,
        availability
      }
    })
    if(result.status === 200)
    {
      localStorage.removeItem('info')
      localStorage.removeItem('education')
      localStorage.removeItem('experience')
      localStorage.removeItem('availability')
      localStorage.setItem('teacher', JSON.stringify(result.data))
      setAlert({type : 'success', message : 'Profile updated successfully'})
      setTimeout(() => { 
        setAlert({type : '', message : ''}) 
        navigate('/teacher/dashboard/view-profile')
       }, 3000)
    }
    setLoading(false)
  }

  const handleChangeInput = (e) => {
    const {name, value} = e.target
    console.log(name, value)
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

  const fetchstorage = () => {
    if(localStorage.getItem('info') || localStorage.getItem('education') || localStorage.getItem('experience') || localStorage.getItem('availability'))
    {
      const info = JSON.parse(localStorage.getItem('info'))
      const education = JSON.parse(localStorage.getItem('education'))
      const experience = JSON.parse(localStorage.getItem('experience'))
      const availability = JSON.parse(localStorage.getItem('availability'))
      setTeacher({...teacher, ...info})
      setEducation({...education, ...education})
      setExperience({...experience, ...experience})
      setAvailability({...availability, ...availability})
    }
    else
    {
      const data = JSON.parse(localStorage.getItem('teacher'))
      setTeacher({...teacher, ...data})
      setEducation({...education, ...data.education})
      setExperience({...experience, ...data.experience})
      setAvailability({...availability, ...data.availability})
    }
  }

  const saveInfo = (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.setItem('info', JSON.stringify(teacher))
    setAlert({type : 'success', message : 'Basic Info Saved'})
    setActiveIndex(activeIndex + 1)
    setTimeout(() => {  setAlert({type : '', message : ''}) }, 2000)
    setLoading(false)
  }

  const goback = () => {
    setActiveIndex(activeIndex - 1)
  }

  const saveEducation = (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.setItem('education', JSON.stringify(education))
    setAlert({type : 'success', message : 'Education Saved'})
    setActiveIndex(activeIndex + 1)
    setTimeout(() => {  setAlert({type : '', message : ''}) }, 2000)
    setLoading(false)
  }

  const saveExperience = (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.setItem('experience', JSON.stringify(experience))
    setAlert({type : 'success', message : 'Experience Saved'})
    setActiveIndex(activeIndex + 1)
    setTimeout(() => {  setAlert({type : '', message : ''}) }, 2000)
    setLoading(false)
  }


  const getLocation = () => {
    setLoading(true)
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
  }


  useEffect(()=>{
    fetchstorage();
  }, [])


  return (

    <>

    {
      loading && <Loader />
    }

    <div className="my-4">

      <div className='bg-light p-4 rounded-3'>
        <div className='container'> 
          <h1 className='display-6'>Edit Profile</h1>
          <p className='lead mb-0 pb-0'>Complete the profile and become eligible for tutor position</p>
        </div>
      </div>

      <div className='container my-3 mb-5'>
        <div class="accordion" id="accordionExample">

          {/* basic info */}

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button">
                Basic Information
              </button>
            </h2>
            <div id="collapseOne" class={`accordion-collapse collapse ${ activeIndex === 0 ? 'show' : '' }`} aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="accordion-body">

                <div className='container px-4'>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="Fullname" className="form-label mt-4">Full Name</label>
                        <input type="text" className="form-control" id="Fullname" aria-describedby="Fullname" placeholder="Name" name="name" value={teacher.name} onChange={handleChangeInput} />
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
                        <input class="form-control" type="file" name="profile" accept="image/*" id="formFile" onChange={handleFileChange} />
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
                            <select className="form-select" id="Gender" name="gender" value={teacher.gender} onChange={handleChangeInput}>
                              <option>Choose...</option>
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

          {/* education */}

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button">
                Educational Background
              </button>
            </h2>
            <div id="collapseTwo" class={`accordion-collapse collapse ${ activeIndex === 1 ? 'show' : '' }`} aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                  <div className="row">              
                    <div className="form-group">
                      <label for="exampleFormControlTextarea1" className="form-label mt-4">Short Description about yourself</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" value={education.description} onChange={handleChangeInputEducation}></textarea>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group">
                            <label for="Qualification" class="form-label mt-4">Qualification</label>
                            <select class="form-select" id="Qualification" name="qualification" value={education.qualification} onChange={handleChangeInputEducation}>
                              <option>Select Education</option>
                              <option value="PhD">PhD</option>
                              <option value="MS">Masters</option>
                              <option value="BS">Bachelors</option>
                              <option value="Inter">Intermediate</option>
                              <option value="Matric">Matric</option>
                              <option value="High School">High School</option>
                            </select>
                          </div> 
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="exampleMajor" className="form-label mt-4">Major</label>
                            <select class="form-select" id="exampleMajor" name="major" value={education.major} onChange={handleChangeInputEducation}>
                              <option>Select Major</option>
                              <option value="Computer Science">Computer Science</option>
                              <option value="Mathematics">Mathematics</option>
                              <option value="Physics">Physics</option>
                              <option value="Chemistry">Chemistry</option>
                              <option value="Biology">Biology</option>
                              <option value="English">English</option>
                              <option value="Urdu">Urdu</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="exampleInstitute" className="form-label mt-4">Institute Name</label>
                        <input type="text" className="form-control" id="exampleInstitute" placeholder="Enter your Institute name" name="institute" value={education.institute} onChange={handleChangeInputEducation}/>
                      </div>
                    </div>   
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleMarks" className="form-label mt-4">Enter Obtained marks / GPA </label>
                          <input type="number" className="form-control" id="exampleMarks" placeholder="Enter your marks" name="marks" value={education.marks} onChange={handleChangeInputEducation}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleYear" className="form-label mt-4">Passed Year</label>
                          <input type="number" className="form-control" id="exampleYear" placeholder="E.g 2023" name="passedYear" value={education.passedYear} onChange={handleChangeInputEducation}/>
                        </div>
                      </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div class="form-group">
                        <label for="formFile" class="form-label mt-4">Upload transcript (Marks sheet)</label>
                        <input class="form-control" type="file" id="formFile"/>
                      </div> 
                    </div> */}
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

                  <div className='d-flex justify-content-between my-4'>
                    <button className="btn px-5 btn-primary" onClick={goback}>Move Back</button>
                    <button className="btn px-5 btn-primary" onClick={saveEducation}>Save and Next</button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* experience */}

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button">
                Experience
              </button>
            </h2>
            <div id="collapseThree" class={`accordion-collapse collapse ${ activeIndex === 2 ? 'show' : '' }`} aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                    <div className="row">
                      <div className="col-md-6">
                      <div class="form-group">
                        <label for="Experience" class="form-label mt-4">How much experience do you have?</label>
                        <select class="form-select" id="Experience" name="experience" value={experience.experience} onChange={handleChangeInputExperience}>
                          <option>Choose...</option>
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
                          <select class="form-select" id="SubjectType" name="subjectType"value={experience.subjectType} onChange={handleChangeInputExperience}>
                            <option>Choose...</option>
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
                          <select class="form-select" id="SubjectLevel" name="subjectLevel" value={experience.subjectLevel} onChange={handleChangeInputExperience}>
                            <option>Choose...</option>
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
                          <select class="form-select" id="expertise" name="expertise" value={experience.expertise} onChange={handleChangeInputExperience}>
                            <option>Choose...</option>
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
                        <select multiple class="form-select" id="MultipleSubject" name="multipleSubject" value={experience.multipleSubject} onChange={handleChangeSelectMultiple}>
                          <option>Choose...</option>
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

                    <div className='d-flex justify-content-between my-4'>
                      <button className="btn px-5 btn-primary" onClick={goback}>Move Back</button>
                      <button className="btn px-5 btn-primary" onClick={saveExperience}>Save and Next</button>
                    </div>

                </div>

              </div>
            </div>
          </div>

          {/* availibility */}

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed" type="button">
                Availibility
              </button>
            </h2>
            <div id="collapseFour" class={`accordion-collapse collapse ${ activeIndex === 3 ? 'show' : '' }`} aria-labelledby="headingFour" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>

                  <div className="row">
                    
                    <div className="col-md-4">
                      <div className="form-group">
                        <label for="hours" className="form-label mt-4">Available hours in day</label>
                        <input type="text" className="form-control" id="hours" placeholder="No. of available hours" name="hour" value={availability.hour} onChange={handleChangeInputAvailability}/>
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
                          <input type="checkbox" class="form-check-input" id="monday" name="days" value="monday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('monday')  }/>
                          <label class="form-check-label" for="monday">Monday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="tuesday" name="days" value="tuesday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('tuesday')  }/>
                          <label class="form-check-label" for="tuesday">Tuesday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="wednesday" name="days" value="wednesday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('wednesday')  }/>
                          <label class="form-check-label" for="wednesday">Wednesday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="thursday" name="days" value="thursday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('thursday')  }/>
                          <label class="form-check-label" for="thursday">Thursday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="friday" name="days" value="friday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('friday')  }/>
                          <label class="form-check-label" for="friday">Friday</label>
                        </div>
                        <div class="form-check me-3">
                          <input type="checkbox" class="form-check-input" id="saturday" name="days" value="saturday" onChange={handleChangeCheckbox} checked={ availability && availability.days && availability.days.includes('saturday')  }/>
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
                        <input type="checkbox" class="form-check-input" id="morning" name="timeslot" value="morning" onChange={handleChangeCheckbox} checked={ availability && availability.timeslot && availability.timeslot.includes('morning') }/>
                        <label class="form-check-label" for="morning">Morning</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" class="form-check-input" id="afternoon" name="timeslot" value="afternoon" onChange={handleChangeCheckbox} checked={ availability && availability.timeslot && availability.timeslot.includes('afternoon') }/>
                        <label class="form-check-label" for="afternoon">Afternoon</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" class="form-check-input" id="evening" name="timeslot" value="evening" onChange={handleChangeCheckbox} checked={ availability && availability.timeslot && availability.timeslot.includes('evening') }/>
                        <label class="form-check-label" for="evening">Evening</label>
                      </div>
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className='col-md-6'>
                      <div class="form-group">
                          <label for="exampleLocation" className="form-label mt-4">Physical Address</label>
                          <div class="input-group">
                            <input disabled type="text" class="form-control" placeholder="Enter your complete address" aria-label="Recipient's username" name="address" value={availability.address} onChange={handleChangeInputAvailability}/> 
                            <button class="btn btn-primary" type="button" id="button-addon2" onClick={getLocation}>Get Location</button>
                          </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div class="form-group">
                          <label for="exampleFee" className="form-label mt-4">Expected Mountly fee</label>
                          <input type="number" class="form-control" id="exampleFee" placeholder="Enter your monthly charges" name="fee" value={availability.fee} onChange={handleChangeInputAvailability}/>
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
                  
                  <div className='text-start my-4'>
                    <button className="btn px-5 btn-primary" onClick={goback}>Move Back</button>
                  </div>

                  <div className='text-center mt-5'>
                    <button className="btn btn-lg btn-success" onClick={submitProfile}>Submit</button>
                  </div>

                </div>

              </div>
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