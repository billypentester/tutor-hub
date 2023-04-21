import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './../utils/Loader'

function TeacherProfile() {

    const {username} = useParams()

    const [teacher, setTeacher] = useState('')
    const [loading, setLoading] = useState(true)

    async function getTeacher() {
        try{
            setLoading(true)
            const res = await axios.get(`/api/teacher/profile/${username}`)
            console.log(res)
            setTeacher(res.data)
            setLoading(false)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTeacher()
    }, [])

    return (
        <>
        {
            loading && <Loader loading={loading} />
        }
        {
            teacher === '' ? <h1>Teacher Not Found</h1> : 
            <div className='row'>
                <div className='col-12'>
                    <div className="p-3 mb-3 bg-light rounded">
                        <div className='d-flex justify-content-between'>
                            <div className='col-3 text-center'>
                                <img src={teacher.profile} alt="" className='img-fluid rounded-circle' />
                            </div>
                            <div className='col-8'>
                                <div className=''>
                                    <div className='col-4'>
                                        <h4>{teacher.name}</h4>
                                        <p>@{teacher.username}</p>
                                    </div>
                                    <div className='col-8'>
                                        <div className='d-flex justify-content-evenly my-4'>
                                            <div>
                                                <span className='me-2 mb-1 d-block'>Rating</span>
                                                <div className='d-flex align-items-center'>
                                                    <i className="me-2 fas fa-star"></i>
                                                    <span className='me-2 d-block'>4.5</span>                                        
                                                </div>
                                            </div>
                                            <div>
                                                <span className='me-2 mb-1 d-block'>Experience</span>
                                                <div className='d-flex align-items-center'>
                                                    <i className="me-2 fas fa-briefcase"></i>
                                                    <span className='me-2 d-block'>professional</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='me-2 mb-1 d-block'>Qualification</span>
                                                <div className='d-flex align-items-center'>
                                                    <i className="me-2 fas fa-graduation-cap"></i>
                                                    <span className='me-2 d-block'>{teacher.education.qualification}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-3'>
                                        <button className='btn btn-primary me-2'>Hire Me</button>
                                        <button className='btn btn-primary me-2'>Set Appointment</button>
                                        <button className='btn btn-primary me-2'>Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className="p-4 mb-3 bg-light rounded">
                            <h5>Personal Details</h5>
                            <div className='pt-3'>
                                <div className='row'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <i className="mx-3 fas fa-map-marker-alt text-primary"></i>
                                        <span className='mx-3'>{teacher.city}</span>
                                    </div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <i className="mx-3 fas fa-phone text-info"></i>
                                        <span className='mx-3'>{teacher.contactno}</span>
                                    </div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <i className="mx-3 fas fa-envelope text-success"></i>
                                        <span className='mx-3'>{teacher.email}</span>
                                    </div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <i className="mx-3 fa-solid fa-heart text-danger"></i>
                                        <span className='mx-3'>{teacher.experience.interest}</span>
                                    </div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <i className="mx-3 fas fa-globe text-warning"></i>
                                        <span className='mx-3'>{teacher.language}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='row'>
                            <div className="p-4 mb-3 bg-light rounded">
                                <h5>Experience</h5>
                                <div className='pt-3'>
                                    <div className='row'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fas fa-briefcase text-primary"></i>
                                            <span className='mx-3'>I'm <strong>{teacher.experience.experience}</strong> level tutor having 3-4 years experience.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-heart text-danger"></i>
                                            <span className='mx-3'>My area of interest is <strong>{teacher.experience.interest} </strong> and related subjects.</span> 
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-chalkboard-user text-dark"></i>
                                            <span className='mx-3'>I can teach <strong>{teacher.experience.subjectType} subject</strong> to <strong>{teacher.experience.subjectLevel}</strong> level students.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fas fa-solid fa-bolt text-success"></i>
                                            <span className='mx-3'>I've huge expertise level in <strong>{teacher.experience.expertise} </strong>subjects.</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-2'>
                                            <i className="mx-3 fa-solid fa-book text-info"></i>
                                            <span className='mx-3'>I can teach other subjects including <strong>{
                                                
                                                teacher.experience.multipleSubject.map((subject, index) => {
                                                    return (
                                                        <span key={index}>{subject}, </span>
                                                    )
                                                })

                                            }</strong> as well.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 mb-3 bg-light rounded">
                                
                                <div className='row mb-4'>
                                    <h5 className='mb-2'>Available Days</h5>
                                    <div className='d-flex my-2'>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info rounded-start'>
                                                <p className='p-0 m-0'>Monday</p>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>Tuesday</p>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>Wednesday</p>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>Thursday</p>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>Friday</p>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='py-2 border text-center border-1 border-info text-info rounded-end'>
                                                <p className='p-0 m-0'>Saturday</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <h5 className='mb-2'>Available Slot</h5>
                                    <div className='d-flex my-2'>
                                        <div className='col-4'>
                                            <div className='py-2 border text-center border-1 border-info text-info rounded-start'>
                                                <p className='p-0 m-0'>Morning</p>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>Afternoon</p>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='py-2 border text-center border-1 border-info text-info rounded-end'>
                                                <p className='p-0 m-0'>Evening</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <h5 className='mb-2'>Available Time</h5>
                                    <div className='d-flex my-2 flex-wrap'>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>9:00 AM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>12:00 PM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>3:00 PM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>6:00 PM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info bg-info text-white'>
                                                <p className='p-0 m-0'>9:00 PM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>12:00 AM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>3:00 AM</p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div className='py-2 border text-center border-1 border-info text-info'>
                                                <p className='p-0 m-0'>6:00 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        
        </>
    )

}

export default TeacherProfile