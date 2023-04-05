import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'
// import { usePlacesWidget } from "react-google-autocomplete";

function EditProfile() {

  // const [place, setPlace] = useState('');

  // const { ref, autocompleteRef } = usePlacesWidget({
  //   apiKey:'AIzaSyCZZdHbB_QrqHETYzOOSk9yEFknBkEansk',
  //   onPlaceSelected: (place) => {
  //     console.log(place);
  //     setPlace(place);
  //   }
  // });

  const [loading, setLoading] = useState(false)

  const [teacher, setTeacher] = useState('');
  // const [education, setEducation] = useState('');

  const submitProfile = async() => {
    setLoading(true)
    const info = JSON.parse(localStorage.getItem('info'))
    const result = await axios.post('http://localhost:3000/teacher/update', {
      token : localStorage.getItem('token'),
      teacher : info
    })
    setLoading(false)
    console.log(result)
  }



  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setTeacher({...teacher, [name]:value})
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
    setLoading(false)
  }

  useEffect(()=>{
    fetchstorage();
  }, [])


  return (

    <>

    {
      loading && <Loader loading={loading} />
    }

    <div>

      <div className='bg-light p-4'>
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
                  {/* <form> */}

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
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Profile Pic</label>
                          <input class="form-control" type="file" accept="image/*" id="formFile" onChange={handleFileChange} />
                        </div>
                      </div>
                      <div className="col-md-6 row">
                        <div className='col-6'>
                          <div className="form-group">
                            <label for="Age" className="form-label mt-4">Age</label>
                            <input type="number" className="form-control" id="Age" aria-describedby="Age" placeholder="Age" name="age" value={teacher.age} onChange={handleChangeInput}/>
                          </div>
                        </div>
                        <div className='col-6'>
                          <div class="form-group">
                            <label for="Gender" class="form-label mt-4">Gender</label>
                            <select className="form-select" id="Gender" name="gender" onChange={handleChangeInput}>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter Address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary" onClick={saveInfo}>Save and Next</button>
                    </div>

                  {/* </form> */}
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
                  {/* <form> */}

                    <div className="row">
                        <div class="form-group">
                          <label for="exampleSelect1" class="form-label mt-4">Qualification</label>
                          <select class="form-select" id="exampleSelect1">
                            <option>Graduation</option>
                            <option>Intermediate / O level</option>
                            <option>Matric / A level</option>
                            <option>High School</option>
                            <option>Middle School</option>
                            <option selected>Primary School</option>
                          </select>
                        </div>    
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail" className="form-label mt-4">Enter Obtained marks / GPA </label>
                          <input type="number" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={teacher.email} onChange={handleChangeInput}/>
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
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  {/* </form> */}
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
                  {/* <form> */}

                    <div className="row">
                      <div className="col-md-6">
                      <div class="form-group">
                        <label for="exampleSelect1" class="form-label mt-4">How much experience do you have?</label>
                        <select class="form-select" id="exampleSelect1">
                          <option>Professional (3 years or more)</option>
                          <option>Intermediate (1 year - 3 years)</option>
                          <option>Beginner level (6 months - 1 year)</option>
                          <option selected>First time ?</option>
                        </select>
                      </div>   
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputUsername" className="form-label mt-4">Area of Interest</label>
                          <input type="text" className="form-control text-muted" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={teacher.username} onChange={handleChangeInput}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleSelect1" class="form-label mt-4">Which subject you can taugh better?</label>
                          <select class="form-select" id="exampleSelect1">
                            <option>Science Subjects</option>
                            <option>Arts Subjects</option>
                            <option>Others</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div class="form-group">
                          <label for="exampleSelect1" class="form-label mt-4">Select level of subject you can taugh</label>
                          <select class="form-select" id="exampleSelect1">
                            <option>Primary level</option>
                            <option>Middle level</option>
                            <option>Matriculation / O level</option>
                            <option>Intermiedate / A level</option>
                            <option>Graduation level</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div class="form-group">
                          <label for="exampleSelect1" class="form-label mt-4">Select subject of expertise</label>
                          <select class="form-select" id="exampleSelect1">
                            <option>Islamic Studies</option>
                            <option>Social Studies</option>
                            <option>Science (Physics, Chemistry)</option>
                            <option>Math</option>
                            <option>Urdu</option>
                            <option>English</option>
                            <option>Computer</option>
                            <option>Arabic</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div class="form-group">
                        <label for="exampleSelect2" class="form-label mt-4">Select multiple of subjects that you can taught</label>
                        <select multiple class="form-select" id="exampleSelect2">
                          <option>Islamic Studies</option>
                          <option>Social Studies</option>
                          <option>Science (Physics, Chemistry)</option>
                          <option>Math</option>
                          <option>Urdu</option>
                          <option>English</option>
                          <option>Computer</option>
                          <option>Arabic</option>
                        </select>
                      </div>    
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  {/* </form> */}
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
                  {/* <form> */}

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Available hours in day</label>
                          <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" />
                        </div>    
                      </div>
                      <div className='col-md-6'>
                        <div class="form-group">
                        <label for="exampleInputName" className="form-label mt-4">Get current location if you're inplace tutor</label>
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button class="btn btn-primary" type="button" id="button-addon2">Get Access</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Physical Address</label>
                        <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-center mt-5 p-2'>
                      <button className="btn btn-lg btn-primary" onClick={submitProfile}>Submit</button>
                    </div>

                  {/* </form> */}
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