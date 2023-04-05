import React from 'react'

function DeleteProfile() {
  return (
    <div className="container p-5 border-light mb-3">
        <div className='row justify-content-center p-5'>

        <div class="card border-secondary mb-3 px-0 col-6 border-danger">
            <div class="card-body p-5">
                <h4 class="card-title text-center">Delete Profile</h4>

                <div class="form-group">
                    <label for="exampleInputEmail1" class="form-label mt-4">Confirm your email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>

                <div className="d-flex my-4 align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label" for="flexCheckDefault">
                            I agree to delete my profile
                            </label>
                        </div>
                    </div>
                </div>
                
                <button className='btn btn-danger mx-auto w-100' type='submit'>Delete</button>

            </div>
        </div>
        
        </div>
    </div>
  )
}

export default DeleteProfile