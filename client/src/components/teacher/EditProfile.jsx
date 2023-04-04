import React, {useEffect, useState} from 'react'
// import { usePlacesWidget } from "react-google-autocomplete";

function EditProfile() {

  const [place, setPlace] = useState('');

  // const { ref, autocompleteRef } = usePlacesWidget({
  //   apiKey:'AIzaSyCZZdHbB_QrqHETYzOOSk9yEFknBkEansk',
  //   onPlaceSelected: (place) => {
  //     console.log(place);
  //     setPlace(place);
  //   }
  // });

  const [teacher, setTeacher] = useState({
    name:'',
    email:'',
    username:'',
    contactno:'',
    age:''
  });

  const fetchstorage = () => {
    const data = JSON.parse(localStorage.getItem('teacher'))
    setTeacher({
      name: data.name,
      email: data.email,
      username: data.username
    })
  }

  const handleChangeInput = () => {
    const {name, value} = e.target
    setTeacher({...teacher, [name]:value})
  }

  useEffect(()=>{
    fetchstorage();
  }, [])


  return (

    <div>

      <div className='bg-light p-4'>
        <div className='container'> 
          <h1 className='display-6'>Edit Profile</h1>
          <p className='lead mb-0 pb-0'>Complete the profile and become eligible for tutor position</p>
        </div>
      </div>

      <div className='container my-3'>
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
                  <form>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                          <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={teacher.name} onChange={handleChangeInput}/>
                        </div>    
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                          <input disabled type="text" className="form-control text-muted" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={teacher.username} onChange={handleChangeInput}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                          <input disabled type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={teacher.email} onChange={handleChangeInput}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword" className="form-label mt-4">Contact No.</label>
                          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={teacher.contactno} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Profile Pic</label>
                          <input class="form-control" type="file" id="formFile"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword2" className="form-label mt-4">Age</label>
                          <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={teacher.confirmPassword} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Physical Address</label>
                        <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  </form>
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
                  <form>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                          <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={teacher.name} onChange={handleChangeInput}/>
                        </div>    
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                          <input disabled type="text" className="form-control text-muted" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={teacher.username} onChange={handleChangeInput}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                          <input disabled type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={teacher.email} onChange={handleChangeInput}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword" className="form-label mt-4">Contact No.</label>
                          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={teacher.contactno} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Profile Pic</label>
                          <input class="form-control" type="file" id="formFile"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword2" className="form-label mt-4">Age</label>
                          <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={teacher.confirmPassword} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Physical Address</label>
                        <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  </form>
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
                  <form>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                          <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={teacher.name} onChange={handleChangeInput}/>
                        </div>    
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                          <input disabled type="text" className="form-control text-muted" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={teacher.username} onChange={handleChangeInput}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                          <input disabled type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={teacher.email} onChange={handleChangeInput}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword" className="form-label mt-4">Contact No.</label>
                          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={teacher.contactno} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Profile Pic</label>
                          <input class="form-control" type="file" id="formFile"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword2" className="form-label mt-4">Age</label>
                          <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={teacher.confirmPassword} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Physical Address</label>
                        <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Availibility
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div class="accordion-body">
                
                <div className='container px-4'>
                  <form>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputName" className="form-label mt-4">Full Name</label>
                          <input type="text" className="form-control" id="exampleInputName" aria-describedby="aame" placeholder="Enter email" name="name" value={teacher.name} onChange={handleChangeInput}/>
                        </div>    
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputUsername" className="form-label mt-4">Username</label>
                          <input disabled type="text" className="form-control text-muted" id="exampleInputUsername" aria-describedby="username" placeholder="Enter email" name="username" value={teacher.username} onChange={handleChangeInput}/>
                        </div>   
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                          <input disabled type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={teacher.email} onChange={handleChangeInput}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword" className="form-label mt-4">Contact No.</label>
                          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={teacher.contactno} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="formFile" class="form-label mt-4">Profile Pic</label>
                          <input class="form-control" type="file" id="formFile"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="exampleInputPassword2" className="form-label mt-4">Age</label>
                          <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={teacher.confirmPassword} onChange={handleChangeInput}/>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label for="exampleInputAddress" className="form-label mt-4">Physical Address</label>
                        <input type="email" className="form-control" id="exampleInputAddress" aria-describedby="address" placeholder="Enter address" name="address" value={teacher.address} onChange={handleChangeInput}/>
                      </div>
                    </div>

                    <div className='text-end my-4'>
                      <button className="btn px-5 btn-primary">Save and Next</button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
          
    </div>

  )
}

export default EditProfile