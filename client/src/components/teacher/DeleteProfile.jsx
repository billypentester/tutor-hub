import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from './../utils/Loader'

function DeleteProfile() {

    const [email , setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function deleteProfile() {
        try{
            setLoading(true)
            const token = localStorage.getItem('token')
            const res = await axios.post('/api/teacher/delete', {email, token})
            if(res.status === 200) {
                setLoading(false)
                localStorage.removeItem('token')
                localStorage.removeItem('teacher')
                window.location.href = '/'
            }
        }
        catch(err) {
            setLoading(false)
            setError(err.response.data.msg)
        }
    }


    return (

        <>

        {
            loading && <Loader loading={loading} />
        }

        <div className="container p-5 border-light mb-3">
            <div className='row justify-content-center p-5'>
            <div class="card border-secondary mb-3 px-0 col-6 border-danger">
                <div class="card-body p-5">
                        
                        <h4 class="card-title text-center mb-5">Delete Profile</h4>

                        {
                            error && <div className='alert alert-danger my-4'>{error}</div>
                        }

                    <div class="form-group">
                            <label for="deleteEmail" class="form-label ">Confirm your email address</label>
                            <input type="email" class="form-control" id="deleteEmail" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="d-flex my-4 align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" for="flexCheckDefault">I agree to delete my profile</label>
                            </div>
                        </div>
                    </div>
                    
                        <button className='btn btn-danger mx-auto w-100' type='submit' onClick={deleteProfile}>Delete</button>

                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default DeleteProfile